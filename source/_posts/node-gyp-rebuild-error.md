---
title: 解決 node-gyp rebuild error 問題
tags:
  - node-gyp
  - MacOS
  - Xcode
  - jest
  - npm
  - yarn
categories: JavaScript
abbrlink: 2114632633
date: 2020-02-02 00:51:46
---

# 前言

我對這錯誤的印象是某次在練習寫測試時裝 [jest](https://jestjs.io/) 後出現的，檢查了`package-lock.json`後看起來`jest-haste-map`這個套件有用到 [fsevents](https://www.npmjs.com/package/fsevents)，而之後使用`npm install`或者`yarn install`皆會出現以下這個訊息：
![node-gyp rebuild error](https://i.imgur.com/zH6Mbzo.png)

> 環境為 Mac OS Catalina version 10.15.2

看起來是在執行階段時`node-gyp`出了問題，接著它自己重新執行了`node-gyp rebuild`後出錯，起初我認為是套件的問題並找到了[這個回答](https://github.com/nodejs/node-gyp/issues/94#issuecomment-222482140)並執行:

```sh
sudo npm uninstall node-gyp -g
sudo npm uninstall node-gyp
```

但從來沒有全域安裝`node-gyp`過，也有些網友執行`node-gyp configure`是可以的，而我執行後還是失敗，狀態跟這個 [issue](https://github.com/nodejs/node-gyp/issues/94#issuecomment-269909621) 差不多。

後來看到 fsevents 在套件說明裡有寫到:

> The FSEvents API in MacOS allows applications to register for notifications of changes to a given directory tree. It is a very fast and lightweight alternative to kqueue.

並且注意到剛剛圖裡面有訊息是跟 xcode 以及 apple 相關，最後找到了這個 [issue](https://github.com/schnerd/d3-scale-cluster/issues/7)

# 我的解決方案

有些人可能是有重灌或環境重設導致沒有安裝 xcode，此時只要執行 `xcode-select --install` 即可([參考說明](https://github.com/schnerd/d3-scale-cluster/issues/7#issuecomment-402541605))。

這邊我使用的解決方案為這個 [issue](https://github.com/schnerd/d3-scale-cluster/issues/7#issuecomment-550579897)，執行以下兩個指令來重新安裝 xcode:

```sh
sudo rm -rf $(xcode-select -print-path)
xcode-select --install
```

原因可能是因為我重舊版本向上更新之後 xcode 沒有相容當前版本，所以我使用以上指令來刪除重新安裝。

> 不過這個指令很暴力的使用 `rm -rf`，使用它相對危險，使用前請詳閱公開說明書 😆。

# 結論

為了練習測試安裝了 jest 卻讓我看著一堆 warning 實在是恨得牙癢癢，所幸目前這樣解決完後是可以用的，就看接下來些新的 side project 後會不會有其他問題再來更新，

另一方面也可能因為我在寫 side project 時安裝了一堆有的沒的東西導致這個結果，看來也得找時間來整理一下環境了～

# 參考

[清除 npm 快取](https://blog.csdn.net/XuM222222/article/details/94976298)
