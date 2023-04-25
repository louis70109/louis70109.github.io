---
title: 初見 FastAPI (From Flask to FastAPI)
tags:
  - Python
  - FastAPI
  - Flask
  - Framework
categories: Python
date: 2021-04-18 22:42:16
---

<style>
  section.compact {
    font-size: 150%  
  }
  img[alt~="center"] {
    display: block;
    margin: 0 auto;
  }
</style>

![](https://camo.githubusercontent.com/86d9ca3437f5034da052cf0fd398299292aab0e4479b58c20f2fc37dd8ccbe05/68747470733a2f2f666173746170692e7469616e676f6c6f2e636f6d2f696d672f6c6f676f2d6d617267696e2f6c6f676f2d7465616c2e706e67)

# 前言

雖然現在網路越來越快，每個**同步**(Synchronize)的 request 處理速度都很快，但用**非同步**(Asynchronous)不僅可以同時處理較多 request，也不會被前面那個 request 拖時間導致後面排隊的 request 不用做事，各走各的路，出事自己負責(咦？)，雖然非同步有其他也要探討的問題，但這裡就先不討論這個～

# FastAPI 使用起來有什麼感覺呢？

- 適用於 Python 3.6 (含)以上的版本
  - 3.6 為目前 line-bot-sdk-python 最多人使用的版本
- 支援**非同步**，藉由 [Asyncio](https://docs.python.org/3/library/asyncio.html)
- Pydantic 做型別檢查 (超讚)
  - 效能不錯，可以[參考這](https://pydantic-docs.helpmanual.io/benchmarks/)
- 寫起來跟 Flask 很像，無痛上手
- **Production Ready**，這很重要，若文件上沒這個使用要多注意，隨時可能會翻船？
- 寫一個 API 自動建一個 Swagger 文件，API 文件一起達成！
  - 可以使用 OpenAPI generator 來產生套件給其他語言使用者介接

<!-- more -->

# 範例

```python
import uvicorn
from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def root():
    return {"message": "Hello World!"}

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=5000, reload=True)
```

跟 Flask 很像，上述範例看起來改最多的就是把 Flask() 改成 **FastAPI()** 來開 API，非常的快速。

FastAPI 推薦使用 [Uvicorn](https://www.uvicorn.org/) 作為跑服務的工具，它支援 [ASGI](https://asgi.readthedocs.io/en/latest/specs/main.html)，負責跑非同步相關的 Python 應用程式。

- [Uvicorn](https://www.uvicorn.org/) 可支援 HTTP/1.1 以及 WebSockets，但 HTTP/2.0 **還不支援**。
- 基於 [Starlette](https://github.com/encode/starlette) 實作的框架。
- 如果你的 Python app 有很大的吞吐量(throughput)，可以搭配 gunicorn 使用。([參考 startlette 的 Performance](https://github.com/encode/starlette#performance))

> WSGI 是單一且同步的介面，不適合有 long-lived connection 的場景，如 long-polling HTTP 或 Websocket。([參考](https://asgi.readthedocs.io/en/latest/introduction.html#what-s-wrong-with-wsgi))

# 引入函式庫

由於 Python 各個版本的用戶居多 2.7~3.9，因此許多函式庫都還是以同步的方式去寫，才能向下相容，這邊我就使用 [line-bot-sdk-python](https://github.com/line/line-bot-sdk-python) 作為本次引入的範例。

因為標題是從 Flask 切到 FastAPI，這邊就使用 LINE 官方的 [Flask 範例](https://github.com/line/line-bot-sdk-python/blob/master/examples/flask-echo/app_with_handler.py)。

首先看到第 46 行的部分，一開始要先處理這裡

```python
@app.route("/callback", methods=['POST'])
def callback():
    # get X-Line-Signature header value
    signature = request.headers['X-Line-Signature']

    # get request body as text
    body = request.get_data(as_text=True)
    app.logger.info("Request body: " + body)

    # handle webhook body
    try:
        handler.handle(body, signature)
    except InvalidSignatureError:
        abort(400)

    return 'OK'
```

首先先分析一下需要處理的部分：

- 有個 Header 參數 **X-Line-Signature**
- 透過 POST 取得裡面的資料，它不是 JSON
- Handler 處理事件，把他分送到相對應的 Event 中(文字、貼圖、影片...)

解答[在這邊](https://github.com/louis70109/fastapi-line-bot-example/blob/master/routers/webhooks.py)，但我還是貼一下程式碼來解釋這部分：

```python
@router.post("/line")
async def callback(request: Request, x_line_signature: str = Header(None)):
    body = await request.body()
    try:
        handler.handle(body.decode("utf-8"), x_line_signature)
    except InvalidSignatureError:
        raise HTTPException(status_code=400, detail="chatbot handle body error.")
    return 'OK'
```

- router 是因為我預期我會有多個 API，因此先劃分資料夾，使用方法[參考](https://fastapi.tiangolo.com/tutorial/bigger-applications/)
- request 的型別則是 FastAPI 接進來時所定義的格式，**x_line_signature** 等於 **X-Line-Signature**，只是因為在 Python 裡的寫法而變成底線式的寫法，後面需用 `Header()` 的 Class 把它轉成 FastAPI 看得懂的東西
- body 接到 LINE Server 資料時裡面的東西是沒有 decode，因此加入 **decode('UTF-8')** 來處理資料

> [2021/04/19 更新] Request 型別 decode 問題

以下是 Request 型別裡的所呼叫的 function，由於它最後是使用 二進制(Binary)，因此要使用 `decode('UTF-8')` 的方式解回來。

```python
async def body(self) -> bytes:
    if not hasattr(self, "_body"):
        chunks = []
        async for chunk in self.stream():
            chunks.append(chunk)
        self._body = b"".join(chunks)
    return self._body
```

看完是不是很想也開始著手了呢 🎉，文件通通看起來！

## [路由 Router](<(https://fastapi.tiangolo.com/tutorial/bigger-applications/)>)

在上面的範例中有提到 router，這邊要提醒各位就是一定要在資料夾中加入 \_\_init\_\_.py 這個空檔案，在 Python 3 後倡導不需要這個東西，我們就很容易忽略這個傢伙！在 FastAPI 這是依靠他去找到對應的檔案，因此一定要先加上它，避免未來踩到雷。

下方為官方的範例改寫，路徑大致如下：

```
...
├── main.py
├── requirements.txt
├── routers
│   ├── __init__.py
│   └── items.py
```

只要在 main.py 裡面使用 `app.include_router(items.router)` 引入 items.py 的 router 變數即可，下面網址則為 `http://DOMAIN/items/campaign`

```python
router = APIRouter(
    prefix="/items",
    tags=["items"],
)

@router.get("/campaign")
async def read_items():
    return "HI"
```

# 結論

以上是我最近玩 FastAPI 的紀錄，建立了兩個官方範例的 repo，預計接下來再放個有 PostgreSQL 的版本，這樣子未來在開發時就可以比較快速開工了～ 😁

- [fastapi-example](https://github.com/louis70109/fastapi-example)
- [fastapi-line-bot-example](https://github.com/louis70109/fastapi-line-bot-example)
