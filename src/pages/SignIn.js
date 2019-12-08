import React, {Component} from "react";
import {Route, Link} from 'react-router-dom'
import axios from 'axios';
import $ from 'jquery';

class SignIn extends Component {
    state={
        email: "",
        HidePassword: "",
        password: ""
    }
    inputID = (e) => {
        this.setState({
            email: e.target.value
        });
    }
    inputPassword = (e) => {
        this.setState({
            password: e.target.value
        });
        
    }
    goTo = () => {
        
    }

    checkAccount= (e) =>{
        console.log("submitted");
        e.preventDefault();
        this.setState({
            loading: true
        });
        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*",
            }
          };
        
          const userData ={
            
            "email": this.state.email,
            "password": this.state.password
        };
          axios.post('/login', userData, axiosConfig)
            .then(res => {
                localStorage.setItem('FBIdToken', `Bearer ${res.data.token}`);
                this.setState({token : res.data.token,
                loading: false});

                this.props.history.push('/');
                this.props.history.push('/main');
                console.log(this.state);
            })
            .catch((err) => {
                this.state.errors = err.response.data;
                //this.state.errors.password = err.response.data.errors.password;
                //this.state.errors.email = err.response.data.errors.email;
                this.state.loading = false;
                console.log(this.state.errors);

                // this.setState({
                //     errors: err.response.data,
                //     loading: false
                // });
            });
    };
    render() {
        return(
            <form>
                <div id="SignIn">
                    <h1 id = "font_set">Sign In</h1>
                    <input id= "ID" placeholder="Email" onChange={this.inputID}></input>
                    <br></br>
                    <input type="password" id="Password" placeholder="Password" onChange={this.inputPassword}></input>
                    <div class="button" id="font_set" onClick={this.checkAccount}>Log In</div>
                    {console.log("Password change:" + this.state.Password)}
                    {console.log("ID change: " + this.state.email)}
                </div>
                <div id="SignUp">
                    <h1 id="font_set">Sign Up</h1>
                    <a href="/personalsignup"><div id="font_set" class="button">Personal</div></a>
                    <a href="/companysignup"><div id="font_set" class="button">Company</div></a>
                </div>
            </form>
        )
    }
}


export default SignIn;