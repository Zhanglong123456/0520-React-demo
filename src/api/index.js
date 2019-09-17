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

//请求修改分类
export const reqUpdateCategory = (categoryId, categoryName) => instance.post('/category/update', { categoryId, categoryName });

//商品管理
export const reqGetProducts=(pageNum,pageSize)=>instance.get("/product/list",{params:{pageNum,pageSize}})

//请求添加products
export const reqAddProducts=({name, desc, price, categoryId, detail})=>instance.post("/product/add",{name, desc, price, categoryId, detail})


export const reqUpdateProducts=({name, desc, price, categoryId, detail, productId})=>instance.post("/product/update",{name, desc, price, categoryId, detail, productId})