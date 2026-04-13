---
title: 'Chatbot meetup #14 與 #15 小聚心得'
tags:
  - chatbot
  - meetup
categories: 研討會
abbrlink: 1641980869
date: 2019-12-22 20:48:54
---

![](https://i.imgur.com/9sLr17Z.png)

# 前言

大家好，我是 NiJia

下半年度辛苦來參加小聚的各位了，最後一季場地一直變更，因為每次小聚都有熱情的夥伴提供場地給小聚，也一起尋找最適合各位的一個場地，若造成困擾小弟深感抱歉 <(\_ \_)>

2019 年度活動資訊請參考 ➡️[Chatbot Taiwan GitHub](https://github.com/Chatbot-Taiwan/meetups/blob/master/taipei/2019.md)

# 小聚活動 & 簡報連結

## [meetups 14](https://chatbots.kktix.cc/events/meetup-014)

- [參考共筆](https://hackmd.io/@chatbot-tw/meetups-014)

| Topic                                            | Speaker           | Link                                                                                                                                                                            |
| ------------------------------------------------ | ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| What's new in LIFF v2 and TECHPULSE 2019 preview | Evan Lin          | [link](https://speakerdeck.com/line_developers_tw/whats-new-in-liff-v2-and-techpulse-2019-preview?slide=2&fbclid=IwAR1pS22ELVfWptEmvIwn7G35uGeefPO1g6ncMfPsD0ssr7IBB6T7Q_Hbc4Q) |
| Bottender 一路走來                               | 林承澤(C.T Lin)   | [link](https://drive.google.com/file/d/1yz38IWwolgv8AQPxIpuQBfNzSaKjGQVU/view?fbclid=IwAR2IHRd6ESvCnOCu-hleFvM-K1RTMT4l65ShoWB852XWhQ-wUj_ikegmnzw)                             |
| 如何使用 kamigo 快速開發 LINE bot                | 林家煜(NiJia Lin) | [link](https://www.slideshare.net/JiaYuLin6/kamigo-reviews-20191127-198374007?fbclid=IwAR1bkzmaOO5_tOBxNf9G5WVLboghJp6Mbl1G5wkOxPLk7RzOm707dNefd_M)                             |

## 心得

當時 LIFF v1 只能透過 Deep link 的方式讓很多需要 Web view 的動線設計上增加了許多困擾，而在 v2 上線後改善了這方面的問題，且也對外公布支援 Query string 讓開發者可以帶參數進去(雖然之前就已經在偷用了 😆)，雖然很不幸的因為 iOS 的政策問題導致 Scan QR code 的功能在接下來的版本硬生生被拔除，但整體下來其實 LIFF v2 對於在 LINE 上開發功能的朋友可以更有彈性的去應用了。

> [iOS 政策問題參考](https://developer.apple.com/app-store/review/guidelines/#third-party-software)

![](https://i.imgur.com/BtY1sLS.jpg)

Bottender 是在某次小聚聊到時才知道原來有這麼酷的開源專案，我覺得最特別的除了可以支援多平台之外，就是 `console` 模式了，像我最近做的 [ABL 台灣隊賽程機器人](https://github.com/louis70109/Taiwan-ABL-games)就只使用到純文字的功能，在`console`模式下很快速的就把功能弄好，部署時只要把相關 `Key` 放進去功能就完成了，這部分是真的很驚艷 😆
上週去參加 GDG Hackthon 時介紹給其他寫前端的朋友使用，從來沒寫過後端的他們也覺得使用上真的很快就上手，所以有寫`Javascript`的朋友不妨參考試試囉！
![](https://i.imgur.com/xMpRkLM.png)

當初因為訓練時沒有一個可以幫我儲存記錄的地方，因此想到想做 LINE bot 來解決我的問題，但同時我又不喜歡處理一大堆 JSON 的問題，因此選用 [Kamigo](https://github.com/etrex/kamigo) 作為我開發 bot 的框架，除了框架幫忙轉打請求轉到對應的`controller`讓我不用寫一堆`if` `else`以外，最好用的功能就是 `Kamiflex` 了，當我們在 [Flex Message Simulator](https://developers.line.biz/console/fx/) 弄了一堆 JSON 出來時，同時我們需要從資料庫拉資料出來組裝產生大量的 JSON，在組裝時程式碼會很髒亂，所以使用 Kamiflex 來幫忙轉譯讓我在寫 Flex message 時可以更像在寫 Ruby code，讓整個 JSON 可能幾千行瞬間被濃縮成 100 行時這段 Flex message 在維護時也能更好的維護。
![](https://i.imgur.com/4boRPgr.png)

### Kamigo 流程

```sequence
User->LINE: message
LINE->Route: webhook
Route->Kamigo: event notify
Kamigo->Controller: send params
Controller->View: send DB data
View->Kamigo: generator flex template
Kamigo->Route: send template
Route->LINE: response
LINE->User: reply
```

- [meetups 15](https://chatbots.kktix.cc/events/meetup-015)
  - [參考共筆](https://hackmd.io/@chatbot-tw/meetups-015)

| Topic                                           | Speaker    | Link                                                                                                        |
| ----------------------------------------------- | ---------- | ----------------------------------------------------------------------------------------------------------- |
| LINE Push / Message 開發經驗談                  | Caesar Chi |                                                                                                             |
| 邊緣人救星！用 Laravel 打造私人定製的聊天機器人 | 李小胖     | [link](https://docs.google.com/presentation/d/1ImrH_2IziPceVnfHrTYTf8g3AivxQ3s4sNHkSQf6aBY/edit#slide=id.p) |
| Chatbot builder                                 | Penny Sun  | [link](https://speakerdeck.com/line_developers_tw/automl-in-clova-chatbot-builder-framework?slide=56)       |

## 心得

我平時就有在看一些社群行銷朋友分享他們是如何對行為下標籤`tag`以及發放對應內容給使用者進而提升購買力，在 Caesar 大大的快速了解到這些商業行為背後的開發經驗為何，從設計到大量推送所需注意的問題以及服務器之間的溝通問題...在這次的議程中讓我學到很多付費內容才會聽到的題材，讓我對於 Push message 這件事情的做法與思路又重新被教育了一次 😆
![](https://i.imgur.com/GqSiAmh.jpg)

這次要請到一個月有一半時間都在參加小聚的小聚王小胖來為各位分享如何用`Laravel`做一隻專為自己客製化的機器人，雖然 Live demo 過程中了魔咒，好險後來也解決的一些 live demo 才會遇到的問題 🤣，總之若有使用 php 的朋友歡迎參考簡報哦～
![](https://i.imgur.com/z2WgJvD.jpg)

最後由 LINE 的資料工程師-Penny 為我們帶來在 LINE techpulse 上的議程，從介紹中 NLU 部分看起來功能會像是 `Dialogflow` 一樣，而在其他的部分則是提供一個介面讓使用者可以更快速的在網頁上設定自己想要的機器人樣式，只是目前功能只提供給合作的商家，期待未來 release 時的效益 🚀
![](https://i.imgur.com/rdAzlEu.jpg)

> 官方帳號已經有套用囉！想收到啲一手資訊或是想玩玩的朋友可以掃描加入 👾

![](https://qr-official.line.me/L/9AirZgJAgb.png)

> 所有小聚資訊接收藏在 -> [Chatbot Taiwan GitHub](https://github.com/Chatbot-Taiwan/meetups) 上哦！

# 閃電秀

## 14

| Speaker | Topic                               | Link                                              |
| ------- | ----------------------------------- | ------------------------------------------------- |
| 陳佳新  | LINE Beacon，數位導覽的小幫手！     |                                                   |
| Eric    | Flex box, 一起收集分享 Flex message | [link](https://github.com/eric0324/flex-box)      |
| 徐郁涵  | 食農飽可夢                          |                                                   |
| 郭佳甯  | 午餐隊長                            | [link](https://github.com/Yoctol/leader-of-lunch) |

## 15

| Speaker | Topic                           | Link                                                                                             |
| ------- | ------------------------------- | ------------------------------------------------------------------------------------------------ |
| Calvin  | LINE Beacon，數位導覽的小幫手！ | [link](https://docs.google.com/presentation/d/1a8Yaf_315mb4u8BcIvs6TqyNYkDiRR-T7mxNAnOuQCE/edit) |
| JT      | ChatOps & Rasa                  | [link](https://slides.com/jimting/chatops_and_rasa#/)                                            |
| NiJia   | ABL 台灣隊查詢機器人            | [link](https://github.com/louis70109/Taiwan-ABL-games)                                           |
| 郭佳甯  | Bottender & Kamigo 介紹         | [link1](https://github.com/Yoctol/bottender)、[link2](https://github.com/etrex/kamigo)           |

## 短評

除了內容豐富的主議程外，閃電秀就是在每個社群最特別的部分了，從每次的閃電秀中都讓我對於 side project 的想法又重新被定義了一番，常常會看到很多不同的應用情境以及特殊的用法，歡迎大家踴躍報名閃電秀來互相交流，多方交流或許有機會蹦出不一樣的想法並讓機器人的其他用途 😁

# 結論

在舉辦每次的小聚活動都希望可以給每個來的朋友最豐富的內容，以及提供 Lighting talk 的舞台讓有作品的朋友可以上來分享，而最近有與其他社群的朋友聊到，發現似乎把議程塞太緊，導致影響到會眾與講者交流以及回家休息的時間，所以之後的小聚改善這個狀況並調整時間，再麻煩大家多支持 [Chatbot Taiwan](https://www.facebook.com/groups/chatbot.tw)🚀🚀🚀
