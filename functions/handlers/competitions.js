import React, {Component, Fragment} from "react";
import {Link} from 'react-router-dom'
import NavigationBar from './Main.js'
import axios from 'axios'
import Competition from './components/competition'

class Competitions extends Component{
    render() {
        return(
            <Fragment>
                <NavigationBar/>
                <DisplayCompetitions/>
            </Fragment>
        )
    }
}
class DisplayCompetitions extends Component {
    state = {
        competitions: null
    }
    componentDidMount() {
        axios.get('/competitions')
        .then(competitions => {
            console.log("in axios competition");
            console.log(competitions.data);
            this.setState({
                competitions: competitions.data
            })}
        )
        .catch(err => console.log(err));
    }
    render(){
        const {competitions} = this.state;
        return(
            <div class="posts">
                { competitions && Object.keys(competitions).map(competition => {
                    return(
                        <Competition title= {competition.title}
                        body= {competition.body}
                        category= {competition.category}
                        author= {competition.author}
                        dueDate= {competition.dueDate}
                        userName= {competition.userName}
                        userImage= {competition.imageUrl}
                        createdAt= {competition.createdAt}/>
                        )
                    })
                }
            </div>
        )
    }
}
export default Competitions;