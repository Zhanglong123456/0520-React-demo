/*
* action工厂函数
*
* */

import {SAVE_USER,REMOVE_USER,SET_TITLE,GET_CATEGORIES_SUCCESS,ADD_CATEGORY_SUCCESS,UPDATE_CATEGORY_SUCCESS,GET_ROLE_SUCCESS,ADD_ROLE_SSUCCESS,UPDATE_ROLES_SUCCESS} from "./action-types"
import {reqGetCategories,reqAddCategory,reqUpdateCategory,reqGetRole,reqAddRole,reqUpdateRole} from "../api";

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


//修改分类数据 同步
const updateCategorySuccess=(category)=>({type:UPDATE_CATEGORY_SUCCESS,data:category})

//修改分类数据
export const updateCategory=(categoryId, categoryName)=>{
    return async(dispatch)=>{
        const result=await reqUpdateCategory(categoryId, categoryName)
        dispatch(updateCategorySuccess(result))
    }
}


//获取角色数据
const getRoleSuccess=(role)=>({type:GET_ROLE_SUCCESS,data:role})
export const getRoles=()=>{
    return async(dispatch)=>{
        const result =await reqGetRole()
        dispatch(getRoleSuccess(result))
    }
}

//请求添加角色
const addRolesSuccess=(role)=>({type:ADD_ROLE_SSUCCESS,data:role})
export const AddRoles=(name)=>{
    return async(dispatch)=>{
        const result=await reqAddRole(name)
        dispatch(addRolesSuccess(result))
    }
}

//请求更新角色
const updateRolesSuccess=(role)=>({type:UPDATE_ROLES_SUCCESS,data:role})
export const UpdateRoles=(roleId,authName,menus)=>{
    return async(dispatch)=>{
        const result=await reqUpdateRole(roleId,authName,menus)
        dispatch(updateRolesSuccess(result))
    }
}
