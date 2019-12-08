import React, {Component, Fragment} from "react";
import {Link} from 'react-router-dom'
import {NavigationBar} from './Main.js'
import {connect} from 'react-redux'
import {mapStateToProps} from 'react-redux-firebase'
import axios from 'axios'

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
                { userType == 1 ? 
                    <Link to="./mypage/writeidea"><div id="writeidea">+</div></Link> 
                    : <Link to="./mypage/writecompa"><div id="writecompa">+</div></Link> }
            </Fragment>
        )
    }
}
export default connect(mapStateToProps)(MyPage);