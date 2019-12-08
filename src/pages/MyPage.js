import React, {Component, Fragment} from "react";
import {Link} from 'react-router-dom'
import {NavigationBar} from './Main.js'

class MyPage extends Component{
    state ={
        
    }
    render() {
        return(
            <Fragment>
                <NavigationBar/>
                <Link to="./mypage/writeidea"><div id="writeidea">+</div></Link>
            </Fragment>
        )
    }
}
export default MyPage;