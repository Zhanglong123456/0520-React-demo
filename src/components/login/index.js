import React,{Component} from "react"

import {From,Input,Icon,Button} from "antd";

import "./index.less"

import logo from "./logo.png"

 class Login extends Component{

    render() {

        // const {getFieldDecorator}=this.props.from;

        return <div className="login">
            <header className="hearer-login">
                <img src={logo} alt="logo"/>
                <h1>React项目: 后台管理系统</h1>
            </header>
        </div>
    }
}

export default Login