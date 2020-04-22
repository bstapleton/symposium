import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getRepliesByTopicId, getSectionBySlug, getTopicById } from "../../../utils";
import axios from "axios";

class ViewTopic extends Component {
    constructor (props) {
        super(props);
        this.state = {
            topic: {},
            section: {},
            posts: [],
            deletionWarning: false,
            errors: [] // TODO - show errors somewhere!
        }
    }

    componentDidMount () {
        getTopicById(this.props.match.params.id).then((response) => {
            this.setState({ topic: response.data });
        }).then(() => {
            getSectionBySlug(this.state.topic.section_id).then((response) => {
                this.setState({
                    section: response.data
                });
            });
        }).then(() => {
            getRepliesByTopicId(this.state.topic.id).then((response) => {
                this.setState({
                    posts: response.data
                });
            });
        });
    }

    handleDeletionWarning(event) {
        this.setState({
            deletionWarning: event.target.value,
        })
    }

    handleTopicDeletion(event) {
        event.preventDefault();

        axios.put(`/api/topics/${event.target.value}/delete`)
            .then(response => {
                console.log('deleted'); // TODO - redirect with a message
            })
            .catch(error => {
                this.setState({
                    errors: error.response.data.errors
                });
            });
    }

    render () {
        const { topic } = this.state;
        const { section } = this.state;
        const { posts } = this.state;
        return (
            <div>
                <h1>{section.title} : {topic.title}</h1>
                <p>{topic.content}</p>
                <ul>
                    {posts.map(post => (
                        <li key={post.id}>
                            {post.content}
                            {post.children !== null ?
                                <ul>
                                    {post.children.map(reply => (
                                        <li key={reply.id}>
                                            {reply.content}
                                        </li>
                                    ))}
                                </ul>
                            : null}
                        </li>
                    ))}
                </ul>
                <button onClick={this.handleDeletionWarning.bind(this)} value={true}>Delete</button>
                <Link to={`/topics/${topic.id}/create-post`}>Add to the discussion</Link>
                {this.state.deletionWarning ?
                    <div>
                        Are you sure you want to delete this topic?
                        <div>
                            <button onClick={this.handleTopicDeletion} value={topic.id}>Yes, delete</button>
                            <button onClick={this.handleDeletionWarning.bind(this)} value={false}>No, nevermind</button>
                        </div>
                    </div>
                : null}
            </div>
        )
    }
}

export default ViewTopic;
