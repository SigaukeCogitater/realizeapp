import React, {Component, Fragment} from "react";
import {Link} from 'react-router-dom'
import { getAllIdeas } from './functions/handlers/ideas'


class Main extends Component {
    state ={
        RecentIdeas: {},
        Competitions: {}
    }
    render(){
        return(
            <Fragment>
                <NavigationBar/>
                <DisplayPosting/>
            </Fragment>
        )
    }
}

export class NavigationBar extends Component{
    render() {
        return(
            <div id="bar">
                <Link to="./main"><div id="allIdeas">All Ideas</div></Link>
                <Link to="./mypage"><div id="myPage">My Page</div></Link>
                <Link to="./competitions"><div id="competitions">Competitions</div></Link>
            </div>
        )
    }
}

export class DisplayPosting extends Component {
    state = {
        posts: {}
    }
    render(){
        const {posts} = this.state;
        
        return(
            <div class="posts">
                {Object.keys(posts).map(id => {
                    return(
                        <div></div>
                        )
                    })
                }
                

            </div>
        )
    }
}
export default Main;