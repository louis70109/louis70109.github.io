---
title: How to debug Python app by Pycharm
tags:
  - Python
  - Pycharm
categories: Python
date: 2021-04-28 12:38:44
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

I wrote dynamic programming language from working to now. Most of my time also use `print`(Python), `console.log`(JS), `puts`(Ruby) to debug any scripts or web apps. from my before experience, I only know Ruby had `byebug` package which could write a `byebug` line in your code and run it, it will show something information that you could debug in the terminal. 

> This is my first know debug method in dynamic languages ... XD

<!-- more -->


In this article, I will take you to know how to debug Python apps by Pycharm which was I learn recently...😆

1. Open your project and click the dropdown button

![](https://nijialin.com/images/2021/debug-python/0.png)

2. Select `Edit Configurations`.

![](https://nijialin.com/images/2021/debug-python/1.png)

3. Click `＋` ➡️ Select `Python` ➡️ Choose your `script` or `web entrance file` ➡️ Set `Environment Variables` if your app needs ➡️ `Apply` and `OK`.
![](https://nijialin.com/images/2021/debug-python/2.png)

4. Click `+` adding a variable, fill the variable key and value column.

![](https://nijialin.com/images/2021/debug-python/4.png)

5. The name would map your task name.

![](https://nijialin.com/images/2021/debug-python/3.png)

6. Finally, you will get a task which like following name `api debug`(It's my task name).

![](https://nijialin.com/images/2021/debug-python/6.png)

7. Put red icon in a line(or two red icon become a scope), Click the `bug button` to start the debug mode🎉

![](https://nijialin.com/images/2021/debug-python/5.png)

8. Then you can see code information(variables, library...) at IDE. 

> If you run web app, you need to give API a action, then debug mode will be trigger.

# Conclusion

This is my first time using debug mode in dynamic languages by Python. Write down my experience when I forgot steps on another day... XD