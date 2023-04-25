---
title: '[Docker] Mysql & PHPMyadmin 映射 & 連接方法'
tags:
  - Mysql
  - Docker
  - PHPMyadmin
categories: Docker
abbrlink: 268492519
date: 2019-10-16 22:06:49
---

詳細文件[參考](https://hub.docker.com/_/mysql)

docker 抓 mysql 最新的版本

```sh
docker pull mysql:tag
```

若只是要建立普通容器用以下指令:

```sh
docker run -d -p 3306:3306 -e MYSQL_USER="myname" -e MYSQL_PASSWORD="mypasswd" -e MYSQL_ROOT_PASSWORD="root_pwd" --name mysqltest1 mysql:5.7 --character-set-server=utf8 --collation-server=utf8_general_ci
```

由於會有備份的問題，所以要先建立資料夾們

```sh
mkdir ~/docker
mkdir ~/docker/mysql
mkdir ~/docker/mysql/conf
mkdir ~/docker/mysql/data
```

新增 my.cnf 配置文件

vim ~/docker/mysql/conf/my.cnf

`my.cnf` 加入如下内容：

```sh
[mysqld]
  user=mysql
  character-set-server=utf8
  default_authentication_plugin=mysql_native_password
[client]
  default-character-set=utf8
[mysql]
  default-character-set=utf8
```

將 /docker 這個資料夾映射到容器內的 /etcmysql/my.cnf

```sh
docker run -d -p 3306:3306 --privileged=true -v ~/docker/mysql/conf/my.cnf:/etc/mysql/my.cnf -v ~/docker/mysql/data:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=123456 --name mysqltest2 mysql:5.7
```

- --privileged=true：容器内的 root 永有真正 root 权限，否則容器内 root 只是外部普通用戶權限
- -v ~/docker/mysql/conf/my.cnf:/etc/my.cnf：映射 config 資料夾
- -v ~/docker/mysql/data:/var/lib/mysql：映射 data 資料夾 (table 都在這)

如此一來就可以儲存 /docker 這個資料夾達到備份的功能

## PHPMyadmin

將 myadmin 連接 mysql 的容器指令:

```sh
docker run --name myadmin -d --link mysql_db_server:db -p 9100:80 phpmyadmin/phpmyadmin
```

mysql_db_server = mysql container id

在瀏覽器上輸入 localhost:9100 就可以看到 phpmyadmin 囉！

## Docker 查詢容器 IP

```sh
docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' container_name_or_id
```
