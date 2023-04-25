---
title: "Chatbot meetup #12 心得分享 - 2019/09/17"
tags:
  - chatbot
categories: 研討會
date: 2019-09-12 14:52:43
---

# 前言

本次小聚是 COSCUP 之後的第一場，趁著熱血玩兩個大型研討會的空檔舉辦了這次的小聚，先感謝各位的參與，別忘了定期關注社群，我們會在上面放出第一手 chatbot 小聚消息。
[Chatbot Developers Taiwan](https://www.facebook.com/groups/chatbot.tw/?ref=bookmarks)

# 小聚開始

開場由 Evan Lin 為大家帶來 LINE 的第一手消息，首先是 LINE 不在信義區啦(抓錯重點)，是 Flex message 更新啦 ，如下圖所示，他可以做出更多種不同的應用了，也有些實例可以供大家參考 🎉

![](https://i.imgur.com/sxEd0Fd.png)

[Flex Messages](https://developers.line.biz/en/docs/messaging-api/using-flex-messages/?source=post_page-----65999085f029----------------------)
另外出了一個模擬器，如果再使用 Flex message 不是太熟悉整個主體的話可以參考 ⬇️，目前還在 beta 階段，若有問題直接寫信去 “問候“ 一下 🤣
[Flex Message Simulator](https://developers.line.biz/console/fx/)

> 中文版的文件也上線了，可以到官網去搜尋哦！

# 議程

> [簡報連結](https://docs.google.com/presentation/d/1QS1Esc-kvPK2x-Ys1oS4ucWVQOOggcEUxbnj3V1vi_I/edit#slide=id.p)

第一位由 LAE — 郭冠宏 (ggm)為我們介紹 Confacts 訊息查證系統，在裡頭把使用者分為兩類

- 收消息的人 🙋‍♂️
- 編輯訊息的人 👨‍💻

在上面看得到的資料都是透過 「工人智慧」誕生的，所以看到每一個真假消息都要歸功於這些編輯們 🎉
而 Confacts 也秉持的 g0v 開放原始碼的精神把東西都 open，供大家去使用，像是 美玉姨 以及 趨勢科技防詐達人 都是使用他們的資料庫建立出來的，如果有需要請去找 GGM 大大～
上次參加 g0v 小聚有稍微了解 Confacts 是做什麼的，聽到這次的講題就讓我更深入了解整個運作流程了，光想到要控制狀態就覺得苦惱，也因 Confacts 讓我瞭解到更多詳細流程～以下是他們的網站，討厭看到人家亂轉發消息嗎？直接加入消息並一起打造工人智慧的平台～
了解更多: https://cofacts.g0v.tw

---

接著由 酮好的創辦人 撒景賢 為我們帶來 聊天機器人與社群經營，主要是透過機器人來幫忙定時推播訊息給讓使用者下單後會收到提醒訊息而不會跑單，也建議大家把機器人就定義他為機器人，別讓使用者誤會他是一個活生生的人，要定義好自己的機器人取向，最後提到了一個問題就是他認為工程師的毛病就是想要產品做完才去找市場，可能的意思是且戰且走(?)，或許直接吸收市場的經驗也是個不錯的方法(筆記)。

---

再來就是台北商業大學的 溫明輝 教授為我們帶來 商用聊天機器人 UX 的十三種設計原則

> [商用聊天機器人 UX 的 13 個設計原則 (heuristics)](https://medium.com/uxerlab/13-heuristics-for-commercial-chatbot-ux-design-58c1aa191c77)

首先介紹了微股力與記帳雞上面應用中的實例以及一些與使用者互動的案例分享，兩隻機器人都被 LINE 收為官方帳號囉！有興趣的朋友可以去搜尋一下～ 🔍

1. 確認目標族群的關鍵需求：要找到用戶滾動增長的點
2. APP 的成功是無法直接複製的：找到 app 上的缺點去卡市場定位點。
3. 人們可能並不想「聊天」：這邊分享的案例是讓 記帳雞 出來湊人鬧目的是讓使用者記得他並去引導記帳 。
4. 擬人化 vs 機器主張定位：若在一開始實作時是以特定主題去做開發的話就該讓他是對應功能機器人，別想著機器人可以做原本的事又要去回應使用者的任何話。
5. 對話是互動並不限於對話(dialog)：有時候適時地在圖片上加入一些訊息也能讓使用者去自然觸擊。
6. 讓使用者隨時握有主導權：因為人們可以隨時關掉它，就也意味著使用者的抗拒心不會那麼大，主要還是別讓使用者封鎖他～
7. 不一眛追求介面的簡潔性：根本的需求滿足之後使用者還是會去用，把互動愉悅感弄出來，這邊例子是放在群組使用久了，有些使用者會自然地去記憶這他的指令。
8. 考量對話訊息的時間堆疊：使用者因為訊息過多而演變成去點訊息已成敷衍的行為了。
9. 避免一視同仁的廣播訊息：這邊分享的做法是透過工具去紀錄使用者的互動軌跡，且每個每個感應區塊都會有相對應的 tag，當後台在準備做推薦時可以針對分眾去做對應內容的推播。
10. 用數據驅動的同理心：將機器人加入群組並紀錄使用者打過的指令，當今天已經封鎖的使用者在特定情況下看到群組裡面有其他使用者在打相關指令時或許會勾引出以前的興趣藉此解除封鎖並回歸。
11. 用 UI 來補償 AI 的能力極限：藉由專家寫的文章以及當使用者點選到特定的內容時會直接把文章透過 LINE 嵌在訊息下方，讓使用者透過 UI 去看到相關內容，讓他看起來有點類似 AI。
12. 個人化是 chatbot UX 極致：或許是因為客製化的關係所以當然個人化是最好的 🤣
13. chatbot 是無所不在的意識：隨著運算越來越快，人可以隨心所欲去取用環境資訊，需要有個個人化服務，就能透過 chatbot 來搜集並歸納出對應的訊息內容。

# 閃電秀

最期待的其中一個部分就是閃電秀啦，因為每次閃電秀不僅可以展謝自己的練習成果，也可以發現到其他使用者對於同樣開發內容所想出不一樣的應用！
第一個由 斑斑 為大家帶來市容幫手，主要是因為現在各種公家機關幾乎都用 LINE 在做聯繫，但一個里長擁有上百個群組會造成很多收集訊息上的困擾，那這邊講者就希望透過提案的方式來尋求參與者一起參與這個提案，有興趣的可以參考一下他的簡報哦！

接著就是由小弟我帶來的閃電秀，這次主題是使用 kamigo 打造的一個紀錄健身記錄的機器人，透過 Restful 格式的內容以及對應網址的樣式做出一個類似網頁版的機器人來記錄成績，以下是我的簡報以及 Github，有興趣可以參考一下 😃

<iframe src="//www.slideshare.net/slideshow/embed_code/key/jmxmRbp1QcYgHB" width="595" height="485" frameborder="0" marginwidth="0" marginheight="0" scrolling="no" style="border:1px solid #CCC; border-width:1px; margin-bottom:5px; max-width: 100%;" allowfullscreen> </iframe> <div style="margin-bottom:5px"> <strong> <a href="//www.slideshare.net/JiaYuLin6/muscle-man-light-talk-20190917-in-chatbottw" title="Muscle man light talk 20190917 in chatbotTW" target="_blank">Muscle man light talk 20190917 in chatbotTW</a> </strong> from <strong><a href="https://www.slideshare.net/JiaYuLin6" target="_blank">Jia Yu Lin</a></strong> </div>
> [louis70109/muscle_man](https://github.com/louis70109/muscle_man)

這是一個基於 kamigo 實作 LINE bot 來紀錄重訓數據的 肌肉仔 聊天機器人 在健身的過程中飲食固然重要，但往往訓練的人都是透過通靈的方法來選取適合自己的訓練重量，而透過數據的記載則是突破不可或缺的因素，因此產生了這個…

再來由 Fly Chang 帶來的在宅醫療服務，主要是幫助各地需要居家醫療的人讓他們有資源可以透過地圖的方式去找到，並想整合機器人提供在宅醫療診所情報、長期照護、藥物使用、衛教資訊…等等的資訊，有興趣的朋友可以點選以下網址去觀看哦！
台灣在宅支援診所聯盟
[HSCA 在宅支援診所聯盟](https://i.hsca.me/?source=post_page-----65999085f029----------------------)是秉持開放、共享、共學精神的網路平台社群。 資源地圖邀請在宅醫療團隊提供服務資訊，讓診所服務可以變得更透明、更公開，產生正面的循環。

最後由 kevin 介紹一下有關於 dialogflow 串接 LINE bot 的簡單介紹，並順便推廣了 voice hackthon，有興趣的朋友可以參考一下哦

若是 dialogflow+LINE bot 可以參考我之前寫的文章
[Chatbot Taichung #2 工作坊心得分享](https://medium.com/@nijia.lin/chatbot-taichung-2-%E5%B7%A5%E4%BD%9C%E5%9D%8A%E5%BF%83%E5%BE%97%E5%88%86%E4%BA%AB-bc964fdc07c3)

# 結論

雖然每次下班都從台中直接殺上台北辦小聚很累，但往往在小聚結束時總是收穫滿滿，因為大家的熱情交流讓我學到了不少東西，謝謝各位的支持與參與，小弟拜託大家有報名要來啊～看在火山孝子的份上(咦？)就來參加吧 🙏
Chatbot TW 很樂意接收到不同的意見，若有好的建立不好意思公開可以私訊我哦！很樂意為大家解答 😁
