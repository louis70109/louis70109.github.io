---
title: 【PlantUML】在 Windows 上執行的步驟
tags:
  - PlantUML
  - Windows
categories: 應用
date: 2021-09-10 13:13:41
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


# 前言

今天因為要去注射疫苗請假了一天，想說最近有個 side project 想用 PlantUML 畫一下流程圖，但發現新買的這台 Windows 桌機似乎也沒灌 Java 相關的套件，因此輸出不了圖(如下)

![](https://nijialin.com/images/2021/win-uml/1.PNG)


以下提供一下我成功安裝的方法給大家

<!-- more -->

# 介紹

- VSCode 安裝 [PlantUML](https://marketplace.visualstudio.com/items?itemName=jebbs.plantuml)

- 首先到了 [PlantUML 下載區域](https://plantuml.com/zh/download) 然後發現一堆選項

![](https://nijialin.com/images/2021/win-uml/2.PNG)

- 選擇 [Java J2EE WAR File](http://sourceforge.net/projects/plantuml/files/plantuml.war/download)
- 下載完後可以存到自己喜歡的位置
  - Edge 用戶預設路徑: C:\Users\用戶名稱\AppData\Local\Temp\MicrosoftEdgeDownloads
- [下載 Java 8](https://java.com/en/download/)，網站會自動判別作業系統

![](https://nijialin.com/images/2021/win-uml/3.PNG)

- 下載完後直接安裝

![](https://nijialin.com/images/2021/win-uml/4.PNG)

- 接著透過 PowerShell 到剛剛下載 [Java J2EE WAR File](http://sourceforge.net/projects/plantuml/files/plantuml.war/download) 的檔案位置中輸入以下指令

```
javaw.exe .\plantuml.war
```

![](https://nijialin.com/images/2021/win-uml/5.PNG)


> 備註: Windows 任何一個資料夾右鍵都會看到 `使用 Windows 終端機開啟` 的選項，若沒有請先安裝 PowerShell

- 最後 VSCode 重開在預覽一次就會成功囉!

![](https://nijialin.com/images/2021/win-uml/6.PNG)


# 結論

最後終於出現啦(灑花)，有些在 VSCode 上操作的相關內容有跳過，大家可以參考以下的文章(Mac 用戶也如下)。

- [在 Hexo 樣式的部落格引入 PlantUML](https://nijialin.com/2020/06/03/create-plant-uml-in-hexo/)
- [PlantUML download page](https://plantuml.com/zh/download)
- [[TIL] 在 vscode 上面安裝並且使用 PlantUML](https://www.evanlin.com/til-vscode-plantuml/)