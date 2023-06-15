---
title: 在 Apple M2 本地跑 Stable Diffusion
tags:
  - Mac
  - M2
  - Stable Diffusion
  - 圖像生成
categories: AI
date: 2023-06-15 15:41:44
---


![](https://nijialin.com/images/common.jpeg)

# [apple/ml-stable-diffusion](https://github.com/apple/ml-stable-diffusion) 介紹

由 Apple 官方提供，讓 Mac 的用戶能夠在自己電腦上跑 stable diffusion，由於我只有基本的 python 環境，因此以下就從頭開始的操作步驟：

<!-- more -->

## 安裝 Conda

過去開發都只有用 pip install，因此這邊就把 Conda 安裝的步驟也放進來

- 官方是使用 bash，我個人是 zsh

```
wget https://repo.anaconda.com/miniconda/Miniconda3-latest-MacOSX-x86_64.sh
sh Miniconda3-latest-MacOSX-x86_64.sh
source ~/.zshrc
```

## 透過 conda 建立 namespace

我是安裝 Python3.9

```
conda create -n coreml_stable_diffusion python=3.9 -y
conda activate coreml_stable_diffusion
git clone git@github.com:apple/ml-stable-diffusion.git
cd ml-stable-diffusion
```

## 安裝套件

因為我有指定的 python3 版本，因此另外指定使用 pip3

```
pip3 install -e .
```

## 下載 Model

因為已經在 `ml-stable-diffusion/` 資料夾中，因此跑以下指令把 model 拉進來，但因為有好幾 G，因此要確保網路跟電腦不能斷掉喔！

```
python -m python_coreml_stable_diffusion.torch2coreml --convert-unet --convert-text-encoder --convert-vae-decoder --convert-safety-checker -o .
```

## 開始下 prompt!

接下來跑以下的指令下 prompt，如果英文苦手，可以先到 ChatGPT 上打完中文，請它翻譯給你再貼上：

```
python3 -m python_coreml_stable_diffusion.pipeline --prompt "Draw me a high-quality dog in a watercolor style" -i . -o . --compute-unit ALL --seed 93
```

它會在你指定的輸出目錄環境(`-o`)，使用你的 prompt 去建立一個資料夾名字，如上面的指令來說會變成以下

```
./Draw_me_a_high-quality_dog_in_a_watercolor_style
```

# 結論

我個人是有買 OpenAI 的 DALLE，但能在 Apple M2 電腦上跑圖像生成真的挺酷的！(畢竟是 Apple 專案)，讓沒有 GPU 的玩家也可以加入生成式 AI 的世界跟著大家一起玩 💪

<style>
  section.compact {
    font-size: 150%  
  }
  img[alt~="center"] {
    display: block;
    margin: 0 auto;
  }
</style>
