import React, {Component} from "react";
import {Route,BrowserRouter} from 'react-router-dom'
import SignIn from './pages/SignIn.js'
import Main from './pages/Main.js'
import CompanySignUp from './pages/companysignup.js'
import PersonalSignUp from './pages/personalsignup.js'
import MyPage from './pages/MyPage.js'
import Competitions from './pages/Competitions.js'
import WriteIdea from './pages/writeidea.js'
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
      <Route exact path='/mypage/writeidea' component={WriteIdea}/>
    </div>
    </BrowserRouter>
    )
  }
}

export default App;
