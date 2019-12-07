import React, {Component, Fragment} from "react";
import {Link} from 'react-router-dom'
import { connect } from 'react-redux'

class Main extends Component {
    state ={
        posts: []
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
        
        return(
            <div class="posts">
                { posts && Object.keys(posts).map(id => {
                    return(
                        <div></div>
                        )
                    })
                }
            </div>
        )
    }
}
export default connect(mapStateToProps)(Main);