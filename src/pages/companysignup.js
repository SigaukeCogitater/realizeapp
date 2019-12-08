
import React from "react";
import myFirebase from "../config";
//import Email from "./Email";
// import Nickname from "./Nickname";
// import Password from "./Password";
import axios from 'axios'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import $ from 'jquery';
class companysignup extends React.Component {
  //constructor(props){
    //super(props);
    state = {
      accountType: 1,
      userName: "",
      companyName:"",
      companySite:"",
      phoneNumber:"",
      email: "",
      password: "",
      confirmPassword: "",
      errors: "",
      loading: false
    };


  handleid = e =>{
    e.preventDefault();
    this.setState({
      userName: e.target.value
    });
  };
  
  handleEmail = e => {
    e.preventDefault();
    this.setState({
      email: e.target.value
    });
  };

  handlephonenumber = e => {
    e.preventDefault();
    this.setState({
      phoneNumber: e.target.value
    });
  };

  handlesite= e => {
    e.preventDefault();
    this.setState({
      companySite: e.target.value
    });
  };

  handlecompanyName = e => {
    e.preventDefault();
    this.setState({
      companyName: e.target.value
    });
  };


  handlePW = e => {
    e.preventDefault();
    this.setState({
      password: e.target.value
    });
  };
  //
  handleRE_PW = e => {
    e.preventDefault();
    this.setState({
      confirmPassword: e.target.value
    });
  };


  //
  handleSubmit = e => {
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
      "password": this.state.password,
      "userName": this.state.userName,
      "companyName": this.state.companyName,
      "companySite": this.state.companySite,
      "phoneNumber": this.state.phoneNumber,
      "password": this.state.password,
      "confirmPassword": this.state.confirmPassword
  };
    axios.post('/signup/company', userData, axiosConfig)
      .then(res => {
          localStorage.setItem('FBIdToken', `Bearer ${res.data.token}`);
          console.log(res.data);
          this.state.loading = false;
          // this.setState({token : res.data.token,
          // loading: false});

          this.props.history.push('/');
          console.log("got response");
          console.log(this.state);
      })
      .catch((err) => {
          this.state.errors = err.response.data;
          alert("error!")
          this.state.loading = false;
          console.log("got errors");
          console.log(this.state);

        
      });
  };

  render() {
    return (
      <form class="signUp">
        <h1 id = "font_set">Company Signup</h1>
        <br/>
        <div>
          <p>
          ID : <input
            type="text"
            onChange={this.handleid}
            value={this.state.userName}/>
            <input type="button" onClick={this.checkid} value="check id"/>
          </p>
          <p>
          Manager Email: <input
            type="text"
            onChange={this.handleEmail} 
            value={this.state.email}/>
            <input type="button" onClick={this.checkEmail} value="verify"/>
          </p>
          <p>
          Manager Phone number: <input
            type="text"
            onChange={this.handlephonenumber} 
            value={this.state.phonenumber}/>
          </p>
          <p>
          Company Site link: <input
            type="text"
            onChange={this.handlesite} 
            value={this.state.companySite}
            />
          </p>    
          <p>
          companyName: <input
            type = "text"
            onChange={this.handlecompanyName}
            value={this.state.companyName}/>
            <input type="button" onClick={this.checkNickname} value="check nickname"/>
          </p>
          <p>
          Password: <input
            type = "password"
            onChange={this.handlePW}
            value={this.state.password}/>
          Repassword: <input
            type = "password"
            onChange={this.handleRE_PW}
            value={this.state.confirmPassword}/>
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
export default companysignup;