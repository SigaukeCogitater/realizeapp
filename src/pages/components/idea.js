import React, {Component, Fragment} from "react";

class Idea extends Component {
    state= {
        body: this.props.body,
        category: this.props.category,
        commentsCount: this.props.commentsCount,
        createdAt: this.props.date,
        ideaTitle: this.props.ideaTitle,
        ideaId: this.props.ideaId,
        likesCount: this.props.likeCount,
        userName: this.props.userName
    }
    render () {
        const {body, category, createdAt, ideaTitle, userName} = this.state;
        return (
            <div class="post">
                <img src=""></img>
                <div class="content">
                    <h4>{ideaTitle}</h4>
                    <p>{createdAt}</p>
                    <p>{category}</p>
                    <p>{userName}</p>
                    <p>{body}</p>
                </div>
            </div>
        );
    }
}

export default Idea