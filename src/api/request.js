/*
* 封装axios代码
* */

import axios from "axios"

import store from "@redux/store"

import {message} from "antd";

const instance = axios.create({
    baseURL: "http://localhost:3000/api",
    timeout: 5000,
    // headers:{}
})

//设置请求拦截器
instance.interceptors.request.use(
    (config) => {
        //  /api/login不需要请求头参数
        const {token} = store.getState().user

        //发送请求的配置对象
        if (token) {
            config.headers.authentication = token
        }
        return config
    }
)
//响应拦截器
instance.interceptors.response.use(
    (response) => {

        const result =response.data
//请求成功
        if (result.status === 0) {
            //功能成功
            return result.data
        } else {
            //功能失败
            //错误提示
            message.error(result.msg)
            return Promise.reject(result.msg)
        }

    },
    (error) => {
//请求失败
        //响应状态码为400,500
        message.error("error")
        return Promise.reject("error")
    }
)


export default instance