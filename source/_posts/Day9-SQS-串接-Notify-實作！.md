---
title: Day9 - SQS 串接 Notify 實作！
tags:
  - AWS
  - SQS
  - LINE
  - Notify
  - IAM
categories: 2019鐵人賽
abbrlink: 3810543739
date: 2019-09-23 20:35:36
---

首先先建立一個`consumer/`資料夾，新增`__init__.py`以及`notify_handler.py`

在`notify_handler.py`輸入以下程式碼

```python=
import json
import requests


def line_notify_handler(event, context):
    print(event)
    body = json.loads(event['Records'][0]['body'])
    print(body)
    headers = {
        'Authorization': f"Bearer {body['token']}",
        'Content-Type': 'application/x-www-form-urlencoded'
    }
    r = requests.post('https://notify-api.line.me/api/notify',
                      headers=headers,
                      data={'message': body['message']})
    print(r)

# AWS record sample
# {'Records': [{'messageId': 'fddc42ba-a122-4581-965e-d0144ac8a5ad', 'receiptHandle': 'AQEBjO32gY5pXOfOrmDR0hD4k1av9KyjbHFpc+rIBPV2Brif7Lo+jqnGevSjfFwlICyGf+BhWwKaxFw8XdB3QTzRbw0vnLURjnQeDSBrJHa/S57SRs9TOLRBq38maycAVg69iZbetg9VhLMBCcLtOtPHTzKkmo+/Sosm51WA5CzXK7A0rteikx6nxS1CUIpq6MAujodupP0Hgr5RjK5nH/nmxA4Db0leWEmLokalZbtlx4W14tp7PZxPOrQOLDaGrH//p4h32tY8IN3MkCqi+gyNT7kCU4KwCGOIrybb07ZWyKBTKw+KOMNr/Ykj4z2N1qxIvTM55UY9d8V29YsH32OjrZTei5P7Nke/51E2tWkmkqoFAlqzxDjQPvpP+Pvvr8aazeeZ6opkr59UefAiiyM71Q==', 'body': 'hi', 'attributes': {'ApproximateReceiveCount': '9', 'SentTimestamp': '1566621263072', 'SenderId': '901588721449', 'ApproximateFirstReceiveTimestamp': '1566621263072'}, 'messageAttributes': {}, 'md5OfBody': '49f68a5c8493ec2c0bf489821c21fc3b', 'eventSource': 'aws:sqs', 'eventSourceARN': 'arn:aws:sqs:us-east-1:901588721449:LINE_notify_consumer', 'awsRegion': 'us-east-1'}]}
```

接著在`requirements.txt`加入`boto3`，他是一個使用 python 介接 AWS 的套件

```
boto3==1.9.189
```

加入`SQS_URL`以及`SQS_ARN`到`.env`裡面

```
SQS_URL=sqs url
SQS_ARN=your sqs arn
```

add controller/notify_sqs_controller.py

```python=
from flask_restful import Resource, reqparse
import json
from lib.db import Database
import psycopg2.extras
import os
import boto3


def send_message(url, attr, body, delay=0):
    cli.send_message(
        QueueUrl=url,
        DelaySeconds=0,
        MessageAttributes=attr,
        MessageBody=body,
    )


class SendNotifyBySQSController(Resource):
    cli = boto3.client("sqs", region_name=os.environ("region"))

    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument(
            'message', required=True, help='message can not be blank!')
        args = parser.parse_args()
        msg = args['message']
        with Database() as db, db.connect() as conn:
            with conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor) as cur:
                cur.execute(
                    f"SELECT token FROM notify")
                fetch = cur.fetchall()
        for f in fetch:
            body = {
                'token': f"Bearer {f['token']}",
                'message': f"Hello everyone, {msg}"
            }
            cli.send_message(
                QueueUrl=os.environ("SQS_URL"),
                DelaySeconds=0,
                MessageAttributes={},
                MessageBody=json.dumps(body),
            )
        return {'result': 'ok'}, 200
```

程式寫完了就是要加一條路由`/notify/sqs`

```
from controller.notify_sqs_controller import SendNotifyBySQSController
api.add_resource(SendNotifyBySQSController, '/notify/sqs')
```

接著透過`wsgi`在本地起一個 server

```
sls wsgi serve
```

再搭配 postman 來做測試，測試內容如下

```
{
  "message": "test Content"
}
```

接著透過`sls deploy`部署上會遇到一個問題，會有 Access Denied，所以要在`serverless.yml`加入 IAM role 的設定

add iam in provider

```yaml=
iamRoleStatements:
  - Effect: Allow
    Action:
      - sqs:SendMessage
    Resource:
      - ${env:SQS_ARN}
```

## 測試

![](https://i.imgur.com/5FViVEk.png)
![](https://i.imgur.com/Xg70nDp.png)

## 結論

使用 SQS 這類服務都會需要透過`boto3`來幫忙串接，最需要注意的就是 IAM role，因為在本地端的 key 通常權限都是最大的，但上到 AWS 上就會有權限的問題，所以要記得加入 IAM 哦！

Code is [here](https://github.com/louis70109/aws-python-line-api/blob/master/controller/notify_sqs_controller.py)

專案也會持續更新，更多詳情可以 follow 我的專案 [aws-python-line-api](https://github.com/louis70109/aws-python-line-api)。
