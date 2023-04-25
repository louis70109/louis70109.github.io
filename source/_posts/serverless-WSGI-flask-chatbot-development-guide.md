---
title: 續篇 — serverless + WSGI + flask + chatbot 的開發指南
tags:
  - Serverless
  - LINE
  - AWS
categories: Serverless
abbrlink: 895426056
date: 2019-11-02 13:04:28
---

# 前言

如果還不知道 Serverless (以下簡稱 sls )的朋友可以先看我[上篇文章](https://nijialin.com/2019/10/31/%E4%BD%BF%E7%94%A8-Serverless-Line-Message-API-%E5%9C%A8-AWS-%E4%B8%8A%E6%89%93%E9%80%A0%E4%B8%80%E5%80%8B-Echo-bot/)，裡頭有介紹 [Python](https://github.com/louis70109/aws-line-echo-bot) 以及 [Ruby](https://github.com/louis70109/aws-ruby-line-echo-bot) 的範例。
還沒接觸 Serverless 之前，當開發完一包程式時就將它部署至 Heroku，實在是有夠方便又快速(還是免費的)。不過有個問題是當程式沒在運行時他會睡覺，身為一個免費仔做的小專案這樣是夠的，做為一個貪心的免費仔怎能容許睡覺睡這麼久 🤤！但若是照著我上篇分享的文章做，佈署程式沒問題，但就開發機器人我都要佈署才能測試，這未免也太不人性了 😒。<!-- more -->
既然上次都用 Python 來寫了，為了解決這個問題，本篇會介紹如何在 Serverless 上導入 WSGI & Flask，讓我們再開發時不僅可以在本地端 auto-reload，也可以搭配 ngrok 讓 chatbot wehook 能夠打過來做測試。

<div class="tenor-gif-embed" data-postid="14472399" data-share-method="host" data-width="100%" data-aspect-ratio="2.2232142857142856"><a href="https://tenor.com/view/minions-amazing-cheer-yes-excited-gif-14472399">Minions Amazing GIF</a> from <a href="https://tenor.com/search/minions-gifs">Minions GIFs</a></div><script type="text/javascript" async src="https://tenor.com/embed.js"></script>

> 順便慶祝一下 python 以及 ruby 的兩個範例都過 Serverless 的 PR 了 ✌️

![](https://i.imgur.com/PVcuACel.png)
![](https://i.imgur.com/RmqPM0bl.png)

# 實作

這次的主題是延續上次的文章，過程中若有像是 AWS key 之類的問題可以回顧一下～

- [使用 Serverless & LINE Message API 在 AWS 上打造一個 Echo bot](https://nijialin.com/2019/10/31/%E4%BD%BF%E7%94%A8-Serverless-Line-Message-API-%E5%9C%A8-AWS-%E4%B8%8A%E6%89%93%E9%80%A0%E4%B8%80%E5%80%8B-Echo-bot/)
- [aws-line-echo-bot](https://github.com/louis70109/aws-line-echo-bot?source=post_page-----f11de7dee7aa----------------------)

首先先透過 sls 至 Github 將 Python 範例抓下來並建專案。

```bash
$ serverless install --url https://github.com/louis70109/aws-line-echo-bot -n <YOUR_FILE_NAME>
$ cd <YOUR_FILE_NAME>
```

接著參考 [官方文件](https://serverless.com/plugins/serverless-wsgi/) 上的實例，引入 WSGI & requirements Plugin。

```bash
$ sls plugin install -n serverless-wsgi
$ sls plugin install -n serverless-python-requirements
```

接著加入 Flask 以及 line-bot-sdk 的相依套件版本(寫這篇時是使用 Flask 1.0.2 以及 line-bot-sdk 1.12.1)

```bash
$ echo “Flask==1.0.2\nline-bot-sdk==1.12.1” > requirements.txt
$ pip install -r requirements.txt -—user
```

置換以下內容至 serverless.yml，讓 WSGI 去處理路由。

```yaml
service: <YOUR_FILE_NAME>
provider:
  name: aws
  runtime: python3.7
functions:
  api:
    handler: wsgi_handler.handler
    events:
      - http: ANY /
      - http: ANY {proxy+}
custom:
  wsgi:
    app: api.app
plugins:
  - serverless-python-requirements
  - serverless-wsgi
```

新增 api.py 並加入以下內容 (記得要換 chatbot token 哦！)

```python
from flask import Flask, request, abort
import json
from linebot import (
    LineBotApi, WebhookHandler
)
from linebot.exceptions import (
    InvalidSignatureError
)
from linebot.models import (
    MessageEvent, TextMessage, TextSendMessage,
)

app = Flask(__name__)

@app.route("/webhook", methods=['POST'])
def webhook():
    line_bot_api = LineBotApi('YOUR_CHANNEL_TOKEN')
    handler = WebhookHandler('YOUR_CNANNEL_SECRET_KEY')

    # get X-Line-Signature header value
    signature = request.headers['X-Line-Signature']

    body = request.get_data(as_text=True)
    event = json.loads(body)
    print(event)
    try:
        handler.handle(body, signature)
    except InvalidSignatureError:
        print(
            "Invalid signature. Please check your channel access token/channel secret.")
        abort(400)

    token = event['events'][0]['replyToken']
    if token == "00000000000000000000000000000000":
        pass
    else:
        line_bot_api.reply_message(token, TextSendMessage(
            text=event['events'][0]['message']['text']))
    return 'OK'

if __name__ == '__main__':
    app.run(debug=True)
```

接著就透過 WSGI 起一個 local server(預設 port 為 5000)

```bash
$ sls wsgi serve
```

![](https://i.imgur.com/zVY6YYB.png)

並加上 ngrok 並指定用 5000 port

```bash
$ ./ngrok http 5000
```

![](https://i.imgur.com/K40h9e8.png)

將 ngrok 產生的網址貼進 webhook 欄位並加上 /wehbook 。
(註: 透過 sls 起的 local server 並不會有 /dev 或是 /prod 開頭的網址哦！)
![](https://i.imgur.com/0BzEsP1.png)

若測試流程都順利的話，最後就是 Deploy 上 AWS 囉！

```
sls deploy
```

佈署完應該會看到類似以下內容：
![](https://i.imgur.com/vAiRaZS.png)

這裡大家可能會有個疑慮，為什麼上篇文章的 endpoints 會幫忙顯示路由，但這邊沒有呢？因為上篇文章的佈屬方法是屬於一個 function 對應一個 API，所以若寫了很多路由的話，在 AWS Dashboard 裡就會看到一大堆的 function，雖然佈署時都幫你顯示他的路由，但在後續管理上就會很麻煩。
而這次的實作只建立出一個 Lambda，透過 WSGI 幫忙轉發到裡面的路由，使用時只要更改 {proxy} 改自己寫的路由，這邊就是改成 /webhook 就可以測試囉！

> 若是玩完不想留著的話可以下以下指令來刪除這個專案有用到的 AWS 資源。

```
sls remove
```

# 後記

這次只是將上次的寫的 [aws-line-echo-bot](https://github.com/louis70109/aws-line-echo-bot) 更新並加入 WSGI 以及 flask，在寫上篇文章當時在測試程式都要部署上去，或是用 serverless 的 invoke 來做本地端的模擬測試，但是要是接了像是 Line Message API 這類的第三方服務的話，根本沒辦法自己去模擬 replyToken 之類的參數，因此這次套用了 WSGI 以及 Flask 讓我可以在本地端搭配 ngrok 先測試完之後再將程式佈署上 AWS，如此以來既讓我的程式達到 Serverless，又不會為測試而影響到太多開發時間。
不過都只有 API 相關的路由好像有點難應用，接下來要研究一下怎麼讓前端框架可以一起上 AWS 並擁有 SSL (上次玩只到 http 沒有 SSL)，並加上 RDS 讓整體服務可以串起來，雖然這樣不像 Heroku 這麼人性化一鍵通包，不過至少也是讓服務可以個別管理擴充呢！
有興趣的朋友們可以參考我的 Github，若覺得不錯給個星星 ⭐️ 或是掌聲 👏 鼓勵我繼續研究下一個主題 😃！

# 其他

> 免費方案，AWS [常見問與答集](https://aws.amazon.com/tw/free/faqs/)

![](https://i.imgur.com/OTxONmI.png)
![](https://i.imgur.com/ymZyKyN.png)

如果在做機器人時有用到類似 numpy, psycopg2 … 的套件的話，請參考 這篇文章，簡單來說因為 AWS 不會幫你編譯套件，所以需要透過 docker 來幫忙打包編譯並上傳。
