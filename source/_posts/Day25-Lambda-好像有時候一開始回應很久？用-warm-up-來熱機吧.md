---
title: Day25 - Lambda 好像有時候一開始回應很久？用 warm-up 來熱機吧
tags:
  - Serverless
  - warm-up
  - Lambda
categories: 2019鐵人賽
abbrlink: 298345294
date: 2019-10-09 21:04:36
---

## 前言

本篇會介紹 npm 套件庫裡的 [Serverless-plugin-warmup](https://www.npmjs.com/package/serverless-plugin-warmup)，裡面介紹了很多參數可以使用，以下會簡介如何引入它。

## 實作

透過`npm`來安裝套件

```bash
npm install --save-dev serverless-plugin-warmup
```

在`serverless.yml`的`plugin`加入套件

```yaml
plugins:
  - serverless-plugin-warmup
```

在`custom`加入`warm up`的設定參數

```yaml
custom:
  warmup:
    enabled: true
    cleanFolder: false
    memorySize: 128
    name: "LINE-warmup-pop"
    events:
      - schedule: "cron(0/5 0-12 ? * MON-FRI *)"
    timeout: 10
```

`.gitignore`加入以下兩個`_warmup/`以及`.requirements.zip`，他在部署前建立一個`_warp`的資料夾並放一個 Lambda 來打已建立的 api 以及 Lambda 們，部署後會建立`.requirements.zip`，所以這邊就加入這兩行來防止被 git 推上去。

> 或許會有疑問不是`cleanFolder`設定 true 就可以，這邊我自己實測時在部署會因為 Size 過大而無法上傳，把這參數設定掉他才會乖乖的上傳成功，但這部分有待驗證。

## 加入 decorator

這邊我在`lib/`下新增一個`decorator.py`，加入以下的 code

```python
from functools import wraps
from logging import Logger

def lambda_warm_up(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        source = args[0].get('source')
        if (source == 'serverless-plugin-warmup'):
            Logger.info('WarmUp - Lambda is warm!')
            return {}
        return func(*args, **kwargs)
    return wrapper
```

主要功能是透過 python decorator 的特性讓我們在 function 之前用個前綴符號就可以引用它，很像 po 文在 tag 別人一樣 🤣
warm-up 建立的 Lambda 會固定對其他的 Lambda 打`serverless-plugin-warmup`的字串，這邊就寫個判斷式判斷掉後直接 return

你以為這樣就結束了？還有 IAM role 的問題呢，詳細問題已不可考，想試看看的可以把 IAM 拔掉再部署一次，問題就會出現了，以下為設定檔：

```yaml
iamRoleStatements:
  - Effect: "Allow"
    Action:
      - "lambda:InvokeFunction"
    Resource:
      - Fn::Join:
          - ":"
          - - arn:aws:lambda
            - Ref: AWS::Region
            - Ref: AWS::AccountId
            - function:*
```

如果你的目錄結構跟我一樣，或是跟到今天的實作，加入以下的 code，這邊主要是告訴你的 Lambda 要在每次的 warm-up 字串來的時候呼叫這個 decorator 來幫忙處理一下

```python
from lib.decorator import lambda_warm_up

@lambda_warm_up
def xxx():
    pass
```

我的 Lambda 都加了，那原本的 flask 建立的 api 我要加在哪？

看看這個[網址](https://github.com/logandk/serverless-wsgi/blob/3a2d1312370a4f4351be60f5fbe838124db1916a/serverless_wsgi.py#L87)，serverless-wsgi 在實作的時候已經有考慮到這件事了，所以 api 這邊就不用管他，他自己會去把它處理掉！
![](https://i.imgur.com/skMkdmg.png)

## 結論

Warm-up 的機制就是透過建立一個 Lambda 來打一個 flag 到其他 Lambda 來他們別進入睡眠模式，但總是會有人考慮費用的問題，可以參考下圖，若是你建立了一個簡單的服務然後上線了，AWS 給你了一百萬個請求的量，我覺得一個月的請求可以到 100 萬應該是服務有點規模的情況，一個月能到這個量相信你也有一定的能力養它 🤣，爾後每一百萬個請求才六塊台幣，可能比 GCP 還貴，但其實以我來說這樣已經很夠用，而且還扛得住
![](https://i.imgur.com/LCJh98n.png)

## 參考

[serverless-wsgi Warm-up code](https://github.com/logandk/serverless-wsgi/blob/3a2d1312370a4f4351be60f5fbe838124db1916a/serverless_wsgi.py#L87)
[Serverless-plugin-warmup](https://www.npmjs.com/package/serverless-plugin-warmup)
