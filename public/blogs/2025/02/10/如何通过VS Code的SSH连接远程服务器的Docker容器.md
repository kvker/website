---
title: '如何通过VS Code的SSH连接远程服务器的Docker容器'
date: '2025-02-10'
tags:
  - 'VS Code'
  - 'Docker'
  - 'SSH'
  - '远程开发'
  - 'DevOps'
description: '详细指导如何使用VS Code通过SSH连接远程服务器上的Docker容器，实现高效的远程开发环境配置。'
summary: '本文提供了一个完整的教程，介绍如何在Docker容器中配置SSH服务，并通过VS Code远程连接进行开发。文章涵盖了从容器配置、SSH服务安装、安全设置到VS Code连接的全过程。特别关注了安全性问题，包括非标准端口使用、root登录限制等关键点。通过这个教程，开发者可以轻松搭建一个安全可靠的远程开发环境，提升开发效率。'
author: '污斑兔'
cover: 'https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg'
readTime: '12 min'
category: '开发工具'
---

本文将指导您如何在Docker容器内配置SSH服务，并通过一个非标准端口（例如6666）连接到该容器。这有助于提高安全性，同时允许从远程位置访问容器。

## 启动带有自定义SSH端口的容器

首先，我们需要启动一个Docker容器，并将主机的6666端口映射到容器的22端口，这是SSH服务默认使用的端口。假设我们有一个名为`testimage`的镜像，可以使用以下命令来启动容器：

‍```bash
sudo docker run -it -p 6666:22 testimage
```

## 安装OpenSSH服务器

一旦进入容器，下一步是安装OpenSSH服务器。确保您的包列表是最新的，然后安装`openssh-server`​：

```bash
apt update
apt install openssh-server
```

## 设置root用户密码

为了能够通过SSH以root身份登录，需要为root用户设置一个密码：

```bash
passwd
```

请记住设置的密码，因为在后续步骤中将会用到它。

## 修改SSH配置文件

接下来，修改SSH服务的配置文件以允许root用户通过密码登录：

```bash
vim /etc/ssh/sshd_config
```

找到`PermitRootLogin prohibit-password`​这一行，并将其注释掉或修改为`PermitRootLogin yes`​，以允许root用户使用密码登录。

## 重启SSH服务

保存更改并退出编辑器后，记得重启SSH服务使新设置生效：

```bash
service ssh restart
```

或者，您可以使用如下命令：

```bash
/etc/init.d/ssh restart
```

## 连接到本地运行的容器

现在，可以从本机尝试连接到容器内的SSH服务：

```bash
ssh -p 6666 root@0.0.0.0
```

请注意，`0.0.0.0`​在这里表示的是任何可用网络接口，但通常用于测试时指的是localhost。

## 远程访问运行中的容器

若要从远程机器访问服务器上的Docker容器，您需要使用服务器的实际IP地址代替`0.0.0.0`​：

```bash
ssh -p 6666 root@192.168.x.xx
```

### 如果遇到连接被拒绝的问题

如果您遇到了类似"Connection refused"的错误信息，那可能是因为主机防火墙没有开放6666端口。可以通过添加一条iptables规则来解决这个问题：

```bash
sudo iptables -I INPUT -p tcp --dport 6666 -j ACCEPT
```

这样就可以成功地从远程位置访问Docker容器了。

> **注意**：出于安全考虑，建议不要长期开启root用户的直接SSH登录权限。对于生产环境，推荐使用密钥认证方式，并禁用密码认证。

‍
