import React, {Component, Fragment} from "react";
import {Link} from 'react-router-dom'
import {NavigationBar} from './Main.js'
import {connect} from 'react-redux'
import {mapStateToProps} from 'react-redux-firebase'

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
export default connect(mapStateToProps)(MyPage);