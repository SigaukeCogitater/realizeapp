import React from "react";
import './writeidea.css';
import WriteIdea from './writeidea.js'
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