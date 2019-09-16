import React,{Component} from "react"
import {Icon, Menu} from "antd";

import {withRouter,Link} from "react-router-dom"
import {withTranslation} from "react-i18next";
import menus from "../../../config/menus"

import {connect} from "react-redux"

import {setTitle} from "../../../redux/action-creators"

const { SubMenu } = Menu;
@connect(
    null,
    {setTitle}
)
@withTranslation()
@withRouter

 class LeftNav extends Component{

     createItem=(menu)=>{
         return <Menu.Item key={menu.key}>
             <Link to={menu.key}>
                 <Icon type={menu.icon} />
                 <span>{this.props.t(menu.title)}</span>
             </Link>
         </Menu.Item>
 }

     createMenu=()=>{
          return menus.map((menu)=>{
             //判断是否是二级菜单
             if(menu.children){
               return <SubMenu
                   key={menu.key}
                   title={
                       <span>
                  <Icon type={menu.icon} />
                  <span>{this.props.t(menu.title)}</span>
                </span>
                   }
               >
                   {
                     menu.children.map((cMenus)=>{
                    return  this.createItem(cMenus)
                     })
                   }
               </SubMenu>
             }else{
                 return this.createItem(menu)
             }
         })
     }

     findOpenKeys=(pathname)=>{
              let openKeys=""
           menus.forEach((menu)=>{
               if(menu.children){
                  menu.children.forEach((cMenu)=>{
                      if(cMenu.key===pathname){
                        openKeys=menu.key
                      }
                  })
               }
           })
         return openKeys
     }

     //在这里进行初始化
     componentDidMount() {
              //根据pathname来查找
         const {location:{pathname},t} =this.props
         const title=this.findTitle(pathname)
              this.props.setTitle(title)
     }

     findTitle=(pathname)=>{
         for (var i = 0; i < menus.length; i++) {
             var menu = menus[i]
          if(menu.children){
              for (var j = 0; j < menu.children.length; j++) {
                  var cMenu = menu.children[j]
                  if(cMenu.key===pathname){
                    return cMenu.title
                  }
              }
          }else{
             if(menu.key===pathname){
               return menu.title
             }
          }
         }
     };

    select=({key})=>{
        //key是路径
        const title=this.findTitle(key)
              this.props.setTitle(title)
     };
    
    render() {

              const {pathname} =this.props.location
                console.log(pathname)
         const menus=this.createMenu()

        //判断是否是二级菜单   然后使其展开
      const newKeys =this.findOpenKeys(pathname)

        return (
            //主题
            <Menu theme="dark"
                  defaultSelectedKeys={[pathname]}
                  defaultOpenKeys={[newKeys]}
                  mode="inline"
                  onSelect={this.select}
            >
                {
                    menus
                }
            </Menu>
        )
    }
}
export default LeftNav