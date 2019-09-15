import React, {Component} from "react"

import {Form, Input, Icon, Button, message} from "antd";

import "./index.less"

import logo from "../../assets/img/logo.png"

import {connect} from "react-redux"

import {saveUser} from "@redux/action-creators";

import {fLogin} from "../../api"

import WithCheckLogin from "../with-checkout"

@WithCheckLogin

@connect(
   null,
    {saveUser}
)
@Form.create()
class Login extends Component {


    login = (e) => {
        e.preventDefault();
        //校验表单
        this.props.form.validateFields((error, value) => {
            if (!error) {
                // console.log(value)
                const {username, password} = value
                //发送请求登录
                /*
                * 发送请求  遇到跨域问题
                * 解决方法：3.proxy  服务器代理模式
                *"proxy": "http://localhost:5000"  开启代理服务器
                *
                * 只能用于开发环境  不能用于上线环境
                *
                * */
              /*  instance.post("/login", {username, password})
                    .then(({result}) => {
                        //请求成功
                        //判断status来判断是否登录成功
                        if (result.status === 0) {
                            //登陆成功
                            message.success("登录成功了")
                            //登录成功后  需要保存数据  存在redux中  localstorage/sessionstorage
                            this.props.saveUser(result.data)//已经将数据保存在redux中
                            //跳转到/路由
                            this.props.history.replace("/")
                        } else {
                            //登录失败
                            message.error(result.msg)
                        }
                    })
                    .catch((error) => {
                        //请求失败  也代表登录失败
                        message.error("未知错误")
                    })
                    .finally(()=>{
                        //清空密码
                        this.props.form.resetFields(["password"])
                    })*/

                fLogin(username, password)
                    .then((result) => {
                        //请求成功
                        //判断status来判断是否登录成功
                            //登陆成功
                            message.success("登录成功了")
                            //登录成功后  需要保存数据  存在redux中  localstorage/sessionstorage
                            this.props.saveUser(result)//已经将数据保存在redux中
                            //跳转到/路由
                            this.props.history.replace("/")
                    })
                    .catch(()=>{
                        //清空密码
                        this.props.form.resetFields(["password"])
                    })

            }
        })

    }
    render() {
        //getFieldDecorator  表单验证的
        const {getFieldDecorator} = this.props.form;
        return <div className="login">
            <header className="header-login">
                <img src={logo} alt="logo"/>
                <h1>React项目: 后台管理系统</h1>
            </header>
            <section className="login-section">
                <h3>用户登录</h3>
                <Form onSubmit={this.login}>
                    <Form.Item>
                        {
                            getFieldDecorator(
                                "username",
                                {
                                    rules: [
                                        {required: true, message: "请输入用户名"},
                                        {min: 3, message: "用户名长度必须大于3"},
                                        {max: 13, message: "用户名长度必须小于13"},
                                        {pattern: /^[a-zA-Z0-9_]{3,13}$/, message: '用户名只能包含英文、数字和下划线'},
                                    ]
                                }
                            )
                            (<Input prefix={<Icon type="user"/>} placeholder="用户名"/>)
                        }
                    </Form.Item>
                    <Form.Item>
                        {
                            getFieldDecorator(
                                "password",
                                {
                                    rules: [
                                        {required: true, message: "请输入密码"},
                                        {min: 3, message: "密码长度必须大于3"},
                                        {max: 13, message: "密码长度必须小于13"},
                                        {pattern: /^[a-zA-Z0-9_]{3,13}$/, message: '密码只能包含英文、数字和下划线'}
                                    ]
                                }
                            )
                            (<Input prefix={<Icon type="lock"/>} placeholder="密码" type="password"/>)
                        }
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-btn">登录</Button>
                    </Form.Item>
                </Form>
            </section>
        </div>
    }
}
export default Login
