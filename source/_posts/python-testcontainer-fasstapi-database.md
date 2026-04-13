---
title: >-
  【tetcontainer】使用 Python 在 Docker 中做資料庫的測試案例 | 來賓: PostgreSQL, Docker, Python,
  GitHub Actions
tags:
  - testcontainer
  - Container
  - Python
  - Docker
  - SQL
  - PostgreSQL
categories: Python
date: 2021-11-25 00:41:40
---



![](https://nijialin.com/images/2021/testcontainer.png)

# 前言

這一陣子許多同事除了在內部分享會中分享 Testcontainer 的技術，也有到 JCConf 2021 上分享 - [Integration testing with Testcontainers](https://jcconf.tw/2021/)，過往我在寫單元測試(Unit)時，時常都把資料庫的函式都直接擋住(Mock)，假裝他是成功的情況下往下走，但在一個 API 中資料庫往往是最容易在緊繃時掛掉，亦或是工程是手癢去改了某個欄位，讓整個服務瞬間炸掉，這些問題都是我們無法控制的部分...因此實際讓資料庫跑在測試時可以有個真的環境可以使用是很重要的一環，雖然看專案規模，測試時間有多有少有長有短，但放著一個 Container/VM 在那邊沒用就是很浪費啊，因此就有本次要介紹的 Test Container。

> 把 Test Container 分開寫比較懂他是幹嘛的，但在找資料時請以 testcontainer 去找才找得到喔！

Test Container 是一個 Java 的函式庫，支援 JUnit 來做測試，在跑測試時可以幫忙起個容器(Container)，並可以放上各式資料庫、Selenium 瀏覽器...等等可以放在 Docker 上面跑的內容，那 Test Container 很好的地方就是他也提供 Python 的解決方案([testcontainers/testcontainers-python](https://github.com/testcontainers/testcontainers-python))，讓我這個 Python 開發者可以有機會在 Docker 裡面很快地起一個 Container 來跑資料庫相關的整合測試，接下來就讓我娓娓道來我踩坑的過程 🖌️

- [Test Container 官網](https://www.testcontainers.org/)

> 有支援各種程式語言的函示庫喔，大家可以去挖挖看

<!-- more -->

# Test Container - Python

由於我開發時習慣使用 PostgreSQL 來當資料庫(其他的也沒問題)，首先先到官方文件上看一下[相關的內容](https://testcontainers-python.readthedocs.io/en/latest/database.html)，首先先安裝 Test Container 之後，接著提供了以下的做法開場

```
pip install testcontainers # 安裝套件 || 放入 requirements.txt
```

```python
with PostgresContainer("postgres:9.5") as postgres:
    e = sqlalchemy.create_engine(postgres.get_connection_url())
    result = e.execute("select version()")
```

## 整合進 Global 宣告的 FastAPI 中

> 以下程式來自我的 [Side Project](https://github.com/louis70109/WordsGame)

我的後端 API 啟動時會建立相關的 engine，把相關資料庫的東西都一起建立出來:

```python
@app.on_event("startup")
async def startup() -> None:
    SQLALCHEMY_DATABASE_URL = os.getenv('DATABASE_URI')
    engine = create_engine(SQLALCHEMY_DATABASE_URL)
    db.Base.metadata.create_all(bind=engine)
```

並同時會 reference 到以下的 Code: ([參考網址](https://github.com/louis70109/WordsGame/blob/master/fastapi-backend/main.py#L10))

```python
SQLALCHEMY_DATABASE_URL = os.getenv('DATABASE_URI')
engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
metadata = MetaData()
Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
```

這兩部分比較需要注意的就是 `create_engine` + `SessionLocal()`，這兩個攸關到資料庫連線的問題，接著把剛剛官網文件所提供的內容拿過來稍微改一下：

```python
with PostgresContainer("postgres:9.5").with_bind_ports(5432, 47000) as postgres:

    engine = create_engine(postgres.get_connection_url())
    TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
    Base.metadata.create_all(bind=engine)

    def override_get_db():
        try:
            db = TestingSessionLocal()
            yield db
        finally:
            db.close()

    app.dependency_overrides[get_db] = override_get_db

client = TestClient(app)

... Already override Database connection and session,

Do some API Testing here
```

> 詳細的測試 Code 在這邊 -> [彈幕遊戲](https://github.com/louis70109/WordsGame/blob/master/fastapi-backend/tests/test_main.py)

相信你看到上面一定是滿頭黑人問號，先看最後一段有個 `dependency_overrides`，意思就是要把 API 環境裡面我寫的 get_db 這個資料庫函式的內容給覆蓋過去(override)，最後在透過 `TestClient` 起一個 API Server 在測試的環境下呼叫 API 做使用。

接著就可以在之後來呼叫 API 來試試看到底有沒有真的進 Container

```python
response = client.get("/users/")
```

如果這邊你不太相信是不是有進 Docker，可以在這邊放上 `import time; time.sleep(10000)` 去卡時間並到 Docker Desktop Dashboard 去看是不是有一個你看不懂的 postgres 的 Container 被晾在那邊，在這個測試過後會把 Container 刪掉，不佔你空間有可以讓你做資料庫的真實測試是不是很棒啊。

# GitHub Actions

因為本次是使用 GitHub Actions 作為 CI 工具，因此使用前要[先進文件](https://docs.github.com/en/actions/using-github-hosted-runners/about-github-hosted-runners#preinstalled-software)看一下使用的 Ubuntu 20 版是否有支援在裡面使用 Docker 的功能。

其中遇到了以下的問題，環境上整個專案是 Frontend 為主，其中一個資料夾是後端程式(參考[我的彈幕遊戲專案](https://github.com/louis70109/WordsGame))

```
ERROR tests/test_main.py - AttributeError: 'NoneType' object has no attribute...
```

在本地端沒遇到這問題，而在線上遇到這個原因是，因為本地端跑時我已經有放一個 .env 的內容在那幫我預設放入資料庫的環境變數(`DATABASE_URI=postgresql://postgres:postgres@db/postgres`)，且因為我的資料庫是隨著 API 起來他就會初始化(init)，因此在這邊就沒辦法透過 `create_engine` 來建立資料庫連線。

因此這邊有兩個做法可以做：

- 在取環境變數時用 or 接一個資料庫預設的字串，如下：

```python
SQLALCHEMY_DATABASE_URL = os.getenv('DATABASE_URI') or 'postgresql://postgres:postgres@db/postgres'
```

- 另一個則是直接寫在 CI yaml 檔裡面，預設一個環境變數給 CI 環境：

```yaml
- name: CI
        env:
          DATABASE_URI: postgresql://postgres:postgres@db/postgres
```

> 再次呼籲：因為我的資料庫是 global 才需要這樣做，這邊就依照大家設定的環境不同而有所改變喔！

最後在 trigger 一次就成功啦！！

# 結論

後續還有許多還沒做好的部分：

- Container 起來時要預設塞資料，才能有 Query 相關的功能
- 測試的架構分精細一點
- with Function 再去讀一次
  - 因為這個不懂多花了很多時間
- 整合測試的撰寫

這次是一次很好的經驗來使用 Container 做資料庫相關的測試，有效的利用這個工具可以讓你的 API 交付出去時更有信心，且使用完也不佔空間，一舉兩得！

當然如果有任何問題歡迎留言，我會盡量在最短時間內回答你 ：）


<style>
  section.compact {
    font-size: 150%  
  }
  img[alt~="center"] {
    display: block;
    margin: 0 auto;
  }
</style>