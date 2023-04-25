---
title: 我從 Lint 中學到了什麼？
tags:
  - Lint
  - Flake8
  - SonarQube
  - ESLint
categories: 學習紀錄
abbrlink: 23350
date: 2020-06-22 00:49:42
---

![](https://cdn.pixabay.com/photo/2017/08/12/17/14/taiwan-2634743_1280.jpg)

# 前言

Lint 是靜態程式檢查語法的工具，最早出現於 C 語言，也有人稱為 Code Quality Tools，主要是用來標記程式碼中含有`某些可疑`、`不具結構性`或潛在問題的部分，也因只標記緣故，所以只會透過編輯器提醒使用者。之後則汎用於各個語言之中，如 ESSLint、flake8、Rubocop...

從前在改以前寫程式時都會有幾個問題，『排版好亂』、『這變數(a1)是？』諸如此類的問題，但就在加入社群後認識很多圈內的朋友並與之討論後才體悟到 Lint 的重要性，首先在跟人家解釋程式時從`變數`、`函式`名稱時就能讓對方更快速知道用途，透過 Lint 的提醒讓我修正而不用與其他人解釋 a1 a2 個別代表什麼，大大的降低溝通成本。

## 優點

<!-- more -->

- 開發風格統一
- 不會有 tab、space 的問題
- 後續接手的人心力可以放更多在商業邏輯上
- 培養命名習慣，更謹慎地處理

## 缺點

- 容易打擊剛加入開發領域的朋友
  - Ａ：明明邏輯是對的但怎麼紅字一堆？
- 設定太嚴謹時會為了修問題延誤邏輯開發時間
  - 時程很趕但 CI 一直擋住

# 介紹

以下會介紹三個我使用過的 Lint，並分享使用經驗。

## SonarQube

SonarQube 是我在之前的公司時所使用的 Lint，裡面的功能真的很完整，除了一些基本檢查以外，最有印象的就是它會找出`淺在風險`、`Code 品質`、`花多久時間可以看懂`...很多很特別的部分，也許這些功能可能只是參考，但看著數字很淒慘時工程魂就會上身，想要把它數值降低點別出現這麼可怕的數字 😅。

![](https://i.imgur.com/PDyOvLF.png)

> Azure + Sonar 參考[董老師的影片](https://www.facebook.com/DotNetWalker/posts/3277105698995647?__xts__[0]=68.ARBkAILNJPiUfPxM6Prkqnc5a38h0vuBEmxvcb8WQRW1xbbJnMhddEwi7Lj2OudXHSJ2hrZ4jGtMMKEYzbF7GcdcZ0CoglZWSiexYSjlseEXBnReh6OoE5ZGIhlGTh75wVn5mHQ2B-bkTfatl-vIP-k83-G6yeoXm0ZcboLrq_e0gZqQLLTY0FPsbB_ROKWvYuYBbxY5-Vj2kpvVBU528mFDTCKDGTk5ih16hbuzlrxY0boNZUVuIcaT4zdnHBaAUFTminhF03jkys7pSpDeiBVz_A6z3jjPJChlAI9pZzZTrlmupgRR6yDzzQrjZ2CR6R2kWOZi5Liz7RfO9GkxZz4G6g&__tn__=-R)

免費版具有容量限制，若是團隊人多的話我認為值得花錢買的 Lint，讓大家 Commit 的程式碼可以被檢查，而 SonarQube 應該是我目前遇到數一數二真的是在鞭打我 code 的一個凶狠 Lint 工具...

## ESLint

起初我初學 Vue 時，在初始化專案時覺得是工程師就是要 Lint，就直接選 ESLint，且當時對於 config 設定檔一竅不通，因此除了執行時滿滿的錯字以外，也讓我對於寫 code quality 的成就感大大折損，對於 coding 年紀還年輕的朋友可以先養成對於 coding 有興趣後再來使用 Lint 我認為對於整個發展會比較健全(但還是看人)。

接著過了一陣子後，我開始修改一個 side project - [Twitch-Bot](https://github.com/louis70109/Twitch-Bot)，這時期因參加社群一陣子也得知 Bottender 這個使用 Javascript 開發 Chatbot 框架，就依照 [Bottender 的初始化](https://bottender.js.org/docs/en/getting-started)方式加上 ESLint，並且搭配 TypeScript 動態檢查所有 code。

> 可以看[當時的 PR 連結](https://github.com/louis70109/Twitch-Bot/pull/16/files)，讓其他人改 code 時也是透過一樣的方式來貢獻，就不會有太多檔案被修改的問題了。

在一開始因為還不熟悉 Javascript 相關開發風格，而我使用很多 pythonic 的方式撰寫 Bot，導致整個專案被狠狠教訓了一遍，不過藉由 Lint 校正的好處是讓我再隔一段時間回來時修改 issue 時不會因為 coding style 不統一而引發的問題，再開發的過程中也會透過小蚯蚓告訴你命名或是哪邊有排版問題，只要遵守 Lint 的規則整份 code 沒有被標記起來就覺得神清氣爽 😆。

以下節錄我的 VSCode ESLint 相關設定：

```javascript
{
  // 儲存時 format
  "editor.formatOnSave": true,

  // 單引號設定
  "javascript.preferences.quoteStyle": "single",
  "typescript.preferences.quoteStyle": "single",

  // ESLint 設定
  "eslint.autoFixOnSave": true,
  "eslint.enable": true,
  "eslint.validate": ["javascript", "typescript"],
  "eslint.format.enable": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```

> [參考我的 Gist](https://gist.github.com/louis70109/8ea88b9b26570d521c81922572f8309d)

### Bonus - VSCode settings

開啟編輯器後的左上角按下`喜好設定`，英文則是 `Performance`
![](https://i.imgur.com/01XOZHL.png)

接著右上角有個`轉換檔案的圖案`按下去就可以看到 setting.json 囉！
![](https://i.imgur.com/ut4sH60.png)

## Flake8

當初會知道怎麼使用 Flake8 的原因是我去貢獻 [LINE SDK](https://github.com/line/line-bot-sdk-python)，它們是使用 tox 來跑多版本的檢查(py2.7、3.4~3.7)，並透過 `tox.ini` 的設定來來制定使用的 Lint 及其相關設定(ignore...)。

以我前一陣子的寫的 [Lotify](https://github.com/louis70109/lotify#contributing) 來說，在每次的上版前都一定要跑 flake8 檢查：

```python
python -m pytest --flake8 tests/
```

> 上述範例是跑測試時要搭配 flake8 的格式。

透過 flak8 的檢查讓我在 CI 環境時就可以檢查出錯誤，規範貢獻者們的開發風格(包含自己)，如此一來過陣子再回來修改 Lotify 時就可以駕輕就熟 😆，且其他的貢獻者也可以遵守這個規範下去開發。

# 結論

Lint 是集結各方工程師們的血汗結晶所產生的規則，在這開源的時代跟著大家的規則走能減少許多溝通成本，讓心思可以在(商業、工程)邏輯上。另一部分我則認為是對自我的要求，透過固定的格式再經過 `N 週/月` 後會來看 code 時不會因為一直因為不統一的 coding style 而導致連自己都看不懂的程式碼窘境，因此適當地遵循也是會對以後開發更有幫助喔！

每個工具沒有絕對的好壞，我認為適當的遵循是好的，但別一昧的堅持才能開發出好的程式碼。
