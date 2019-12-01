import React, {Component} from "react";
import {Route,BrowserRouter} from 'react-router-dom'
import SignIn from './SignIn.js'
import Main from './Main.js'
import SignUp from './companysignup.js'
//test
class App extends Component {
  render () {
    return (
    <BrowserRouter>
    <div>
      <Route exact path='/' component={SignIn}/>
      <Route exact path='/main' component={Main}/>
      <Route exact path='/companysignup' component={SignUp}/>
    </div>
    </BrowserRouter>
    )
  }
}

export default App;
