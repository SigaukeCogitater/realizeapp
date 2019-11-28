import React, {Component} from "react";
import {Route,BrowserRouter} from 'react-router-dom'
import SignIn from './SignIn.js'
import Main from './Main.js'

class App extends Component {
  render () {
    return (
    <BrowserRouter>
    <div>
      <Route exact path='/' component={SignIn}/>
      <Route exact path='/main' component={Main}/>
    </div>
    </BrowserRouter>
    )
  }
}

export default App;
