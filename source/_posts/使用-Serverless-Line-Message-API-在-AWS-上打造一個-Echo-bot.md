---
title: 使用 Serverless & LINE Message API 在 AWS 上打造一個 Echo bot
tags:
  - Serverless
  - LINE
  - AWS
categories: Serverless
abbrlink: 3648300953
date: 2019-10-31 16:20:12
---

# 前言

Serverless 架構是一個基於 FaaS(Function as a Service) 實作的一個服務，讓開發者可以更專注在開發功能，將 yml 檔設定好其餘維運的問題都交給 AWS、Google、Azure 這些服務商去處理，只要把信用卡準備好就好(?)，讓開發者在寫完程式之後不用煩惱部署得問題，減少的不少的麻煩事。
那因為現任公司的服務都是基於 AWS，如此這般我就接觸到 Serverless(以下簡稱 sls) 這個框架啦 (想更深入了解 FaaS 架構可以參考 AWS)
[2019/07/04 更新]
若已經暸解的朋友可以參考我的 python 版本:
[louis70109/aws-line-echo-bot](https://github.com/louis70109/aws-line-echo-bot)
Ruby 的範例版本:
[louis70109/aws-ruby-line-echo-bot](https://github.com/louis70109/aws-ruby-line-echo-bot)

# 為什麼要 Serverless

[2019/06/29 更新]
以用一個 Ruby on Rails 寫的機器人為例，在寫完個 webhook function 後，設定路由然後部署，一般主機或是虛擬機就很麻煩，要安裝佈署環境以及一安裝堆相關套件，完了之後設定 Domain 什麼的有夠花時間。但若是使用 heroku 部署就很方便，Login — Create-Deploy 馬上就結束，機器人馬上就上線了，實在是俗又大碗呀～
但我覺得像是 LINE Message 這種 stateless 的服務，且只要一個 function + route 就能實作的程式最適合 Serverless 了，讓專案可以簡潔有力，只要寫一個 function+yml 設定並打個指令就部署了，而且 domain 還附贈 SSL，將服務交給 AWS 也不需要擔心，整個就是超級方便啊！
Cold start time 問題，依照我目前使用的結果下來，在 heroku 以及 AWS Lambda 同時睡著的情況下，AWS 起床的回應速度大概 1 秒左右，而 heroku 則大概落在 10~15 秒(參考)。如下圖所示的免費方案，基本上開發階段應該是不至於到 100 萬/月 個請求吧 😆，所以這部分就別擔新大力地給他用下去～ (感謝 petertc 幫忙找這方面的問題 💪)

AWS Lambda 免費方案
接下來就讓我介紹如何使用 sls + LINE Message API 建立一個 Echo bot 吧！
![](https://i.imgur.com/pNCDY4e.png)

# 環境

npm 6.9.0
python 3.7.3
serverless 1.45.1

# 建立 AWS 存取金鑰

首先要先有個 AWS 帳號(廢話) ，如果沒有綁定信用卡記得去綁定才能繼續，接下來就可以去就可以去建立鑰匙囉！
![](https://i.imgur.com/XHuvbyX.png)
如上圖，按下紅色框框的部分，接著按箭頭指的按鈕，就會建立一個我們要的金鑰囉！
![AWS secret & ID key](https://i.imgur.com/FzRCna0.png)

如上圖所示，可以下載 key，AWS 不會幫忙保存 Secret key，若這視窗關掉的話 key 就不見了，所以使用者可以自行下載檔案保存，以免哪天要部署的時候找不到 key。
接著就將這兩個參數加入環境變數中：

```bash
export AWS_ACCESS_KEY_ID=<your-key-here>
export AWS_SECRET_ACCESS_KEY=<your-secret-key-here>
```

# Serverless 建立與部署

首先先透過以下指令讓 npm 幫忙安裝 sls 的指令。

```bash
npm install serverless -g
```

安裝完之後就透過 sls 指令來建立專案嚕！

```bash
serverless create — template aws-python — path aws-line-echo-bot
```

> severless 指令可以縮寫成 sls
> template = 想用什麼平台以及語言就在此模板了 (參考)
> path = 檔案名稱

![](https://i.imgur.com/2KNweWB.png)
![](https://i.imgur.com/HDonmjF.png)

透過 severless 建立專案指令
依照不同的 template 可能會建立 N 個檔案，但主要還是以下三個檔案

```bash
.gitignore
handler.py = 主程式的地方
serverless.yml = 所有設定都在這裡，funtion 參數會對應到指定的路由
```

在部署前須至 serverless.yml 裡，把 runtime 的 python2.7 改至 3.7，否則會因版本問題導致錯誤。

```bash
serverless deploy # sls deploy
```

![Serverless 部署畫面](https://i.imgur.com/18Fnran.png)

接著到 AWS Lambda 以及 S3 就可以看到第一次部署完的程式以及檔案囉！

# 加入 LINE Message API

既然是寫 python，那一定是要用 line-python-sdk
照著官方用法應該是要執行以下指令安裝套件

```bash
pip install line-bot-sdk
```

不過我們是要部署到 AWS 的 Lambda 上，且因為他是無伺服器運算的服務，所以他沒辦法跑 pip 去幫我安裝套件。
此時就要出動 requirements.txt 來管理相依套件 ，但只有加入它 sls 根本不認識，因此我們需要安裝 pulgin 來讓 sls 認得(requirements.txt)。

```bash
sls plugin install -n serverless-python-requirements
```

![](https://i.imgur.com/0NFfVi6.png)

---

![](https://i.imgur.com/pS7s8ls.png)

安裝指令 & package.json
如圖，安裝過程中會自動建立 package.json，且會幫忙在 serverless.yml 裡面加入 pulgin，這樣 sls 在部署時就認得 requirements.txt 囉！
接著將 LINE SDK 加入 requirements.txt， AWS 就會幫忙安裝套件了。

```bash
echo "line-bot-sdk==1.12.1" > requirements.txt
```

然後新增一個 setup.cfg 並加入以下內容：

```bash
[install]
prefix=
```

由於 AWS Lambda 上都會將套件安裝在本地端(Lambda 上)，因此在執行 pip install -t . -r requirements.txt 時會需要 setup.cfg。
至於詳細原因嘛～還有請各位大大幫小弟解答 🙏
最後就處理 handler.py 以及 serverless.yml 囉！
將上述兩個 gist 分別貼到自己的 handler.py & serverless.yml，在 hanlder.py 裡的 CHANNEL KEY & TOKEN 記得換成自己的機器人 👾 哦！
![佈屬完狀態](https://i.imgur.com/WVBHxL3.png)
接著在執行一次 sls deploy，將程式部署上去，如上圖所示，在 endpoints 那行會有一個網址，將那網址放到 LINE Webhook URL 上並 Verify 看看有沒有成功，如下圖所示。
![](https://i.imgur.com/CQMwc8V.png)
最後對著自己的機器人發個話，看他有沒有回應你一模一樣的文字，若成功了就能往下一步應用層繼續開發囉！若失敗了就要檢查一下是不是有哪個步驟做錯了～

# 結論

因為公司的緣故讓我能夠接觸到這神奇的 Serverless，經過這次的分享加深我對於 FaaS 的架構更加了熟悉，由於我也是初碰，我認為使用上可以把它當作是一個 Docker 的容器或許概念上會比較好理解，後續還有很多的設定檔都還沒詳細研究，最近讓我先研究研究一下再上來分享。

> 文章中有任何勘誤歡迎指正

如果覺得這篇文章有幫助的話請給我個掌聲鼓勵我一下 👋
下列是我的這次實作的專案，如果有幫助也來顆星星吧！
[louis70109/aws-line-echo-bot](https://github.com/louis70109/aws-line-echo-bot?source=post_page-----1e3e785a2a01----------------------)

# 參考

- [AWS Lambda 費率問題](https://aws.amazon.com/tw/lambda/pricing/)
- [Serverless GitHub](https://github.com/serverless/serverless)
- [Serverless Python Requirements](https://serverless.com/plugins/serverless-python-requirements/)
- [LINE Python SDK](https://github.com/line/line-bot-sdk-python)
- [FaaS 概念](https://aws.amazon.com/cn/blogs/china/iaas-faas-serverless/)
- [AWS, GCP, Azure cold start time](https://mikhail.io/2018/08/serverless-cold-start-war/)
