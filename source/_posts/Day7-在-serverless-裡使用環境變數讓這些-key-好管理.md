---
title: Day7 - 在 serverless 裡使用環境變數讓這些 key 好管理
tags:
  - Serverless
  - dotenv
categories: 2019鐵人賽
abbrlink: 2061415749
date: 2019-09-21 20:33:28
---

## 前言

看著前幾天的文章，像我們 notify 驗證的 API 有使用到 `REDIRECT_URI`、`CLIENT_ID` 以及 `CLIENT_SECRET`，或是像 PostgreSQL 的帳號密碼，
只是說若今天當程式碼變多的時候，抑或是這個參數有給其他 API 使用，那在尋找的時候不僅費工又浪費時間
那接下來就帶著大家在 serverless.yml 一步步加入變數值，並更改 code。

## 動手吧！

用 npm 安裝 serverless 的 `dotenv` 套件

```
npm i -D serverless-dotenv-plugin
```

接著加入新的套件到`serverless.yml`

```
plugins:
  - serverless-dotenv-plugin
```

新增`dotenv`到 requirements.txt

```
python-dotenv==0.10.3
```

到 api.py 加入下面內容

```
from dotenv import load_dotenv
env_path = Path('.') / '.env'
load_dotenv(dotenv_path=env_path)
```

接著新增`.env`並輸入對應的內容

```
NOTIFY_REDIRECT_URI=
NOTIFY_CLIENT_ID=
NOTIFY_CLIENT_SECRET=
REGION=us-east-2
SQS_URL=
SQS_ARN=
PG_DB=
PG_HOST=
PG_NAME=
PG_PWD=
PG_PORT=
```

接著修改有使用到他們的地方，範例如下

```
import os
os.getenv("SQS_ARN")
```

既然有安裝 serverless 的套件了，那 yml 檔也可以使用哦！

```
provider:
  name: aws
  runtime: python3.7
  region: ${env:REGION}
```

## 後記

有時候把專案抓下來的時候要找到這些輸入的地方很容易找不到(我有點癡呆)，一般 open source 也都會有一個`.env`的，用`serverless-dotenv-plugin`來幫忙弄就方便許多了，後續有需要再繼續往裡面新增就好了～

最後在搭配 python 的 [dot env 套件](https://serverless.com/plugins/serverless-dotenv-plugin/)使用就讓整個好用多了 🤣，只是說 html 因為目前還不是透過 serverless 來幫忙部署，所以這邊的參數就沒辦法吃設定檔了 😓

## 參考

[os.environ](https://stackoverflow.com/questions/4906977/how-to-access-environment-variable-values)
[env setting](https://serverless.com/framework/docs/providers/aws/guide/variables/)
