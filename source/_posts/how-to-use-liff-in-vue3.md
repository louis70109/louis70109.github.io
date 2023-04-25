---
title: 在 Vue3 中引入 LIFF 的 ShareTargetPicker 分享 FlexMessage 訊息給 LINE 好友
categories: Vue
date: 2020-09-12 13:44:16
tags: ['Vue', 'LINE', 'LIFF', 'ShareTargetPicker']
---

![picker result](https://nijialin.com/images/2020/vue-use-liff/picker-result.png)

# 前言

以往在 LINE 平台上發送公告相關訊息時都只能編排文字順序、傳另一個圖片、抑或是傳影片...anyway，而隨著 LINE 推出了 [Flex Message](https://developers.line.biz/en/docs/messaging-api/using-flex-messages/) 讓開發者可以將訊息當作網頁 CSS 樣式塑造出一個客製化的訊息格式，這在 Chatbot 的領域裡基本上可以算是殺手級功能了，Chatbot 可以在過程中可以依照對話流程釋出不同樣版的內容，讓使用者體驗更上一層。

隨著時間的演進 LINE 也 release 了自家的前端框架 - [LIFF](https://developers.line.biz/en/reference/liff/)，開發者能夠很快速的使用到 LINE Login 的相關功能並且整合到 Chatbot 上面，讓整體服務的使用體驗更上一層，接著在近些日子釋出了本篇介紹的主軸 - [ShareTargetPicker](https://developers.line.biz/en/reference/liff/#share-target-picker)，其功能主要是能將之前只有 Chatbot 才能使用的 Flex Message 透過 LIFF 的這隻 API 使用發送者的名義將客製化訊息幫忙發送給 `使用者`/`群組`/`聊天室`，讓我在群組公布訊息時能有煥然一新的模樣呢！

- 也有 LINE API Expert 分享的 [看起來很專業的 LINE 數位版名片](https://taichunmin.idv.tw/blog/2020-07-12-liff-businesscard.html) 文章可以參考。

會寫這篇的原因也是因為最近寫了一個 Side Project - [Announcer](https://github.com/louis70109/Announcer) 讓我可以再公布訊息時可以發送漂亮的 Flex MEssage，而使用 Node.js 開發時因為需要使用 [LIFF](https://developers.line.biz/en/reference/liff/) 的 [ShareTargetPicker](https://developers.line.biz/en/reference/liff/#share-target-picker)，當時只透過 [EJS](https://ejs.co/) 幫我產生 html template 來發送 FlexMessage，一開始認為應該不會寫太多前端的邏輯，但隨著想增進更多的 UX 因此需要操作更多的前端邏輯(可以看看[這個 tag](https://github.com/louis70109/Announcer/releases/tag/v1-ejs) 裡的 views 資料夾)，因此在多種考慮下決定使用 Vue 來簡化我的開發，但在 migrate 之前總是要先了解一下兩邊結合的可行性，本篇就給大家帶來 Vue3 結合 LIFF 的相關使用介紹。 🙂

> FlexMessage 詳細介紹可以參考這篇 - [Flex Message 的 Update 1 已公開](https://engineering.linecorp.com/zh-hant/blog/flex-message-update1/)

<!-- more -->

# 介紹

> 範例專案在此: [GitHub](https://github.com/louis70109/vue-liff-shareTargetPicker)

首先呢，就使用 vue 官方建議的 command line 來建立一個新的專案，名稱為 `liff-2_4-demo`:

```
vue create liff-2_4-demo
```

輸入之後就可以選擇要哪個模式，這邊我們選擇 `Vue 3 preview`
![vue init](https://nijialin.com/images/vue3/vue-init.png)

建立好了之後畫面如下，接著就用 `cd liff-2_4-demo` 進入資料夾開始
![vue init ok](https://nijialin.com/images/vue3/vue-init-ok.png)

接著分別安裝 Vue Router 以及 LIFF 套件讓後續開發比較順利些

```
npm install vue-router@next @line/liff
```

接著預設會給一個 `HelloWorld` 的 component，將之沿用並在 `src/` 下建立一個 `router` 資料夾，接著在 router/ 下建立一個 index.js 並加入以下的內容開始使用 Vue3 Router:

<script src="https://gist.github.com/louis70109/4c7ea0635e6f79af5ffb6f4781d87383.js"></script>

> 若你在 Vue 3 使用 Router 的過程有問題的話可以[參考這篇文章](https://nijialin.com/2020/09/10/debug-vue3-router/)

Router 這邊處理好後就接著來處理 LIFF。接著進入到 `HelloWorld.vue` 的檔案中，找到 props 的部分將它置換成 `setup(){}`

> 關於 composition API 的使用方法請參考[這個網址](https://composition-api.vuejs.org/#basic-example)

```javascript
export default {
  name: 'HelloWorld',
  setup() {},
};
```

## liff.init()

接著因為 LIFF 啟用時需要先 init ([參考](https://developers.line.biz/en/reference/liff/#initialize-liff-app))，在 Vue 這邊就選擇放在 `Mounted` 下，並且搭配著 async/await 來簡化一下 liff 的 sample code，可以選擇自己喜歡的方式去寫 🙂(對 Promise 不熟的話可以[參考這篇](https://nijialin.com/2020/06/13/learn-javascript-promise/))：

#### Async/Await 版本：

```javascript
import { onMounted } from "vue";
import liff from "@line/liff";
// ...
setup(){
  onMounted(async () => {
    try {
      await liff.init({ liffId: "123456-abcedfg" }); // Use own liffId
      if (!liff.isLoggedIn())
        liff.login({ redirectUri: window.location.href });
    } catch (err) {
      console.log(`liff.state init error ${err}`);
    }
  })
}
// ...
```

#### 原版：

```javascript
onMounted(() => {
  liff
    .init({
      liffId: '123456-abcedfg', // Use own liffId
    })
    .then(() => {
      if (!liff.isLoggedIn()) liff.login({ redirectUri: window.location.href });
    })
    .catch((err) => {
      console.log(err.code, err.message);
    });
});
```

在行動裝置開啟 Liff 時會是有登入狀態，而 `if (!liff.isLoggedIn())` 是讓桌機版瀏覽器在進入時可以判斷並導向 LINE 的登入畫面來確保使用者登入的狀態

## liff.ShareTargetPicker()

由於在 掛載(mount)階段已經初始化好 liff 了，接著在這邊就可以直接使用並參考 [ShareTargetPicker](https://developers.line.biz/en/reference/liff/#share-target-picker) 的文件把 code 複製過來並一樣提供兩種使用方法給大家:

#### Async/Await 版本：

```javascript
async function sendTargetPicker() {
  if (!liff.isLoggedIn()) {
    liff.login({ redirectUri: window.location.href });
  }
  if (liff.isApiAvailable('shareTargetPicker')) {
    try {
      const picker = await liff.shareTargetPicker([
        {
          type: 'text',
          text: 'Hello, World!',
        },
      ]);
      if (picker) {
        // succeeded in sending a message through TargetPicker
        console.log(`[${picker.status}] Message sent!`);
      } else {
        const [majorVer, minorVer] = (liff.getLineVersion() || '').split('.');
        if (parseInt(majorVer) == 10 && parseInt(minorVer) < 11) {
          console.log(
            'TargetPicker was opened at least. Whether succeeded to send message is unclear'
          );
        } else console.log('TargetPicker was closed!');
      }
    } catch (error) {
      // something went wrong before sending a message
      console.log(error);
      console.log('Flex Message got some error');
      liff.closeWindow();
    }
  } else console.log('Please login...');
}
```

#### 原版：

若不習慣用語法糖的話可以用原本的範例：

```javascript
function sendTargetPicker() {
  if (!liff.isLoggedIn()) {
    liff.login({ redirectUri: window.location.href });
  }
  if (liff.isApiAvailable('shareTargetPicker')) {
    liff
      .shareTargetPicker([
        {
          type: 'text',
          text: 'Hello, World!',
        },
      ])
      .then(function (res) {
        if (res) {
          // succeeded in sending a message through TargetPicker
          console.log(`[${res.status}] Message sent!`);
        } else {
          const [majorVer, minorVer] = (liff.getLineVersion() || '').split('.');
          if (parseInt(majorVer) == 10 && parseInt(minorVer) < 11) {
            // LINE 10.3.0 - 10.10.0
            // Old LINE will access here regardless of user's action
            console.log(
              'TargetPicker was opened at least. Whether succeeded to send message is unclear'
            );
          } else {
            // LINE 10.11.0 -
            // sending message canceled
            console.log('TargetPicker was closed!');
          }
        }
      })
      .catch(function (error) {
        // something went wrong before sending a message
        console.log('something wrong happen');
      });
  }
}
```

把這個 function 貼上去之後就加上 html 標籤來呼叫 `sendTargetPicker` 函式:

```html
<button @click="sendTargetPicker">Send Sample</button>
```

## 使用 Heroku 來部署 Vue

首先需要安裝 [Heroku Command Line](https://devcenter.heroku.com/articles/heroku-cli)，安裝完之後就先使用 `Heroku login` 你的帳號，以下的指令會基於這兩個步驟去實現。

由於這邊只使用到前端的部分，為求方便使用 express 來當作跟瀏覽器對接的入口。

在目錄資料夾下建立一個 `index.js` 的入口檔案，以下的程式碼則是全部根據請求導向至對應的路由上：

```javascript
const express = require('express');
const path = require('path');
const serveStatic = require('serve-static');

const app = express();
app.use(serveStatic(__dirname));
app.use('/', serveStatic(path.join(__dirname, '/dist')));
app.get(/.*/, function (req, res) {
  res.sendFile(path.join(__dirname, '/dist/index.html'));
});
const port = process.env.PORT || 8080;
app.listen(port);
console.log('server started ' + port);
```

接著使用下 heroku cli 來建立一個服務，`-a` 後面接著服務的名稱

```sh
heroku create -a <your-service>
git add . # 將當前目錄加入 git 裡面
git commit -m '想放在 commit 裡的訊息'
```

![heroku create](https://nijialin.com/images/2020/vue-use-liff/heroku-create.png)

建立完成後會自動連接剛剛建立的 repository，接著透過 `git push heroku master` 來推到 heroku 上：
![heroku push 1](https://nijialin.com/images/2020/vue-use-liff/heroku-push-1.png)

等待一會兒後就完成啦！！並且還附贈一個 Domain 給你。這邊範例的 domain 則是 `https://liff-sample-5.heroku.app/`
![heroku push 2](https://nijialin.com/images/2020/vue-use-liff/heroku-push-2.png)

到這裡測試環境已經啟動的差不多了，接著就來建立 LINE Login channel：
![login channel 1](https://nijialin.com/images/2020/vue-use-liff/login-create-1.png)

選擇完最左邊的 channel 之後並依序填入相關資訊，並選擇 `web app`：
![login channel 2](https://nijialin.com/images/2020/vue-use-liff/login-create-2.png)

待建立完成之後到 LIFF 的頁籤中新增(`Add`)一個 LIFF page，將剛剛使用 heroku 建立的網址貼上只 Endpoint Url 輸入框並接著網址輸入`/liff/template`:
![](https://nijialin.com/images/2020/vue-use-liff/liff-create-1.png)

新增完 LIFF page 後要將 Channel `Published` 以及啟動 `ShareTargetPicker` 按鈕，並將下方的 LIFF url 複製起來貼到瀏覽器上
![publish login info](https://nijialin.com/images/2020/vue-use-liff/login-publish-liff-info.png)

輸入之後 LIFF 會自動 mapping 到剛剛輸入的 Endpoint url，首先在剛進入時因為在掛載(mount)階段，所以會先執行 `liff.init()`
![login page](https://nijialin.com/images/2020/vue-use-liff/login-page.png)

登入之後會導回到以下的畫面：
![vue page](https://nijialin.com/images/2020/vue-use-liff/liff-test-page.png)

按下按鈕之後會被引導到 `好友`/`群組`/`聊天室` 的分享頁面(可複選)：
![share to friends](https://nijialin.com/images/2020/vue-use-liff/liff-share-info.png)

分享之後就看到成果啦 🎉
![share message to group](https://nijialin.com/images/2020/vue-use-liff/liff-test-result.png)

這部分因為 demo 的關係只送出簡單的文字，若想送出很漂亮的樣板可以參考 [FlexMessage](https://developers.line.biz/en/docs/messaging-api/using-flex-messages/)，並且也有相關的線上工具 - [Simulator](https://developers.line.biz/flex-simulator/) 讓大家可以產生出自己要的樣板喔！

```javascript
{
  type: "text",
  text: "Hello, World!",
}
```

## Bonus

1. 若你是使用剛剛提到的工具產生 Flex Message，你需要再產生的 JSON 內容最外面加上下列的相關描述，才能讓 LINE app 收到你的 Flex Message 喔！

```javascript
{
    "type": "flex",
    "altText": "I am sample text",
    "contents": [ 放入剛剛產生的 JSON ],
  }
```

2. 之所以會一直使用這個判斷式是因為有 IAB(In App Browser) 以及 External Browser 兩種模式，在情境不同時必須先確認有登入過 LINE 才可以使用之後的功能，否則很容易搞不清楚導致開始除錯後才發現沒確認這部分而浪費很多時間。

```javascript
if (!liff.isLoggedIn()) {
  liff.login({ redirectUri: window.location.href });
}
```

# 結論

以往只能讓 Chatbot 回應 FlexMessage，而現在能透過 LIFF 使用 ShareTargetPicker 是否有煥然一新的感覺呢？讓發訊息的身份不會只被綁在 bot 身上，使用者本身也能共用 FlexMessage，透過這篇帶大家逐步使用 Vue3 試玩 LIFF 的新功能，若大家有使用經驗、作品、問題的話歡迎至 [Chatbot 社群](https://www.facebook.com/groups/chatbot.tw/)分享喔！讓大家互惠一同建造出 WOW 的 Side Project 吧！🙂

# 參考

- [ShareTargetPicker](https://developers.line.biz/en/reference/liff/#share-target-picker)
- [FlexMessage](https://developers.line.biz/en/docs/messaging-api/using-flex-messages/)
- [Simulator](https://developers.line.biz/flex-simulator/)
- [LIFF v2 API](https://developers.line.biz/en/reference/liff/)
