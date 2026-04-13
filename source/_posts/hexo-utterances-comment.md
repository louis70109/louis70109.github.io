---
title: 在 Hexo 的 Next 樣板中引入 utterances 的留言區 | GitHub Issue
tags:
  - Hexo
  - Next
  - utterances
  - GitHub
  - Blog
categories: 應用
date: 2021-05-15 21:44:11
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

# 前言

早些日子前(也才去年)，我還是使用 Facebook 的留言，因為一般人理論上都已經登入過 Facebook，透過串接 Plugin 馬上就可以讓用戶留言，實在是挺方便。但隨時時間的推演，由於 Hexo 是由 JavaScript 所構成的，且因為相互依賴的套件許多，被迫一定要將 Hexo 升級版本(好像是 3 -> 5)，導致我的留言區直接全毀...

近期橫空出世(~~明明是自己孤陋寡聞~~)了一個 TypeScript 所構成的留言區套件 [utterances](https://utteranc.es/)，它是幹嘛得呢？它透過串接 GitHub issue 的方式來完成留言區的功能(需要 GitHub 帳號)，簡單來說如果在文章底下留言的話，他會同步在該 GitHub 專案留下一個 issue 同步留言。

<!-- more -->

至於為什麼要用它呢？因為[我的部落格](https://nijialin.com/)全部東西都是放在 GitHub 上面(by Hexo)，最後在透過 GitHub 幫我顯示部落格，因此在這次選擇上就切換成跟 GitHub 有連結的套件作為我留言區的選擇。

- 使用 Jekyll 的話可以[參考此篇](https://www.evanlin.com/jekyll-remove-disqus/)

# 引入套件

- [utterances](https://utteranc.es/): https://utteranc.es/
- GitHub: [https://github.com/utterance/utterances](/)

# 環境

- hexo: 5.2.0
  - Next 模組
- macOS: Big Sur
- NodeJS: v14.15.5
- npm: 6.14.11

# 步驟

1. 進入 [utterances](https://utteranc.es/) 後滑到 Repository 的地方，將 issue 要放的專案(repo)名稱放上去，例如： **louis70109/nijia-blog-backup** ，千萬別放上網址喔！

![repo setting](https://nijialin.com/images/2021/hexo-utt/s1.png)

這邊可以設定當留言被觸發要發 issue 時，想要放的內容，以第一項來說，標題會有用網址路徑名稱來顯示

![issue map](https://nijialin.com/images/2021/hexo-utt/s2.png)

留言之後會出現的樣式：
![issue github](https://nijialin.com/images/2021/hexo-utt/s2-2.png)

這部分則是再發 issue 時要不要幫忙加上**標籤**(Label)，以及放入部落格時候的**樣式**(Theme)
![label and theme](https://nijialin.com/images/2021/hexo-utt/s3.png)

最後會給你一段網址，透過 JavaScript 的方式在網頁上幫忙渲染，透過他們的程式幫你引入留言區(`https://utteranc.es/client.js`)至部落格，其餘內容則是在上述步驟時就會自動產生了，只要把這段放入專案中即可。
![html tag](https://nijialin.com/images/2021/hexo-utt/s4.png)


有了程式碼之後，要開始找 Hexo 的 Next 要放的位置，以我的專案 [nijialin-blog-backup](https://github.com/louis70109/nijia-blog-backup) 來說，照著下面的資料夾結構往下

> theme -> next -> layout -> _partials -> comments.swig

會找到 swig 的檔案(格式可[參考 wiki](https://zh.wikipedia.org/wiki/SWIG))
![hexo structure](https://nijialin.com/images/2021/hexo-utt/5.png)

當中找到如以下的判斷式：

```
{%- if page.comments %}
```

把剛剛在建立好的留言板程式複製並貼在 if 判斷是下面
```
<script src="https://utteranc.es/client.js"
        repo="[ENTER REPO HERE]"
        issue-term="pathname"
        theme="github-light"
        crossorigin="anonymous"
        async>
</script>
```

最後在 themes -> next -> _config.yml 的最下面加入:

```
utterances:
  enable: true
```

部署上去之後，進去部落格就可以看到結果啦！

![comment result](https://nijialin.com/images/2021/hexo-utt/result.png)
