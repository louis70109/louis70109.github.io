# 部落格部署 TWT

![](https://nijialin.com/images/deployflow.png)
```
git clone git@github.com:louis70109/louis70109.github.io.git
npm install
```

## 新增文章

```
npm run new 'article-1'
```

## 推出文章

```
npm run p 'article-1'
```

## 部署

```bash
npm run d
```

會觸發 GitHub Actions 佈署到 gh-page 分支上
