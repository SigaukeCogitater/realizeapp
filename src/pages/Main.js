import React, {Component, Fragment} from "react";
import {Link} from 'react-router-dom'
import { connect } from 'react-redux'
import Idea from './components/idea'

class Main extends Component {
    state ={
        posts: {1: {title: "title", content: "content"},
                2: {title: "title2", content: "content2"}}
    }
    render(){
        const {posts} = this.state
        console.log(this.props);
        return(
            <Fragment>
                <NavigationBar/>
                <DisplayPosting posts={posts}/>
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        ideas: state.idea.ideas,
        competitions: state.competition.competitions
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
        posts: this.props.posts
    }
    render(){
        const {posts} = this.state;
        console.log(posts);
        return(
            <div class="posts">
                { posts && Object.keys(posts).map(id => {
                    return(
                        <Idea id={id}/>
                        )
                    })
                }
            </div>
        )
    }
}
export default connect(mapStateToProps)(Main);