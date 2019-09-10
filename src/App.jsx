import React,{Component} from "react"

import routes from "./config/routes"

import {BrowserRouter as Router,Route,Switch} from "react-router-dom"


export default class App extends Component{
    
    render() {
        return <Router>
            {/*<Switch>
            <Route path="/login" component={Login}/>
            <Route path="/" exact component={Home}/>
            </Switch>*/}
            {
                routes.map((route,index)=>{
                    return <Route {...route} key={index}/>
                })
            }
        </Router>
    }
}
