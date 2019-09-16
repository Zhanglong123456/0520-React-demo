/*
* action工厂函数
*
* */

import {SAVE_USER,REMOVE_USER,SET_TITLE,GET_CATEGORIES_SUCCESS,ADD_CATEGORY_SUCCESS} from "./action-types"
import {reqGetCategories,reqAddCategory} from "../api";

//保存用户数据
export const saveUser=(user)=>({type:SAVE_USER,data:user})

//清空用户数据数据
 export const removeUser=()=>({type:REMOVE_USER})


//设置title值
export const setTitle=(title)=>({type:SET_TITLE,data:title})

//获取分类数据的同步action creators
const getCategoriesSuccess=(categories)=>({type:GET_CATEGORIES_SUCCESS,data:categories})

//获取分类数据  异步
export const getCategories=()=>{
 return async (dispatch)=>{
//发送请求
const result=await reqGetCategories();
//更新redux状态
  dispatch(getCategoriesSuccess(result))
 }
};


//添加分类数据 同步
const addCategorySuccess=(category)=>({type:ADD_CATEGORY_SUCCESS,data:category})

//添加分类数据
export const addCategory=(categoryName)=>{
    return async(dispatch)=>{
        const result=await reqAddCategory(categoryName)
        dispatch(addCategorySuccess(result))
    }
}