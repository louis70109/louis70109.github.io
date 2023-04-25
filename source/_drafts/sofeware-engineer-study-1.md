---
title: 【標題】題目
categories: 學習紀錄
tags:
---


![](https://nijialin.com/images/2022/)
![](https://nijialin.com/images/common.jpeg)


# 前言

<!-- more -->

# 介紹

中文版: https://software-engineering-at-google.gh.miniasp.com/


EX: 許多公司的工程師都可以講述一個關於痛苦升級的故事。不同的是，我們在經歷了痛苦的任務之後認識到了這一點，並開始關注技術和組織變革，以克服規模問題，並將規模轉變為我們的優勢：自動化（這樣一個人就可以做到更多）、整合/一致性（這樣低級別的更改影響有限的問題範圍）和專業知識（以便少數人就可以做得更多）。

> 你更改基礎設施的頻率越高，更改就越容易。
> The more frequently you change your infrastructure, the easier it becomes to do so.

Expertise
We know how to do this; for some languages, we’ve now done hundreds of compiler upgrades across many platforms.
Stability
There is less change between releases because we adopt releases more regularly; for some languages, we’re now deploying compiler upgrades every week or two.
Conformity
There is less code that hasn’t been through an upgrade already, again because we are upgrading regularly.
Familiarity
Because we do this regularly enough, we can spot redundancies in the process of performing an upgrade and attempt to automate. This overlaps significantly with SRE views on toil.[^15]
Policy
We have processes and policies like the Beyoncé Rule. The net effect of these processes is that upgrades remain feasible because infrastructure teams do not need to worry about every unknown usage, only the ones that are visible in our CI systems.


專業知識
  我們知道如何做到這一點；對於某些語言，我們現在已經在許多平臺上進行了數百次編譯器升級。
穩定性
  版本之間的更改更少，因為我們更有規律的採用版本；對於某些語言，我們現在每一到兩週進行一次編譯器升級部署。
一致性
  沒有經過升級的程式碼更少了，這也是因為我們正在定期升級。
熟悉
  因為我們經常這樣做，所以我們可以在執行升級的過程中發現冗餘並嘗試自動化。這是與SRE觀點一致的地方。
策略
  我們有類似碧昂斯規則的流程和策略。這些程式的淨效果是，升級仍然是可行的，因為基礎設施團隊不需要擔心每一個未知的使用，只需要擔心我們的CI系統中常規的使用。


一個組織的健康不僅僅是銀行裡是否有錢，還包括其成員是否感到有價值和有成就感
# 結論
