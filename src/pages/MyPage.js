/*import React, {Component, Fragment} from "react";
import {Link} from 'react-router-dom'
import NavigationBar from './Main.js'

class MyPage extends Component{
    state ={
    }
    render() {
        return(
            <Fragment>
                <NavigationBar/>
                <Link to="./mypage/writeidea"><div id="writeidea" class="button">Add Idea</div></Link>
            </Fragment>
        )
    }
}
export default MyPage;
*/


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
                <Link to="./mypage/writeidea"><div id="writeidea" class="button">Add Idea</div></Link>
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        ideas: state.idea.ideas,
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
                { ideas && Object.keys(ideas).map(idea => {
                    return(
                        <Idea id={idea.ideaId} content= {idea} />
                        )
                    })
                }
            </div>
        )
    }
}
export default connect(mapStateToProps)(Main);