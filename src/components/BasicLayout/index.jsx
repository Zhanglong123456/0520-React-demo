import React,{Component} from "react"

import { Layout, Breadcrumb} from 'antd';
import {withTranslation} from "react-i18next";

import WithCheckLogin from "../../containers/with-checkout"

import HeaderMain from "./headerMain"

import logo from "../../assets/img/logo.png"

import LeftNav from "./leftNav"

import "./index.less"

const { Header, Content, Footer, Sider } = Layout;
@withTranslation()
@WithCheckLogin
 class BasicLayout extends Component{

    state = {
        collapsed: false,
        isDisplay:true
    };

    onCollapse = collapsed => {
        console.log(collapsed);
        this.setState({ collapsed ,
            isDisplay:!this.state.isDisplay
        });
    };

    render() {
       const {t}=this.props  //切换语言
        const {collapsed,isDisplay}=this.state
        return (
            <Layout style={{ minHeight: '100vh' }}>
                <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
                    <div className="Basic-layout-logo">
                        <img src={logo} alt=""/>
                        <h1 style={{display:isDisplay?"block":"none"}}>{t("title")}</h1>
                    </div>
                     <LeftNav/>
                </Sider>
                <Layout>
                    <Header style={{ background: '#fff', padding: 0 ,height:80}}>
                        <HeaderMain/>
                    </Header>
                    <Content style={{ margin: '25px 16px' }}>
                        <div style={{ padding: 24, background: '#fff', minHeight: 500 }}>
                            {
                             this.props.children
                            }
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
                </Layout>
            </Layout>
        );
    }
}

export default BasicLayout