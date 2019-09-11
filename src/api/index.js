/*
* 封装发送请求的模块
* */

import instance from "./request"

export const fLogin=(username,password)=>instance.post("/login",{username,password});