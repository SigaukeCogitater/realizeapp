import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import PersonalSignup from './personalsignup.js'
import Switch from '@material-ui/core/Switch';
import myFirebase from "../config";
import axios from 'axios'

class personalsignup extends React.Component {
    //constructor(props){
      //super(props);
      state = {
        id: "",
        phonenumber:"",
        email: "",
        nickname: "",
        firstname:"",
        lastname:"",
        birthday:"",
        pw: "",
        re_pw: "",
        accountType: 0
      };
      handlefirstname = e => {
        e.preventDefault();
        this.setState({
            firstname: e.target.value
        }); 
      };

      handlelastname = e => {
        e.preventDefault();
        this.setState({
            lastname: e.target.value
        }); 
      };

      handleid = e =>{
        e.preventDefault();
        this.setState({
          id: e.target.value
        });
      };

      handleEmail = e => {
        e.preventDefault();
        this.setState({
          email: e.target.value
        });
      };

      handleNickname = e => {
        e.preventDefault();
        this.setState({
          nickname: e.target.value
        });
      };

      handlePW = e => {
        e.preventDefault();
        this.setState({
          pw: e.target.value
        });
      };

      handleRE_PW = e => {
        e.preventDefault();
        this.setState({
          re_pw: e.target.value
        });
      };

      handlephonenumber = e =>{
        e.preventDefault();
        this.setState({
          phonenumber: e.target.value
        });
      };

      handlebirthday= e =>{
        e.preventDefault();
        this.setState({
          birthday: e.target.value
        });
      };

      handleSubmit = (e) =>{
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
            "accountType": this.state.accountType,
            "email": this.state.email,
            "userName": this.state.id,
            "lastName": this.state.lastname,
            "firstName": this.state.firstname,
            "password": this.state.ps,
            "confirmPassword": this.state.re_pw
        };
          axios.post('/signup/personal', userData, axiosConfig)
            .then(res => {
                localStorage.setItem('FBIdToken', `Bearer ${res.data.token}`);
                this.state.loading = false;
                // this.setState({token : res.data.token,
                // loading: false});

                this.props.history.push('/');
                console.log(this.state);
            })
            .catch((err) => {
                this.state.errors = err.response.data;
              
                this.state.loading = false;
                console.log(this.state);

              
            });
    };


      render(){
          return(
              <form class="signUp">
                  <h1 id = "font_set">Personal Sign up</h1>
                  <br/>
                  <div>
                    <p>
                    First Name: <input
                        type = "text"
                        onChange={this.handlefirstname}
                        value={this.state.firstname}/>
                    </p>
                    <p>
                    Last Name: <input
                        type = "text"
                        onChange={this.handlelastname}
                        value={this.state.lastname}/>
                    </p>
                    <p>
                    Phone number: <input
                        type = "text"
                        onChange={this.handlephonenumber}
                        value={this.state.phonenumber}/>
                    </p>
                    <p>
                    birthday: <input
                        type = "text"
                        onChange={this.handlebirthday}
                        value={this.state.birthday}/>
                    </p>
                    <p>
                    ID : <input
                        type="text"
                        onChange={this.handleid}
                        value={this.state.id}/>
                        <input type="button" onClick={this.checkid} value="check id"/>
                    </p>
                    <p>
                    Email: <input
                        type="text"
                        onChange={this.handleEmail} 
                        value={this.state.email}/>
                        <input type="button" onClick={this.checkEmail} value="verify"/>
                    </p>
                    <p>
                    UserName: <input
                        type = "text"
                        onChange={this.handleNickname}
                        value={this.state.nickname}/>
                        <input type="button" onClick={this.checkNickname} value="check nickname"/>
                    </p>
                    <p>
                    Password: <input
                        type = "password"
                        onChange={this.handlePW}
                        value={this.state.pw}/>
                    </p>
                    <p>Repassword: <input
                    type = "password"
                    onChange={this.handleRE_PW}
                    value={this.state.re_pw}/>
                    <input type="button" onClick={this.checkPW} value="check password"/>
                    </p>
                    <div>
                        <button onClick={this.handleSubmit}>Submit</button>
                    </div>
                </div>
            </form>
          );
      }
}
export default personalsignup;