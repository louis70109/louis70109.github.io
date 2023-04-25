---
title: 透過 Vue + FastAPI 完成 LINE Login 一鍵式登入
tags:
  - LINE
  - Vue
  - FastAPI
  - SSO
categories: LINE
date: 2021-09-21 17:01:15
---


<style>
  section.compact {
    font-size: 150%  
  }
  img[alt~="center"] {
    display: block;
    margin: 0 auto;
  }
</style>

# 前言

碰巧最近有個**日文五十音消除遊戲**的 Side Project 正在實作中，參考之前鐵人賽文章，實作上發現有些內容可能是年久失修，導致實作上不太順利，碰巧近期 [LINE Login 的官方文件](https://developers.line.biz/zh-hant/docs/line-login/integrate-line-login/#verify-id-token)也有更新，並且搭配之前實作的範例是使用 ([Screen-LINE-Bullets](https://github.com/louis70109/Screen-LINE-Bullets))，來延伸 Side Project，以下就為各位介紹一下其中使用 LINE Login 的一些過程。

# TL;DR

- LINE Login 範例從 Flask 轉到 Vue+FastAPI
- 前後端分離
  - 前端用兩個頁面清楚展示 LINE Login SSO 步驟
  - 後端兩個 API
    - 取得認證導向網址
    - 認證 JWT 中的使用者參數
    - 環境變數都放後端(較安全)

> - [LINE Login 事主專案](https://github.com/louis70109/WordsGame)

<!-- more -->

# 介紹

## LINE Login 綁定步驟

- 進入 [LINE Developer Console](https://developers.line.biz/console/)
- 建立 Provider
- 建立 LINE Login channel

![](https://nijialin.com/images/2021/login/2.png)

- 點選最右面選項把 LINE Login channel 設定為 `published`

![](https://nijialin.com/images/2021/login/3.png)

- 啟動 `Web App` 選項並設定 Callback URL 為 `http://localhost:8080/line/auth`
  - LINE Login 開發時不用 SSL+Domain，但上線後記得改成自家 Domain + SSL

![](https://nijialin.com/images/2021/login/4.png)

- 把 client_id、client_secret、Callback URL 複製到後端 FastAPI 的環境變數中
- 開始以下文章內容

## 用戶看見的頁面

![](https://nijialin.com/images/2021/login/1.png)

首先先參考[前端的路由](https://github.com/louis70109/WordsGame/blob/master/src/router/index.js)(後續實作上可能有差)

```javascript
 {
  path: '/line',
  component: Setting,
}, {
  path: '/line/auth',
  component: Line,
},
```

## 將用戶導向 Login 頁面 - 前端路由 `/line`

![](https://developers.line.biz/assets/img/login-with-new-session.7620fe6f.png)

- 【前端】用戶透過訪問 `/line` 按下登入鈕 (Setting.vue)
  - 取得後端需要導向至 LINE Login 的網址
  - 透過 window.location 把用戶轉去 Login 頁面

```javascript
setup() {
  let url = 'http://localhost:8000';

  function login(){
    fetch(url+'/login/uri').then(res=>{
      res.json().then(el=>{
        window.location.replace(el.result)
      })
    })
  }
}
```

- 【後端】 [FastAPI API 路由位置](https://github.com/louis70109/WordsGame/blob/master/fastapi-backend/routers/login.py#L55)
  - r_uri = os.environ.get("LINE_LOGIN_URI")
  - client = os.environ.get("LINE_LOGIN_CLIENT_ID")
  - 取得兩個環境變數並放入 OAuth2 網址中回傳給前端導向
  -     uri = f"https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id={client}&redirect_uri={r_uri}&scope=profile%20openid%20email&state={state}&initial_amr_display=lineqr"

參數 r_uri 以及網址中的 redirect_uri 為 LINE Login 用戶輸入正確登入後會導向的網址，網址就存放在後端 FastAPI 的環境變數中，數值則填上前端頁面的路由，也就是 `line/auth` 上

> 網址組成方式請[參考文件](https://developers.line.biz/zh-hant/docs/line-login/integrate-line-login/#making-an-authorization-request)

## LINE 認證用戶後回到 redirect_uri 的頁面中 - 前端路由 /line/auth

當用戶輸入完帳密(QR Code)後 LINE 會重新導向 `/line/auth`，導回來的網址會有兩個 Query parameter，範例如下([官方文件說明](https://developers.line.biz/zh-hant/docs/line-login/integrate-line-login/#receiving-the-authorization-code))：

```
http://localhost:8000/?code=xxx&state=ooo
```

參考[官方文件](https://developers.line.biz/zh-hant/docs/line-login/integrate-line-login/#get-access-token)，拿到 code 之後要再拿著 `redirect_uri`、`client_id`、`client_secret` 去換用戶資訊，但三個參數安全性問題因此需要放後端，因此由後端 call LINE API 來取得用戶的 JWT 資訊，Query parameter 放置的方式[參考 FastAPI 文件](https://fastapi.tiangolo.com/tutorial/query-params/)，Python code 如下：

```python
@router.post("/")
def read_users(code: str, state: str):
    client_id = os.environ.get('LINE_LOGIN_CLIENT_ID')
    secret = os.environ.get('LINE_LOGIN_SECRET')
    r = requests.post(
        "https://api.line.me/oauth2/v2.1/token",
        data={
            "grant_type": "authorization_code",
            "code": code,
            "redirect_uri": os.environ.get('LINE_LOGIN_URI'),
            "client_id": client_id,
            "client_secret": secret,
        }, headers={"Content-Type": "application/x-www-form-urlencoded"})
    payload = json.loads(r.text)
```

### 離奇事蹟：JWT 解不開

我參考 [18 年寫的鐵人賽文章](https://nijialin.com/2019/10/05/Day21-LINE-Login-%E5%AF%A6%E4%BD%9C/)中的 LINE Login 範例程式碼，當我到了 `token = token.encode()` 步驟時一直顯示 algorithms 有問題

```
TypeError: encode() got multiple values for argument 'algorithm'
```

當初寫的文章中要透過這步驟會把 token 換成 binary 的形式 -> b'xxxxx'，再丟到 `decode()` 去解密，但即便把 encode 移除後把 id_token 丟進去也是出錯。

在百思不得起解的狀態下，決定先不用 JWT 相關的函示庫，[參考官方文件](https://developers.line.biz/zh-hant/docs/line-login/integrate-line-login/#decode-and-validate-id-token)最下方的驗證程式來**將 ID Token 解碼並進行驗證**，如此一來就成功可以解出 JWT 並把使用者的資訊存到 DB 中並回傳給前端頁面使用了。

解開範例：

```json
{
  "iss": "https://access.line.me",
  "sub": "U1234567890abcdef1234567890abcdef",
  "aud": "1234567890",
  "exp": 1504169092,
  "iat": 1504263657,
  "nonce": "0987654asdf",
  "amr": ["pwd"],
  "name": "Taro Line",
  "picture": "https://sample_line.me/aBcdefg123456"
}
```

# 結論

有些日子沒回來寫 LINE Login 的相關操作步驟，伴隨著 LINE Login 文件有更改後，過往一些自己寫的文章程式碼可能有點年久失修，導致再回來看文章寫程式時出了些錯誤。

過程中除了修程式碼外還有個收穫，就是可以透過 **[使用 LINE Login API 的 Endpoint](https://developers.line.biz/zh-hant/docs/line-login/integrate-line-login/#use-endpoint)** 來取得用戶的資訊，只要透過 Client_id + id_token 即可取得，甚至不用透過 JWT 解密就可以拿到上述的用戶資訊，實在是很方便(嘗試過很讚)，只是我個人還是比較信任透過 channel_secret 換到的用戶資訊，因此大家在選擇上時可以依照自己的需求去選用喔！
