import React, {Component} from "react";
import {Route,BrowserRouter} from 'react-router-dom'
import SignIn from './SignIn.js'
import Main from './Main.js'
import CompanySignUp from './companysignup.js'
import PersonalSignUp from './personalsignup.js'
import MyPage from './MyPage.js'
import Competitions from './Competitions.js'
import './Main.css'
//test
class App extends Component {
  render () {
    return (
    <BrowserRouter>
    <div>
      <Route exact path='/' component={SignIn}/>
      <Route exact path='/main' component={Main}/>
      <Route exact path='/companysignup' component={CompanySignUp}/>
      <Route exact path='/personalsignup' component={PersonalSignUp}/>
      <Route exact path='/mypage' component={MyPage}/>
      <Route exact path='/competitions' component={Competitions}/>
    </div>
    </BrowserRouter>
    )
  }
}

export default App;
