import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getRepliesByTopicId, getSectionBySlug, getTopicById } from "../../../utils";
import axios from "axios";
import DeletionWarning from "../../DeletionWarning";
import TextBox from "../../TextBox";

class ViewTopic extends Component {
    constructor (props) {
        super(props);
        this.state = {
            topic: {},
            section: {},
            posts: [],
            deletionWarning: false,
            deletionType: 'topic',
            errors: [] // TODO - show errors somewhere!
        }

        this.handleDeletionWarning = this.handleDeletionWarning.bind(this);
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

    handleDeletionWarning(bool, type, event) {
        event.preventDefault();
        this.setState({
            deletionWarning: bool,
            deletionType: type
        })
    }

    handleTopicDeletion(id, event) {
        event.preventDefault();

        axios.put(`/api/topics/${id}/delete`)
            .then(response => {
                console.log('deleted'); // TODO - redirect with a message
                location.reload();
            })
            .catch(error => {
                this.setState({
                    errors: error.response.data.errors
                });
            });
    }

    handlePostDeletion(id, event) {
        event.preventDefault();

        axios.put(`/api/posts/${id}/delete`)
            .then(response => {
                console.log('post deleted'); // TODO reload with message
                location.reload();
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
                {topic.is_hidden || !topic.is_published ?
                    <div className={'is-hidden'}>
                        This topic's content was deleted.
                    </div>
                    :
                    <div>
                        <p>{topic.content}</p>
                        <button onClick={this.handleDeletionWarning.bind(this, true, 'topic')}>Delete</button> {/* TODO - only show for mods/admin */}
                        {this.state.deletionWarning === true && this.state.deletionType === 'topic' ?
                            <DeletionWarning
                                type={'topic'}
                                deletionMethod={this.handleTopicDeletion}
                                visibilityMethod={this.handleDeletionWarning}
                                id={topic.id}
                            />
                        : null}
                    </div>
                }
                <ul>
                    {posts.map(post => (
                        <li key={post.id}>
                            {post.is_hidden || !post.is_published ?
                                <div className={'is-hidden'}>
                                    This post was deleted.
                                </div>
                                :
                                <div>
                                    {post.content}
                                    <button onClick={this.handleDeletionWarning.bind(this, true, 'post')}
                                            value={post.id}>Delete post
                                    </button>
                                    {this.state.deletionWarning === true && this.state.deletionType === 'post' ?
                                        <DeletionWarning
                                            type={'post'}
                                            deletionMethod={this.handlePostDeletion}
                                            visibilityMethod={this.handleDeletionWarning}
                                            id={post.id}
                                        />
                                    : null}
                                </div>
                            }
                            {post.children !== null ?
                                <ul>
                                    {post.children.map(reply => (
                                        <li key={reply.id}>
                                            {reply.is_hidden || !reply.is_published ?
                                                <div className={'is-hidden'}>
                                                    This reply was deleted.
                                                </div>
                                                :
                                                <div>
                                                    {reply.content}
                                                    <button
                                                        onClick={this.handleDeletionWarning.bind(this, true, 'reply')}
                                                        value={reply.id}>Delete reply
                                                    </button>
                                                    {this.state.deletionWarning === true && this.state.deletionType === 'reply' ?
                                                        <DeletionWarning
                                                            type={'reply'}
                                                            deletionMethod={this.handlePostDeletion}
                                                            visibilityMethod={this.handleDeletionWarning}
                                                            id={reply.id}
                                                        />
                                                    : null}
                                                </div>
                                            }
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
