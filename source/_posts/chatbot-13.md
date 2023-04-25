---
title: 'Chatbot meetup 北部 #13 at 台北商業大學 & 中部 #3 at 夢森林'
tags:
  - chatbot
  - meetup
categories: 研討會
abbrlink: 2496230010
date: 2019-10-25 16:59:43
---

![](https://i.imgur.com/P3F7Xjp.png)

# 前言

大家好，我是 NiJia，很榮幸被邀...是本來就負責 Chatbot meetup 的 Co-organizer，連續兩天參加了 meetup 真的是揮灑自己熱情兩邊跑(好 High)，希望藉由社群的分享讓大家可以吸收到不同的新知！

- 北部小聚 #13 連結: https://chatbots.kktix.cc/events/chatb13ts
- 中部小聚 #3 連結: https://chatbots.kktix.cc/events/chatbots-taichung-003
- 共筆: https://beta.hackfoldr.org/chatbot/

這次活動場地感謝 溫明輝 教授幫 chatbot 借了台北商業大學的場地，而台北商業大學最近有跟 LINE PROTOSTAR 聯合舉辦了 ”LINE Chatbot 對話機器人設計大賽”，覺得自己的機器人不錯嘛？歡迎大家踴躍報名參賽哦！

# 北部小聚 in 台北商業大學

## LINE Platform Update 201910 - Evan Lin

<script async class="speakerdeck-embed" data-slide="1" data-id="36b3e28d2a3f4e489250cbe7d84234a4" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

長期支持 Chatbot 社群的 [Evan 大大](https://www.evanlin.com/chatbot13/)為大家帶來陣子 LINE 的更新內容，像我這種開發者最期待的就是 LIFF v2 終於上線了 🎉，當中增加了很多種應用讓嗷嗷待哺的工程師們終於可以生出更多種不一樣的應用啦，

- 外部瀏覽器上使用 LIFF 🎉
- 兼容 Login v2.1，取得使用者基本資訊
- 可掃描 QR code
- 在 LIFF 的 webview 下可獲取使用者的 OS/Language/AccessToken 等等的內容

詳細參考: https://engineering.linecorp.com/ja/blog/liff-v2/

試玩新功能：
![](https://i.imgur.com/zHx9RcBm.png)

## LINE Bot 上的表單驗證、搜尋以及分頁 - 郭佳甯

### [簡報連結](https://docs.google.com/presentation/d/1MNCbVIsMoLAWtPjg22e1-_3PLA2OpyHKSAIvw53Vdsk/edit#slide=id.g654c56bcd3_0_5)

身為卡米粉的我終於再度聽到卡米哥的議程啦，這次介紹的是從 COSCUP 之後一直更新的 [kamigo](https://github.com/etrex/kamigo)，並完全使用這個套件做的寵物協尋機器人，此議程就已這隻機器人為主體介紹。

在實作網頁的過程中最長需要弄的東西不外乎就是表單驗證、搜尋以及分頁，因為 kamigo 是讓使用者經由 LIFF 幫忙將表單回傳成一份 JSON 至使用者的的對話欄上，
再轉介給 controller 去解析並儲存進資料庫，但若使用者在操作的過程中少輸入會不會一樣送出？
此時 kamigo 透過 rails 原生既有的 `validates` 來驗證表單欄位內容，並藉由 Turbolinks ajax + js.erb 讓表單在送出時先透過 ajax 打到後端驗證，若驗證失敗後則回傳告知 LIFF 哪個欄位有問題，這個方法也讓我使用到這個套件的[肌肉仔](https://github.com/louis70109/muscle_man)可以透過 rails 的鬼神方法幫我驗證表單，如此一來在表單的確認上就沒問題啦！🎉

順手捐星星，救救卡米狗: https://github.com/etrex/kamigo

## 不懂開發也能建立屬於自己的 Chatbot - 白凱仁

<script async class="speakerdeck-embed" data-slide="1" data-id="4386dd5577e74e528b353d1f56c8a201" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

接著由 Cloud Native Taiwan User Group Co-organizer - Kyle Bai 為大家帶來講題，藉由故事的敘述讓大家知道他是為甚麼啟動這個 idea 出來，並靈活運用圖片演示對話流程(筆記)，並因為打遊戲的困擾決定做一個機器人來解決朋友問題，運用 container 的技術來封裝 chatbot App，再用 k8s 透過 N 台機器來管理 container 讓它獲得不死之握能力，確保服務的可用性與延展性。

最後再透過 live demo 的方式讓會眾們一飽眼福，若是對於 Cloud Native 相關技術有興趣的朋友別忘了[加入社群](https://www.facebook.com/groups/cloudnative.tw/)，或是你已經有相關主題遲遲沒地方講？趕快搭上線讓你有舞台可以發揮 😎

## 閃電秀

這部分就參考 Evan 大大的[文章](https://www.evanlin.com/chatbot13/#閃電秀)

- Afore: 如何用 Chatbot 說 921 故事
- 謝化挺: 921 Chatbot 開發心得
- C.T Lin: 介紹即將發佈的 Bottender v1
- kevin: 宣傳 DevFest 活動
- Demo: FunWater - It’s time to rethink about the “single-use plastic” product.

# 中部小聚 in 夢森林

## LINE Pay 串接全紀錄 - KoKo

身為通勤學的作者也是自由工作者的 KoKo 每次都熱情參加 Chatbot 的活動 👏，本次邀請來帶大家認識 LINE Pay，透過詳細的介紹 LINE Pay 帶著大家一步一步做並提醒大家當中需要注意的部分，有部分的會眾是金融相關背景也特地來了解 LINE Pay 的各種機制，透過 KoKo 解釋後讓會眾更清楚裡頭眉眉角角，此時真的是感受到滿滿的熱情，講者跟會眾踴躍的討論也讓整個活動更活絡，想了解更多議題的歡迎來許願或是來當講者體驗一下中部人真正的活力啊！

## serveo 讓你用 Docker 開發 chatbot 也能過的去 - Jimmy

COSCUP 就來擔任 Chatbot Taiwan 講者的 Jimmy，本次來分享他包起來的 servo 的容器服務，主要原因是因為在開發機器人時大家都習慣用 ngrok，只是每次都要重新執行重新貼到 LINE Bot 或 LIFF 上，如此繁雜的步驟現在只要透過 container 以及自定義的 DNS 每次只要 docker 啟動後 Domain 啟動後即可開始寫機器人，根本不需要再進後台重新填寫，只能說工程師沒有極限啊！

透過 Jimmy 將 serveo 打包的 container 就不會有連線不穩定的問題(我有經歷過 🤣)，這邊需要注意的問題 serveo 有 ssh 連線數的問題，但一般來說在開發人數不會太多，這樣理論上已經很夠用了～

若對這服務有興趣的話：https://github.com/taichunmin/docker-serveo

## 閃電秀

### 感謝 Flex Simulator 拯救了我 - 陳佳新

身為中部負責人的佳新，介紹 LINE 的工具 - [Flex Message Simulator](https://developers.line.biz/console/fx/)，因為應用大量的 flex message 在自家產品「彰化旅行+」上，透過 LINE 的工具讓我們使用 flex message 上能夠叫得心應手。

### ChatBot 製造 ChatBot - EJ Lin

近期加入 chatbot 志工的 EJ 製作了一個可以透過 chatbot 管理 chatbot 的服務，將使用者所註冊機器人的 secret 以及 token 放入後，就能訂閱 ptt 特定作者的文章，當作者只要發文就會透過 push message 通知訂閱的人，若這邊 500 則免費訊息用完的話就建議使用者在開新的 🤣

### 肌肉仔更新啦 - NiJia Lin

最後則是我前一陣子分享過的健身記錄機器人-[肌肉仔](https://github.com/louis70109/muscle_man)，引入了最新更新的 flex message 站牌樣板，讓健身者在訓練的每筆紀錄變得更漂亮，讓健身者可以像是公車一樣一步一步的往下一站走！

肌肉仔還是會持續更新，有興趣的朋友別忘了幫小弟按個星星 ⭐️ 鼓勵我繼續前進 😃

- 連結：https://github.com/louis70109/muscle_man

# 結論

臺北臺中連著兩天舉辦真的是很累，但是看到大家踴躍的互動讓我覺得不虛此行，接下來還需要大家的熱情支持，讓我們繼續辦下去 🚀

---

Chatbot Taiwan 在台北、台中皆有一個月一次的定期聚會，致力於提供並討論聊天機器人的相關應用，每回小聚將安排講者主題分享、新知討論，環繞 Chatbot 與 AI，及大家共同關心的話題。歡迎大家踴躍分享、自由與會眾交流，同時也期望大家可以在分享中得到收獲。

歡迎各位報名、推薦講者以及閃電秀，介紹自己開發的 chatbot 並分享 chatbot 相關的議題，若有相關需要合作歡迎與我聯繫 https://m.me/linnijia。
