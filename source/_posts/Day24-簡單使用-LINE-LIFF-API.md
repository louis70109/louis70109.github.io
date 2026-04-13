---
title: Day24 - 簡單使用 LINE LIFF API
tags:
  - LINE
  - LIFF
  - webview
categories: 2019鐵人賽
abbrlink: 1083757629
date: 2019-10-08 21:02:58
---

## 前言

以下就為大家帶來簡單的實作以及如何去使用它。

## 實作

在`views/`下新增一個`liff_test.html`並加入以下內容

```html
<html>
  <head>
    <meta charset="UTF-8" />
    <meta
      name="viewport"
      content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"
    />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Document</title>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.js"></script>
    <script src="https://d.line-scdn.net/liff/1.0/sdk.js"></script>
    <script>
      function initializeApp(data) {
        $("#userid").val(data.context.userId);
      }

      $(function() {
        liff.init(function(data) {
          initializeApp(data);
        });

        $("#ButtonGetProfile").click(function() {
          liff.getProfile().then(profile => {
            $("#UserInfo").val(profile.displayName);
            alert("done");
          });
        });

        $("#ButtonSendMsg").click(function() {
          liff
            .sendMessages([
              {
                type: "text",
                text: $("#msg").val()
              }
            ])
            .then(() => {
              alert("done");
              liff.closeWindow(); // 關掉頁面
            });
        });
      });
    </script>
  </head>
  <body>
    <button class="liff_btn">Get user profile</button>
    <label>user id:</label>
    <input class="form-control" type="text" id="userid" /> <br />
    <button class="btn btn-primary" id="ButtonGetProfile">Get Profile</button>
    <input class="form-control" type="text" id="UserInfo" /><br />
    <label>要傳送的訊息:</label>
    <input class="form-control" type="text" id="msg" value="測試" /><br />
    <button class="btn btn-primary" id="ButtonSendMsg">要傳送的訊息</button>
  </body>
</html>
```

> 以上參考來自[董老師的部落格](http://studyhost.blogspot.com/2018/06/linebot23-line-liff-app.html)

> 詳細的 LIFF API 文件可以[參考](https://developers.line.biz/en/reference/liff/)

接下來按著之前做過的一樣把這個檔案送到`S3`裡，接著它的網址複製起來
![](https://i.imgur.com/wgVJ9js.png)

接著來去之前建立機器人的開發者頁面裡按下最右邊的`LIFF`
![](https://i.imgur.com/B593Hdt.png)
按下去之後呢，再來按下`add`
![](https://i.imgur.com/5dNr9G7.png)
跑出這個頁面後，`Name`好辨認為主、`Size`選擇滿版(Full)、`Endpoint URL`就把剛剛複製起來的 S3 網址放進去後按`Confirm`
![](https://i.imgur.com/NQD9Mwv.png)
大概內容會長得像這樣
![](https://i.imgur.com/WoTYxpv.png)
建立成功後往下滑會看到 LINE 給你一個屬於他們的網址，接著可以把它貼到你的機器人上(或者任何聊天室)
![](https://i.imgur.com/wN69WDJ.png)
點下去之後就會看到來自 LIFF 的 Webview 囉！
![](https://i.imgur.com/aYztzUi.jpg)
接下來就可以開始玩裡面的功能了 🤣

## 結論

LIFF 整合的功能讓開發者在 Bot 裡不好實現的功能透過 Webview 的方式讓使用者可以到頁面上做邏輯處理，透過兩種的結合讓整體的應用就有更多的變化，這邊若要給使用者個話就把 `line://xxxoxx` 製作成 flex message 或者乾脆傳給使用者，引導他點選，如此就能讓使用者到自己設計的頁面上了。

這邊額外補充一點，有看到程式碼裡面可以拉到`Query string`嗎？事實上可以透過`Query string`讓使用者帶些參數來做更多的判斷，像是卡米哥做的[Kamiliff](https://github.com/etrex/kamiliff)就是讓使用者在點選後判斷這個 LIFF 的 Size，在導去對應的路由去做處理，這樣子使用者在建立 LIFF 的時候就不用一個頁面弄一個，否則這樣在 dev 轉 prod 的時候應該會弄到很生氣 🤣。
