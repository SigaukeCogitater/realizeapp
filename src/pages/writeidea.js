import React from "react";
import myFirebase from '../config';

class writeidea extends React.Component{
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
      myFirebase.collection("ideas").add({
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
            <div>
                <h1> Write Idea</h1>
                    title : <input
                                id = "title"
                                type= "text"
                                onChange={this.handletitle}
                                value = {this.state.title}/>
                    <br></br>
                    <p></p>
                    Description:
                    <br></br> 
                    <input
                        id ="des"
                        type = "text"
                        onChange = {this.handleDescription}
                        value = {this.state.description}/>
                    <div>
                        <button onClick={this.handleSubmit}>Submit</button>
                    </div>
                
            </div>
        );
    }

}
export default writeidea;