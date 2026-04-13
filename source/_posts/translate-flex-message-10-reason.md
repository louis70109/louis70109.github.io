---
title: 【翻譯】使用 2020 Flex Message 的 10 個新功能 - 讓您在 LINE 的訊息設計更有彈性
tags:
  - LINE
  - Flex Message
  - Chatbot
categories: 翻譯
date: 2021-01-25 12:32:42
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

![](https://nijialin.com/images/2021/translate/flex2/1.png)

> 翻譯來自泰國的 Jirawatee 的[文章](https://medium.com/linedevth/10-%E0%B8%9F%E0%B8%B5%E0%B9%80%E0%B8%88%E0%B8%AD%E0%B8%A3%E0%B9%8C%E0%B9%83%E0%B8%AB%E0%B8%A1%E0%B9%88%E0%B9%83%E0%B8%99-flex-message-%E0%B8%9B%E0%B8%B5-2020-%E0%B8%AD%E0%B8%B4%E0%B8%AA%E0%B8%A3%E0%B8%B0%E0%B8%97%E0%B8%B5%E0%B9%88%E0%B9%80%E0%B8%AB%E0%B8%99%E0%B8%B7%E0%B8%AD%E0%B8%81%E0%B8%A7%E0%B9%88%E0%B8%B2%E0%B8%82%E0%B8%AD%E0%B8%87%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B8%AD%E0%B8%AD%E0%B8%81%E0%B9%81%E0%B8%9A%E0%B8%9A%E0%B8%82%E0%B9%89%E0%B8%AD%E0%B8%84%E0%B8%A7%E0%B8%B2%E0%B8%A1%E0%B9%83%E0%B8%99-line-47d9ba2cf9ed)

經常許多開發人員會在 LINE 中設計 Flex Message，讓不同設備的使用者可以收到美美的訊息。在 2020 年也就是去年，Flex Message 開發團隊聽到各位開發者的聲音了，發布了比以往更輕鬆並能將您的想像力轉換成 LINE 樣式的版本。

若您對於 Flex Message 不熟悉，建議先了解[這篇文章](https://medium.com/linedevth/%E0%B8%89%E0%B8%B5%E0%B8%81%E0%B8%81%E0%B8%8E%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B9%81%E0%B8%AA%E0%B8%94%E0%B8%87%E0%B8%9C%E0%B8%A5%E0%B8%82%E0%B9%89%E0%B8%AD%E0%B8%84%E0%B8%A7%E0%B8%B2%E0%B8%A1%E0%B9%81%E0%B8%9A%E0%B8%9A%E0%B9%80%E0%B8%94%E0%B8%B4%E0%B8%A1%E0%B9%86%E0%B9%83%E0%B8%99-line-messaging-api-%E0%B8%94%E0%B9%89%E0%B8%A7%E0%B8%A2-flex-message-4ad4370562f)。

- [使用 Flex Message 打破 LINE Messaging API 中的傳統顯示規則](https://medium.com/linedevth/%E0%B8%89%E0%B8%B5%E0%B8%81%E0%B8%81%E0%B8%8E%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B9%81%E0%B8%AA%E0%B8%94%E0%B8%87%E0%B8%9C%E0%B8%A5%E0%B8%82%E0%B9%89%E0%B8%AD%E0%B8%84%E0%B8%A7%E0%B8%B2%E0%B8%A1%E0%B9%81%E0%B8%9A%E0%B8%9A%E0%B9%80%E0%B8%94%E0%B8%B4%E0%B8%A1%E0%B9%86%E0%B9%83%E0%B8%99-line-messaging-api-%E0%B8%94%E0%B9%89%E0%B8%A7%E0%B8%A2-flex-message-4ad4370562f)
<!-- more -->

這次有 10 個新功能，將有助於了解 2020 年 Flex Message 中訊息設計的延展性。

1. APNG Support
2. 內容排版
3. 字體大小和圖示大小（以 px 為單位）
4. Shrink-to-Fit
5. 漸層背景(Gradient Background)
6. 使用 px 來設定 Margin & Spacing
7. 圖片大小（以 px 和 ％ 為單位）
8. 內容可為空的 Box(Empty Box)
9. 增加了單一 Bubble 的 JSON Max size
10. 增加了 Carousel 的 Bubble 數量

您只需查看每個功能的名稱即可。我將會在你的查詢過程中告訴您～

# 1. APNG Support

當今天有任何開發者想在 Flex Message 中使用動畫(APNG)，只需在 "圖片" 的 Component 中加入名為 animation 的 property 即可。

- animated: `true`, `false`(default)

```json
{
  "type": "image",
  "url": "https://apng.onevcat.com/assets/elephant.png",
  "animated": true
}
```

![](https://nijialin.com/images/2021/translate/flex2/2.gif)

## 注意

- 需注意用戶是否有在 "設定 > 照片．影片" 中開啟 **" Auto-play GIFs"** 選項，否則 Animation 將會不能執行。
- 當前使用的圖片 URL 若大於 300KB，則動畫將無法使用，並且只會呈現第一張圖片。
- 每個訊息最多可以指定 **3 個動畫圖片** Component，超過則無法發送訊息。

# 2. 內容排版

當我們要對 Box 中的內容進行排序時，經常使用 flex、width 和 height 之類的 property 來劃分寬度（horizontal）和高度（vertical）的比例，藉此分配間距和邊距。 Box 裡的內容之間都會需要一定距離，讓整體內容看起來更舒適。
此時 Flex Message 團隊準備了 2 個新 property ，您只要在 Box 中使用它們，將能讓您的內容安排更加容易。

## 2.1 [justifyContent](https://developers.line.biz/en/docs/messaging-api/flex-message-layout/#justify-content)

該 property 讓我們能在父階層中設置幫助安排內容，且以下每個值具有不同功能 property ：

- `flex-start`：這將從起點開始對所有項目進行排列。如果是水平，則將基於 bubble 給出的方向：ltr(從左至右)或 rtl(從右至左)；反之若是垂直，則所有項目將從上至下進行排列。
- `center`：將所有項目排列在中心點
- `flex-end`：這將從末端開始對所有項目進行排列。如果是水平，則將基於 bubble 給出的方向：ltr(從左至右)或 rtl(從右至左)；反之若是垂直，則所有項目將從下至上進行排列。
- `space-between`：第一個與最後一個項目貼齊左右側的佈局，其餘項目平均分配到顯示畫面的中心。
- `space-around`：將每個項目之間的距離均勻地分配。
- `space-evenly`：平均劃分每個項目與訊息佈局的距離來進行排列

```json
{
  "type": "box",
  "layout": "horizontal",
  "justifyContent": "flex-start",
  "contents": [{}, {}, {}]
}
```

![](https://nijialin.com/images/2021/translate/flex2/3.png)

```json
{
  "type": "box",
  "layout": "vertical",
  "justifyContent": "flex-start",
  "height": "200px",
  "contents": [{}, {}, {}]
}
```

![](https://nijialin.com/images/2021/translate/flex2/4.png)

## 2.2 [alignItems](https://developers.line.biz/en/docs/messaging-api/flex-message-layout/#align-items)

該 property 能讓我們指定父階層中的項目更換排序方向，而每個值具有以下 property 功能：

- `flex-start`：如果父階層水平排列，則所有項目將自上而下；如果父母垂直排列，則所有項目將從一開始（取決於 Bubble 的方向）
- `center`：將所有項目排列在水平和垂直方向的中心點
- `flex-end`：如果將父階層水平排列，則所有項目將從下至上；並且如果將父接成垂直排列，則所有項目將從末端排列（取決於 Bubble 的方向）

```json
{
  "type": "box",
  "layout": "horizontal",
  "alignItems": "flex-start",
  "height": "200px",
  "contents": [{}, {}, {}]
}
```

![](https://nijialin.com/images/2021/translate/flex2/5.png)

```json
{
  "type": "box",
  "layout": "vertical",
  "alignItems": "flex-start",
  "height": "200px",
  "contents": [{}, {}, {}]
}
```

![](https://nijialin.com/images/2021/translate/flex2/6.png)

# 3. 字體大小和圖示大小（以 px 為單位）

過往只能指定 property 來決定[文字的大小](https://developers.line.biz/en/docs/messaging-api/flex-message-elements/#text)，[Span Component](https://developers.line.biz/en/docs/messaging-api/flex-message-elements/#component)和[ Icon](https://developers.line.biz/en/docs/messaging-api/flex-message-elements/#component)也只能透過特定關鍵字來決定尺寸：xxs(11px)、xs(13px)、sm(14px)、md(16px)、lg(19px)、xl(22px)、xxl(29px)、3xl(35px)、4xl(48px)、5xl(74px)來規範這些 Component 的大小。像我以前就很希望能有不同的方式可以設定大小。

但是現在讓每個人的夢想都實現了。因為所有給定的 Component 大小都可以設定`像素`(`px`)。

- size: `keywords`, `px`

```json
{
  "type": "text",
  "text": "...",
  "contents": [
    {
      "type": "span",
      "text": "LINE",
      "size": "32px",
      "weight": "bold",
      "color": "#00ff00"
    },
    {
      "type": "span",
      "text": " Developers",
      "size": "24px"
    }
  ]
}
```

![](https://nijialin.com/images/2021/translate/flex2/7.png)

---

# 4. Shrink-to-Fit

如果按鈕內的文字的長度大於該項目的寬度，則會發生多餘的文字將被使用 `...` 隱藏起來。

以前，想要完全呈現長所有文字內容的方式是將名為 **wrap** 的 property 設置為 `true`，但這可能會使整體佈局變形，而 Text 或 Button 所設定的高度也可能因為展開內容會受到影響。

因此，Flex Message 2020 提供了 **adjustMode** property ，該 property 會自動減小字體大小以適應 Component 的寬度，從而使整體佈局與設計相同。

- **AdjustMode**：`shrink-to-fit`

```json
{
  "type": "button",
  "action": {
    "type": "uri",
    "label": "Buy a coffee to your friends anywhere",
    "uri": "http://line.me"
  },
  "style": "primary",
  "adjustMode": "shrink-to-fit"
}
```

![](https://nijialin.com/images/2021/translate/flex2/8.png)

## 注意

AdjustMode 可以在 LINE v10.13.0 以上的版本使用。

# 5. 漸層背景(Gradient Background)

之前我們可以使用名為 **backgroundColor** 的 property 來更改 Box 的背景顏色，並支援使用 alpha（rgba）的十六進制色碼。

今年，Flex Message 團隊讓我們能夠透過一個稱為 **background** 的 property 設定漸變背景顏色，它包含了以下的 property ：

- type：linearGradient（**必填**）
- angle（**必填**）：漸層變化的起點角度，或是您也可以使用整數(含小數)來定義角度，例如 **88.8**deg。
  - 設定數值: `0deg — 360deg`
- startColor：起始位置顏色的十六進制(6 或 8 個字元)色碼（**必填**）。
- endColor：結束位置顏色的十六進制(6 或 8 個字元)色碼（**必填**）。
- centerColor：中心位置的十六進制(6 或 8 個字元)色碼。
- CenterPosition：從 Box 的 **centerColor** 位置對顏色做分區，一樣可以使用整數(含小數)來定義角度，如 **88.8**％。
  - 設定數值：`0 — 100%`

```json
{
  "type": "box",
  "layout": "vertical",
  "contents": [],
  "background": {
    "type": "linearGradient",
    "angle": "0deg",
    "startColor": "#ff4d79",
    "centerColor": "#ff0000",
    "endColor": "#ffdb2c",
    "centerPosition": "50%"
  },
  "height": "200px"
}
```

![](https://nijialin.com/images/2021/translate/flex2/9.png)

# 6. 使用 px 來設定 Margin & Spacing

先前定義整個 Flex Message 的間距只能透過輸入`關鍵字`(`keywords`)的 property(`none`、`xs`、`sm`、`md`、`lg`、`xl`、`xxl`)來調整。
但是為了提高整體訊息設計的辨識率和精準度，今年 Flex Message 團隊提供出能夠使用 `pixel` 來設定間距，參考範例如下：

- margin: `keywords`, `px`

```json
{
  "type": "text",
  "text": "Hello World!",
  "margin": "16px"
}
```

- spacing: `keywords`, `px`

```json
{
  "type": "box",
  "layout": "horizontal",
  "spacing": "16px",
  "contents": [
    {
      "type": "text",
      "text": "grape"
    },
    {
      "type": "separator"
    },
    {
      "type": "text",
      "text": "lemon"
    }
  ]
}
```

![](https://nijialin.com/images/2021/translate/flex2/10.png)

## 注意

從現在開始，Box 中每個 component 的間距都可以使用 Margin 設定（以前不會影響 Box 中第一個列出的 component）

# 7. 圖片大小（以 px 和 ％ 為單位）

過往設置圖片大小時，我們一樣只能使用關鍵字來定義大小(`xxs`、`xs`、`sm`、`md`、`lg`、`xl`、`xxl`、`3xl`、`4xl`、`5xl`、`full`)，以圖片的設定來說這樣設定的確會綁手綁腳。
但是從現在開始，圖片可以使用`關鍵字`、`百分比`、`pixel`設定，圖片的**寬度**和**高度**將會被自動計算出來，範例如下：

- size: `keywords`, `px`, `%`

```json
{
  "type": "image",
  "url": "https://apng.onevcat.com/assets/elephant.png",
  "size": "80%"
}
```

![](https://nijialin.com/images/2021/translate/flex2/11.png)

# 8. 內容可為空的 Box(Empty Box)

Box 是提供整個 Flex Message 佈局的主要元件，類似於 Web 開發中的 <div>。

以前要設定 Box 的內容時我們都需要指定一個物件(Object)給 Box，但是在寫一些判斷式時會不小心會漏了定義給它 Object 導致內容為空，以至於我們無法發送 Chatbot 的訊息出去。

```json
{
  "type": "box",
  "layout": "vertical",
  "contents": []
}
```

很慶幸的是，Flex Message 團隊考量到更大的靈活性，在 2020 推出可以讓 Box 的 contents `可為空`，讓開發者們可以送出空的物件，增加更多的彈性！

# 9. 增加了單一 Bubble 的 JSON Max size

曾經我認為 size 應該很夠用，但因為遇到了一些社群上的開發者將所有的 Flex Message 放到單一個 Bubble 裡面，導致訊息的 JSON 的大小就會超過 10KB 的限制。

但是從現在開始，您將能夠在訊息中使用 3 倍的訊息量，因為單個 Bubble 的 Flex Message 中 JSON 的大小已經擴展到 `30KB` 囉！但開發者們還是要小心使用避免因為超出限制而導致錯誤發生。

# 10. 增加了 Carousel 的 Bubble 數量

很多人都知道，在 LINE 中以 Template Message 或 Flex Message 的形式創建 "Carousel Message" 時，每個訊息最多只能包含 10 個 Bubble。

而在讀過本篇的您將會很幸運，因為我會跟您說，一個 Flex Message 現在能夠讓您的每個 Carousel 訊息最多**擁有 12 個 Bubble**。

# 結論

2020 年 Flex Message 團隊聽到各位開發者的聲音並釋出了許多新功能並增加彈性來改善開發流程的體驗，這裡我要感謝泰國開發人員以及 LINE API Expert 提供我們許多意見回饋和新功能需求，讓我們的服務可以持續改善。

最後，我想用一個漂亮的句子結尾這篇文章...

> A Technology without a Community has no Meaning.
