---
title: 【Flagr】Feature Toggle 練習與放在 Heroku 上測試
tags:
  - Flagr
  - DevOps
  - Heroku
categories: 'Cloud Native'
date: 2022-03-04 16:57:24
---


![](https://github.com/checkr/flagr/raw/master/docs/images/logo.png)

# 前言

前一陣子在一些討論上聽到聽前輩分享 [Feature Toggle](https://zh.wikipedia.org/wiki/%E7%89%B9%E6%80%A7%E5%88%87%E6%8D%A2) 這個做法，想說開發上哪有那麼神奇的事，可以在 Production 上動態調整用戶跟管理者能看到的範圍，因此稍微搜尋了解一下：

<!-- more -->

> 參考維基：特性切換或稱功能切換，英語：feature toggle、feature switch、feature flag、feature flipper 或 conditional feature 等。它是軟體開發中的一種技術，是替代維護多個原始碼分支（也稱特性分支）的一種方案，這使特性在完成並正式發布前也可以得到測試。特性切換是在執行期間隱藏、啟用或禁用特定功能。例如在開發過程中，開發人員可以啟用功能以進行測試，而其他使用者不會被啟用該功能和受到它的影響。

聽前輩娓娓道來，Feature Toggle 是 Chunk-based development 的其中一環，整個 DevOps 中的一小部分，有了 Toggle 之後才可以讓`持續性交付`這件事更容易被達成，並且可以讓大家看到動態調整用戶可視範圍內的東西，真的非常酷。

不過要解釋 Feature Toggle 可能要幾天幾夜過去了，不如就直接實際使用 [Flagr](https://openflagr.github.io/flagr/#/README) 這個 Open Source 來試玩看看。

# 操作介紹

> 官網: https://openflagr.github.io/flagr/#/README

執行

```
# Start the docker container
docker pull ghcr.io/openflagr/flagr
docker run -it -p 18000:18000 ghcr.io/openflagr/flagr

# Open the Flagr UI
open http://localhost:18000
```

預設是 sqlite3，

## Heroku 上操作(僅供試玩)

用 Container 的方式部署到 Heroku 上，可以參考官方的[這篇操作說明](https://devcenter.heroku.com/articles/container-registry-and-runtime)。

1. 先登入 Heroku 帳號

```
heroku login
```

2. 登入 Container 服務

```
heroku container:login
```

3. 把 Flagr 的專案 clone 下來：https://github.com/openflagr/flagr

```
git clone https://github.com/openflagr/flagr.git
```

4. 接著建立 Heroku 的專案。(如果加上 -a 放上自定義名字的話，後面的指令都需要加上 -a 喔！)

```
heroku create
Creating salty-fortress-4191... done, stack is heroku-20
https://salty-fortress-4191.herokuapp.com/ | https://git.heroku.com/salty-fortress-4191.git
```

5. 把剛剛 Clone 的專案推到 Heroku 的 Container Registry:

```
heroku container:push web
```

6. 最後把你剛剛的 Container image 推出:

```
heroku container:release web
```

在終端機上開啟瀏覽器:

```
heroku open
```

## 把資料放在 Postgres 的 add-on 當中

建立 Postgres 的 add-on
![](https://nijialin.com/images/2022/flagr/1.png)

會在環境變數上幫忙放上一個預設的參數
![](https://nijialin.com/images/2022/flagr/2.png)

安裝完 add-on 之後，我們來看看本次使用的 Flagr 預設吃的兩個參數：

```
FLAGR_DB_DBCONNECTIONSTR
FLAGR_DB_DBDRIVER
```

接著參考[官方的範例](https://github.com/checkr/flagr/blob/master/integration_tests/docker-compose.yml)把 postgres 的資訊改成 Flagr 想要的格式

Heroku 提供 Postgres 的連接資訊：

```
postgres://帳號:密碼@網址:5432/資料庫名稱
```

參考 Flagr 範例改成的樣子：

```
host=網址 user=帳號 password=密碼 dbname=資料庫名稱
```

這部分網址不需要加`:5432`喔！(切記)

> [官方的範例](https://github.com/checkr/flagr/blob/master/integration_tests/docker-compose.yml)上用 docker-compose 會把 ssl-mode=false，因為這都是在本地端測試，在 Heroku 這邊要把 ssl-mode 移除。

# 開始使用 Feature toggle 建立一個 on/off

1. 建立 flag
   ![](https://nijialin.com/images/2022/flagr/f1.png)

2. Enable 這次建立的 Flag，並且建立一個 on 的 Variant(同樣步驟再建立一個 off)

![](https://nijialin.com/images/2022/flagr/f2.png)

3. 建立完 on/off Variant 之後，接著就要來建立 `Segment`，幫 on/off 設定條件達成。因為是做開關，因此 Rollout 要設定 100%。

![](https://nijialin.com/images/2022/flagr/f3.png)

4. 接著可以開始設定參數來決定觸發條件

- 字串需要加上雙引號 `"xxx"`
- 如果是陣列: ["xxx", "ooo"]
- 其他以此類推，有許多運算式可以使用，大於、小於、IN、NOT IN...

![](https://nijialin.com/images/2022/flagr/f3.png)

5. 接著可以往下到 `Debug Console` 來試試剛剛使用的參數在 API 中是不是正常。把剛剛 `Segment` 中設定的條件放入 `entityContext` 的 dictionary 中。

在 Debug Console 中按下 `POST /api/v1/evaluation` 按鈕後如果成功會看到以下訊息

```
"evalDebugLog": {
  "segmentDebugLogs": [
    {
      "msg": "matched all constraints. rollout yes. {BucketNum:201 DistributionArray:{VariantIDs:[1] PercentsAccumulated:[1000]} VariantID:1 RolloutPercent:100}",
      "segmentID": 1
    }
  ]
}
...
"variantID": 1,
"variantKey": "on"
```

同時也會觸發剛剛設定的 Variant `on` 的 key，測試成功之後就可以開始介接 Flagr 啦，讓你的程式可以更有彈性的使用 feature toggle 囉！

6. [官方文件](https://openflagr.github.io/flagr/#/flagr_use_cases)也很好的提供類似的範例演練程式，讓開發者可以使用類似的寫法到自己的應用程式中。

```
evaluation_result = flagr.post_evaluation( entity )

if (evaluation_result.variant_id == new_feature_on) {
    // do something new and amazing here.
} else {
    // do the current boring stuff.
}
```

> [Use Case 參考](https://openflagr.github.io/flagr/#/flagr_use_cases)，有開關、A/B test 範例

# 結論

官方也有建議 Flagr 盡量在 k8s 當中，放在裡面或是一些內部網路中才可以確保 Flagr 不會被其他用戶呼叫到 API，因此上述使用 Heroku 範例`僅供參考測試使用`，如果真的需要上線使用，還是需要把 Flagr 好好的關在內部網路裡面。

最後藉著在 Flagr 上操控除了讓 stackholder 們控制並調整條件，且開發端也可以有彈性的放入類似的判斷式讓程式碼更整潔，個人認為引入 Flagr 對整個產品/作品也會有更好的幫助喔！
