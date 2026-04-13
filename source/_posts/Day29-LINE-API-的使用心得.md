---
title: Day29 - LINE API 的使用心得
tags:
  - LINE
  - chatbot
  - richmenu
categories: 2019鐵人賽
abbrlink: 264701470
date: 2019-10-13 21:08:19
---

- Imagemap
  - 這邊以微股力為範例，這隻機器人會再回應的時候輸出一張圖片讓使用者看到股票的曲線圖，然後圖片下方做三個類似按鈕的圖片在上面，再藉由設定觸發訊息在座標上，當使用者按到的時候就很像再按按鈕，更多使用方法或是 UX 上的問題可以參考 [UX 三刀流](https://www.facebook.com/uxerlab/)。
    ![](https://i.imgur.com/A0yDTJm.png)
- Richmenu
  - Richmenu 等於把 imagemap 活生生的塞在下面，讓使用者再進聊天室時就能馬上看到圖片並按下對應的區塊而不用再輸入指令把 Imagemap 叫出來，如此就少了個步驟了，並讓開發者可以有更多的發揮空間呢！
- 設計工具

  - [Bot designer](https://developers.line.biz/en/services/bot-designer/)
    這個工具是桌面版，可以直接抓下來在本地端直接設計，
    ![](https://i.imgur.com/dDMSCXu.png)
    ![](https://i.imgur.com/c2pYpFx.png)
  - [FLEX MESSAGE SIMULATOR [β]](https://developers.line.biz/console/fx-beta/)
    它有提供[線上工具](https://developers.line.biz/console/fx-beta/)讓大家可以在線上直接測試樣板或是直接刻自己想要的樣板。
    - 使用心得：因為寫 Rails 基本上就是在寫全端了，難免會碰到 CSS，身為一個後端工程師排版，一定要用 flex 這個超級毒品(\吸起來/)，接著過了一段時間後接觸到 LINE bot，且 flex message 也是基於 [Flexbox](https://www.w3.org/TR/css-flexbox-1/) 的規格去實作的，所以很多排版上觀念都很像，也就不太會有障礙了 😁。
      且在排版上還有表格告知你什麼 component 要在什麼區塊內才能用，多佛心啊～
      ![](https://i.imgur.com/Fowpoyb.png)
      ![](https://i.imgur.com/zELPSA0.png)

- API 文件
  - 在最近幾個月的時候 LINE 的文件有改版，讓某些 API 可以在線上就能測了，看起來是滿讚的，若在逛文件時碰巧想測試這些功能的話可以直接把相關參數放進去，在某些時候也是滿方便的。
    ![](https://i.imgur.com/CuFdmcH.png)
- LIFF (LINE Front-end Framework)

  - 個人覺得他讓 Bot 的發揮功力又更上一層樓了，以前很多開發者都會覺得在與機器人對談中會有很多東西是不好做的，像是購物車的流程，若使用者在流程中按了上面的按鈕的話可能會發生無法預期的錯誤，且得用其他的服務去儲存操作狀態，在開發上就很麻煩，那 LIFF 就讓這個流程可以簡單許多，且能透過 SDK 在網頁上取得使用者的資訊，讓網站再被使用的同時還可以確認身份。

- 推播 500 則
  - 在今年 OAuth 2.0 釋出當中推播則數也跟改動了，改成 500 則後其實看到不少的使用者在跳腳怎麼改成這樣，或是另類的變貴收費，只能說 LINE 也是要找方法收點費用呀，不然很多功能爽爽用他們也沒有地方去收費，這部分因為我也是少用，推播功能就都交給 `LINE Notify` 嚕！
- 客服與機器人的切換
  - 參考 C.T Lin 大大的文章 [Day10](https://ithelp.ithome.com.tw/articles/10220717)，簡單來說 Messager 可以在機器人處理不來的時候將訊息轉丟給設定的那位管理員，讓他來回覆訊息，但 LINE 在機器人上只能透過網頁去切換機器人狀態，抑或是自己設計流程讓機器人在無法處理才通知管理員，這樣的話管理員很容易錯過黃金的第一時間，可能也會因此造成使用者的不便。
- 個人的 mur mur 🤣

  - 文件實在是太瀑布式了，雖然現在都懂的如何搜尋到相對應的功能，但若一般想開發的使用者在看到這個文件時瘋狂往下滑，結果發現還沒有滑到或是滑過頭，倒是找資料時氣得要死 😓，所以若是文件能夠分個頁籤什麼就更好了～

## 結論

當然整體來說還是很喜歡使用 LINE 這個平台(絕對不是因為熊大 🐻)，東西也不會像一開始在開發時什麼都找不太到，並且功能一直 release，讓服務可以透過不同的整合方法去達成目標，接下來 LINE 應該還會再繼續釋出不同的東西，就請大家拭目以待，或者...來參加[ chatbot 小聚](https://www.facebook.com/groups/chatbot.tw)直接問問 LINE 的傳教士如何呢 😁
