---
title: '把 JSON 字串寫入記憶體中的暫時檔案並放路徑至環境變數中 | Python, FastAPI'
tags:
  - Python
  - GCP
  - Heroku
categories: Python
date: 2022-04-02 21:54:44
---



![](https://nijialin.com/images/common.jpeg)

# 為什麼寫這篇

- 失誤把 private key 推到 GitHub 上
  - 明明有加到 .gitignore 中
  - 但在剛建立 .git 時就一起 add 進去導致 key 都上去了
- 想要同一份 git 推到不同的 git 倉庫上(ex. GitHub + Heroku)
  - GitHub 不放 key
  - Heroku 需要 key 去訪問服務
  - 存檔案在 Heroku 中休眠後會移除，因此要動態寫在記憶體中

> 本次範例專案: [https://github.com/louis70109/Python-import-env-json-string](https://github.com/louis70109/Python-import-env-json-string)
<!-- more -->

# TL;DR

- 把 key 的 JSON 內容寫在環境變數中(e.g. export GOOGLE_KEY=xxxxxx)
- 建立一個`暫時檔案`在`記憶體`中
- 讀出環境變數寫進記憶體中的暫時檔案
- 把檔案路徑寫進環境變數中
- 執行 web app
- 用 try catch finally 來關閉記憶體檔案

# 介紹

以 Google Cloud Platform 為例子，有兩種方法可以訪問公有雲服務：

1. 用 gcloud + 一些設定方法來訪問(官方推薦)
2. 用 JSON 設定檔來訪問(線上服務使用)

但因為 git 要同時推到兩個環境，JSON key 不能存在 commit 中，因此要把 key 放在環境變數中。

而在下載的 JSON 在 import 進去`環境變數`時會是一個字串，因此先假設一個環境變數 key 名稱為 `SOME_KEY`

```
export SOME_KEY='{"a": "b"}'
```

此外，GCP 的在使用 JSON 都是去讀路徑的檔案，因此最後需要寫一個路徑到環境變數中，這邊命名範例 key 為 `SOME_KEY_PATH`

### Web app 啟動

在跑 Flask || FastAPI 等等的框架時都會有類似 `uvicorn.run(...)` 來啟動 web app，因此在之前要先把暫時檔案以及 JSON key 寫進記憶體中

這邊使用 `tempfile` 套件來建立，如下：

```python
import tempfile
if __name__ == "__main__":
    # 副檔名為 .json
    temp = tempfile.NamedTemporaryFile(suffix='.json')
    try:
        # 設定一個預設 JSON
        SOME_KEY = os.environ.get('SOME_KEY', '{}')
        # 寫進去檔案需要弄成 binary
        temp.write(SOME_KEY.encode())
        # 從第 0 個位置開始寫
        temp.seek(0)
        print(temp.read())
        print(temp.name)
        # 寫路徑位置到環境變數中
        os.environ['SOME_KEY_PATH'] = temp..name
        # 啟動服務
        uvicorn.run("main:app", host="0.0.0.0", port=8080, reload=True)
    finally:
        # 服務關掉才關閉檔案，不然會讀不到 key
        temp.close()
```

### 測試是否正常

因為 GCP 預設會讀取 `GOOGLE_APPLICATION_CREDENTIALS` 上面的路徑，因此在這 SOME_KEY_PATH 就是模仿 GCP 的使用，這邊建立 API：

```python
@app.get("/")
async def root():
    print('=' * 20)
    print(os.environ['SOME_KEY'])
    print(os.environ['SOME_KEY_PATH'])
    # 讀路徑檔案
    with open(os.environ['SOME_KEY_PATH']) as f:
        lines = f.read()
        print(lines)
        print(type(lines))
    return {"SOME_KEY": json.loads(lines)}
```

使用 curl 來呼叫測試 API:

```
curl localhost:8080

# /var/folders/80/gk9bv_____000gp/T/tmpd4b9rzzw.json
# {"a": "b"}
# <class 'str'>
```

# 結論

因為這次失誤讓我學到以後複製專案過來時推上去的東西第一個一定要是 `.gitignore`，絕對不能通通都加進去(git add .)，剛好也得知還有把 JSON string 放入環境變數的這種做法可以弄，同步把這次學到的東西寫下來來加深印象避免日後犯了一樣的錯誤ＱＱ。