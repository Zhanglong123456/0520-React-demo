import React,{Component} from "react"

import {connect} from "react-redux"

import {Redirect} from "react-router-dom"


function WithCheckLogin(WrapperComponent) {

    return connect(
        (state)=>({token:state.user.token}),
        null
    )(class extends Component{
        static displayName=`CheckLogin(${WrapperComponent.displayName||WrapperComponent.name||"Component"})`
        render(){

            const {token,...rest}=this.props;
            const {location:{pathname}}=rest;

            if (pathname==="/login" && token)  return  <Redirect to="/"/>

            if (pathname!=="/login" && !token)  return <Redirect to="./login"/>

            return <WrapperComponent {...rest} />


        }
    })
}

            export  default WithCheckLogin