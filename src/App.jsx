import React,{Component,Suspense} from "react"

import routes from "./config/routes"

import Login from "./containers/login"

import FourAndFour from "./components/FourAndFour"

import {BrowserRouter as Router,Route,Switch} from "react-router-dom"

import BasicLayout from "./components/BasicLayout"

export default class App extends Component{
    
    render() {
        //懒加载
        return<Suspense fallback={<div>loading...</div>}>
            <Router>
                {/*<Switch>
            <Route path="/login" component={Login}/>
            <Route path="/" exact component={Home}/>
            </Switch>*/}
                <Switch>
                    <Route path="/login" component={Login}/>
                    <BasicLayout>
                        <Switch>
                            {
                                routes. map((route,index)=>{
                                    return <Route {...route} key={index}/>
                                })
                            }
                            {/*不写path代表所有路径*/}
                            <Route component={FourAndFour}/>
                        </Switch>
                    </BasicLayout>
                </Switch>

            </Router>
            </Suspense>

    }
}
