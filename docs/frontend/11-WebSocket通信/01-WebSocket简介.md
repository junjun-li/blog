# WebSocket 简介

## 介绍

[![yW4kff.png](https://s3.ax1x.com/2021/02/18/yW4kff.png)](https://imgchr.com/i/yW4kff)

WebSocket 是一种网络传输协议, 可在单个 TCP 连接上进行全双工通信, 位于 OSI 模型的应用层

特点:

- TEC 连接, 与 HTTP 协议兼容

- 双向通信, 主动推送(服务端向客户端)

- 无同源限制, 协议标识符是 WS(加密 WSS)

## WS常用前端库

- ws(实现原生协议, 特点: 通用, 性能高, 定制型强)

- socket.io(向下兼容协议, 特点: 适配性强, 性能一般)
