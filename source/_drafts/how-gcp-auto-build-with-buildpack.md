---
title: 從 Buildpacks 了解 gcloud 佈署流程
categories: GCP
tags:
---


![](https://nijialin.com/images/2023/)
![](https://nijialin.com/images/common.jpeg)


# 前言

過去在操作 Heroku 時，總是很依靠 Heroku 幫忙自動偵測佈署，但都不知道後面發生了什麼事情就完成，

<!-- more -->


## 什麼是 buildpacks?

Buildpacks 是一個開源技術，它的目標是要簡化應用程式到容器化環境的部署過程。它提供了一種自動化的方式來偵測應用程式的語言和框架，然後使用適當的依賴和運行時環境來創建 Docker 映像。

Buildpacks 主要由兩個階段構成：偵測階段和構建階段。

偵測階段（Detect）：在這個階段，Buildpacks 會檢查你的應用程式的代碼，並嘗試找出它是使用哪種語言和框架寫的。例如，如果在你的代碼中發現了 package.json 文件，Buildpacks 就會判斷你的應用程式是使用 Node.js 寫的。

構建階段（Build）：一旦偵測階段完成，Buildpacks 會使用適當的語言和框架依賴來創建你的應用程式的 Docker 映像。例如，如果你的應用程式是使用 Node.js 寫的，Buildpacks 就會創建一個包含 Node.js 運行時環境和你的應用程式依賴的 Docker 映像。

在 Google Cloud Platform 的 Cloud Run 服務中，Buildpacks 的使用讓開發者不需要熟悉 Docker 和容器技術就能輕鬆地部署他們的應用程式。開發者只需要關注他們的應用程式代碼，而 Cloud Run 會使用 Buildpacks 自動地為他們的應用程式創建和部署 Docker 映像。

此外，Buildpacks 還支持自定義，這意味著你可以為你的特定需求創建自己的 Buildpacks，例如，如果你的應用程式需要一些特殊的依賴或配置。這給予了開發者更大的靈活性，同時仍然保留了自動化部署的便利性。
# 工具介紹

- [buildpacks/pack](https://github.com/buildpacks/pack): 透過 command line 的方式幫忙自動偵測並打包 Container 的專案


# 結論

點子：git push 之後，PR bot 自動init一個dockerfile
<style>
  section.compact {
    font-size: 150%  
  }
  img[alt~="center"] {
    display: block;
    margin: 0 auto;
  }
</style>