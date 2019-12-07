import React, {Component, Fragment} from "react";
import {Link} from 'react-router-dom'
import NavigationBar from './Main.js'

class MyPage extends Component{
    state ={

    }
    render() {
        return(
            <form>
            <NavigationBar/>
            <Link to="./writeidea"><div id="writeidea">Add Idea</div></Link>
            </form>
        )
    }
}
export default MyPage;