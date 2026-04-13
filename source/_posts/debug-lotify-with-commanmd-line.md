---
title: 除錯 Python 套件遇到 Command Line 無法使用的問題 | lotify
tags:
  - LINE Notify
  - LINE
  - Python
  - Command Line
categories: Python
date: 2021-05-15 00:59:36
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

![click command](https://click.palletsprojects.com/en/8.0.x/_images/click-logo.png)

# 前言

近期收到了一個來自 Lotify 的 Pull Request，主要功能是加入 Command Line 的功能，讓用戶在安裝 Lotify 之後即可在終端機上測試，感謝來自熱情的網友幫忙。

原以為 Merge 之後應該要可以用了，於似乎開始安裝要開始使用測試，沒想到遇到了一個錯誤

```
ModuleNotFoundError: No module named 'lotifyCli'
```

於是就開始的抓蟲之旅。✍️

<!-- more -->

# 分析

- 使用套件：[pallets/click](https://github.com/pallets/click) 現在有一萬多個星星，Open Source 保證。
  - 稍微比對了寫法，大同小異，應該沒問題。
- 一開始的 lotify/cli.py 檔名叫做 `lotifyCli.py`，且被放在最外層，通常在 Python 裡 Module not found 都有可能是少了 \_\_init\_\_.py 這類的檔案。
- 當時在 setup.py 中設定 `entry_points` 時用了六個【 ` 】把整個 dict 包起來，網路上有找到相關做法，但不太符合設定檔樣式，要改回去，[參考這邊](https://python-packaging-zh.readthedocs.io/zh_CN/latest/command-line-scripts.html)。

從第二點開始想，一般就我看其他的套件，理論上不會任何 code 放在最外層，通常應該會有個資料夾包裝起來，像是 `tests/`、`utils`、`models/`...之類的，因此想法就先搬進去 `lotify/` 裡面，也剛好有 init.py 的檔案，處理掉 Module 問題。

第三點，將它改成以 dict 的方式撰寫，增加可讀性

```Python
entry_points={
    'console_scripts': ['lotify=lotify.cli:send_message'],
}
```

- `console_scripts` 在 entry_points 裡設定的意思是指讓套件在安裝時可以在 Console 下執行
- 等號左邊的 lotify：在終端機上的名字
- 等號右邊：第一個為**資料夾名稱**(lotify)，`cli` 為**檔案名稱**，冒號(:)後面則是對應的主要執行函式

在一切近乎完美的操作(自己講)，重新透過 `python setup.py install` 的方式安裝，結果遇到了以下的問題！

```
Traceback (most recent call last):
  File "/usr/local/bin/lotify", line 33, in <module>
    sys.exit(load_entry_point('lotify==2.3.2', 'console_scripts', 'lotify')())
  File "/usr/local/bin/lotify", line 25, in importlib_load_entry_point
    return next(matches).load()
StopIteration
```

找到了一些 issue 後，看起來可能是一些快取、舊版本資訊互相影響下的問題，此時只要透過:

```shell
pip uninstall lotify
pip install lotify
```

重新安裝之後這個問題就會被解決掉囉！就目前而言我這邊測試起來都沒問題了～

# 結論

寫下來整理估計是這兩個問題：

- 可能是沒有 \_\_init\_\_.py 的問題
- setup.py 裡的 entry_point 還是要照著官網寫法寫

感謝網友熱情幫忙，送了一個 Pull Request 卸下這個套件的一個大石，讓它可以支援 Command line 的方式了，當然接下來也很歡迎大家持續送 PR 給我 ，增加套件的可用性 😊(也歡迎 test case)，如果覺得本篇不錯的話請幫我的 [Lotify](https://github.com/louis70109/lotify) 按個星星支持一下吧！
