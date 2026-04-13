---
title: Day30 - 老是在吹 Serverless，他真的有那麼好？
tags:
  - AWS
categories: 2019鐵人賽
abbrlink: 840027886
date: 2019-10-14 21:09:01
---

## Cold start

其實個家園端平台多少都會有這問題，畢竟大家都是靠流量賺錢，自然會需要個方法限制使用者，不然免費爽爽用他們也不是做慈善的 🤣，像我最常用的 `Heroku`，只要 30 分鐘沒有使用他就會進入睡眠時間([參考](https://devcenter.heroku.com/articles/free-dyno-hours))，叫醒的時間需要 10~15 秒，不過對於我這個免費宅來說測試夠用了 🤣

`AWS`以我實際測試起來大概 2 秒左右，回應時間看起來不會太差，其實[第一天](https://ithelp.ithome.com.tw/articles/10213431)就有提到這部分，需要的話可以參考。

若是需要它隨時都在都活著的話就要搭配 [warm-up](https://ithelp.ithome.com.tw/articles/10226742)，抑或是搭配 crontab 去設定特定時間執行 warm-up。

## Function as a Service

在快速成長的前、中期是很適合這個服務的， 畢竟開發者只要將 `serverless.yml` 基本設定完之後就可以先好好開發，等到中期之後把設定檔稍微整理一下又是一尾活龍了，且平台大多都擁有 [auto-scaling](https://aws.amazon.com/tw/autoscaling/) 的功能，在服務快扛不住流量的時候只要錢拿出來平台就幫你解決。

只是說當流量越來越大之後相對錢也會越付越多，或許當流量 > 10K 之後代表你的服務應該也有不少人使用了，自己架主機應該不會是什麼難事(?)

> 幫忙推廣一下 Backend 大大的 [高流量心得雜談](https://github.com/TritonHo/slides/blob/master/Taipei%202019-10%20talk/concurrency.pdf?fbclid=IwAR3R67wIt5fXPjG3hZNHaVw3tuCVrpNJtIdecTTIiQz0dgT-bZwymIYLYiA)

在 FaaS 架構下其實很適合 Chatbot 的服務，以概念來說實作時只需要一個路由**(Function)**即個完成，不需要額外太多的資源去處理 web server 的問題，像是這個系列的只要透過 `serverless` + `WSGI` 就可以馬上就可以進行本地測試，部署只要下 `sls deploy`，實在是超級快又輕鬆，不用像以前一樣還要去處理 Nginx 等等相關的問題 😁。

且 AWS、Google 在使用 python 跟 nodejs 上支援度很高，也不用怕找不到資源使用。

> 使用 Node JS 的朋友可以參考 C.T Lin 大大的[文章](https://ithelp.ithome.com.tw/users/20103630/ironman/2798)，他們家的 bottender 超猛的！

## Log

在 Log 這部分我覺得 AWS 有點不太好的地方就是他們的 Cloud Watch 應該是獨立服務，當我的 Lambda 輸出紀錄時大概要過 10 秒才會印出來，不像以前自己架主機時只要進 server 就可以馬上切到目錄看紀錄抓蟲，在使用這雲端服務可能在抓蟲有一半的時間都在等 log 出來，有時候急的時候還真的會被氣死 😭。

## SNS

像是我前一陣子發的[一篇文章](https://medium.com/@nijia.lin/use-serverless-corn-to-execute-sns-getendpointattributes-returns-old-data-after-e7df7c09b45b)，SNS 被觸發事件之後回來的東西是舊的，那時候看到錯誤訊息真的是心很涼，就得用一個 Lambda 排程一直去抓 DB 的 updated_at 欄位有沒有變更時間而去更新狀態，這樣情況就會多浪費一個 Function 去處理這樣的事件，不得不說專門來支援 AWS 服務的 boto3 套件(python)在某些時候做的事不是那麼完善，得使用旁門做到的方法去完成這件事，讓整個開發體驗不是那麼好，若他們可以把一些 error handle 弄更好那就完美了。

## 結論

> ~~其實還有好多服務沒有玩到~~

但其實使用 AWS 來實作 Serverless 的服務也是這一陣子加入新公司所學到的新技能，過程中總是會用舊的開發思維去想，但常常都因為這樣落坑 😓，但也因此讓我更了解像 AWS 這類的雲服務他們是如何開發每個服務並如何串接，同時也研究了 Serverless 相關的 plugins，看他們是如何支援雲平台讓開發者在開發時可以更像平常時在開發 web，也因為這樣我去貢獻了 example 到了 Serverless 的範例專案上面([參考](https://github.com/serverless/examples/pulls?q=is%3Apr+author%3Alouis70109+is%3Aclosed))，慶祝完成人生第一場鐵三十，跟自己的競賽也告一段落，發現趕著寫文章品質真的會差很多，看來是時候該整理一下，謝謝您的收看 <(\_ \_)>
