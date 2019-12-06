import React, {Component, Fragment} from "react";
import {Link} from 'react-router-dom'
import './Main.css'

class Main extends Component {
    state ={
        RecentIdeas: {},
        Competitions: {}
    }
    render(){
        return(
            <Fragment>
                <NavigationBar id="nav"/>
                <div class="posts">
                    <p1>All Ideas</p1>
                    <div id="ideaPosts"></div>
                </div>
                <div>
                    <p1>Competitinos</p1>
                    <div id="competitionPosts"></div>
                </div>
            </Fragment>
        )
    }
}

export class NavigationBar extends Component{
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