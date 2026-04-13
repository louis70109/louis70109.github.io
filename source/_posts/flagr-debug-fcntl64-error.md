---
title: 【Flagr】處理部署遇到 fcntl64 not found 的過程
tags:
  - Flagr
  - Docker
  - fcntl
  - Heroku
categories: Docker
date: 2022-08-15 23:53:49
---


![](https://nijialin.com/images/common.jpeg)

# 前言

睽違三個月左右再度重新部署 Flagr，沒想到在這次部署超級不順利，搞不清楚到底是環境變數沒弄好，還是是 Dockerfile 有問題，遇到 `fcntl64 not found` 的問題，直到這幾天跟同學 pair programming 進 Bash 時才抓漏成功，以下就跟大家分享一下這次的過程。

<!-- more -->

遇到的問題：

- CloudRun 上也無法使用
- Heroku Container 也無法用
- 但本地端的 docker 可以用(?)
## Error log

Flagr 遇到的錯誤訊息

```
2022-08-14T16:29:58.545545+00:00 heroku[web.1]: Starting process with command `/bin/sh -c ./flagr`
2022-08-14T16:29:59.715535+00:00 app[web.1]: Error relocating ./flagr: fcntl64: symbol not found
2022-08-14T16:29:59.845175+00:00 heroku[web.1]: Process exited with status 127
2022-08-14T16:29:59.903391+00:00 heroku[web.1]: State changed from starting to crashed
2022-08-14T16:29:59.911475+00:00 heroku[web.1]: State changed from crashed to starting
2022-08-14T16:30:00.925909+00:00 heroku[web.1]: Starting process with command `/bin/sh -c ./flagr`
2022-08-14T16:30:02.204653+00:00 app[web.1]: Error relocating ./flagr: fcntl64: symbol not found
```

## TL;DR

把 [Openflagr Dockerfile](https://github.com/openflagr/flagr/blob/main/Dockerfile#L22) 的 3.15 版本改成 `alpine-3.14_glibc-2.33`。

或是 Dockerfile 中重新安裝低版本的 glibc 即可。

```
apk del glibc-bin glibc;
wget -q -O /etc/apk/keys/sgerrand.rsa.pub https://alpine-pkgs.sgerrand.com/sgerrand.rsa.pub; wget https://github.com/sgerrand/alpine-pkg-glibc/releases/download/2.28-r0/glibc-2.28-r0.apk;
apk add glibc-2.28-r0.apk
```

# 介紹

因為是透過 Heroku 的 Container Registry 部署 Flagr，但不管怎麼樣還是透過 Heroku-cli 跑 Bash 看看服務內的狀態

```
heroku run bash -a flagr-n3
```

確認檔案是否有被編譯出來，看起來檔案權限也都沒問題，但執行起來錯誤還是一樣

```
~ $ ls -la flagr
-rwx------    1 u17758   dyno      33141888 Aug 14 14:48 flagr
~ $ ./flagr
Error relocating ./flagr: fcntl64: symbol not found
```

## 回頭來看 flagr 裡面是否有用到 fcntl

![](https://nijialin.com/images/2022/flagr-fcntl/1.png)

看來在 go 檔案使用了許多 fcntl64 來執行 Systemcall，勢必得解決這個套件問題才能繼續往下。

## 確認 Linux 版本： Ubuntu

```
~ $ uname -a
Linux 59949dc4-18ce-4fcb-a06c-efe78e2d2a53 4.4.0-1104-aws #109-Ubuntu SMP Tue May 10 11:27:41 UTC 2022 x86_64 Linux
```

## 檢查 glibc 版本相依性

透過 `apk list` 來看一下 glibc 是否有被安裝、版本是多少

```
~ $ apk list
...
glibc-bin-2.35-r0 x86_64 {glibc} (LGPL) [installed]
```

但使用 2.35 版跑就是會出現 ，因此找到[這篇 Stackoverflow](https://stackoverflow.com/questions/37818831/is-there-a-best-practice-on-setting-up-glibc-on-docker-alpine-linux-base-image)，索性降到 2.28 版本測試看看是否環境是正常的。

```
apk del glibc-bin glibc;
wget -q -O /etc/apk/keys/sgerrand.rsa.pub https://alpine-pkgs.sgerrand.com/sgerrand.rsa.pub; wget https://github.com/sgerrand/alpine-pkg-glibc/releases/download/2.28-r0/glibc-2.28-r0.apk;
apk add glibc-2.28-r0.apk
```

重新安裝過後再重新執行一次 ./flagr 看看

```
~ $ ./flagr
INFO[0000] sql/go/src/github.com/checkr/flagr/pkg/entity/db.go:59800.045µsCREATE TABLE "flags_tags" ("flag_id" integer,"tag_id" integer, PRIMARY KEY ("flag_id","tag_id"))[] 0
INFO[0000] sql/go/src/github.com/checkr/flagr/pkg/entity/db.go:59793.786µsALTER TABLE "flags" ADD "notes" text;[] 0
INFO[0000] sql/go/src/github.com/checkr/flagr/pkg/entity/db.go:592.726833msCREATE TABLE "tags" ("id" integer primary key autoincrement,"created_at" datetime,"updated_at" datetime,"deleted_at" datetime,"value" varchar(64) )[] 0
INFO[0000] sql/go/src/github.com/checkr/flagr/pkg/entity/db.go:592.479293msCREATE INDEX idx_tags_deleted_at ON "tags"(deleted_at) [] 0
INFO[0000] sql/go/src/github.com/checkr/flagr/pkg/entity/db.go:591.216724msCREATE UNIQUE INDEX idx_tag_value ON "tags"("value") [] 0
INFO[0000] Serving flagr at http://[::]:43003
^CINFO[0024] Shutting down...
INFO[0024] Stopped serving flagr at http://[::]:43003
```

太...太感動了，終於可以好好執行了.......

## Workaround

因此在這個時候的 workaround 就是先加一行先按裝低版本的 glibc

```
RUN apk add --no-cache curl; apk del glibc-bin glibc; wget -q -O /etc/apk/keys/sgerrand.rsa.pub https://alpine-pkgs.sgerrand.com/sgerrand.rsa.pub; wget https://github.com/sgerrand/alpine-pkg-glibc/releases/download/2.28-r0/glibc-2.28-r0.apk; apk add glibc-2.28-r0.apk
```

## 一定是有哪個時候給我偷換！我要找出來

看著 Git history，看到了[三月四號歷史](https://github.com/openflagr/flagr/commit/3e5714db1a8e0377284fefe08c81101ca31d2503)改了跟 glibc 有關的映像檔，既然如此來去 DockerHub 找找足跡，找相依的映像檔 [frolvlad/alpine-glibc](https://hub.docker.com/r/frolvlad/alpine-glibc/tags)，是不是有偷改。

看到了除了 latest，還有`alpine-3.16`、`glibc-2.35` 以及 `alpine-3.15_glibc-2.35`，後者看起來是還有使用 2.35 版本的 glibc，在上述的 Debug 中他是不能使用的，因此我們就來往下找下一個版本。

![](https://nijialin.com/images/2022/flagr-fcntl/2.png)

基於不死心的精神找到了下一個 alpine + glibc 版本的`alpine-3.14_glibc-2.33`，因此修改 Dockerfile 的檔案。

```
FROM frolvlad/alpine-glibc:alpine-3.14_glibc-2.33
```

經過 `heroku container:push web` + `heroku container:release web` 後功能又再度正常了，終於可以開始把相關的東西都串上了....

# 結論

在這次除蟲過程最後居然是 Dockerfile 中用到的 image 有版本更新，導致這次推上 GCP 跟 Heroku 有問題，可能的原因是 glibc 在新版不需要某個功能，而這個功能是在舊版的 Flagr 被需要的，後續若有朋友有繼續挖下去的下歡迎留言讓我知道～～

