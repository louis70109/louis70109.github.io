---
title: 如何在本地端建立 SSL 認證(開發用) | 在 vite config 中引入
tags:
  - mkcert
  - https
  - vue
  - vite
  - SSL
categories: JavaScript
date: 2022-05-07 00:10:12
---



![](https://nijialin.com/images/common.jpeg)


# 前言

有時我們在開發一些前端頁面，串接一些平台服務並需要是 `https` 在瀏覽器上顯示，不過這對一些前端開發者，或是像我這種還沒有 Server 的人來說就很困擾，以下就介紹一下如何在 Mac 本地端使用，最後再使用 vite(Vue) 做範例。

<!-- more -->

# 介紹

> 參考來自 [web.dev](https://web.dev/how-to-use-local-https/)，可惜當中沒有 Vue 的範例 🧐

## 安裝 mkcert 於 MacOS

```
brew install mkcert
brew install nss # If Firefox
```

## 透過 mkcert 安裝 CA 在電腦上

![](https://nijialin.com/images/2022/line-api-update-1/3.png)

```
mkcert -install
```

## 建立 localhost 的兩把 pem

![](https://nijialin.com/images/2022/line-api-update-1/4.png)


```
mkcert localhost
```

## 透過 mkcert 建立兩個 localhost pem key

```
mkdir -p cert && mkcert -key-file ./cert/key.pem -cert-file ./cert/cert.pem 'localhost'
```

## 在 `vite.config.js` || `vue.config.js` 中設定位置

以 vite 或是 vue 的資料夾結構中，只要有標題的 config，就可以在框架載入時放入一些設定，廢話不多說上扣：

<script src="https://gist.github.com/louis70109/b77b22ece137fbc1945153a9d1767b23.js"></script>

把相關的位置放上之後就會啟動 Server (`npm run serve`...之類的)， pem 就會被吸進去嚕！ 

> 範例： `https://localhost:8080`

# 結論

以上這算是最近在開發 LIFF 時因為需要 SSL 時找到的做法，雖然後來因為需求可能還是需要其他的解法(heroku, ngrok, 自己養 Server 轉網址...)，但如果串接一些服務時，或是自家後端規定一定要帶著 SSL 才能訪問，不如參考這邊文章吧！希望對各位有幫助😁