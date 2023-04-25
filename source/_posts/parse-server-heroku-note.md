---
title: 如何部署 Parse Server 與 Dashboard 於 Heroku 上使用
tags:
  - Parse Server
  - Dashboard
categories: 應用
date: 2022-08-03 00:19:59
---


![](https://nijialin.com/images/2022/parse-server/header.png)

# 前言

平常在寫 PoC 時，是否會像筆者一樣很困擾，每個東西都需要一個 DB，都要重新 create table、塞資料，像是每次寫 LINE Bot，一定都會綁用戶資訊(userId, name, email...)，如果範例專案共用的資料能放在一起，是不是就能更快上線呢？透過部署 Parse Server，讓許多的 CRUD 工作都可以省下來，避免許多東西重工的時間。因此這次就來介紹一下 Parse Server 這個開源莊案究竟有多好用吧！

> 以下都是建立在 Heroku 上，若需要搭建在自家，請參考使用 Dockerfile。

- Parse Server Dashboard 部署範例：[連結](https://github.com/louis70109/parse-dashboard-example)
  - Fork 來自名間版本，目前由我會手動來改 package.json 裡面的版本。
- [官網](https://parseplatform.org/)
- Parse Server 專案：[連結](https://github.com/parse-community/parse-server)

<!-- more -->

# Parse Server 部署

參考 Parse Server 部署範例： [連結](https://github.com/louis70109/parse-server-example)

GitHub 下方有個 Heroku 部署的按鈕，按下去後會導向`部署畫面`，如下：

![](https://nijialin.com/images/2022/parse-server/2.png)

> 這 fork 的版本是由官方維護的，因此使用上不太需要擔心。

## Parse Server 環境變數

![](https://nijialin.com/images/2022/parse-server/1.png)

在讀 parse-server 文件以及 Getting Start 可能會很疑惑現在到底要用什麼樣的環境變數，需要 prefix？那要加什麼？其實會看不太懂，以下透過 parse-server-example 做範例
以 parse-server-example 裡面的範例來說

- PARSE_MOUNT
  - 預設： /parse，可自行調整
- APP_ID
  - 整個服務的名稱，官網範例都會用：myAppId
- MASTER_KEY
  - "myMasterKey"
- DATABASE_URL
  - 設定 PostgreSQL || MongoDB 的網址，這邊網址設定請參考下個章節
- SERVER_URL":
  - 放上 Domain+PARSE_MOUNT 的數值
    - http://yourappname.herokuapp.com/parse

## 資料庫設定 - [PostgreSQL](http://docs.parseplatform.org/parse-server/guide/#postgres)

官方文件會主推 MongoDB 來做，但因為 Heroku 現在已經不支援 mLab 的 MongoDB，因此在這環境下就得使用 PostgreSQL，但這邊有些需要注意的東西

- Heroku PostgreSQL -> Hobby Dev
  - 會幫忙建立一個 `DATABASE_URL`，要另外建立環境變數 `DATABASE_URI` 給 parse server 使用

但原本的網址只換乘 DATABASE_URI 會無法使用，需要參考 parse server 官方文件下的 PostgreSQL 說明

> 1. SSL with verification - postgres://localhost:5432/db?ca=/path/to/file
> 2. SSL with no verification - postgres://localhost:5432/db?ssl=true&rejectUnauthorized=false

如果你的 DB 是需要簽證(CA)以確保安全，就使用第一行；而這次因為求快速部署，因此選擇第二行先不執行認證(但有 SSL)。

## 健康檢查路徑

設定完所有東西之後，會不知道東西究竟有沒有正常啟動，可以參考以下的路徑打 API 測試看看，成功之後才繼續往下個章節移動 ✨

- API 路徑組成：`Domain`+`PARSE_MOUNT`+`/health`

使用以下指令測試看看是否有出錯：

```
curl https://DOMAIN.herokuapp.com/parse/health
```

```
{"status": "ok"}
```

# Parse Server Dashboard

上述的健康檢查完之後，接下來可以開始部署 Dashboard，讓接下來對後端的操作可以更方便些。

> 範例專案：https://github.com/louis70109/parse-dashboard-example

## 如何部署

這邊透過 Heroku 來協助部屬測試環境，如果有需要部署到其他地方可以參考 Dockerfile。

```
git clone https://github.com/louis70109/parse-dashboard-example.git
cd parse-dashboard-example
heroku create
git push heroku master
```

部署好之後需要進去環境變數設定：

![](https://nijialin.com/images/2022/parse-server/heroku-env.png)

主要對接 Parse Server 的六個參數需放入環境變數，做些最基本的權限控管([參考 app.json](https://github.com/louis70109/parse-dashboard-example/blob/master/app.json)):

- APP_ID
  - 對應剛剛 parse-server 設定的 ID，訪問 API 會使用。
- MASTER_KEY
  - 要訪問的 parse-server 金鑰，對資料庫操作時要使用。
- SERVER_URL
  - parse-server 的網址 http://yourappname.herokuapp.com/parse
- APP_NAME
  - UI 上顯示的名稱。
- USERNAME
  - 登入 Dashboard 的帳號
- PASSWORD
  - 登入 Dashboard 的密碼

## 登入

![](https://nijialin.com/images/2022/parse-server/pd1.png)

輸入剛剛環境變數上的 `USERNAME` 以及 `PASSWORD`。

## 欄位操作

![](https://nijialin.com/images/2022/parse-server/pd2.png)

在 parse-server 裡面一個表(table)稱為 class，這邊先透過[1]去點選建立，接著在[2]的地方輸入這張表的名稱，按下建立後就可以開始操作表了。

![](https://nijialin.com/images/2022/parse-server/pd3.png)

建立完之後也可以在這邊新增欄位，如果要新增資料，也可以在裡面找到地方去新增一藍，裡面俗稱 Object。

## 測試資料

Dashboard 方便點在於除了可以像 Firebase 一樣在網頁上放資料，另外還能有個介面直接測試 API，只要把該有的條件放好按下 `Send Query`，就能看測試資料如何囉！

![](https://nijialin.com/images/2022/parse-server/pd4-test.png)

---

如果你是 command line 愛好者，也可以參考 [parse-server 的範例](https://github.com/parse-community/parse-server#saving-an-object)去找：

```bash
$ curl -X GET \
  -H "X-Parse-Application-Id: APPLICATION_ID" \
  http://localhost:1337/parse/classes/Items
```

> objectId, createdAt, updatedAt, ACL 皆是 parse-server 預設管理欄位，看到他們別覺得驚訝，把你需要的欄位新增放在後面即可喔！

## 測試資料想刪除怎麼辦

在 Dashboard 的右上角有個 `Edit`，點下去之後可以需要先刪掉所有資料(Row)，才可以刪 Class，此舉動是保護機制，避免管理者手誤亂刪到表，導致悲劇產生...XD (真貼心)

# 結論

這次部署完終於有久違的成就感了～～(感動)，官方也貼心的提供了許多前端 SDK 讓開發者們可以用，接下來就能開始建立服務來把資料集中儲存，後面 Parse Server 也有許多其他的功能(Webhook, GraphQL...)，後續玩完之後再來與大家分享！