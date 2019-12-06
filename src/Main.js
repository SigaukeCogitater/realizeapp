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
                <NavigationBar/>
                <div class="posts">
                    <div id="ideaPosts"></div>
                </div>
                <div>
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
                <Link to="./main"><div>All Ideas</div></Link>
                <Link to="./mypage"><div>My Page</div></Link>
                <Link to="./competitions"><div>Competitions</div></Link>
            </div>
        )
    }
}
export default Main;