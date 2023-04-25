---
title: >-
  2019 LINE Dev Day - 議程心得(1) - Seamless device migration using LINE secure
  backup
tags:
  - LINE
  - Dev Day 2019
categories: 研討會
abbrlink: 3420766478
date: 2019-11-21 14:58:09
---

# Seamless device migration using LINE secure backup
![](https://i.imgur.com/IWGmnvQ.jpg)

簡報連結: [LINE Dev Day 2019](https://speakerdeck.com/line_devday2019/seamless-device-migration-using-line-secure-backups)

# 前言
大家好我是 [Chatbot Developer Taiwan](https://www.facebook.com/groups/chatbot.tw/) - NiJia，這次被 LINE 邀請來參加 LINE Developer Day 2019。
經由 每位負責人的 Keynote 開場完後就是會眾們開始聽議程的時候了，我選擇跟資安相關的主題來開始我今日的第一場議程，想想在接觸資安時還是大學時期呢(遠望)。

# 心得
開場不免俗的一定是要自我介紹並說主要大綱，講者本身為一個駭客並是 [Side-Channel Marvels](https://github.com/SideChannelMarvels) 成員之一，在 GitHub 上坐了一個逆向工程的工具 - [QBDI](https://github.com/QBDI/QBDI)。而作為一個 Hacker 破壞當然對他們來說是相對簡單，但換個方向來看，就是透過滲透測試來建立更完整的服務內容，的確在真實世界上要摧毀一個服務是相對容易的！

但講者是在 LINE 這種規模較大的公司裡做滲透測試，在滲透後做完測試報告時需要顧慮到其他開發團隊的工作時程問題，也許這個漏洞在實際服務運轉上的容錯率是相對高的話，就可以讓開發團隊安排時程去修補漏洞而避免延遲產品上線時間。
 
 ![](https://i.imgur.com/r60FVBM.jpg)

這邊主要提到一些 **加密協定原則** 以及傳統訊息傳送都是怎麼做。
![](https://i.imgur.com/wJHnXMz.jpg)
接著說到帳號轉移裝置時的問題，今天要從舊的裝置備份到新裝置時，若透過 Server 的話他只有加密過後的資料，如此一來根本無法備份過去，而 end-to-end 的備份的話會遇到以下問題：
- 會受到各種通訊協定的問題(wifi, Bluetooth, NFC...)
- ios - andriod 不同裝置相容性問題
- 需要重新建構訊息模型
- 要怎麼處理來自 parameter 的攻擊
  - Hacker 透過中間人攻擊
  - 會透過各種狀態來找尋漏洞 (BGP, DNS, Certificate PKI...)

## UX x Security
前面簡單介紹一些備份上的問題以裝置間的問題，接下來就進入如何在最好的使用者體驗上並擁有資訊安全：

### 若要最好的使用者體驗 - Best UX
![流程](https://i.imgur.com/E3N0d5l.jpg)
- ✅不需要在意裝置間的問題
- ❌會被駭客透過中間人攻擊去塞有問題的資料
- ❌安全層級等於零

> 這樣公司就不用運作啦 (笑)

### 最安全的等級但最差的 UX
![Best security](https://i.imgur.com/RFkmVAE.jpg)
- ✅Private key 加密過並且擁有最難破解的密碼
- ❌使用者根本記不得這密碼
- ❌密碼過於複雜

> 這邊講者有補充若是只有六位數的密碼他大概有 **一百萬** 種可能性，可以透過暴力破解的方式就解決，且有大約 **10%** 的密碼是重覆性很高的，因此還是建議擁有大小寫以及特殊符號是相對好！

每天都會有弱密碼出現於生活中
- combination padlock
    - 硬體設備都用很弱的加密協定
- Banking card PIN
    - 很容易出現像是 **生日** 這類的密碼
- smart phone lock screen
    - 使用者求快 
    - ARM trustZone / apple secure

## Server Side 相關相關加密元件
- [Trusted execution environment(TEE)](https://en.wikipedia.org/wiki/Trusted_execution_environment): 保護 process 相關
- [Trusted Platform Module(TPM)](https://en.wikipedia.org/wiki/Trusted_Platform_Module): 微控制器相關加密元件
- [Hardware security module(HSM)](https://zh.wikipedia.org/wiki/%E7%A1%AC%E4%BB%B6%E5%AE%89%E5%85%A8%E6%A8%A1%E5%9D%97): 一種用於保障和管理強認證系統所使用的數字金鑰，並同時提供相關密碼學操作的電腦硬體裝置。

## HSM in backups
接著就介紹是如何透過 HSM 的硬體元件來處理備份資料資安的問題
![](https://i.imgur.com/CSkYEHD.jpg)
透過硬體(HSM)來幫忙加密確保每一段上傳下載都是安全且可加解密，使用者在這過程中也不需要輸入一大串的密碼就只顧及資訊安全而放棄 UX，而在 HSM 當中會將私鑰安全的存下來，不用擔心會有被攔取之類的問題。

由於 HSM 經過雙重加密認證達到資訊安全且是安全的儲存下來，因此不會因為被抓到之後就馬上被解開，確保整個資料傳遞上的安全性。

![](https://i.imgur.com/A6Mo2mw.jpg)
上圖則為 HSM 簽證公鑰的註冊流程，經由一連串的加密把它存成二進制 source code，且裝置還是能使用 public key 來解開這個二進制檔案，如此一來在備份到新裝置上就不用擔心整包資料的安全性了！

# 結論
我們在實作的網站在沒什麼流量時都不太需要注意資安相關，但當系統請求越來越大或是有金流時在每段的加解密終究都相對重要很多，且在建立 UX 以及 Security 之間要如何平衡也是個重要的議題，如同講者說的，在做這些技術的同時且站在巨人的肩膀上(LINE)對於白帽駭客的成就感是源源不絕的，能夠透過滲透來讓我們每天在用的東西更加完整也是很棒的一個作法😊。

而過往在聽駭客朋友們在聊都是在講 [WAF](https://www.techbang.com/posts/1826-waf-web-host-bridge-is-falling-down) 較多是在講 Web application 相關的，這次聽到的 HSM 功能看起來雖然很相似，但看來是叫專注在資料的加解密當中，或許當中應該還有更深入的功能還未提到，透過這個議程認識到新的東西也是一大收穫😁。
