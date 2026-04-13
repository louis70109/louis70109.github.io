---
title: 第一次寫 Python SDK 實戰全記錄
tags:
  - Python
  - LINE
  - Lotify
categories: Python
date: 2020-05-03 19:46:49
---

![](https://i.imgur.com/Rms5ZNG.png)

# 前言

對於 LINE Notify 其實早早就一直有在使用，不管是 server 健康檢查、空汙通知、直播主開台通知...等，都一直使用著，也是因為一直在用時有個困擾，就是每次都要找 [API 文件](https://notify-bot.line.me/doc/en/)並且看對應的參數...這在開發流程上浪費了不少時間，也因為到 Pypi 套件庫裡找 LINE Notify 相關套件時大多都只有推送功能，幾乎沒有對於認證流程的操作的 function ，文件也不齊全，在此同時也看到卡米哥的 GitHub 在此時上傳了一個 [Notify SDK](https://github.com/etrex/lotify)，畢竟我對 Ruby 還不算陌生，就直接參考卡米哥的架構並加上單元測試來完成本篇要介紹的 - [Lotify](https://github.com/louis70109/lotify)

<!-- more -->

# [Lotify](https://github.com/louis70109/line-notify) 介紹

先簡單列幾點以下會提到的部分：

1. tests/ 是 mock 住 server 而不是 mock 請求函式
2. requirements 分層用意
3. SDK function init 設計用途
4. README markdown to rst

### 使用 flask 框架的範例程式碼 - [flask-line-notify](https://github.com/louis70109/flask-line-notify)

這是 Lotify 的展開圖:
![目錄架構](https://i.imgur.com/uXo7jA8.png)

架構上參考許多 [line-bot-sdk-python](https://github.com/line/line-bot-sdk-python) 的使用方式，包括 `tests` 的寫法、`Travis`、`requirements`的環境分層、`tox`支援多版本的寫法...

因為 python 有多版本支援的問題，雖然最後我沒支援到 2.7，不過寫法上其實已經可以支援，只差設定檔搞不清楚是哪邊的問題，這邊的優先權就排後面點～

# 使用 - [responses](https://pypi.org/project/responses/) mock 對於 LINE server 請求與回應

```
pip install responses
```

只要簡單使用 python 常用的 decorator 就可以讓這個函式快速的 mock 所有 requests，並且透過 `add()` 的方式可以把所有的 `Method`、`Url`、`status_code`、`json` 都模擬出來，使用方法可以參考以下的 code:

```python
import responses

@responses.activate
def test_get_access_token(self):
    responses.add(
        responses.POST,
        '{url}/oauth/token'.format(url=self.bot_origin),
        json={ 'access_token': self.token },
        status=200
    )

    result = self.tested.get_access_token('foo')
    request = responses.calls[0]
    response = json.loads(request.response.content.decode())
    self.assertEqual('POST', request.request.method)
    self.assertEqual(result, response.get('access_token'))
```

會這麼用是因為若只用 patch 來 mock requests 的話對於測試真實度就會失真(黑箱)，讓請求正常執行而只擋下第三方 server，，雖然兩者行為差不多，但這樣的做法還是比較正確。

# Requirements.txt 分層設計

一般來說 python 的大家習慣使用`requirements.txt`這個檔案，但在寫 SDK 時需要跑測試，因此需要使用`pytest`以及`flake8`(Lint)相關套件，但使用者 clone 檔案時不一定需要跑測試，因此我就分為`requirements.txt`以及`requirements.dev.txt`，將兩個環境有需要的都放在`requirements.txt`中，跑測試需要的則都是放在另一個檔案。

`requirements.dev.txt`只要在開頭放上`-r requirements.txt`就可以把另一個文字檔的套檢引進來囉！

```
-r requirements.txt
responses
pytest
```

# Client 設計原則

<script src="https://gist.github.com/louis70109/e39302e76c66a450991fb2aea5838a35.js"></script>

## 傳至 Dummy server

這邊 api_origin & bot_origin 會這樣設計是某次看到 bottender 文件上有使用這樣的設計，目的為了讓開發者可以把請求打回自己建立的 server 上，不管壓力測試或是負載平衡，如此一來彈性就大增了 🙂，因此參考之下就加入 SDK 的設計了。

> Dummy 是很多地方都會用到的東西，像 AWS X-Ray 若需要阻擋下來的話也是用這個關鍵字去搜尋喔‼️

## 預設環境變數 - `LINE_CLIENT_ID`、`LINE_CLIENT_SECRET`、`LINE_REDIRECT_URI`

設定三個目的是可以讓使用者只要在`環境變數`中引入這三個參數，SDK 預設就會去載入至 Instance 中，當然使用者也可以手動輸入指定自己定義的變數名稱。
😆
放在 class level 用意是若開發者在起 server 時已經放在環境變數中，則不需要每次在 instance level 時才去環境變數中取值，稍微增加點效率(~~根本無感~~)。

> 若對這部分不了解可以[參考這篇](https://www.digitalocean.com/community/tutorials/understanding-class-and-instance-variables-in-python-3)

# Markdown 轉 RestructuredText 的麻煩事 - 使用 m2r 套件

畢竟第一次寫，對於實際操作還不清楚， 在寫完第一版之後需要上傳，官方文件寫說 `long_description_content_type` 這個參數能設定 markdown 格式，但每每要上傳時都寫說不是 rst 格式不能上傳。

找了許久後找到 [m2r 這個套件](https://github.com/miyakogi/m2r)，好處是可以在程式裡面就直接幫忙轉格式，因為若額外寫一個檔案對我來說在管理上實在太不方便，因此用套件幫忙轉，藉由這樣的方式每次更新完後就不用擔心 README 的問題囉！下面的 code 則是使用的片段:

```python
try:
    from m2r import parse_from_file

    readme = parse_from_file(readme_file)
except ImportError:
    # m2r may not be installed in user environment
    with open(readme_file) as f:
        readme = f.read()

setup(
    ...
    long_description=readme,
    long_description_content_type="text/x-rst",
    ...
)
```

# 結論

雖然只是單純包裝 LINE Notify 並加上`測試`確保狀態，但在這過程中遇到`設計問題`、`文件格式`、`Mock`、`依賴套件分層`的各種問題，運用在前公司學到的以及參考 open source  中很多的設計理念，不知道之後還有沒有機會開發新的 python SDK，學個經驗未來有個參考的文章 😁
