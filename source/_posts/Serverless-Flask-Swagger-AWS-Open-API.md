---
title: 使用 Serverless/Flask/Swagger 在 AWS 上搭建打造 Open API
tags:
  - Swagger
  - Flask
  - Serverless
  - Open Api
  - Python
categories: 應用
abbrlink: 1373457857
date: 2020-05-05 17:09:39
---


![](https://i.imgur.com/2UI8Ggs.png)

# 前言

約在一年前，當時公司的同事帶我玩過 Swagger，只是當時的我寫得不太習慣，直到寫這篇之前都還只是寫 markdown 來做 API 文件 😓，不過寫 API 到最後總是要開放給其他人需要測試以及用文件來描述功能，但只是寫 Readme.md 給其他人看感覺有點不負責任 (?)，所以這個時候 Swagger 就發揮它的作用啦～

但是看著下面這張圖…
![](https://i.imgur.com/zg1jEuy.png)
左邊那是怎樣！怎麼設定了一大堆右邊才出現一點點東西，估且不論還要設定 Model、Payload 什麼的，我想光寫左邊這份文件加測試的時間我都可以寫一份 Markdown 給其他同仁用 Postman 測試了…🤣🤣🤣
這時候套件就出動啦，這次要介紹的是 flask-restful-swagger-2.0，他是延續原版套件並加以更新的，不得不說再搭更新完後整體寫起來人性多了，像是文先寫法用 decorator 的寫法在路由之前、宣告 Schema 時只要用類別包起來之類的，讓寫文件可以用 python 的寫法去寫，除了特殊的設定需要比對 Swagger 官方文件外，在建一個 Swagger 格式的文件這樣已經超快了 💪
既然如此那就介紹一下他的相關設定並把它記錄下來吧！

<!-- more -->

若對 Serverless + WSGI +flask 還不清楚的話可以參考我之前[寫的文章](https://medium.com/@nijia.lin/%E7%BA%8C%E7%AF%87-serverless-wsgi-flask-chatbot-%E7%9A%84%E9%96%8B%E7%99%BC%E6%8C%87%E5%8D%97-f11de7dee7aa)

<!-- more -->

> 這次的範例已經放在 Github 上面，建議可以 Clone 下來邊看會比較清楚，若想要比較 flask-restful 套件生成的版本差異的朋友可以[參考分支 — Original](https://github.com/louis70109/aws-swagger-wsgi-flask)

# api.py 設定

一般來說，如果有用 flask_restful 套件的話會有以下兩行：

```
from flask_restful import Api
api = Api(app)
```

這次因為需要引入 swagger，將程式替代成以下：

```
from flask_restful_swagger_2 import Api
api = Api(app,
    host="localhost:5000",
    schemes=['http'],
   # schemes=['https'],
   # base_path='/dev',
    security_definitions=security,
    security=[{'appKey': []}],
    api_version='0.01',
    api_spec_url='/api/swagger')
```

- host: 在本地端起的預設 port 為 5000 (部署上 AWS 後需要替換掉)

> host 在此處可以先註解，設定此項目是如果需要使用 swagger-codegen 來產生相對應的 library 時，所需對應的 host

- schemes: host 的協定 (部署後需要改成 https)
- base_path: 一般 API 都會有 /v1、/v2 的版本號可以用在此處，而 serverless 部署上後則會有 /dev
- security_definitions: 若在 call API 之前需要 OAuth 或是一般的 key 的話則在此地方設定
- security: 設定完之後要在此告訴 swagger 要啟動這個 key
- api_version: 使用者定義的版本號
- api_sepc_url: swagger.json 輸出的路由

> 在 sls deploy 之後需要將 host、schemes 以及 bash_path 改成部署完的設定

# 設定 Swagger Model

接著看到 controller/todos_controller.py，裡頭宣告了三個 Swagger model：

- BasicTodosModel
- QueryTodos
- CreateTodos

![](https://i.imgur.com/fg9Slabm.png)

---

![](https://i.imgur.com/njcsd9Im.png)

---

![](https://i.imgur.com/Dsw6Djmm.png)

1. 定義了 Todos 的基本格式，兩個欄位都為字串且是必填欄位；
2. 取資料後回傳的 schema，由於回傳時我習慣加個 result 的 key，且因為是取所有的 Todo，所以需要定義為 array，並按照 swagger 格式若為 array 則需要加入 items 的 key，value 則是放入原本定義好的 model 即可；
3. 在建立完後的 schema，但由於只需要回傳 dictionary，所以直接指定即可。

![](https://i.imgur.com/as5blSM.png)

# Swagger 文件本體

<script src="https://gist.github.com/louis70109/2b6e2d571e1ff558196e23eb1f3c4fe5.js"></script>

接著就來講解這次的主角身上的哪些特殊技能需要注意的，首先先看到第四行的部分，security 是來定義這個 method 需要用到哪個 authorize key，如果有用到兩種以上可以像是以下定義：

```
'security': [{"appKey": []}, {"otherKey": []}]
```

如此一來這個路由右邊又會有鎖頭 🔒 的選項，當 Authorize 過後才會鎖上。

![](https://i.imgur.com/fLOprLT.png)

接著看到第 8 行，這是定義當回傳成功 (200) 之後所對應的 Model，在上述已經設定過 Class 了，這邊就引入並跟 example 對應是不是自己想要的輸出

以 Todos 的 Get 路由為例，我希望回傳值是由 result 包 Todo’s llist，點選 Model 就可以看到設定的 Model 的格式是不是有用陣列框起來。
![](https://i.imgur.com/ehH5P7E.png)

此時可以輸入以下指令啟動：

```
sls wsgi serve
```

並在 https://petstore.swagger.io/ 這個網址裡的輸入欄填上 http://localhost:5000/api/swagger.json 並按下 Explore 看一下自己的 API 有沒有問題。

# 部署上 AWS

在本地端玩那麼久了，接下來就是要部署上去啦，需要注意的是因為部署上去會有 https 以及 base_path 的問題，在本地端測試時的設定：

```
api = Api(app,
 schemes=[‘http’],
 security_definitions=security,
 security=[{‘appKey’: []}],
 api_version=’0.01',
 api_spec_url=’/api/swagger’)
```

由於預設為 dev 模式，在部署上的時候需要置換成以下內容：

```
api = Api(app,
 schemes=[‘https’],
 base_path=’/dev’,
 security_definitions=security,
 security=[{‘appKey’: []}],
 api_version=’0.01',
 api_spec_url=’/api/swagger’)
```

接著就部署上 AWS 嚕‼️

```
sls deploy
```

![](https://i.imgur.com/B3rdIHi.png)

接著複製 endpoint 下來並在 dev 後面加上 /api/swagger.json，同時貼到 https://petstore.swagger.io/ 最上方的輸入欄位上就可以看到部署在 AWS 上的 Open API 囉！

# 建立函式庫

若是 Mac 的電腦可以使用以下指令 (其他的可以參考 [GitHub](https://github.com/swagger-api/swagger-codegen))：

```
brew install swagger-codegen
```

接著再使用下列指令產生函式庫 (若不知道有支援什麼語言可以[參考官方](https://swagger.io/tools/swagger-codegen/))：

```
swagger-codegen generate -i https://{AWS_DOMAIN}/dev/api/swagger.json -l {language}
```

如此一來就可以把函式庫給對應的開發者使用，好處是大家的 code style 都是遵守 swagger 產生出來的格式，真的有問題就去解決當初產生這包 lib 的那位開發者 (咦？)。

# 注意事項

1. security 必須是 List 的 dictionary ([Issue](https://github.com/swagger-api/swagger-codegen/issues/7847#issuecomment-374512375))
2. Schema 的 Model 在宣告巢狀時 type 為 array、需巢狀 Model 之前的 Key 為 items
3. schemes 佈署上之前需要改成 https
4. base_path 依照部署上的模式去設定，預設為 /dev
5. 首次佈署上時不知道 domain，部署完之後把 domain 複製到 host 上在佈署一次，如此一來使用 swagger-codegen 產生函式庫套件的 configuration 網址就沒問題了。

# 結論

這次因為我的 API 需要給其他同事用而玩到 Swagger，剛好找到 [flask-restful-swagger-2.0](https://github.com/soerface/flask-restful-swagger-2.0) 這個套件讓我可以快速上手，並用 Swagger-Codegen 產生相依的 Library + 文件 讓其他的同事可以快速上手我的 API，讓我可以把心思都放在開發 API 上。接下來就是把 repository 弄到 CI 上，同時 Trigger 另一個 repository 並將 Library 產生出最新版的，如此一來就玩成一條龍服務啦！🎉🎉🎉
