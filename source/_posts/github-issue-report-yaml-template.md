---
title: 【GitHub】建立第一個 Issue Template
tags:
  - GitHub
categories: 學習紀錄
date: 2023-10-05 14:44:28
---


![](https://nijialin.com/images/common.jpeg)

# 前言

準備演講的同時，發現 GitHub 現在在回報 issue 上開始有框架的方式來讓專案開發者可以更快速建立，不用像以前要自己參考網路上的資料，或是自己天馬行空想一個版本。透過 yaml 的制定除了更好看以外，也讓用戶在回報 issue 時有更漂亮的畫面可以填寫，以下就分享一下如何在自己的 report 上加入～

<!-- more -->

# 建立一個 [Bug Report 的 Issue 樣板](https://docs.github.com/en/communities/using-templates-to-encourage-useful-issues-and-pull-requests/configuring-issue-templates-for-your-repository#creating-issue-forms)

進入頁面之後，有提供一個如下的 bug report 樣板：

```yaml
name: Bug Report
description: File a bug report
title: '[Bug]: '
labels: ['bug', 'triage']
projects: ['octo-org/1', 'octo-org/44']
assignees:
  - octocat
body:
  - type: markdown
    attributes:
      value: |
        Thanks for taking the time to fill out this bug report!
  - type: input
    id: contact
    attributes:
      label: Contact Details
      description: How can we get in touch with you if we need more info?
      placeholder: ex. email@example.com
    validations:
      required: false
  - type: textarea
    id: what-happened
    attributes:
      label: What happened?
      description: Also tell us, what did you expect to happen?
      placeholder: Tell us what you see!
      value: 'A bug happened!'
    validations:
      required: true
  - type: dropdown
    id: version
    attributes:
      label: Version
      description: What version of our software are you running?
      options:
        - 1.0.2 (Default)
        - 1.0.3 (Edge)
      default: 0
    validations:
      required: true
  - type: dropdown
    id: browsers
    attributes:
      label: What browsers are you seeing the problem on?
      multiple: true
      options:
        - Firefox
        - Chrome
        - Safari
        - Microsoft Edge
  - type: textarea
    id: logs
    attributes:
      label: Relevant log output
      description: Please copy and paste any relevant log output. This will be automatically formatted into code, so no need for backticks.
      render: shell
  - type: checkboxes
    id: terms
    attributes:
      label: Code of Conduct
      description: By submitting this issue, you agree to follow our [Code of Conduct](https://example.com)
      options:
        - label: I agree to follow this project's Code of Conduct
          required: true
```

![](https://nijialin.com/images/2023/github-report/1.png)

接著找到你想要使用的 project，按下 `Add file` 新增檔案

![](https://nijialin.com/images/2023/github-report/2.png)

在輸入框上面打上 `.github/ISSUE_TEMPLATE/bug-report.yaml` ，輸入到**斜線**`/`時會在畫面上自動跑階層出來，因此不用太擔心會不會被失敗，然後把剛剛的 yaml code 貼上去 commit 它！

![](https://nijialin.com/images/2023/github-report/3.png)

Commit 完成之後可以現看一下被 GitHub 渲染出來的樣子有沒有符合心中的樣式

![](https://nijialin.com/images/2023/github-report/4.png)

送自己個 issue！成功之後應該要如同上面的畫面，會有一個新的樣板跑出來

![](https://nijialin.com/images/2023/github-report/5.png)

畢竟是 bug report，該有的 prefix 以及 label 都會出現，下拉式選單有都可以使用，甚至編輯器也都是 Markdown 格式，如此以來 GitHub 專案又更完整了一些！

# 結論

快速筆記一下自己在做 issue template 這邊的發現，如果大家有發現更有趣的內容，歡迎下方留言讓我知道！想參考的 [repo 可以看這邊](https://github.com/louis70109/youtube-search-langchain)，那我們就下次見囉！
