---
title: 解決 SQLAlchemy 無法在 Heroku 上連接 PostgreSQL
tags:
  - SQLAlchemy
  - Heroku
  - Postgresql
categories: Python
date: 2021-03-28 22:46:50
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

![](https://nijialin.com/images/heroku.png)
# TL;DR

Heroku Postgresql 引入時預設 DATABASE_URL 的開頭是 `postgres`，因 Python ORM - SQLAlchemy 有先天限制問題，需另起一個環境變數並改成 `postgresql` 才不會遇到：

```
sqlalchemy.exc.NoSuchModuleError: Can't load plugin: sqlalchemy.dialects:postgres
```

<!-- more -->

# 抓蟲過程

以 Python 以及我的 Side Project - [PLeagueBot](https://github.com/louis70109/PLeagueBot)為例，專案初期因對 ORM 相關設定不熟(懶)，因此在寫 DB 時因習慣選擇使用 `psycopg2-binary` 讓我直接寫 raw query 來操作 DB，在許多情境下連結 postgresql 參數時網址範例如下：

```
postgres://USER:PASSWORD@127.0.0.1:5432/postgres
```

會使用這串的原因是我大部分專案都放在 Heroku 身上，因為都只是 Side Project，因此會選擇 **Heroku Postgresql** 作為我的 DB，在引入時會在 Heroku 環境變數中幫忙塞入如下:

![](https://nijialin.com/images/2021/debug-heroku-postgres/1.png)

Database URL 的 prefix 被設定為 `postgres`，這個在透過 `psycopg2-binary` 操作時是沒問題，但在引入 SQLAlchemy 後就會出現以下的錯誤：

```
sqlalchemy.exc.NoSuchModuleError: Can't load plugin: sqlalchemy.dialects:postgres
```

簡單來說就是 prefix 不能是 **postgres**，想想很奇怪啊， Heroku 引入應該沒問題？(盲從狀態)，雖然 `psycopg2-binary` 的官方文件中也有聲明是透過 [libpq connection string](https://www.postgresql.org/docs/current/libpq-connect.html#LIBPQ-CONNSTRING) 來定義(簡單說 prefix 就是 `postgresql` 啦～)，

這個情境在使用 `psycopg2-binary` 時引入都沒問題，引入 ORM 後就出現問題了，可以[參考這個回答](https://stackoverflow.com/questions/24727902/what-is-the-form-of-my-local-postgresql-database-url)，說明需要將 prefix 改成 **postgresql** 才可以使用。

問: 但 Heroku 引入 Postgrsql 時會自動產生一個 **DATABASE_URL** 的環境變入且開頭是 **postgres**，那他都不能改我 DB 連線要怎麼辦？
打: 不能怎麼辦，重新弄一個環境變數吧！除非你砍了 DB 的 add-on，不然這個網址一般來說都不會變，以我而言就另起一個環境變數名為 `DATABASE_URI` 複製參數過去並把開頭改成 `postgresql` 就沒問題了！

# 結論

為什麼會引入之後才遇到這個問題呢？因為初期我已經先把 DB 建立好後(使用 `postgresql`)，跑了許久之後才引入 SQLAlchemy(ORM)，在使用上都不會出現這個錯誤，但當我開始測試新的 Table 後就開始出現上述說的問題，本地端也是會遇到這個問題喔！大家使用上要多注意才行
