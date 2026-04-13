---
title: Day18 - 在 Serverless 上設定個排程來發送空氣污染檢測吧
tags:
  - Serverless
  - Lambda
  - LINE
  - Schedule
categories: 2019鐵人賽
abbrlink: 4233874228
date: 2019-10-02 20:55:35
---

## 前言

過往寫了這麼多的 api，總是會有特定的功能會需要輪詢資料庫或是監聽某些事件，以前還要到弄個虛擬機寫腳本用 crontab，這時候 Lambda 的用處就來啦！不只可以處理 api 的事情，還可以設定排程做事，太舒服啦，以下就來介紹一下～

## 實作

首先在 `consumer` 資料夾下`line_bot_alert.py`，再寫一段需要定時跑的程式，這邊我去抓中央氣象局的資料，大概簡單判斷一下區域以及算出他的範圍：

```python
import json
import requests

def alert_handler(event, context):
    air = requests.get(
        'http://opendata.epa.gov.tw/webapi/Data/REWIQA/?$orderby=SiteName&$skip=0&$top=1000&format=json')
    air_body = json.loads(air.text)
    air_status = ["良好",	"普通",	"對敏感族群不健康",	"對所有族群不健康",	"非常不健康",	"危害", "資料有誤"]
    total, count = 0, 0
    for fetch in air_body:
        if (fetch['County'] == "臺中市" and (fetch['SiteName'] == "西屯" or fetch['SiteName'] == "沙鹿")):
            count += 1
            if fetch['AQI'] != 0:
                total = total + int(fetch['AQI'])
    switch = 0
    pm = int(total / count)
    print(pm)
    if pm in range(0, 50):
        switch = 0
    elif pm in range(51, 100):
        switch = 1
    elif pm in range(101, 150):
        switch = 2
    elif pm in range(151, 200):
        switch = 3
    elif pm in range(201, 250):
        switch = 4
    elif pm in range(251, 300):
        switch = 5
    else:
        switch = 6
    payload = f"\n空氣品質: {air_status[switch]}"
    r = requests.post('https://1uv2o723o4.execute-api.us-east-1.amazonaws.com/dev/notify/sqs',
                      data={'message': payload})
    print(r)
```

在`serverless.yml`的 function 下面加入 Lambda，handler 就是 `資料夾/檔案.類別`，設定事件(event)排程一分鐘一次

```yaml
function:
  line_bot_alert:
    handler: consumer/line_bot_alert_handler.alert_handler
    events:
      - schedule: rate(1 minute)
```

> AWS Lambda 有兩種設定排程的方法，`rate`以及`cron`，若是比較固定時建議用`rate`，比較複雜的排程就可以讓`cron`來，下面兩張圖分別是來自 [AWS](https://docs.aws.amazon.com/zh_tw/lambda/latest/dg/tutorial-scheduled-events-schedule-expressions.html) > ![](https://i.imgur.com/r9ZaBhO.png)

---

![](https://i.imgur.com/BLrbUPP.png)

下`sls deploy`部署之後就會看到剛剛做`line_bot_alert`的`function`，他每分鐘都在跑，若玩完之後不想用了可以下`sls remove`把上面有的東西刪掉嚕！
![](https://i.imgur.com/0tpDSdf.png)

## 結論

其實還有很多應用可以實作排程，像是有朋友就用 GCP 的來定時發文 🤣，而且可以把腳本寫得像是 api 一樣，讓整個靈活性都增加了不少，下一篇就帶大家來做 LINE Login 嚕！

## 參考

[AWS document](https://docs.aws.amazon.com/zh_tw/lambda/latest/dg/tutorial-scheduled-events-schedule-expressions.html)
