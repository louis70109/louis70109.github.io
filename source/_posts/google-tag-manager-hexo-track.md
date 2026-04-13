---
title: 設定 GTM & GA 來觀察你的 Hexo 部落格流量！
tags:
  - GTM
  - GA
categories: 學習紀錄
date: 2022-12-30 15:38:24
---


# 前言

當你完成了一個網頁、部落格之後，當然最期待的就是開始有用戶開始使用啦！但過去在使用 GA3 來協助監控流量時很方便，只要放入 UA-xxxx + Script 基本上就完成了。但在一陣子之後需要搬到 GA4 + GTM 上，這讓許多記憶還停在舊方法上的人頭都很痛，因此以下就由頭痛的筆者帶各位操作一次新的 GTM + GA4 來放入 Hexo 的部落格中囉！

- Google Tag Manager 以下簡稱 GTM
- Google Analytics 簡稱 GA

## 流程圖

![](https://nijialin.com/images/2022/GTM/GTMflow.png)

<!-- more -->

# 介紹

## 1. 建立 GTM

![](https://nijialin.com/images/2022/GTM/1createGTM.png)

首先先到 [Google Tag Manager 首頁](https://tagmanager.google.com/#/home)，首次來到這裡的人應該都是空白的，因此按下圖片上的`建立帳戶`的按鈕來建立一個，當中都是填一些基本資訊，主要要寫一個可辨別的名稱，並選擇 Web。

## 2. GTM Code 在哪呢？

![](https://nijialin.com/images/2022/GTM/2GTMcode.png)

建立完成之後，點選剛剛的帳戶(a.k.a **容器名稱**)，在一個琳瑯滿目的畫面中會不好找 GTM 程式碼的位置，在圖片上的箭頭指示位置，也就是 GTM Code 名稱的位置給他點下去，這邊的程式碼內容就是要提供給前端工程師塞入 HTML 的部分，因此要記得這個位置喔！

## 3. Hexo 中怎麼放入 GTM Code?

![](https://nijialin.com/images/2022/GTM/3Hexo.png)

在我的 Hexo 部落格中，要按造以下的目錄結構找到 head 的位置塞入 GTM code:

```
themes > next > layout > _partials > head > head.swig
```

找到檔案之後，因為官方文件上有寫要放在 <head> 附近，接著在 `<meta>` 前後放上，讓 GTM js code 可以預載入像是以下的範例：

```html
...省略
<meta name="theme-color" content="{{ theme.android_chrome_color }}" />
<meta name="generator" content="Hexo {{ hexo_version }}" />

<!-- Google Tag Manager -->
<script>
  (function (w, d, s, l, i) {
    w[l] = w[l] || [];
    w[l].push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
    var f = d.getElementsByTagName(s)[0],
      j = d.createElement(s),
      dl = l != 'dataLayer' ? '&l=' + l : '';
    j.async = true;
    j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
    f.parentNode.insertBefore(j, f);
  })(window, document, 'script', 'dataLayer', 'GTM-YOUR_GTM_CODE');
</script>
<!-- End Google Tag Manager -->

{%- if theme.favicon.apple_touch_icon %} ...省略
```

> 參考文章： [Hexo 手動新增 Google Analytics、Google Tag Manager 的追蹤碼](https://blog.balabambe.com/2021/07/29/Hexo-%E6%89%8B%E5%8B%95%E6%96%B0%E5%A2%9E-Google-Analytics%E3%80%81Google-Tag-Manager-%E7%9A%84%E8%BF%BD%E8%B9%A4%E7%A2%BC/)

## 4. 那我要怎麼設定 GTM 監聽事件呢？

![](https://nijialin.com/images/2022/GTM/4createevent.png)

到左邊的`代碼`頁面，點選新增來建立事件。

![](https://nijialin.com/images/2022/GTM/5addGAcode.png)

點選`代碼設定`區塊，然後選擇 GA4 事件來加入你的 GA，左上角的名字我就先取名 **blog-onload**，意思就是在載入的同時會使用到的事件。

## 5. 那我的 GA 在哪邊？

![](https://nijialin.com/images/2022/GTM/6updatetoGA4.png)

一般你會用到這邊的話通常要嘛被強迫升級或是你已經使用 GA 許久(如圖)，如果尚未升級 GA4，那麼他會跳出通知說 2023/07/01 將會停止處理新資料，因此來到你的 GA 畫面上之後趕快點選右上角的部分來更新你的 GA。

## 6. 點哪更新我的 GA？

![](https://nijialin.com/images/2022/GTM/7UpdateGA4.png)

點選中間`開始使用`，GA 就會自動幫你升級了～

![](https://nijialin.com/images/2022/GTM/8completeupdateGA4.png)

如圖所示，看到下方有 `GA4 資源名稱`對應`資源ID`就代表更新成功嚕！

## 7. GA 標準疑問之一: 阿我的流量咧？

![](https://nijialin.com/images/2022/GTM/9wait24h.png)

相信做到這個步驟的各位應該已經心急如焚，怎麼不趕快給我看一點流量？？都不確定到底能不能出去撒廣告、網站到底有沒有流量啊？

但 GA 這邊收集時間基本上是以 24 小時為計，因此若要看到你的資料要嘛等時間，不然就按造接下來的步驟用 Debug mode 來測試 GTM 跟 GA 有沒有通嚕！

## 8. 回到剛剛沒放上 GA 的 GTM 事件頁面

![](https://nijialin.com/images/2022/GTM/10addonloadeventwithRoottrigger.png)

把你剛剛的 GA (G-xxxxx) 放入之後，並在下方的觸發事件中選擇`所有元素`，並設定名稱為 Root Trigger，意思就是進頁面之後開始觸發的條件。

![](https://nijialin.com/images/2022/GTM/11whereisroottrigger.png)

亦或是你還沒建立畫面，可以找 GTM 主畫面中選擇左邊的`觸發條件`來建立你的 Root Trigger。

## 針對特定按鈕想追蹤怎辦？

![](https://nijialin.com/images/2022/GTM/121findclass.png)

假設我看看部落格左邊的欄位是否有人來按，滑鼠滑過去右鍵檢查，先找看看 id 或 class，且盡量以 id 為主，因為他是唯一值，在觀察流量上才會更準確。其次當然 class 也可以，不過同一層欄位可能就會一起被觀察到，但若像我一樣沒差的話那就沒問題嚕！

![](https://nijialin.com/images/2022/GTM/122addevent.png)

到變數的地方，右邊可以`新增`來建立一個變數，因為 class 需要另外建立。
![](https://nijialin.com/images/2022/GTM/123addclassevent.png)

按造圖片上的內容，我們來把變數的地方放入 class 的數值。

![](https://nijialin.com/images/2022/GTM/124addnewtriggerevent.png)

建立完成變數之後，回到`代碼`的地方，去針對想監聽的 event 中去選上，然後數值在變數那已經設定過了，這邊就不用再多跑一次嚕！

## 大功告成！

![](https://nijialin.com/images/2022/GTM/125done.png)

到了這邊基本上只要按右上角提交之後就完成啦，而接下的部分就是有關於要怎麼測試 GTM & GA 到底有沒有實際成功，但因這篇幅實在太長了～測試的部分留給下一篇吧！

## Q&A

### 以前我都要放 UA-xxx，那現在我 GA 要放哪？(G-xxxx)

只要 GTM 裡面有設定觸發之後打到對應的 GA 後，就不用管現在的 G-xxx 追蹤碼了，因為當 GTM 觸發之後他就會把相關流量打給 GA，因此給工程師 GTM 追蹤碼之後就可以開始進後台做事啦：）

# 結論

# 參考好文

- [GTM 是什麼？入門必看的 Google Tag Manager 代碼管理工具設定教學！](https://doordata.tw/blog/gtm-tutorial-for-beginner)
