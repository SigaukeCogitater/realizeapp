import React, {Component} from "react";
import {Route} from 'react-router-dom'
import Main from './Main.js'

class SignIn extends Component {
    state={
        ID: "",
        HidePassword: "",
        Password: ""
    }
    inputID = (e) => {
        this.setState({
            ID: e.target.value
        });
    }
    inputPassword = (e) => {
        this.setState({
            Password: e.target.value
        });
        
    }

    empty= (e) =>{}
    render() {
        return(
            <form>
                <title>Realize</title>
                <div>
                    <h1>Sign In</h1>
                    <p><input id= "ID" placeholder="ID" onChange={this.inputID}></input></p>
                    <p><input type="password" id="Password" placeholder="Password" onChange={this.inputPassword}></input></p>
                    <input type="button" value="Log In" onClick={this.empty/*check if there's corresponding data in database*/}></input>
                    {console.log("Password change:" + this.state.Password)}
                    {console.log("ID change: " + this.state.ID)}
                </div>
                <div onClick={this.empty/*go to sign up page*/} > Sign Up </div>
            </form>
        )
    }
}


export default SignIn;