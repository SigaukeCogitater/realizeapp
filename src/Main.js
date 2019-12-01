import React, {Component, Fragment} from "react";
import {Route} from 'react-router-dom'
import SignIn from './SignIn.js'

class Main extends Component {
    state ={
        RecentIdeas: {},
        Competitions: {}
    }
    render(){
        return(
            <Fragment>
                <NavigationBar/>
                <div>
                    <title>All Ideas</title>
                    <div id="ideaPosts"></div>
                </div>
                <div>
                    <title>Competitinos</title>
                    <div id="competitionPosts"></div>
                </div>
            </Fragment>
        )
    }
}

class NavigationBar extends Component{
    notDecidedYet = (e) => {}
    render() {
        return(
            <div>
                <div onClick={this.notDecidedYet/*See all ideas */}>All Ideas</div>
                <div onClick={this.notDecidedYet/*Go to My Page*/}>My Page</div>
                <div onClick={this.notDecidedYet/*See competitions */}>Competitions</div>
            </div>
        )
    }
}
export default Main;