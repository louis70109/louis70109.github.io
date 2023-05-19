---
title: SRT 字幕輸出工具介紹 - 中英日韓文不求人！但求時間
tags:
  - OpenAI
  - SRT
  - Whisper
categories: 應用
date: 2023-05-14 01:13:15
---



![](https://nijialin.com/images/2023/vlc.png)


# 前言

隨著 OpenAI 的盛行，各式各樣幫助大家節省時間的工具如雪花般誕生，如今在做 SRT 字幕這邊又更加方便了！

去年 COSCUP 我曾經在 GDG 上分享 [【GCCP Creator】增加字幕編輯的效率！](https://nijialin.com/2022/08/20/gccp-creator-cc-subtitle/)，當時唯一的問題是，透過 Google STT 所判斷出來的字串其實沒有那麼的"友善"觀看，需要人工再多介入些；而如今 OpenAI 的判斷其實直接更上 N 層樓，再晶晶體夾爆的各種句子中，許多時候他都能清楚地判斷出來，因此以下我就把一些近期找到的工具分享給大家，若有想把各種影片加上字幕的話，或許可以參考以下方式看看喔！

<!-- more -->

# [decipher](https://github.com/dsymbol/decipher)

它是一個透過 Whisper API 的工具，不太確定為什麼不需要提供使用者的 OpenAI API Key(佛心來著)，初步看 Code 也沒有上傳任何東西，但總之在 Speech-To-Text 上的判斷也不錯，以下就介紹給大家使用

```
pip install git+https://github.com/dsymbol/decipher
```

因為是使用 python 安裝的緣故，故以下指令都會用 `python -m decipher` 執行。

接下來透過以下指令，把指定的音檔透過模型(small)來語音轉文字的 SRT

```
python3 -m decipher transcribe -i ~/Users/使用者名稱/Desktop/result/example.mp4 --model small
```

一般來說檔案位置都會在 `/Users/使用者名稱/Destop/result/` 裡面。

> 如果是轉其他語系，並且需要把它轉出中文字，可以參考以下步驟。

## [srt-gpt-translator](https://github.com/jesselau76/srt-gpt-translator)

> 他會將需判斷的長度控制在  1024 characters 之間(OpenAI 限制)，因此有些長度若過長，可能會有判斷失準的風險。
> [中文文件](https://github.com/jesselau76/srt-gpt-translator/blob/main/README-zh.md)


```
git pull git@github.com:jesselau76/srt-gpt-translator.git
cd srt-gpt-translator
pip install -r requirements.txt
mv settings.cfg.example settings.cfg
vim settings.cfg
```

將settings.cfg 裡的環境變數 openai-apikey 改為你自己的 sk-xxxxxxx (OpenAI API Key)後，設定`target-language`(預設中文)，儲存並執行以下：

```
python3 srt_translation.py ~/Users/使用者名稱/Desktop/result/example.srt
```

> 這邊因為真的是 API 一個一個 call，因此會執行比較長的時間。

完成之後總共會有三個黨名：
```
Example.srt
Example_translated.srt
Example_translated_bilingual.srt
```

假設你的 `Example.srt` 是日文的話， `Example_translated.srt` 就是中文， `Example_translated_bilingual.srt` 則是日中合體。

在這個 Project 中有設定 Retry 機制，如果有一段話透過 OpenAI 處理超過 60 秒，則會 Retry 一次，若三次就使用原本的字串，以我的經驗來說，就有一些還是原本的語言，如果很依賴字幕的情況下，可能會有點疑惑...🧐

但畢竟都是靠程式跟AI在跑，因此若只是自己想看的影片或是公司內部的訓練影片需要，或許一些沒完整的地方可能是可以接受的，。因此大家在使用時就自行評估能接受到的程度到哪～

> 如果要精細的話還是需要花錢的💰💰💰


## 使用 decipher + ffmpeg 自動判斷並 embedding

<script src="https://gist.github.com/louis70109/e6050062c23b23714f942c8663859309.js"></script>

# 結論

最後就可以用 VLC 來播放含有字幕的檔案，就可以看有字幕的版本了。

![](https://nijialin.com/images/2023/vlc.png)


但如果想要輸出影片成另一支影片，目前手頭上的可以使用 Premiere Pro(需付費)，威力導演不確定(感覺可以)

- QuickTime Player：還沒測試出來，但也無法 Export 一個新檔案
- iMovie: 無法 Import SRT 字幕以及無法 Export 一個新檔案


最後就到這邊，自從有了 OpenAI 之後許多事情都變了很方便，若有任何新點子，歡迎底下留言給我，我會盡快回答各位的！