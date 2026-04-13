---
title: 'Typescript 不一樣的地方 - Interface, Class Type, 多型別'
tags:
  - TypeScript
  - JavaScript
categories: JavaScript
abbrlink: 2145224856
date: 2020-03-21 16:11:54
---

# 前言

有一次在網路上閒逛的時候看到了[這篇部落格](https://blog.asana.com/2020/01/typescript-quirks/)，裡頭透過一些簡單的敘述來展示 Typescript 跟別人不太一樣的地方，也說到一些需要注意的眉角，這次文章則含有些許的文章翻譯以及個人評述在裡面，以下就開始吧！

# 三個項目

<!-- more -->

## 1. 解釋 Interface 在加入額外參數時所會遇到的問題

interface 必須 assign 給一個參數，若直接傳入則會出錯，雖然 TypeScript 可以多傳其他不相關的 key，但它嚴格限制沒有 assign 的使用方式

> 範例參考: [TypeScript playground](https://www.typescriptlang.org/play/index.html#code/JYOwLgpgTgZghgYwgAgCIHsDmyDeAoZQ5AIygggBMAuZAZTClEzwF888YBXEBMYdEMgAOjcBkwAKClhriAlLgJEEAgM7oANhAB0GrBIBE4mgeQBqZNMzbS5CnNbsVIVWGSYm0ZAF5FREmSUJgCCwGQUcFoGADRKhHCYEDQAzI4ioGDiEh4giVAOeOli+vj+tkHIBqHhkRAxccgJScipLHJAA)

以下兩個就是使用上的區別

```Javascript
const ginger = {
    breed: "Airedale",
    age: 3
}
printDog(ginger)

> Dog:Airedale
```

```Javascript
printDog({
    breed: "Airedale",
    age: 3
})

Argument of type '{ breed: string; age: number; }' is not assignable to parameter of type 'Dog'.
  Object literal may only specify known properties, and 'age' does not exist in type 'Dog'.
```

所以若會傳 Object 進去函式的話要注意一下 parameter 接收值的類型喔！

## 2. Class 也可以當作型別

一般來說使用 TypeScript 要做型別檢查時第一個想法一定是用 Interface 來處理，這點就跟 Golang 使用的方法相似，但除了用 Interface 來定義型別以為，也可以像 python 用 class 來定義，Python 3 之後可以定義型別(~~雖然有跟沒有一樣~~)，透過一些 [marshmallow](https://marshmallow.readthedocs.io/en/stable/) 或是 [pydantic](https://pydantic-docs.helpmanual.io/) 可以做到這件事，因此這個段落就在講這件事情。

> 範例參考: [TypeScript playground](https://www.typescriptlang.org/play/index.html#code/MYGwhgzhAEAiD2BzaBvAUNT0BGAnApvgCYBc0EALrgJYB2iGWw8tluArsBfLgBR6FS5KnUQBKVIyxYKAC2oQAdAOLQAvDgLEp0AL5p9aAGbtaXai2gAHGrQoJEvIkjIOJ6ac1bwQ+RSCReACIHMiDoAGpoZ0RlLSIxAzQ0UEgYAGEwCklpFSE2UR0vNk5uPjyyAvp3HWk5BTjBdU1BHX1DYuyIWUgKMGbafAB3aEyKYIBZMDp8UfgWIMSbOntA7t6wMSA)

使用範例:

```Javascript
class Dog {
    breed: string
    constructor(breed: string) {
        this.breed = breed
    }
}
```

After defining that, TypeScript allows you to use the class name as a type so you could write a function like:

```Javascript
function printDog(dog: Dog) {
    console.log("Dog: " + dog.breed)
}
```

## 3. 多型別問題

TypeScript 中其中一個功能是可以定義一個變數擁有多型別，基本上在使用時都在最上層 object 的話沒問題，但若判斷第二層之後的 Object 並回傳第一層的 object 則會噴錯。

試玩一下可以更清楚這個行為發生的原因喔!

> 範例參考: [TypeScript](https://www.typescriptlang.org/play/index.html#code/JYOwLgpgTgZghgYwgAgCIHsDmyDeAoZQ5MOAD3RHQFsBPALlwKOYGcAHCBYCFhgIgDCcEMBbJ4VYABtgcKKL5NCAXyXIARnIDWDFmHkhMeVXlCRYiFELCNmJcpVoN8zVhy49+AMQgyxCODAAVxZFZlVmKgh0AHddfVAjEzAaDmQAQREqOClkAF5ka2QAHzQsPDwYIJAEMGAKZGFgbKkAOXRRCAAKJpaGTOacgEp4g2wXImAYZB6snIA6ewpqGnn2Tm4xPILBJrEJaVl5UKHbV0IoCGCoEEa5qXnNKC01ZWRfFhQJ88vr296FlFYq9jEA)

# 結論

雖然現在 TypeScript 越來越多人用，如果想要很完善的型別定義以及一致性可能不適合，但若想要在 Javascript 基礎中使用或練習一些型別定義的話他就很適合了。

# 參考

1. [TypeScript’s quirks: How inconsistencies make the language more complex](https://blog.asana.com/2020/01/typescript-quirks)
