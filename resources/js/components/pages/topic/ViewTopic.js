import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getRepliesByTopicId, getSectionBySlug, getTopicById } from "../../../utils";

class ViewTopic extends Component {
    constructor (props) {
        super(props);
        this.state = {
            topic: {},
            section: {},
            posts: []
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
                <Link to={`/topics/${topic.id}/create-post`}>Add to the discussion</Link>
            </div>
        )
    }
}

export default ViewTopic;
