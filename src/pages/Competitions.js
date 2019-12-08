import React, {Component, Fragment} from "react";
import {Link} from 'react-router-dom'
import NavigationBar from './Main.js'

class Competitions extends Component{
    state ={
        competitions: {}
    }
    render() {
        return(
            <NavigationBar/>
            
        )
    }
}
export default Competitions;