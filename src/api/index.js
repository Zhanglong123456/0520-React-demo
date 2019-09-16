/*
* 封装发送请求的模块
* */

import instance from "./request"

//请求登录
export const fLogin=(username,password)=>instance.post("/login",{username,password});

//请求获取分类数据
export const reqGetCategories=()=>instance.get("/category/get")

//请求添加分类
export const reqAddCategory=(categoryName)=>instance.post("/category/add",{categoryName})
