import React, {Component} from "react";
import {Route, Link} from 'react-router-dom'
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
    goTo = () => {
        
    }

    empty= (e) =>{}
    render() {
        return(
            <form>
                <div id="SignIn">
                    <h1>Sign In</h1>
                    <input id= "ID" placeholder="ID" onChange={this.inputID}></input>
                    <br></br>
                    <input type="password" id="Password" placeholder="Password" onChange={this.inputPassword}></input>
                    <div class="button" onClick={this.empty/*check if there's corresponding data in database*/}>Log In</div>
                    {console.log("Password change:" + this.state.Password)}
                    {console.log("ID change: " + this.state.ID)}
                </div>
                <div id="SignUp">
                    <h1>Sign Up</h1>
                    <a href="/personalsignup"><div class="button">Personal</div></a>
                    <a href="/companysignup"><div class="button">Company</div></a>
                </div>
            </form>
        )
    }
}


export default SignIn;