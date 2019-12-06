import React, {Component, Fragment} from "react";
import {Link} from 'react-router-dom'
import SignIn from './SignIn.js'
import './Main.css'

class Main extends Component {
    state ={
        RecentIdeas: {},
        Competitions: {}
    }
    render(){
        return(
            <div>
                <NavigationBar id="nav"/>
                <div>
                    <p1>All Ideas</p1>
                    <div id="ideaPosts"></div>
                </div>
                <div>
                    <p1>Competitinos</p1>
                    <div id="competitionPosts"></div>
                </div>
            </div>
        )
    }
}

class NavigationBar extends Component{
    render() {
        return(
            <div id="bar">
                <div><Link to="./main">All Ideas</Link></div>
                <div><Link to="./mypage">My Page</Link></div>
                <div><Link to="./competitions">Competitions</Link></div>
            </div>
        )
    }
}
export default Main;