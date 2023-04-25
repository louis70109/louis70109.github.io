---
title: Python - operator
tags:
  - Python
  - operator
categories: Python
abbrlink: 1458295714
date: 2020-01-07 23:12:22
---

# 前言

最近在實作需要處理字串並且把它改成真實的`判斷式`，找 google 的過程中找到了[一篇解答](https://stackoverflow.com/questions/1740726/turn-string-into-operator)，當中剛好看到 [Operator](https://docs.python.org/3/library/operator.html) 這個套件，以下就用一些範例來示範～

# 實作

處理的範例: `1=1AND2<5OR8>9`

可以使用`re`把字串處理成陣列

```python
re.split("AND|OR", payload)
# -> [1=1, 2<5, 8>9]
```

> 接著再使用`迴圈`+同樣的方法去處理掉`=`、`>`、`<`

在處理完之後就可以找到所有的 `key` 以及 `value` 的陣列

接著就是要把 `AND`、`OR` 找出來存下來，這邊我會會使用`split('AND', 1)`只切第一個找到的`AND`字串，因為像是 SQL Where 子句的功能要一個一個處理才行，否則最後判斷會出問題。

```python
while re.search('(AND)|(OR)', payload) is not None:
    result = payload.split('AND', 1)
    if result[0] and ... # 判斷 AND 字串
    result = payload.split('OR', 1)
    if result[0] and ... # 判斷 OR 字串
```

接著再切完之後會拿到`operator_list`知道裡面有哪些運算子的陣列，以原本的資料來說可以用迴圈去處理，這邊我就用簡單的範例來表示`operator`可以處理的東西。

像是`operator`除了可以判斷純數字以及純字串以外，也可判斷`英文`+`數字`的組合。

```python
operator_list = ['>', '<', '=']
if operator_list[0] == '>':
    result = operator.gt(2, 0)
if operator_list[1] == '<':
    result = operator.lt('z01', 'z99')
if operator_list[2] == '=':
    result = operator.eq('A', 'A')
```

使用以上方法可以比對運算子，而使用以下方法則可以比對`AND`以及`OR`

```python
ex = ['AND', 'OR']
if ex[0] == 'AND':
    result = operator.and_(1, 1)
if ex[1] == 'OR':
    result = operator.or_(1, 0)
```

# 結論

透過 `operator` 這個函示庫讓我處理`運算子們`可以少很多事，藉此紀錄一下工作上使遇到的一些方法以及問題，最驚訝的就是可以比對`英文`+`中文`的判斷式，以一些韌體的本版資訊來說他們會擁有這樣的組合，在上傳之後要比對時用這樣的方法就很方便，若有什麼問題歡迎留言給我 😊

# 參考

- [stackoverflow](https://stackoverflow.com/questions/1740726/turn-string-into-operator)
- [operator](https://docs.python.org/3/library/operator.html)
