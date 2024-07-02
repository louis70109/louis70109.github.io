---
title: AI practice of LINE Bot first conversation
tags:
  - LINE Bot
  - AI
  - Gemini
  - GCP
categories: AI
date: 2024-07-02 15:28:01
---


![](https://nijialin.com/images/2024/ㄍline-bot-gemini/1.png)

# 前言

在以前開發 LINE Bot 的過程中，我們常常面臨一個問題：用戶輸入的文字千變萬化，可能包含錯字、口語化表達等。這使得我們需要設計非常複雜的判斷邏輯，才能確保 Bot 能正確地辨識並回應用戶的輸入。這不僅需要投入大量時間和精力，還需要不斷調整和維護這些判斷規則。這種方式不僅效率低下，而且容易出現錯誤。

<!-- more -->

在本文中，將快速介紹如何利用生成式 AI 技術來幫助 LINE Bot 在對話開始之前主動判斷適合的條件，並根據這些條件自動執行相關的任務。讓我們一起來看看具體的實現方法吧！

# 背景

以前開發 LINE Bot 時，開發者往往需要投入大量時間來設計和實現正規化的判斷邏輯。這些正規化規則用於判斷用戶輸入的各種文字，進而觸發相應的功能。然而，這種方法存在一些挑戰：

1. **多樣化輸入**：用戶輸入的文字千變萬化，可能包含錯字、口語化表達等，這使得單純依靠正規化規則難以精確判斷。
2. **維護成本高**：由於正規化規則需要手動設計和調整，隨著需求增加，維護這些規則的成本也會不斷上升。

為了解決這個問題，這次引入了生成式 AI。可以根據預定的條件，來幫助 LINE Bot 做初期的條件判斷。這樣一來，我們就不再需要手動設計和維護大量的判斷規則，大大提高了開發效率和準確性。

## 如何實作

參考 GitHub 中的範例([URL](https://github.com/louis70109/linebot-gemini-earthquake/blob/main/main.py#L110))，以下是這次主要展示的片段：

```python

...

# 定義條件對應字典
bot_condition = {
    "清空": 'A',
    "摘要": 'B',
    "地震": 'C',
    "氣候": 'D',
    "其他": 'E'
}

# 初始化生成式 AI 模型
model = genai.GenerativeModel('gemini-1.5-pro')

# 模型生成內容並進行條件判斷
response = model.generate_content(
    f'請判斷 {text} 裡面的文字屬於 {bot_condition} 裡面的哪一項？符合條件請回傳對應的英文文字就好，不要有其他的文字與字元。'
)

# Gemini 產生的字會有多餘的空白，因此需要清除
text_condition = re.sub(r'[^A-Za-z]', '', response.text)

# 根據判斷結果執行相應任務
if text_condition == 'A':
    pass
elif text_condition == 'B':
    # 添加處理摘要的邏輯
else:
    # 處理其他情況
```

- 透過事前定義一個 bot_condition 的 JSON，來對應每個條件
- 透過生成式 AI 來判斷用戶輸入的文字所對應的選項
- 由於 Gemini 在這條件中會產生多餘的空白，因此還是用 regex 來清除空白
- 對應事件就用選擇題的方式讓 Bot 判斷

# 結論

本文介紹了如何利用生成式 AI 技術來幫助 LINE Bot 在對話開始之前主動判斷適合的條件，並根據這些條件自動執行相關的任務。透過事先定義條件對應選項和使用生成式 AI，開發者可以大大提高開發效率和準確性，同時減少維護成本。

這種方法不僅能夠應對用戶輸入的多樣化文字，還能夠根據預定的條件快速判斷並執行相應的任務。這將為 LINE Bot 的開發帶來更高的效率和更好的用戶體驗。

## 參考連結

以下是一些關於 LINE Bot 開發的參考連結：

- [LINE Messaging API 官方文件](https://developers.line.biz/en/docs/messaging-api/)
- [LINE Bot SDK for Python 官方文件](https://github.com/line/line-bot-sdk-python)

希望以上資訊對您有所幫助！

<style>
  section.compact {
    font-size: 150%  
  }
  img[alt~="center"] {
    display: block;
    margin: 0 auto;
  }
</style>
