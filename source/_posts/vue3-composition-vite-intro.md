---
title: 簽書會紀錄 | Vue3 | Composition API | Vite
tags:
  - Vue
  - Vite
  - Composition API
categories: JavaScript
date: 2021-03-27 21:03:36
---

<style>
  section.compact {
    font-size: 150%  
  }
  img[alt~="center"] {
    display: block;
    margin: 0 auto;
  }
</style>

![](https://nijialin.com/images/vue3/1.png)

# 前言

在 Vue 3 出來之後我有嘗試了一下新的功能，結合 LIFF 做了一個 side project - [Announcer-Vue](https://github.com/louis70109/announcer-vue)，當然也有寫了一篇相關使用的文章 [在 Vue3 中引入 LIFF 的 ShareTargetPicker 分享 FlexMessage 訊息給 LINE 好友](https://nijialin.com/2020/09/12/how-to-use-liff-in-vue3/)，那既然會用了，當然也要來了解一下一些 Composition API 的介紹，那以下就是我去參加 Kuro 的簽書會所聽到的內容。

<!-- more -->

# 介紹

新版本一出，大家就會想嚐鮮使用新版本，但這邊講者提到若開發需求需要支援 IE 時請勿當先行者直上 Vue3([文章有提到](https://book.vue.tw/appendix/migration.html#vue-2-x-%E8%87%B3-3-0-%E5%BF%AB%E9%80%9F%E5%8D%87%E7%B4%9A%E6%8C%87%E5%8D%97))

- Vue3：透過 [Proxy API](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy) 來綁定 getter/setter，但因為 IE 不支援 Proxy API，因此若需要處理到 IE 就請用 Vue2。([相關參考](https://stackoverflow.com/questions/64836337/using-vue-3-in-ie11/64837153))
- Vue2 是透過 [Object.defineProperty](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty) 實作，看到[瀏覽器相容列表](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty#%E7%80%8F%E8%A6%BD%E5%99%A8%E7%9B%B8%E5%AE%B9%E6%80%A7) IE 是支援的。

除了 IE 支援度問題以外，目前就我所知 Vue3 向下相容基本上達到九成以上，且也可以在 3 版中套入 2 版的相關 API 實作。

## Vue 2 與 3 Mount 的差異

Vue3 提供彈性讓開發者在 mount 時相關套件可以更方便的加入專案中，以下提供範例：

- Vue3 mount 都是在 `createApp()` 後面一直接著 `.use()` 來使用相關套件，最後在 mount 至 `#app` 中

> 小知識： `#` 的意思是會選擇 HTML 標籤裡的 id 元素， `#app` 的整體意思就等於選擇「HTML 標籤欄位名為 app」 的區塊中。
> 如果是 `.` 就是選擇 HTML 標籤欄位裡的 class 元素，但由於 id 是唯一的元素([參考](https://developer.mozilla.org/zh-TW/docs/Web/HTML/Attributes#%E5%B1%AC%E6%80%A7%E5%88%97%E8%A1%A8))，因此大部分情況下不會選擇使用 class 來 mount。

#### 範例

```javascript
import { createApp } from 'vue';
import App from './App.vue';
import router from './router/index';

createApp(App).use(router).mount('#app');

// 也可以拆開並寫成：
// const app = createApp(App);
// app.use(router);
// app.mount('#app');
```

## Vite

看名字很容易覺得他只支援 Vue，實則不然，其實他支援了許多種前端框架([文件](https://vitejs.dev/guide/#scaffolding-your-first-vite-project))，本文中就都會以 Vue 為主。

- vanilla
- vue
- vue-ts
- react
- react-ts
- preact
- preact-ts
- lit-element
- lit-element-ts

> 如果讀者想要把 Vite 上 Production 環境的話要考慮[瀏覽器相關支援度](https://vitejs.dev/guide/build.html#browser-compatibility)喔

## [簡介](https://vitejs.dev/guide/#scaffolding-your-first-vite-project)

可以透過任一種方式去 init 一個專案：

NPM:

```
npm init @vitejs/app
```

Yarn:

```
yarn create @vitejs/app
```

建立完後進入專案資料夾中，看到 index.html 中最後引入了 `<script type="module" src="/src/main.ts"></script>` ，看到 type="module" 即為 Vite 所引入的 JavaScript

### [alias](https://vitejs.dev/guide/migration.html#alias-behavior-change) - 客製化你想要的路徑

過去剛使用時常常搞不清楚為什麼是用 `@` 來開始一個路徑，若常使用 Linux 相關的指令會很直觀地想為什麼不用 `./` (當前目錄)、 `~/` (絕對路徑的目錄)、 `../` (當前檔案位置的上層資料夾)，這些都是我剛開始碰到的用法上的困擾(根本是文件沒看清楚 😆)，以 Vue 來說， `@` 的設定通常都是 **src/** 下，Vite 這邊可以參考以下用法來客製化代表路徑：

```
alias: { '/@foo': path.resolve(__dirname, 'some-special-dir') }
```

> 引入時使用 **/@foo** 這個字串就等於找到當前專案目錄(\_\_dirname)的 **some-special-dir** 的資料夾

> [Vite 官方文件](https://vitejs.dev/config/#resolve-alias)中說明在 resolve 路徑時是使用這個套件作成的 - [rollup/plugins](https://github.com/rollup/plugins/tree/master/packages/alias)。

## Composition API

過往需要共用 Component 時會需要使用 mixin 來處理，但因為每個 Component 都有各自的 Computed、Method...因此很容易在不同的 Component 之間造成衝突，且在渲染 life cycle 中也有機會影響到其他 Component。

## 模擬 Vuex

這邊一般都不推薦直接當作替代方案，因為原本設計的用計就不是做**資料狀態管理**，但也是許多人發現流程可以做出來，因此在某些情境下若無需透過 Global 來管理資料狀態的話，可以使用這個方式來對資料做檢疫的處理。

- 需要使用 reactive 去 hook 相關數值。
- 每個 component API 都有自己的 data, method, compute，需要用時在個別去 import 避免在修改時影響到其他的頁面。
- Use **inject** and **provide** to hook which would like Vuex mutation, and reactive data like Vuex Store。

> 範例專案: TBD

# 結論

在這次聽講過程中也藉由過往有些使用 Vue 框架讓我在過程中**較沒**那麼苦手 😆，現場許多 Live Demo 也解開了我一些過往未解的疑惑，透過參加活動也讓我更了解新工具的相關操作方式，期待之後我也可以應用在我的 Side Project 上～
