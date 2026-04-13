---
title: 【k3d】處理無法開 NodePort 與建立 Cluster 的問題
tags:
  - Kubernetess
  - k3d
  - NodePort
  - kind
categories: Kubernetes
date: 2021-10-17 23:44:29
---


# 前言

這個禮拜複習一下之前使用 k3d 練習 Kubernetes 的相關文章 - [將 Chatbot 丟入一台筆電中的 Kubernetes 叢集海 | k3d | Docker](https://nijialin.com/2021/02/19/kubernetes-k3d-learning/)，但很莫名其妙的 k3d 壞掉，建立除了說 agents 找不到之外，建立到一半還會 rollback，以下如果看文的你有遇到類似的問題可以試試看。

## TL;DR

- 刪除 k3d 的 Cluster
- NodePort 開啟的寫法更換

<!-- more -->

# 除蟲過程直接跳到 kind

許久沒用之後我索性想說跳巢使用另一個工具 [kind](https://kind.sigs.k8s.io/)，它是由 Kubernetes 所維護的開源測試工具，本想說好了順便學一下，順著 Quick Start 實作後，部署上去透過 k9s 來監控一下為什麼最基本的服務起來都一直在 pending 的狀態，進去看之後看到類似下面的訊息：

```
1 node(s) had taints that the pod didn't tolerate.
```

許久沒弄＋第一次換過來都不知道是發生什麼事情(污染了什麼？？)，並且當中也看到 CrashLoopBackOff 的字眼，重複查了許多都是因為使用舊版導致的一些問題，這邊剛好想到會不會是 k3d 與 kind 之間卡了什麼東西互相影響

# 回歸 k3d 建立 Cluster 遇到錯誤

建立初期我還是照著官網範例下了 `k3d cluster create nijiacluster --agents 1 -p 8000:30080@agent[0]` (官網不會騙我吧？)，但還是出現類似以下的錯誤

```
➜  k3d cluster create nijiacluster2 --agents 1
INFO[0000] Prep: Network
INFO[0000] Created network 'k3d-nijiacluster2'
INFO[0000] Created volume 'k3d-nijiacluster2-images'
INFO[0000] Starting new tools node...
INFO[0000] Starting Node 'k3d-nijiacluster2-tools'
INFO[0001] Creating node 'k3d-nijiacluster2-server-0'
INFO[0001] Creating node 'k3d-nijiacluster2-agent-0'
INFO[0001] Creating LoadBalancer 'k3d-nijiacluster2-serverlb'
INFO[0001] Using the k3d-tools node to gather environment information
INFO[0001] Starting cluster 'nijiacluster2'
INFO[0001] Starting servers...
INFO[0001] Starting Node 'k3d-nijiacluster2-server-0'
INFO[0001] Deleted k3d-nijiacluster2-tools
INFO[0007] Starting agents...
INFO[0007] Starting Node 'k3d-nijiacluster2-agent-0'
WARNING: Error loading config file: /Users/nijia/.docker/config.json: open /Users/nijia/.docker/config.json: too many open files
ERRO[0030] Failed Cluster Start: Failed to add one or more agents: Node k3d-nijiacluster2-agent-0 failed to get ready: Failed waiting for log message 'Successfully registered node' from node 'k3d-nijiacluster2-agent-0': failed to get container for node 'k3d-nijiacluster2-agent-0': Failed to list containers: error during connect: Get "http://%2Fvar%2Frun%2Fdocker.sock/v1.24/containers/json?all=1&filters=%7B%22label%22%3A%7B%22app%3Dk3d%22%3Atrue%2C%22k3d.cluster.imageVolume%3Dk3d-nijiacluster2-images%22%3Atrue%2C%22k3d.cluster.network.external%3Dfalse%22%3Atrue%2C%22k3d.cluster.network.id%3Ded12e7fc4c6a417a407af54b2aa37659ef4c93ad480fbbe815b041fe9d042954%22%3Atrue%2C%22k3d.cluster.network.iprange%3D172.25.0.0%2F16%22%3Atrue%2C%22k3d.cluster.network%3Dk3d-nijiacluster2%22%3Atrue%2C%22k3d.cluster.token%3DDIoMcOupoUDPSYabJsVF%22%3Atrue%2C%22k3d.cluster.url%3Dhttps%3A%2F%2Fk3d-nijiacluster2-server-0%3A6443%22%3Atrue%2C%22k3d.cluster%3Dnijiacluster2%22%3Atrue%2C%22k3d.role%3Dagent%22%3Atrue%2C%22k3d.version%3Dv5.0.1%22%3Atrue%7D%2C%22name%22%3A%7B%22%5E%2F%3F%28k3d-%29%3Fk3d-nijiacluster2-agent-0%24%22%3Atrue%7D%7D&limit=0": dial unix /var/run/docker.sock: socket: too many open files
ERRO[0030] Failed to create cluster >>> Rolling Back
INFO[0030] Deleting cluster 'nijiacluster2'
WARNING: Error loading config file: /Users/nijia/.docker/config.json: open /Users/nijia/.docker/config.json: too many open files
ERRO[0030] Failed to get nodes for cluster 'nijiacluster2': docker failed to get containers with labels 'map[k3d.cluster:nijiacluster2]': failed to list containers: error during connect: Get "http://%2Fvar%2Frun%2Fdocker.sock/v1.24/containers/json?all=1&filters=%7B%22label%22%3A%7B%22app%3Dk3d%22%3Atrue%2C%22k3d.cluster%3Dnijiacluster2%22%3Atrue%7D%7D&limit=0": dial unix /var/run/docker.sock: socket: too many open files
ERRO[0030] failed to get cluster: No nodes found for given cluster
FATA[0030] Cluster creation FAILED, also FAILED to rollback changes!
```

## 想起還有 k9s

透過 k9s 可以觀看在線上的 node, pod 在搞什麼鬼，近來看才發現有一個沒刪掉的 cluster 卡在這

![](https://nijialin.com/images/2021/k3d-debug/1.png)

> 可能我指令也不熟沒發現到這邊

上網找了一下可以使用 `kubectl config delete-context` 把沒刪掉的 cluster 砍了，因此就如下：

```
➜ kubectl config delete-context k3d-nijiacluster
deleted context k3d-nijiacluster from /Users/nijia/.kube/config
```

砍掉之後再重新建立一次 cluster 就不會出現上面錯誤了

# k3d - NodePort 建立不起來

上次輸入這個指令後是可以建立 NodePort 的 Cluster

```
k3d cluster create nijiacluster --agents 1 -p '8000:30080@agent[0]'
```

> 官方文件目前也是這樣說 [2021/10/17]： https://k3d.io/usage/guides/exposing_services/#2-via-nodeport

想當然是建立失敗，出現以下訊息

```
FATA[0000] failed to transform ports: Failed to parse node filters: invalid format or empty subset in 'agent[0]'
```

接著透過 `--help` 來找一下到底哪邊輸入錯了

```
-p, --port [HOST:][HOSTPORT:]CONTAINERPORT[/PROTOCOL][@NODEFILTER]   Map ports from the node containers (via the serverlb) to the host (Format: [HOST:][HOSTPORT:]CONTAINERPORT[/PROTOCOL][@NODEFILTER])
- Example: `k3d cluster create --agents 2 -v /my/path@agent:0,1 -v /tmp/test:/tmp/other@server:0`
```

看到範例才發現後面的 `[]` 變成了 `:`

## AS-IS

```
k3d cluster create nijiacluster --agents 1 -p 8082:30080@agent[0]
```

## TO-BE

```
k3d cluster create nijiacluster --agents 1 -p 8082:30080@agent:0
```

# 結論

今天簡短寫一下這週對我而言遇到的怪問題，接下來要開始研究一下在 k3d 中安裝 prometheus 了～
