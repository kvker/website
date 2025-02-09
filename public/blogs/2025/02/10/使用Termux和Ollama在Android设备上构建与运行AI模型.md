---
title: '使用Termux和Ollama在Android设备上构建与运行AI模型'
date: '2025-02-10'
tags:
  - 'Android'
  - 'Termux'
  - 'Ollama'
  - 'AI'
  - '移动开发'
description: '本文详细介绍如何在Android设备上使用Termux安装和配置Ollama，从而实现在移动设备上运行AI模型的完整教程。'
summary: '本文详细介绍如何在Android设备上使用Termux安装和配置Ollama，从而实现在移动设备上运行AI模型的完整教程。'
author: '污斑兔'
cover: 'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg'
readTime: '10 min'
category: '技术教程'
---

# 使用Termux和Ollama在Android设备上构建与运行AI模型

随着移动计算能力的不断增强，直接在手机或平板电脑上开发和运行复杂的机器学习模型变得越来越可行。本文将指导您如何使用Termux应用从GitHub下载并安装所需软件，在您的Android设备上编译Ollama项目，并最终运行一个AI模型。

## 准备工作

首先，确保您已经在您的Android设备上安装了Termux应用。您可以从[Termux的GitHub页面](https://github.com/termux/termux-app)的tags部分下载APK文件进行安装。

### 获取Termux存储权限

启动Termux后，首先需要获取对设备存储的访问权限：

```bash
termux-setup-storage
```

此命令会请求必要的权限，允许Termux读写外部存储。

## 更新和安装基础环境

接下来，更新Termux的包列表并升级所有已安装的包以确保系统处于最新状态：

```bash
pkg update && pkg upgrade
```

为了能够顺利编译Ollama项目，我们需要安装一些必要的工具，包括Git用于版本控制、CMake作为构建工具以及Go语言环境：

```bash
pkg install git cmake golang
```

## 下载并编译Ollama源码

现在我们准备开始处理Ollama项目。首先，克隆Ollama仓库到本地：

```bash
git clone --depth 1 https://github.com/ollama/ollama.git
```

进入项目目录并执行生成命令来初始化Go代码：

```bash
cd ollama
go generate ./...
```

然后编译源码以构建Ollama可执行文件：

```bash
go build .
```

## 运行Ollama服务

为了让Ollama保持运行，我们可以将其作为后台进程启动：

```bash
./ollama serve &
```

这样，Ollama的服务端就会持续运行，等待接收请求。

## 安装或运行模型

最后一步是根据需要安装或运行特定的AI模型。这可以通过执行以下命令完成：

```bash
./ollama run 模型名
```

请将"模型名"替换为您想要使用的具体模型名称。

通过以上步骤，您就可以在自己的Android设备上搭建起一套完整的基于Ollama的AI开发环境了。无论是出于兴趣探索还是实际开发用途，这种方法都提供了一个便捷且强大的途径。