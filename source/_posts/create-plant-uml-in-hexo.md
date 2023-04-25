---
title: 在 Hexo 樣式的部落格引入 PlantUML
tags:
  - PlantUML
  - Hexo
  - VScode
categories: 學習紀錄
abbrlink: 715192278
date: 2020-06-03 18:59:38
---

![](https://cdn.pixabay.com/photo/2015/03/04/16/11/sunset-659012_1280.jpg)

# 前言

我在上一篇的文章 - [從 Http 請求到認識 OAuth 以及 OpenID](https://nijialin.com/2020/06/01/%E5%BE%9E-Http-%E8%AB%8B%E6%B1%82%E5%88%B0%E8%AA%8D%E8%AD%98-OAuth-%E4%BB%A5%E5%8F%8A-OpenID/) 中引入了 `PlantUML`，主要是看了[這篇文章後](https://www.evanlin.com/til-vscode-plantuml/)啟發我使用 UML 來畫圖，除了可以動手畫流程讓自己更了解外，也不用到處去找適合的圖並且能讓文章的風格統一。

但若要 Markdown 支援 PlantUML 的話還需要額外安裝套件，這邊就以我部落格的樣式 - Hexo 的 next Theme 來描述實作過程！🙂

> 下載位置: [VScode PlantUML 套件](https://marketplace.visualstudio.com/items?itemName=jebbs.plantuml)

<!-- more -->

# 介紹

因為是使用 hexo，從[官網的 Plugins](https://hexo.io/plugins/) 中找到後決定使用[hexo-filter-plantuml](https://github.com/miao1007/hexo-filter-plantuml)

> 不得不說 [hexo 官網](https://hexo.io/plugins/)真的是很多特別又好玩的套件，大家可以上去找找看有沒有適合自己寫作風格的套件喔！

## 寫作環境

- VScode
- MacOS
- Hexo 樣板

詳細的流程可以參考 Evan 的文章 - [[TIL] 在 vscode 上面安裝並且使用 PlantUML](https://www.evanlin.com/til-vscode-plantuml/)

## 實例

首先一般在編輯器上開發完應該會像這樣:
![](https://i.imgur.com/CEoFn8h.jpg)

想說寫好太棒了 🎉，我要把它放到部落格上，結果就會變成這樣:
![](https://i.imgur.com/LwXokuE.png)

這下可好了這樣是誰看得懂 😤！

此時就使用 npm 來幫忙安裝(hexo 是基於 Node.js 開發的套件):

```
npm install --save hexo-filter-plantuml
```

##### 避免不能畫其他圖的困擾，這邊也同步安裝:

```
brew install graphviz
```

接下來因為我們只是輸入`標記符號`，但輸出是圖片格式，因此要讓 hexo 在網頁載入時先去轉換 base64-encoded 的圖片並下載至文章上。

首先以為的部落格為例([GitHub](https://github.com/louis70109/nijia-blog-backup))，先進入到
`themes/` ➡️ `next/` 找到 `_config.yml` 裡的任一行輸入:

```
plantuml:
  render: "PlantUMLServer"
```

> 若還是不懂可參考[我的專案](https://github.com/louis70109/nijia-blog-backup/blob/master/themes/next/_config.yml#L139)寫法。

以上是一個簡易的設定，要注意到它文件中是獨立的一層，不是在任何的子階層裡面，若想要更多客製化的功能可以參考[作者文件說明](https://github.com/miao1007/hexo-filter-plantuml#advanced-configuration)。

最後部署上去後就會看到這樣的結果:

![](https://i.imgur.com/gzcJJml.png)

如此一來就大功告成囉！之後就可以拿著 UML 到處跟人家炫耀了 😆

# 注意事項

在寫的時候一定要在頓號後面加上`puml`的標記，這樣 hexo 才看得懂喔！

````
​```puml
@startuml
...省略
@enduml
​```
````

或是習慣另一種寫法的也可以這樣：

```
{% plantuml %}
@startuml
...省略
@enduml
{% endplantuml %}
```

# 用 Node 卻遇到 Java 的問題？

若你不是 Java 的開發者，或許也會遇到這樣的問題：

```
No Java runtime present, requesting install.
```

因為之前因為需要安裝 [openapi-generator](https://github.com/OpenAPITools/openapi-generator) 時有安裝過 Java 相關套件，此時需要至[官網抓取](https://www.oracle.com/java/technologies/)並安裝，之後再執行一次就沒問題囉！

> 我當時是直接到 oracle 官方直接下載 Java SE，但如果這不還是不行可以嘗試看看[這個網站](https://java.com/en/download/mac_download.jsp)

# 結論

為什麼我要用`標記符號`顯示而不是直接`輸出圖片`呢？

因為我們文章可能在發佈之後或是之後回來看時發現流程有錯誤時可以馬上針對特定內容直接修改，而不用再重新找當時寫的檔案位置-輸出圖片 這樣的順序，總之只要將流程圖畫好並透過`程式碼區塊`的語法就能將圖片輸出了，這樣對我寫作來說就能夠更順暢一些了！
