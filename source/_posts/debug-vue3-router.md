---
title: 在 Vue 3 中使用 Router 的除錯過程紀錄
tags:
  - Vue
  - Javascript
  - Vue Router
categories: Vue
date: 2020-09-10 16:53:58
---

# 前言

因為最近正在把自己在公司用的小工具 - [Announcer](https://github.com/louis70109/Announcer/releases/tag/v1-ejs)(Base on Node.js)中的前端抽離出來，而也剛好在前一陣子參加了 Vue.js 社群聚會得知 Vue 3 可以開始試玩，那 side project 當然就是第一個試水溫的地方啦！但可能太久沒用 Vue 來處理前端的事情讓找錯誤中有點綁手綁腳，因此把整合 3 版 Router 中的一些除錯過程記錄下來 👍

<!-- more -->

# 介紹

Init 結束後很直觀的輸入 `npm install vue-router`，在引入之後就在 `src/` 下建立 `router` 資料夾，接續建立 `index.js` 並加入以下的內容開始使用 Vue3 Router:

<script src="https://gist.github.com/louis70109/4c7ea0635e6f79af5ffb6f4781d87383.js"></script>

因為是使用 Vue3 的緣故所以 Vue Router 會對應 Github 為 [vue-next](https://github.com/vuejs/vue-next)，而在安裝結束後接著就 `npm run serve` 來執行程式，只是當我開啟網頁時終端機卻出現了[這個問題](https://github.com/vuejs/vue-next/issues/972):

```
warning  in ./node_modules/vue-router/dist/vue-router.esm.js

"export 'markNonReactive' was not found in 'vue'
```

然後接著往下找到[這個回答](https://github.com/vuejs/vue-next/issues/972?fbclid=IwAR0zL3QMDIsf0FhNJJQRmesHkNfTrqaJpqT8P1l2PaoKL2b0kXjGJEe42pw#issuecomment-615149911)並引導至另一個專案(`vue-router-next`)的 [commit log](https://github.com/vuejs/vue-router-next/commit/7636f556cd654fbdf49b494925628593e8383453) 中，看了當中的 commit 就知道改成這個版本應該沒問題，索性就直接改`package.json`中 vue-router 版本為 `^4.0.0-beta.9`

![vue-router-next-1](https://nijialin.com/images/vue3/issue1.png)

前往 release tag 也看到了 `^4.0.0-beta.9` 在其中...
![vue-router-next-2](https://nijialin.com/images/vue3/router-next-tag.png)

但...npm install 的 router 套件對應的專案名稱為 `vue-next`，因此這樣子根本就不對啊！它是另一個專案耶(吧？)，且最新的 release tag 在寫這篇文章時只到 v3.0.0-rc.10
![vue-router-next-release-tag](https://nijialin.com/images/vue3/release-tag.png)

最後覺得這樣很奇怪的狀態下只好去 [npm 官網](https://www.npmjs.com/package/vue-router/v/4.0.0-beta.9)裡查證一下，結果這邊有將 vue-router-next 的 release tag 放進去，也難怪 npm install 時真的安裝的到東西，只是兩邊不同步真的很困擾 🤣
![vue-router-next-release-npm-tag](https://nijialin.com/images/vue3/npm-router-tags.png)

# 結論

本來以為這樣的開發是常態，但事後詢問了一下得到的結論應該是因為 Vue Router 3.0 還在 beta 階段，因此為了區別另起一個專案來測試新的 code，而一開始之所以沒安裝到 beta 版本原因次因為 cli 會自動抓新的版本，結果抓到 2.x 的版本導致框架與路由間打架 😆，總之記錄下來也讓自己學到一個找解法的方式，以後若有相關問題也有經驗可循～ 🎉
