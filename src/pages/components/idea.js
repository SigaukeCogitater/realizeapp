import React, {Component, Fragment} from "react";

class Idea extends Component {
    state= {
        title: "title",
        content: "description"
    }
    render () {
        const {title, content} = this.state;
        return (
            <div class="post">
                <img src=""></img>
                <div class="content">
                    <h4>{title}</h4>
                    <p>{content}</p>
                </div>
            </div>
        );
    }
}

export default Idea