import React,{Component} from "react"

import {Button,Icon,Modal} from "antd"

import {withTranslation,getI18n} from "react-i18next";

import {connect} from "react-redux"

import screenfull from "screenfull"

import {formatDate} from "../../../utils/tools"

import {removeUser} from "../../../redux/action-creators";

import "./index.less"

@connect(
    (state)=>({
        username:state.user.user.username,
        title:state.title
    }),
   {removeUser}
)

@withTranslation()
 class HeaderMain extends Component{

    state={
        isScreenfull:false,
        isEnglish:getI18n().language==="en",
        time:formatDate()
    }

    //切换全屏
    change=()=>{
        if (screenfull.isEnabled) {
            // 切换全屏
            screenfull.toggle();

        }
    }

    componentDidMount() {
        //绑定事件  解决ESC问题
        screenfull.on("change",()=>{
            this.setState({
                isScreenfull:!this.state.isScreenfull
            })
        })
        setInterval(()=>{
        this.setState({
            time:formatDate()
        })
        },1000)
    }

    changeLanguage=()=>{
        const {isEnglish}=this.state
     this.props.i18n.changeLanguage(isEnglish?"zh-CN":"en")
     this.setState({
         isEnglish:!this.state.isEnglish
     })
}

    //解绑事件
   componentWillMount() {
        screenfull.off("change",()=>{
            this.setState({
                isScreenfull:!this.state.isScreenfull
            })
        })
   }

   //退出
    logout=()=>{
        Modal.confirm({
            title:"确定退出吗",
            onOk:()=>{
                this.props.removeUser();
            }
        })

    }

    render() {
        const {username,title,t}=this.props
        const {isScreenfull,isEnglish,time}=this.state
        return <div className="headerMain">
            <div className="headerMain-top">
                <Button size="small" onClick={this.change}><Icon type={isScreenfull?"fullscreen-exit":"fullscreen"} /></Button>
           <Button className="btn" onClick={this.changeLanguage}>{isEnglish?"中文":"English"}</Button>
               <span>欢迎 ,{username}</span>
               <Button type="link" onClick={this.logout}>退出</Button>
            </div>
            <div className="headerMain-bottom">
              <h3>{t(title)}</h3>
                <span>{time}</span>
            </div>
        </div>
    }
}
export default HeaderMain