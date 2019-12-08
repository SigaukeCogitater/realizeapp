import React, {Component, Fragment} from "react";
import {Link} from 'react-router-dom'
import { connect } from 'react-redux'
import Idea from './components/idea'
import axios from 'axios'

class Main extends Component {
    state ={
    }
    render(){
        console.log(this.props);
        return(
            <Fragment>
                <NavigationBar/>
                <DisplayIdeas/>
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        ideas: state.ideas,
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

class DisplayIdeas extends Component {
    state = {
        ideas: null
    }
    componentDidMount() {
        axios.get('/ideas')
        .then(ideas => {
            console.log("in axios home");
            console.log(ideas.data);
            this.setState({
                ideas: ideas.data
            })}
        )
        .catch(err => console.log(err));
    }
    render(){
        const {ideas} = this.state;
        return(
            <div class="posts">
                { ideas && ideas.map(idea => {
                    console.log(idea.body);
                    return (
                        <Idea body={idea.body}
                        category= {idea.category}
                        commentsCount= {idea.commentsCount}
                        createdAt= {idea.date}
                        ideaTitle= {idea.ideaTitle}
                        ideaId= {idea.ideaId}
                        likesCount= {idea.likeCount}
                        userName= {idea.userName} />
                        )
                    })
                }
            
            </div>
        )
    }
}
export default connect(mapStateToProps)(Main);