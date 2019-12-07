
import React from "react";
//import Email from "./Email";
// import Nickname from "./Nickname";
// import Password from "./Password";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class companysignup extends React.Component {
  //constructor(props){
    //super(props);
    state = {
      id: "",
      companyname:"",
      companysitelink:"",
      phonenumber:"",
      email: "",
      //nickname: "",
      pw: "",
      re_pw: "",
      emailCheck: "",
      nicknameCheck: "",
      pwCheck: "",
      accountType: 1
    };


  handleid = e =>{
    e.preventDefault();
    this.setState({
      id: e.target.value
    });
  };
  checkid = e=>{
    const inputid = {
      id: this.state.id
      ///here whole information
    };
    const id_info = {
      method: "POST",
      body: JSON.stringify(inputid),
      headers: {
        "Content-Type": "application/json"
      }
    };
    fetch("https://asia-northeast1-realizeapp-cd0a5.cloudfunctions.net/api/signup/company", id_info)
        .then(res => res.json())
        .then(json => {
          if (json === true) {
            alert("You can use this id");
            this.setState({
              idCheck: this.state.id
            });
          } else {
            alert("This id is already existed");
          }
        });
  }

  //}
  //handling email input box
  handleEmail = e => {
    e.preventDefault();
    this.setState({
      email: e.target.value
    });
  };
  //check email verify
  checkEmail = e => {
    e.preventDefault();
    //function of checking email is constant
    // const chkEmail = function(str) {
    //   var regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    //   return regExp.test(str) ? true : false;
    // };
    const inputEmail = {
      email: this.state.email
    };
    const email_info = {
      method: "POST",
      body: JSON.stringify(inputEmail),
      headers: {
        "Content-Type": "application/json"
      }
    };
    //fetch("https://console.firebase.google.com/project/realizeapp-cd0a5/users", email_info)
    fetch("http://localhost:3000/user/email", email_info)
        .then(res => res.json())
        .then(json => {
          if (json === true) {
            alert("You can use this id");
            this.setState({
              emailCheck: this.state.email
            });
          } else {
            alert("This id is already existed");
          }
        });
  }
    // if (chkEmail(this.state.email) === false) {
    //   alert("Email format is invalid.");
    //   this.setState({
    //     email: ""
    //   });
    // } else {
    //   fetch("http://localhost:3000/user/email", email_info)
    //     .then(res => res.json())
    //     .then(json => {
    //       if (json === true) {
    //         alert("You can use this id");
    //         this.setState({
    //           emailCheck: this.state.email
    //         });
    //       } else {
    //         alert("This id is already existed");
    //       }
    //     });
    // }
 
  //handling email input box
  handleNickname = e => {
    e.preventDefault();
    this.setState({
      nickname: e.target.value
    });
  };
  //verify email
  checkNickname = e => {
    e.preventDefault();
    const chkNickname = function(str) {
      var regNm = /^[가-힣]{2,15}|[a-zA-Z]{2,15}\s[a-zA-Z]{2,15}$/;
      return regNm.test(str) ? true : false;
    };
    const inputNickname = {
      nickname: this.state.nickname
    };
    const nickname_info = {
      method: "POST",
      body: JSON.stringify(inputNickname),
      headers: {
        "Content-Type": "application/json"
      }
    
    };
    if (chkNickname(this.state.nickname) === false) {
      //alert("한글,영문 대소문자 2~15자리만 사용 가능합니다");
      alert("korean, english upper and smaller 2~15 is accessable.");
    } else {
      const resp =fetch("http://localhost:3000/user/nick", nickname_info)
        .then(res => res.json())
        .then(json => {
          if (json === true) {
            alert("You can use this nickname.");
            this.setState({
              nicknameCheck: this.state.nickname
            });
          } else {
            alert("This nickname is already existed.");
          }
        });
    }
  };
  //첫번째 패스워드 입력창 set변환
  handlePW = e => {
    e.preventDefault();
    this.setState({
      pw: e.target.value
    });
  };
  //두번째 패스워드 입력창 set변환
  handleRE_PW = e => {
    e.preventDefault();
    this.setState({
      re_pw: e.target.value
    });
  };
  //첫번 째 두번 째 패스워드 일치 확인
  checkPW = e => {
    e.preventDefault();
    //비밀번호 유효성검사(영문,숫자 혼합 6~20)
    const chkPwd = function(str) {
      var reg_pwd = /^.*(?=.{6,20})(?=.*[0-9])(?=.*[a-zA-Z]).*$/;
      return !reg_pwd.test(str) ? false : true;
    };
    if (chkPwd(this.state.re_pw) === false) {
      alert("mix english and number 6~12");
      this.setState({
        pw: "",
        re_pw: ""
      });
    } else {
      if (this.state.pw === this.state.re_pw) {
        alert("Matched.");
        this.setState({
          pwCheck: this.state.re_pw
        });
      } else {
        alert("Unmatched.");
      }
    }
  };
  //서버로 가입 양식 제출
  handleSubmit = e => {
    e.preventDefault();
    const {
      email,
      emailCheck,
      nickname,
      nicknameCheck,
      pwCheck,
      pw,
      re_pw
    } = this.state;
    const signupInfo = {
      email: this.state.emailCheck,
      pw: this.state.pwCheck,
      nickname: this.state.nicknameCheck
    };
    const signup_info = {
      method: "POST",
      body: JSON.stringify(signupInfo),
      headers: {
        "Content-Type": "application/json"
      }
    };
    if (
      email &&
      nickname &&
      pw &&
      re_pw &&
      email === emailCheck &&
      nickname === nicknameCheck &&
      pw === re_pw &&
      re_pw === pwCheck
    ) {
      fetch("http://localhost:3000/user", signup_info)
        .then(alert("가입이 완료되었습니다."))
        .then(this.props.history.push("/login"));
    } else {
      alert("입력값을 확인해주세요");
    }

  };
  render() {
    return (
      <form class="signUp">
        <h1>Company Signup</h1>
        
        <br/>
        <div>
          <p>
          ID : <input
            type="text"
            onChange={this.handleid}
            value={this.state.id}/>
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
          Nickname: <input
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
          Repassword: <input
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
export default companysignup;

/*import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import uuid from 'uuid'
import { Z_FILTERED } from "zlib";

class companysignup extends Component{
    state = {
        id : "",
        name : "",
        site_link : "",
        manager_name: "",
        phone_number: ""
    };


    render(){
        const {id, name, site_link, manager_name, phone_number} = this.state;

        return(
           <div>
               <h1> Company Sign Up </h1>
                <input
                    type = "text"
                    id = "id"
                    value = {id}
                />
            </div> 
        );
    }
}*/

