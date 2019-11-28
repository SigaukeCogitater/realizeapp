import React, {Component} from "react";
import {Route} from 'react-router-dom'
import SignIn from './SignIn.js'

class Main extends Component {
    render(){
        return(
            <NavigationBar/>
        )
    }
}
notDecidedYet = () => {}
class NavigationBar extends Component{
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