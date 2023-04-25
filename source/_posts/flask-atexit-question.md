---
title: 在 Flask 中測試 atexit 官方文件的註解(Note)
tags:
  - Python
  - atexit
categories: Python
date: 2020-07-01 18:41:14
---

![](https://cdn.pixabay.com/photo/2017/02/11/14/45/taipei-taiwan-2057818_1280.jpg)

> Photo by [tingyaoh](https://pixabay.com/zh/photos/taipei-taiwan-taipei-101-2057818/)

# 前言

寫程式不管在哪個情境都會需要處理錯誤訊息，除了程式以外語言本身也需要這樣的功能，因此 python 就提供了一個標準函式庫 - `atexit`，這名字從 C 語言時態就存在的一個工具，主要是監聽程式當收到關閉請求時，可以先跳至已註冊的函式中先處理掉一些事情後再接著關閉服務，這個做法被稱為 Exit Handler，主要就是當程式收到關閉的訊號時最後會進入的函式們，一般較常見的會放上關閉`資料庫連線`、`釋放記憶體`、`備份 cache` 等等的功能，如此一來就能降低問題的產生，讓服務能夠可平滑的關閉、重啟。

不管使用 python 寫 `腳本`、`後端`、`爬蟲` 都可以使用 atexit 來處理例外錯誤，而我在 flask 中使用時與官方記載的`註解`有點不同，本篇就介紹一下 atexit 以及使用中不同的部分吧！

<!-- more -->

# atexit 介紹

atexit 有記載在[官方文件](https://docs.python.org/3/library/atexit.html)中，在 stackoverflow 中[也有提及](https://stackoverflow.com/a/30739397)，文件中說明這個模組(Module)可以去定義 `函式們`(functions) 去`註冊`或`反註冊`清除函式，並且它的優先權會在程序終止之上。開發者需預先在程式中註冊中事件(Event)，若同時註冊多個事件時，順序則是反向執行，舉例來說，當前註冊 A、B、C 三個事件，當程序意外終止時，執行的順序則會是 C、B、A，推測會反執行的原因是模組將註冊事件放進一個暫時 堆疊(stack) 中，當觸發後就會照著堆疊的方式去執行，若還是不懂[可參考](https://zh.wikipedia.org/zh-tw/%E5%A0%86%E6%A0%88)。

官方中有記載：

> Note: The functions registered via this module are not called when the program is killed by a signal not handled by Python, when a Python fatal internal error is detected, or when os.\_exit() is called.

當遇到以下事件時無法觸發:

- 被外部清除程序，而 python 無法 handle
- Python 內部錯誤
- 執行到 `os_exit()`

不過除了第二項以外目前都會觸發 flask 中註冊的 atexit，以下就介紹一下如何在 flask 上使用並實測。

# 實測

建立一個 `app.py` 然後貼下以下程式碼:

```python
import os
from time import sleep
from flask imporㄓt Flask
import atexit

app = Flask(__name__)


@atexit.register
def shutdown():
    print('----------------------------------')
    print("Ready to close...")
    sleep(1)
    print("You can doing some action in here.")
    print('----------------------------------')


@app.route('/')
def hello():
    return 'Hi'


@app.route('/user/<username>')
def user(username):
    if username == 'Tom':
        return f'Hello {username}'
    else:
        print('I will use OS EXIT!! Hahahaha')
        os._exit(0)


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
```

以下就帶幾個範例並且實測無法觸發的事件。

## 範例一 - 外部清除

這裡使用 `ps aux | grep python` 以及 `kill -9 PID` 來實測。

首先執行程式 `python app.py`:
![](https://i.imgur.com/o1bryC2.png)

---

接著使用 `ps aux | grep python` 找出我們的程序，以下圖例子而言，`第一段`與`第三段`是我們執行 app.py 這個檔案相關的程序，在 nijia 這個使用者後面接的數字就是 PID(13642 & 13641)：
![](https://i.imgur.com/OEcY3Kf.png)

---

### 刪除不同的 PID 會有不同的結果 

#### 刪除第一個 PID - 13642

使用 `kill -9 13642` 時刪除它會觸發 atexit:
![](https://i.imgur.com/aLTyhC8.png)

具體原因是因為刪除的事 `app.py` 本身而不是對於 `python app.py` 這整件事，也由於不是針對 python 本身處理，因此會觸發 exit handler 也是合情合理。

#### 刪除第二個 PID - 13641

> 若是照步驟來這部分可能已經沒有 PID，需要再重新執行一次程式。

一樣使用 `kill -9 13641` 會得到如下圖所示:
![](https://i.imgur.com/wDDKCE1.png)

在這個實測中他不會觸發 exit handler，因為它刪除了 `python app.py` 的執行程序，也因為連同 python 的處理程序也一併刪除讓 python 無法觸發事件導致沒有 exit handler。

在這個例子中就體驗到官方文件說的：「when the program is killed by a signal not handled by Python,」

## 範例二 - 使用 os.\_exit(0)

在一開始的程式碼中我已加入 `@app.route('/user/<username>')` 這個路由，若帶入 username 不等於 Tom 實則會使用 `ox._exit(0)`。

這裡一樣先執行 `python app.py`，這邊可以使用 Postman、curl 都行，而我是使用 Python Command 搭配 requests 來測試，在呼叫 `http://localhost:5000/user/Amy` 後會收到出錯訊息：
![](https://i.imgur.com/u5y3wRh.png)

這裡一樣有觸發到 exit handler，推測在範例中應該是被 flask 攔截下來才導致有觸發到。

## Event 3 - Exit Handler Function Trigger Reverse

在 `def shutdown()` 下面直接加上以下的 code:

```python
@atexit.register
def shutdown2():
    print('--------------Second start-------------')
    sleep(1)
    print('--------------Second end---------------')


@atexit.register
def shutdown3():
    print('-----------Third Start-----------------')
    sleep(1)
    print('-----------Third end-------------------')
```

直接多註冊兩個 atexit 的函式，接著一樣執行 `python app.py` 後可以透過 python command 下一個錯誤 username 的路由觸發 graceful shutdown：

```
r = requests.get('http://localhost:5000/user/amy')
```

實測結果 atexit 果真是會倒轉著執行 function，如堆疊(stack)般的一個一個拿出：
![](https://i.imgur.com/tRLTzCt.png)

# 結論

使用 atexit 可以在 python 中簡單的實現 Exit Handler，需要注意的是若在 atexit 中一樣需要 try catch 去`抓取錯誤`以及設定`時間長度`(太久了一樣要關閉)，畢竟需要透過這個機制去降低`重開`/`關閉成本`，希望能藉由這個機制讓各位的服務們可以安全下莊重新上功能 🙂。

# 後續

在寫這篇時感覺 atexit 這個 exit handler 比較屬於 Graceful Shutdown(GS) 的一環，但硬是把它說成是 GS 好像又有點奇怪，因為 GS 在其他語言中都會收到 `signal` 的訊號後才開始處理事件，而 python 這邊找到的資源中較多都是自己寫 class 來做 signal 的管控(沒套件)，因此在本篇的實作上就比較屬於 exit handler 的實驗與測試。

# 參考

- [[Go 教學] 什麼是 graceful shutdown?](https://blog.wu-boy.com/2020/02/what-is-graceful-shutdown-in-golang/)
- [Graceful Shutdown：盡 Server 最後的義務 — 以 Node.js 與 Kubernetes 為例](https://medium.com/@chentsulin/graceful-shutdown-%E7%9B%A1-server-%E6%9C%80%E5%BE%8C%E7%9A%84%E7%BE%A9%E5%8B%99-%E4%BB%A5-node-js-%E8%88%87-kubernetes-%E7%82%BA%E4%BE%8B-cb7f519389ea)
- [Python Flask shutdown event handler](https://stackoverflow.com/questions/30739244/python-flask-shutdown-event-handler)
- [atexit — 程式關閉時回呼 — 你所不知道的 Python 標準函式庫用法 08](https://blog.louie.lu/2017/08/03/%E4%BD%A0%E6%89%80%E4%B8%8D%E7%9F%A5%E9%81%93%E7%9A%84-python-%E6%A8%99%E6%BA%96%E5%87%BD%E5%BC%8F%E5%BA%AB%E7%94%A8%E6%B3%95-08-atexit/)
