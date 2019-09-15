import React,{Component} from "react"

import {Button,Icon} from "antd"

import {withTranslation,getI18n} from "react-i18next";

import screenfull from "screenfull"

import "./index.less"

@withTranslation()
 class HeaderMain extends Component{

    state={
        isScreenfull:false,
        isEnglish:getI18n().language==="en"
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

    render() {
        const {isScreenfull,isEnglish}=this.state
        return <div className="headerMain">
            <div className="headerMain-top">
                <Button size="small" onClick={this.change}><Icon type={isScreenfull?"fullscreen-exit":"fullscreen"} /></Button>
           <Button className="btn" onClick={this.changeLanguage}>{isEnglish?"中文":"English"}</Button>
               <span>欢迎xxx</span>
               <Button type="link">退出</Button>
            </div>
            <div className="headerMain-bottom">
              <h3>首页</h3>
                <span>2019/9/13</span>
            </div>
        </div>
    }
}
export default HeaderMain