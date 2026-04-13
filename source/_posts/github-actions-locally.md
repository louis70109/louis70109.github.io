---
title: 在本地端執行 GitHub Actions 跑 CI | Run your GitHub Actions locally
tags:
  - GitHub Actions
  - act
  - CI
  - 本地端
categories: CI/CD
date: 2021-12-13 00:13:13
---

![](https://raw.githubusercontent.com/wiki/nektos/act/img/logo-150.png)

# 前言

本次介紹的專案 [act](https://github.com/nektos/act)，是一個以 Golang 實作的專案，目標可以讓開發者可以在本地端跑 GitHub Actions，不用每次要測試 CI 就先推一個沒用的 Commit 上去等(如果是生產環境也是浪費資源)，只要在本地跑就可以快速得到相關的回饋，不用再為了測試推一堆沒用的 Commit 上去了 🎉

> 本次使用的範例專案：https://github.com/louis70109/WordsGame

<!-- more -->

# 安裝步驟

因為我是使用 Mac 來操作，因此我使用如下：

```
brew install act
```

如果你是其他作業系統的用戶，<mark>[文件上](https://github.com/nektos/act#installation)</mark>也有詳細寫出如何安裝以及前提

- 實作依靠 Docker，因此需要先安裝 Docker engine
- 各種套件庫方法安裝(brew, port, choco...)
- 透過 Go 安裝(如果本身有 Go 環境)
- Bash script
  - `curl https://raw.githubusercontent.com/nektos/act/master/install.sh | sudo bash`

# 介紹

官方的示範影片：

![](https://github.com/nektos/act/wiki/quickstart/act-quickstart-2.gif)

先進入你的資料夾中，我以前陣子開發的[日文單字專案](https://github.com/louis70109/WordsGame)為例子做說明。

1. 資料夾中有個 `.github/workflows/testing.yaml`，GitHub Actions 預設會找 **.github/workflows** 底下的 yaml 檔，因此有需要跑的檔案都要放這

2. 執行 `act` 指令，大致樣子如下

```
➜  WordsGame git:(master) act
[Python package/build] 🧪  Matrix: map[python-version:3.7]
[Python package/build] 🚀  Start image=ghcr.io/catthehacker/ubuntu:act-latest
...
[Python package/build]   🐳  docker exec cmd=[mkdir -m 0777 -p /var/run/act] user=root workdir=
...
[Python package/build] ⭐  Run actions/checkout@v2
[Python package/build]   ✅  Success - actions/checkout@v2
[Python package/build] ⭐  Run Set up Python ${{ matrix.python-version }}
INFO[0003]   ☁  git clone 'https://github.com/actions/setup-python' # ref=v2
...
[Python package/build]   💬  ::debug::Downloading https://github.com/actions/python-versions/releases/download/3.7.12-116024/python-3.7.12-linux-20.04-x64.tar.gz
...
| =========================== short test summary info ============================
| FAILED tests/test_main.py::TestClient::test_admin_set_styles - testcontainers...
| FAILED tests/test_main.py::TestClient::test_get_user_list - testcontainers.co...
| ============== 2 failed, 1 passed, 1 warning in 247.27s (0:04:07) ==============
[Python package/build]   ❌  Failure - CI
Error: exit with `FAILURE`: 1
➜  WordsGame git:(master) ls
```

> 以上為正確跑一次的大致會有的訊息(節錄其中一段)，當然這邊是失敗收場，後續會在提到

3. 前面有提到 act 是基於 Docker 開發的工具，因此在跑的時候會在 Docker 裡面建立一個 Container 來執行裡面會用到的內容。(可進 Dashboard 看)

![](https://nijialin.com/images/2021/action/act.png)

## 狀況排除 - 如果有環境變數還是要 export ooo=qqq

因為我在建立此專案時是需要先幫 chatbot 放 Token 測試才可以順利跑，因此在這邊 `${}` 裡的直就需要在環境變數中 export

```
...
- name: CI
        env:
          API_ENV: 'testing'
          DATABASE_URI: postgresql://postgres:postgres@db/postgres
          LINE_CHANNEL_ACCESS_TOKEN: ${LINE_CHANNEL_ACCESS_TOKEN}
          LINE_CHANNEL_SECRET: ${LINE_CHANNEL_SECRET}
...
```

## 在另一個 Docker 環境中執行 act

文件中有說明相關的內容(PR [#583](https://github.com/nektos/act/issues/583))，可能你有自架 Docker 在其他機器等等的，可以參考以下的指令：

> [附上文件處](https://github.com/nektos/act#docker-context-support)

```
export DOCKER_HOST=$(docker context inspect --format '{{.Endpoints.docker.Host}}')
```

## 環境特有的環境變數

或許在使用 GitHub Actions(或類似的 CI 服務)，可能會有些全域是需要設定的，可以參考[文件這邊](https://github.com/nektos/act#configuration)，把相關內容設定在 `./.actrc` 或 `~/.actrc` 中讓本地端測試也可以達到跟線上一樣的功能。

# 結論

這次剛好是沒事在 GitHub 首頁閒逛時發現的一個好東西，現在按星星 🌟 時已經快兩萬顆星星了，代表社群上大家也是很喜歡這個內容，也很實用，如果說你也有相關需求的話歡迎參考這篇文章做，如果有更多討論也歡迎在下方留言讓我知道喔！🙂

<style>
  section.compact {
    font-size: 150%  
  }
  img[alt~="center"] {
    display: block;
    margin: 0 auto;
  }
</style>
