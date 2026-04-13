---
title: 【AWS】使用 API Gateway Authorizer 做使用者驗證 feat. Serverless
tags:
  - AWS
  - Serverless
  - API Gateway
  - Authorizer
  - Python
  - Amazon Web Service
  - JWT
categories: Serverless
abbrlink: 3960684583
date: 2020-04-19 02:38:29
---

![API Gateway Lambda authorization workflow](https://i.imgur.com/0QAGPDc.png)

# 前言

在 AWS 的 API gateway 上就有一個項目(`Authorizer`)是支援 Cognito 以及客制認證的方法，好處就是在進我們寫的 API 之前有個可以做**身份確認**的 Lambda Function 幫我們好前處理，而本篇則會介紹如何在 Serverless framework 上設定 API gateway 的 Authorizer 以及成功讓 API 回應，串接 Cognito 做使用部分就留給之後吧！

#### 👉 本篇的範例全都在 [GitHub](https://github.com/louis70109/aws-serverless-authorizer)

<!-- more -->

# API Gateway - Authorizer

- [官方文件](https://docs.aws.amazon.com/apigateway/latest/developerguide/apigateway-use-lambda-authorizer.html)

擁有 Authorizer 的一個 Serverless 服務會長這樣:

> User Request - [Authorizer] - API - Response user

好處除了前言所提到的前處理外，還有如果設定是 `Edge` 模式 (不是透過 `region` 從網路層傳) 的話其實在認證完後傳到 API 時速度是很快的。

以下就開始好好的介紹它 😆

## 實際的位置

如果在這邊設定覺得不知道在哪邊的話可以參考 - [純手動用法官方教學](https://docs.aws.amazon.com/apigateway/latest/developerguide/)

中文的話左邊名為`授權方`，英文則是`Authorizer`
![API Gateway Authorizer](https://i.imgur.com/v2vflgw.png)

## Serverless 實作

### Yaml settings

原始如果串接 python WSGI 的話設定檔應該會長得如下:

```yaml
functions:
  api:
    handler: wsgi_handler.handler
    events:
      - http: ANY /
      - http: ANY {proxy+}
```

設定 Authorizer Lambda function，先在跟 `api` 同層加上 `Authorizer` Lambda，指定 handler 為 `handler 資料夾`下的 `authorizer.py` 的 `auth_handler` function，並且設定 `cors` 為 true，避免呼叫 api 時被 AWS 擋下來無法使用。

接著在把 `events` 裡的兩個事件加上 `authorizer` 的 Function，名為 `ResourceAuthorizer`，改編過後入下:

```yaml
functions:
  api:
    handler: wsgi_handler.handler
    events:
      - http:
          path: /
          method: ANY
          authorizer: ResourceAuthorizer
      - http:
          path: /{proxy+}
          method: ANY
          authorizer: ResourceAuthorizer
  ResourceAuthorizer:
    handler: handler/authorizer.auth_handler
    cors: true
```

- 這部分參考來自 [Serverless docs](https://serverless.com/framework/docs/providers/aws/events/apigateway/#http-endpoints-with-custom-authorizers)

> 只要透過簡單的設定 function 就可以互相溝通是不是很像 docker compose 呀 😏

## 處理 Lambda function handler

[參考並複製官方的範例程式](https://github.com/awslabs/aws-apigateway-lambda-authorizer-blueprints/blob/master/blueprints/python/api-gateway-authorizer-python.py#L15)會看到我的開頭要從 `event` 取得 token:

```python
event_token = event.get('authorizationToken')
```

> 🐛🐛 這裡雖然是取 `authorizationToken`，不過呼叫 api 時 header 是要帶 `Authorization`，如此一來 Api gateway 才會收到對的值，這邊是需要注意 AWS 比較不一樣的地方！
> [參考支援在這啦 QQ](https://github.com/awslabs/aws-apigateway-lambda-authorizer-blueprints/blob/master/blueprints/python/api-gateway-authorizer-python.py#L17)

取得 token 後一般就會做身份驗證的部分，以我的例子來說我就是解 JWT 下來做驗證，這邊為了 Demo 就先不處理它。

## 產生 Auth Policy

官方提供的範例版本是 Node.js[[參考資料](https://docs.aws.amazon.com/apigateway/latest/developerguide/apigateway-use-lambda-authorizer.html#api-gateway-lambda-authorizer-request-lambda-function-create)]，但畢竟我們是用 python 看著 javascript 我怎麼用啊！！

因此查了一番找到了範例: [aws-apigateway-lambda-authorizer-blueprints](https://github.com/awslabs/aws-apigateway-lambda-authorizer-blueprints)，只是說沒有任何文件使用起來只能靠本能了 😭，這邊他很佛心的提供 `dotnet`、`golang`、`python`、`java`、`node.js`以及 `rust` 的範例，基本上常在 Serverless 上跑的語言都有了，就只好放過它一馬了 😇

基本上從官方的範例終止需要改寫成像[我專案這樣](https://github.com/louis70109/aws-serverless-authorizer/blob/master/handler/authorizer.py)只要注意 `auth_handler` 裡面的內容需要填什麼即可。

其他需要注意的就如[第 25 行的 policy](https://github.com/louis70109/aws-serverless-authorizer/blob/master/handler/authorizer.py#L25)以及 [28 行的 build policy](https://github.com/louis70109/aws-serverless-authorizer/blob/master/handler/authorizer.py#L28)所產出的東西需要確認清楚才行:

```python
policy.allowAllMethods()

# Finally, build the policy
authResponse = policy.build()
```

而下面的 class code 就可以先忽略不管，因為那些官方是為了產生出 Authorizer 回應狀態 pattern 所使用的 code，即便我們去改也出不了什麼作用:

```python
class HttpVerb:
    GET = "GET"
    ...

class AuthPolicy(object):
    awsAccountId = ""
    ...
```

## Lambda 回應狀態

Authorizer 認證成功之後 Lambda 會回傳給 API Gateway 的 pattern：

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "execute-api:Invoke",
      "Effect": "Allow",
      "Resource": "arn:aws:execute-api:us-east-1:123456789012:ivdtdhp7b5/ESTestInvoke-stage/GET/"
    }
  ]
}
```

認證失敗回傳的樣子:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "execute-api:Invoke",
      "Effect": "Deny",
      "Resource": "arn:aws:execute-api:us-east-1:123456789012:ivdtdhp7b5/ESTestInvoke-stage/GET/"
    }
  ]
}
```

> 這些都會是透過 AuthPolicy 來產生的，直接對 Function return value 是部會作用的。

# 使用心得 (踩坑)

- Header 收的名稱是 `Authorization`，但程式是收`authorizationToken`，[參考]()。
- 只能 raise Exception('Unauthorized')，多一字少一字都不行，真的很奇怪，[參考](https://github.com/awslabs/aws-apigateway-lambda-authorizer-blueprints/blob/master/blueprints/python/api-gateway-authorizer-python.py#L29)。
- 好不容易找到的範例預設是會先 `deny` 掉使用者，但這在測行為會很困擾，[官方範例 code](https://github.com/awslabs/aws-apigateway-lambda-authorizer-blueprints/blob/master/blueprints/python/api-gateway-authorizer-python.py#L52)。

# 結論

以往都要使用框架(Flask, Django...)裡提供的功能實作 middleware 來做處理，但若使用像 AWS、Google、Azure 他們 Serverless 服務的話不妨使用 Authorizer 來做驗證，除了認證使用者以外還可以藉由這些 Function Service 來降低 API 的負載，讓它們可以更專心地處理後端邏輯的問題。

> 如果真的很想知道 Authorizer 的行為機制的話可以看看這篇官方文件 - [使用 postman 去測試 authorizer](https://docs.aws.amazon.com/apigateway/latest/developerguide/call-api-with-api-gateway-lambda-authorization.html)

# 參考

- [純手動用法官方教學](https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-create-api-from-example.html)
- [AWS Authorizer Official Document](https://docs.aws.amazon.com/apigateway/latest/developerguide/apigateway-use-lambda-authorizer.html)
- [使用 postman 去測試 authorizer](https://docs.aws.amazon.com/apigateway/latest/developerguide/call-api-with-api-gateway-lambda-authorization.html)

- [範例 aws-apigateway-lambda-authorizer-blueprints](https://github.com/awslabs/aws-apigateway-lambda-authorizer-blueprints)

- [Serverless Docs settings](https://serverless.com/framework/docs/providers/aws/events/apigateway#http-endpoints-with-custom-authorizers)
