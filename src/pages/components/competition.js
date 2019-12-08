import React, {Component, Fragment} from "react";

class Competition extends Component {
    state= {
        title: this.props.title,
        body: this.props.body,
        category: this.props.category,
        author: this.props.author,
        dueDate: this.props.dueDate,
        userName: this.props.userName,
        userImage: this.props.imageUrl,
        createdAt: this.props.createdAt
    }
    render () {
        const {title, body, category, author, dueDate, userName, userImage, createdAt} = this.state;
        return (
            <div class="post">
                <img src=""></img>
                <div class="content">
                    <h4>{title}</h4>
                    <p>Posted at: {createdAt}</p>
                    <p>Due date: {dueDate}</p>
                    <p>{category}</p>
                    <p>{author}</p>
                    <p>{body}</p>
                </div>
            </div>
        );
    }
}

export default Competition