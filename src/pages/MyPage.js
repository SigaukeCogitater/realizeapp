import React, {Component, Fragment} from "react";
import {Link} from 'react-router-dom'
import {NavigationBar} from './Main.js'
import {connect} from 'react-redux'
import {mapStateToProps} from 'react-redux-firebase'
import axios from 'axios'
import Idea from './components/Idea'

class MyPage extends Component{
    state ={
        userType: -1
    }
    getUser = () => {
        var value = localStorage.getItem('FBIdToken');
        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*",
                "Autorizaion": value
            }
          };
        axios.get('/user', axiosConfig)
        .then(res => 
            this.setState({
                userType: res.data.accountType
            })
        ).catch(err => {
            console.log(err);
        })
    }
    
    render() {
        this.getUser();
        const {userType} = this.state;
        return(
            <Fragment>
                <NavigationBar/>
                { userType == 0 ? 
                    <Link to="./mypage/writeidea"><div id="writeidea">+</div></Link> 
                    : <Link to="./mypage/writecompa"><div id="writecompa">+</div></Link> }
                <DisplayMyIdeas/>
            </Fragment>
        )
    }
}
class DisplayMyIdeas extends Component {
    state = {
        myIdeas: null,
        userName: ""
    }
    componentDidMount() {
        var value = localStorage.getItem('FBIdToken');
        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*",
                "Autorizaion": value
            }
          };
        axios.get('/user', axiosConfig)
        .then(res => 
            this.setState({
                userName: res.data.userName
            })
        ).catch(err => {
            console.log(err);
        })
        const {userName} = this.state;
        const {string} = '/user' + userName+'/idea';
        axios.get(string)
        .then(myIdeas=> {
            console.log("in axios myIdeas");
            console.log(myIdeas.data);
            this.setState({
                myIdeas: myIdeas.data
            })}
        )
        .catch(err => console.log(err));

    }
    render(){
        const {myIdeas} = this.state;
        return(
            <div class="posts">
                { myIdeas && myIdeas.map(idea => {
                    return(
                        <Idea title= {idea.title}
                        body= {idea.body}
                        category= {idea.category}
                        author= {idea.author}
                        dueDate= {idea.dueDate}
                        userName= {idea.userName}
                        userImage= {idea.imageUrl}
                        createdAt= {idea.createdAt}/>
                        )
                    })
                }
            </div>
        )
    }
}
export default connect(mapStateToProps)(MyPage);