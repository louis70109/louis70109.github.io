---
title: ESP32-C6 + Fly.io 裝置管理站實作筆記：註冊碼與自動換 Key
tags:
  - ESP32
  - Fly.io
  - MQTT
  - IoT
  - API Key
categories: 技術
date: 2026-10-19 00:50:00 +0800
---

這陣子手邊的 ESP32-C6 要做一件聽起來很簡單的事：把紅外線發射的訊號、設備開關機的紀錄，通通丟到雲端存起來，然後打開網頁，一眼看出「這塊板子現在是死是活、設備有沒有在跑」。

說實話，我一開始的想法是：不就一支 API 嗎？結果越做越發現，真正麻煩的從來不是「收資料」，而是 **怎麼讓一堆板子安安全全地證明自己是誰**。Key 要怎麼塞進板子？外洩了怎麼辦？放在現場沒人管的板子，Key 能不能自己換？

這篇就是把整個過程記下來：架構怎麼選、Key 的生命週期怎麼設計、部署到 Fly.io 的細節，以及我（和 Claude Code）一路踩到的坑。先講在前面：**伺服器端已經上線、也測過了，但 ESP32 韌體我只寫了範例，還沒有真的編譯、燒進板子**。後面會老實交代。

<!-- more -->

原始碼和交接文件都放在 [GitHub](https://github.com/louis70109/esp32-fly-deployment)。

---

## 🏗 一個程式搞定三件事

需求一開始看起來像要拆成兩個服務：一個收 API、一個當 MQTT broker。我最後 **把它們塞進同一個 Node 程式**：

*   **Express**：REST API 加上管理頁面。
*   **Aedes**：直接內建在程式裡的 MQTT broker。
*   **SQLite**：事件、裝置、Key 的雜湊全部放這裡，掛在 Fly 的 volume 上。

![架構圖：ESP32-C6 透過 HTTPS 與 MQTTS 連到 Fly.io 上的單一程式，管理頁面用帳密登入](https://nijialin.com/images/esp32-hub-architecture.svg)

為什麼不拆？因為裝置少、資料量小，一台機器綽綽有餘。更實際的理由是：**MQTT 的連線事件可以直接寫進資料庫**，不用在兩個服務之間同步「誰在線上」。

**代價：只能跑一台機器。** broker 的連線狀態在記憶體裡、SQLite 又在單一 volume 上，一旦 `fly scale count 2`，你會看到裝置在兩台機器之間跳來跳去。真的要擴充，就得把 broker 拆出去、資料庫換掉。現階段我選擇不管它。

---

## 📡 為什麼同時要 HTTP 和 MQTT？

一開始我也在想，兩條路是不是太多。後來覺得它們問的是不同的問題：

|  | HTTP（API Key） | MQTT |
|---|---|---|
| 回答什麼 | 剛剛 **發生了什麼**（發射了哪個紅外線碼、開機、關機） | 它現在 **還活著嗎**、設備有沒有在運轉 |
| 特性 | 一筆一筆的紀錄，要留存 | 持續連線，斷了就知道 |
| 斷電時 | 不會有任何訊號 | 連線一斷、keepalive 逾時，broker 就標成離線 |

「板子被拔電源」這種事，光靠 HTTP 是看不出來的，因為沒人會呼叫你。MQTT 的長連線反而最適合：連上就是在線、斷了就是離線，我只要接 broker 的連線事件，不用自己寫心跳逾時判斷。

另外 broker 有做權限：每塊板子只能發布自己的 `devices/<id>/state`、`event`、`status`，也只能訂閱自己的 `cmd`。不然隨便一塊板子的 Key 外洩，就能假冒別人回報狀態，那就不好玩了。

---

## 🔑 Key 怎麼發才不痛苦

這是整件事我花最多時間的地方。

### 第一層：Key 不要寫進程式碼

最直覺的做法是把 `API_KEY` 寫在 `.ino` 裡。但這樣每塊板子都要改程式、重新編譯，而且一個不小心就會連 Key 一起 push 到 GitHub（它真的會「裸奔」）。

ESP32 有個叫 **NVS（Non-Volatile Storage）** 的東西：flash 裡一塊獨立的小空間，像一張簡單的鍵值表，斷電不會消失、更新韌體也不會被洗掉。一把 Key 才幾十個 bytes，幾乎不佔空間。所以所有板子可以燒 **同一份韌體**，Key 另外存在 NVS 裡。

### 第二層：燒進去的不是 Key，是「註冊碼」

可是還有個問題：Key 要先產生、再寫進板子，中間那份檔案或那行指令如果外流呢？所以我改成這樣：

1.  在管理頁面建立裝置，伺服器產生一組 **一次性註冊碼**（24 小時內有效、只能用一次、資料庫只存雜湊）。
2.  註冊碼寫進板子的 NVS。
3.  板子第一次連上網，拿註冊碼向 `/api/v1/enroll` 換正式的 API Key，存進 NVS。

```
POST /api/v1/enroll
{"device_id":"esp-living","code":"en_xxxxxxxxxxxxxxxxxxxxxx"}

→ 201 {"api_key":"dk_...","key_expires_at":1792000000000}
```

這樣燒錄用的東西就算外流，過了 24 小時或被用掉一次就沒用了。這個端點不需要登入（註冊碼本身就是憑證），所以我另外加了失敗次數的節流，避免有人亂猜。

**經驗談：** 伺服器永遠只存 Key 的 SHA-256 雜湊，連我自己都看不到原本的 Key。代價是 Key 只會在產生的那一刻顯示一次，錯過就只能重發。我覺得這個不方便是值得的。

---

## ⏳ Key 會過期，板子自己換

板子放在現場沒人管，Key 總不能永遠有效。但如果只是單純加個到期日，到期那天所有板子就一起失聯，那更慘。所以我做成「**有期限，但板子會在到期前自己換**」：

*   Key 預設有效 **90 天**。
*   板子每天打一次 `/heartbeat`。剩下不到三分之一壽命時，伺服器回 `should_rotate: true`。
*   板子呼叫 `/rotate` 拿到新 Key，**先確認寫進 NVS 成功，才改用新 Key**。
*   舊 Key 還會再活 24 小時（寬限期），而且 **新 Key 第一次成功使用的瞬間，舊 Key 就作廢**。

寬限期是為了一個很現實的情境：板子在寫 NVS 的時候突然斷電。如果新 Key 回應丟了、舊 Key 又馬上失效，板子就永遠被鎖在外面。有了寬限期，它重開機後拿舊 Key 再打一次 `/rotate`，就能拿到新的。

### 為什麼過期的 Key 不能自己換？

這是故意的。如果過期的 Key 還能 rotate，那一把外洩的 Key 就能無限續命。代價是：板子如果離線超過 Key 的壽命，就得由管理者在頁面按「註冊碼」重新配發。

**老實講的限制：** 自動換 Key 保護的是「舊 Key 外洩」。如果有人拿到的是 *目前* 這把 Key，他也能呼叫 `/rotate`，甚至搶先把 Key 換掉，讓真正的板子拿到 401。好處是這種情況看得見：那塊板子會突然離線，你在頁面按一下「註冊碼」重新配發，攻擊者手上的 Key 就作廢了。要防「Key 被複製走」，得靠 flash encryption 這類硬體層的保護，這篇沒有做。

---

## 🖥 管理頁面長這樣

前端就是一個靜態頁面加一點原生 JavaScript，沒有框架。帳號密碼登入後，伺服器發一個 HttpOnly、SameSite=Strict 的 session cookie。

以下截圖都是我在 **本機灌示範資料** 拍的，不是正式站。

![登入頁面：帳號與密碼欄位](https://nijialin.com/images/esp32-hub-01-login.jpg)

登入頁：帳號 + 密碼。

![儀表板總覽，顯示運轉中、未運轉、離線、待註冊、金鑰快到期與金鑰過期的裝置卡片](https://nijialin.com/images/esp32-hub-02-dashboard.jpg)

總覽：運轉中、未運轉、離線、待註冊、金鑰剩 9 天、金鑰已過期，一眼看完。

![某台裝置的事件紀錄表，列出 ir_tx、ir_rx、power_on、boot](https://nijialin.com/images/esp32-hub-03-events.jpg)

事件紀錄：紅外線發射 / 接收、開關機、開機。

![新增裝置對話框，預設勾選用一次性註冊碼配發](https://nijialin.com/images/esp32-hub-04-add-device.jpg)

新增裝置：預設用註冊碼配發。

![註冊碼對話框，顯示裝置 ID、註冊碼與換取金鑰的 API 範例](https://nijialin.com/images/esp32-hub-05-enroll-code.jpg)

註冊碼只顯示這一次，24 小時內有效。

![手機版畫面](https://nijialin.com/images/esp32-hub-06-mobile.jpg)

手機也能看（出門在外想確認板子還活著的時候很實用）。

---

## 🤖 丟給 AI 幫你寫韌體

前面講的註冊、換 Key、MQTT，如果你不想自己一行一行刻，其實可以把規格整包丟給 AI，請它幫你產生韌體。我把需要的 prompt 準備好了，直接複製就能用。

這份 prompt 有個重點：它要求 AI 把 **Wi-Fi 密碼、裝置 ID、註冊碼** 做成序列埠指令，燒錄之後自己在監控視窗輸入。也就是說，這些東西 **不需要貼進跟 AI 的對話裡**。

<details>
<summary>展開完整 prompt（點開後可複製）</summary>

````text
你是資深的 ESP32 韌體工程師。請為 ESP32-C6 寫一份「可以直接編譯」的 Arduino 韌體（單一 .ino），
讓板子連到我的 esp-hub 伺服器。請只輸出完整程式碼與簡短的使用說明，不要省略任何函式。

## 我的環境
- 板子：【ESP32-C6-DevKitC-1，請改成你的型號】
- 開發環境：【Arduino IDE 2.x + arduino-esp32 3.x，請改成你的】
- 可使用的函式庫：PubSubClient、IRremoteESP8266、Preferences、HTTPClient、WiFiClientSecure（不要用 ArduinoJson，欄位自己用字串處理）
- 腳位：IR 發射 GPIO【4】、IR 接收 GPIO【5】、開關按鈕 GPIO【9】（按下接 GND）
- 要控制的設備與 IR 碼：【例如 NEC 0x20DF10EF 當作電源鍵；不確定就先用這個當占位】
- 伺服器：HTTPS 與 MQTT 都在 your-app.fly.dev（HTTPS 埠 443、MQTT over TLS 埠 8883；請換成你自己的網域）

## 絕對不能做的事
- 不可把 Wi-Fi 密碼、裝置 ID、註冊碼、API key 寫死在程式碼裡。
- 這些值全部做成「序列埠指令」（115200 baud）輸入，並存進 NVS（Preferences，命名空間 "hub"）：
  WIFI <ssid> <password>
  ENROLL <device_id> <註冊碼>
  KEY <device_id> <api_key>      （選用：直接存金鑰，略過註冊）
  STATUS   （顯示設定；API key 只顯示前 5 碼，其餘遮蔽）
  WIPE     （清除金鑰與註冊碼）
  HELP
- 不可在 Serial 輸出完整的 API key 或註冊碼。

## 伺服器 API（以下就是全部，請嚴格照做）

所有 HTTP 都是 POST、Content-Type: application/json。

1) 用註冊碼換金鑰（不需要 key）
   POST /api/v1/enroll   body: {"device_id":"<id>","code":"<註冊碼>"}
   成功 201：{"device_id":"...","api_key":"dk_...","key_expires_at":<毫秒時間戳>}
   失敗 401：註冊碼錯誤、過期或已用過。
   → 成功後必須「先把 api_key 寫進 NVS 並讀回確認一致」，才可以刪除 NVS 裡的註冊碼。
   → 註冊碼只能用一次；若 401 就停止重試並印出提示（請使用者到管理頁面重新產生註冊碼）。

2) 之後所有呼叫都帶標頭 X-API-Key: <api_key>

3) 上傳事件
   POST /api/v1/events   body: {"type":"ir_tx","payload":{...},"ts":<毫秒時間戳，選填>}
   成功 201。type 只能是 [a-z0-9_.-]{1,40}。
   請用這些 type：boot、enrolled、key_rotated、ir_tx、ir_rx、power_on、power_off。
   - 每次發射 IR：送 ir_tx（payload 放 protocol、code、bits）。
   - 每次開機/關機：送 power_on 或 power_off。
   - 收到 IR 訊號：送 ir_rx。
   事件要先放進最多 16 筆的記憶體佇列，傳送失敗時下次重試，佇列滿了丟掉最舊的。
   ts 用 NTP 校時後的 epoch 毫秒；時鐘還沒校準就不要帶 ts。

4) 心跳與自動換金鑰
   POST /api/v1/heartbeat   body: {}
   回 200：{"ok":true,"server_time":..,"key_expires_at":..,"should_rotate":true|false}
   - 開機 20 秒後做第一次，之後每 24 小時一次（間隔可用序列埠 SET hb <秒> 調整，最小 10）。
   - 如果 should_rotate 為 true：呼叫
     POST /api/v1/rotate   body: {}
     回 200：{"api_key":"dk_...","key_expires_at":..,"old_key_valid_until":..}
     → 一定要「先寫進 NVS 並讀回確認」成功，才切換成新 key、並讓 MQTT 重連。
     → 寫入失敗就繼續用舊 key（伺服器會再通知一次）。

5) 任何 HTTP 401 的處理
   - 回應內容含 "expired"：金鑰已過期。停止所有重試，Serial 提示使用者向管理者要新註冊碼並用 ENROLL 指令重新註冊。
   - 其他 401（被撤銷或刪除）：30 分鐘後再試一次。

## MQTT（TLS，埠 8883，使用 PubSubClient）
- clientId = device_id；username = device_id；password = api_key
- keepalive 30 秒、buffer 512 bytes
- Last Will：topic devices/<device_id>/status，內容 "offline"，retain=true
- 連上後發布 "online" 到同一個 status topic（retain）
- 每 60 秒以及狀態改變時，發布到 devices/<device_id>/state（retain）：
  {"running":true|false,"rssi":<number>,"uptime_s":<number>}
- 只能發布 devices/<自己的id>/state、event、status 這三個 topic
- 連線被拒（state 4 或 5）時，呼叫一次 heartbeat 來判斷是「過期」還是「被撤銷」，一分鐘最多一次

## 其他需求
- Wi-Fi 斷線自動重連；連上後用 configTime 做 NTP（pool.ntp.org）。
- TLS：先用 setInsecure()，但在程式最上方放一個 `const char* ROOT_CA = nullptr;`，
  非 nullptr 時改用 setCACert(ROOT_CA)，並在註解標明「正式環境請填入根憑證」。
- 按鈕（防彈跳 400ms）切換「運轉中/未運轉」：發射 IR 電源碼、送 ir_tx 與 power_on/power_off、更新 MQTT state。
  註明這只是「假設設備跟著開關」，沒有真的感測設備狀態。
- 非阻塞：不要在 loop() 裡用長時間 delay。
- 程式碼要有清楚註解，並用 Serial 印出每個階段（enroll / heartbeat / rotate / mqtt）的結果。

## 輸出格式
1. 完整 .ino 程式碼（一個程式碼區塊）。
2. 需要安裝的函式庫與板子設定（例如 USB CDC On Boot）。
3. 第一次上板的操作步驟（序列埠要輸入哪些指令）。
4. 你不確定、需要我實測確認的地方（請誠實列出，不要假裝已驗證）。
````

</details>

**提醒：** AI 產生的程式沒有人替它編譯過，請自己編譯、上板測試，編譯錯誤可以直接貼回去請它修。另外還有精簡版（只做「用註冊碼換金鑰」）和給 Claude Code 這類能讀 repo 的代理版，放在 [firmware/AI-PROMPT.md](https://github.com/louis70109/esp32-fly-deployment/blob/main/firmware/AI-PROMPT.md)。

---

## 🚀 部署到 Fly.io

幾個重點設定：

*   HTTP 走 443，MQTT 走 **8883 並用 `tls` handler**，讓 Fly 幫忙終結 TLS，板子連的是 `mqtts`。
*   `auto_stop_machines = "off"`：機器一休眠，所有裝置就會顯示離線，這是最容易忘記的一項。
*   掛一個 volume 放 SQLite，並且 **只跑一台機器**。
*   管理者密碼和 session 簽章放在 `fly secrets`，不進程式碼。

```bash
fly launch --copy-config --no-deploy
fly volumes create hub_data --size 1 --region nrt
fly secrets set ADMIN_USER=admin ADMIN_PASSWORD="…" SESSION_SECRET="…"
fly deploy --remote-only --ha=false
```

部署前我會先確認 volume 有最近的快照，沒有就手動建一個、等它跑完再部署。這次部署完，我對線上跑了一次完整流程：建測試裝置、用註冊碼換 Key、發事件、MQTT 連線、換 Key、最後刪掉測試裝置，全部通過才算數。

---

## 🪤 踩坑紀錄

這一段是我自己最想留下來的。每一個都是真的踩到的。

### 1. fly.toml 一個空的表格就讓整個設定壞掉

我多寫了一行空的 `[http_service.checks]`，後面又接 `[[http_service.checks]]`，TOML 直接報錯「已經是 table，不能再當 array table」。結果 volume 和 secret 的指令全都跟著失敗，因為 flyctl 每次都要先解析 `fly.toml`。刪掉那一行就好，但花了我一點時間才想到是設定檔本身的問題。

### 2. 快照指令要用 volume ID，不是名稱

`fly volumes snapshots list hub_data` 會回 `volume hub_data not found`。要用 `vol_xxxx` 這串 ID。另外 volume 才建立兩小時的時候，每日自動快照根本還沒跑，所以「有近期快照」要自己動手建。

### 3. Windows 上 curl 傳中文會變成 ????

在 Git Bash 用 `curl -d` 送中文名稱，存進去的資料變成問號。一開始我還以為是伺服器的編碼寫錯，查半天才發現是 shell 傳參數時就壞了。改用 Node 送就正常。

### 4. 對話框莫名其妙多出一行 "null"

這個是我 **實際在瀏覽器點過才抓到** 的。我的程式裡有 `條件 ? 元素 : null` 這種寫法，結果把 `null` 直接丟給原生的 `replaceChildren()`，它很老實地把 `null` 轉成文字 "null" 貼在畫面上。API 測試全綠，畫面卻是歪的。教訓是：**測試過了不代表畫面對**。

### 5. 回傳物件的組裝順序

建立裝置時，我先組好回傳的 `device` 物件，才去產生註冊碼，結果回傳裡「註冊碼到期時間」永遠是空的。這個是自動測試抓到的。物件字面值是由上往下算的，順序寫反就是 bug。

### 6. 本機 Node 16，better-sqlite3 沒有預編譯檔

新版的 `better-sqlite3` 在 Node 16 的 Windows 上找不到預編譯檔，退回去現場編譯，然後因為沒有 Visual Studio 就死了。我把它釘在 `~8.7.0`，Docker 裡用 Node 20 一樣能跑。

---

## 😅 還沒做完的事

這裡要老實講，免得讀的人以為這是個完工的東西：

*   **ESP32 韌體只有範例，沒有編譯過，也沒有燒進板子。** 我刻意沒在這台電腦裝工具鏈，範例裡有 NVS、序列埠佈建、註冊、每日 heartbeat、自動換 Key，但第一次編譯八成還要修幾個錯。
*   **「設備有沒有在運轉」目前是假設的。** 韌體現在只是「按鈕切換，並認為設備跟著開或關」，沒有真的去感測設備狀態。這要看實際設備怎麼偵測，還沒決定。
*   **TLS 沒有驗證伺服器。** 範例用 `setInsecure()`，連線有加密，但不驗證對方的身分。正式用要換成放根憑證。
*   **NVS 預設沒加密。** 有實體接觸板子的人可以讀出 flash 裡的 Key。
*   批次燒錄腳本還沒寫。板子不多的話，用序列埠打指令就夠了。

---

## 結語

回頭看，這個專案最有意思的部分反而不是 MQTT 或 API，而是「Key 的一生」：怎麼發、怎麼存、怎麼換、怎麼在出事時收回來。每一個環節都有「方便」和「安全」的取捨，我的選擇是：**方便的事情交給程式自動做（自動換 Key），危險的事情交給人決定（過期重發）**。

這次是和 Claude Code 一起做的，伺服器、前端、測試和部署都走完了；ESP32 那一半留給下一輪，等我在板子上真的跑起來，再來補一篇。

以上內容為個人實作心得，原始碼和交接文件都在 [GitHub](https://github.com/louis70109/esp32-fly-deployment)，若有任何問題或建議，歡迎到那邊開 issue 交流。
