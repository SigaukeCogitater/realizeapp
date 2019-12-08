import React, { Fragment } from "react";
import myFirebase from '../config';
import {NavigationBar} from './Main.js'


class writecompa extends React.Component{


    state = {
        title:"",
        description:"",
        //public_private: false;
        //direct_submit_to_competition: false;
    };
    handleDescription = e => {
        e.preventDefault();
        this.setState({
          description: e.target.value
        });
      };

    handletitle = e => {
        e.preventDefault();
        this.setState({
          title: e.target.value
        });
      };

    handleSubmit = e => {
      const info = this.state;
      myFirebase.collection("competitions").add({
        ...info,
        authorFirstName: "hi",
        authorLastName: 'hey',
        authorId: 1234,
        createdAt: new Date()
      }).then(() => {
        alert("idea added!");
      }).catch((err) =>{
        alert("error");
      })
    };


  

    render(){
        return(
        <Fragment>
          <NavigationBar/>
            <div id="wr">
                <h1> Write Competition</h1>
                    <b>title</b> 
                    <br></br>
                    <input
                      id = "title"
                      type= "text"
                      onChange={this.handletitle}
                      value = {this.state.title}/>
                    <br></br>
                    <p></p>
                    <b>Description</b>
                    <br></br>
                      <textarea cols="150" rows="30"
                          id="des"
                          onChange = {this.handleDescription}
                          value = {this.state.description}/>
                    <div>
                        <button id="bt" onClick={this.handleSubmit}>Submit</button>
                    </div>
                
            </div>
          </Fragment>
        );
    }

}
export default writecompa;