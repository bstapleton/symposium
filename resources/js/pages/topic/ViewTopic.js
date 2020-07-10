import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { canTopicBeEdited, getRepliesByTopicId, getSectionBySlug, getTopicById } from "../../utils";
import axios from "axios";
import DeletionWarning from "../../Components/DeletionWarning";
import TextBox from "../../components/TextBox";

class ViewTopic extends Component {
    constructor (props) {
        super(props);
        this.state = {
            topic: {},
            section: {},
            posts: [],
            deletionWarning: false,
            deletionType: 'topic',
            editable: true,
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
            <div className={'wrapper margin--center'}>
                <ul className={'breadcrumbs'}>
                    <li className={'breadcrumb'}><Link to={'/'} className={'breadcrumb__link'}>Home</Link></li>
                    <li className={'breadcrumb'}><Link to={`/sections/${section.slug}`} className={'breadcrumb__link'}>{section.title}</Link></li>
                    <li className={'breadcrumb'}>{topic.title}</li>
                </ul>
                {topic.is_hidden || !topic.is_published ?
                    <div className={'card card--noHeader card--noFooter card--warning'}>
                        This topic's content was deleted.
                    </div>
                    :
                    <div className={'card card--default'}>
                        <header className={'card__header'}>
                            <h1 className={'card__heading'}>
                                {topic.title}
                            </h1>
                        </header>
                        <div className={'card__content'}>
                            <p>{topic.content}</p>
                        </div>
                        <footer className={'card__footer'}>
                            <button className={'button button--danger'} onClick={this.handleDeletionWarning.bind(this, true, 'topic')}>Delete Topic</button> {/* TODO - only show for mods/admin */}
                            {this.state.deletionWarning === true && this.state.deletionType === 'topic' ?
                                <DeletionWarning
                                    type={'topic'}
                                    deletionMethod={this.handleTopicDeletion}
                                    visibilityMethod={this.handleDeletionWarning}
                                    id={topic.id}
                                />
                            : null}
                        </footer>
                    </div>
                }
                <ul className={'replies'}>
                    {posts.map(post => (
                        <li key={post.id}>
                            <a name={post.id} />
                            {post.is_hidden || !post.is_published ?
                                <div className={'card card--noHeader card--noFooter card--warning'}>
                                    <div className={'card__content'}>
                                        This post was deleted.
                                    </div>
                                </div>
                                :
                                <div className={'card card--noHeader card--default'}>
                                    <div className={'card__content'}>
                                        {post.content}
                                    </div>
                                    <footer className={'card__footer'}>
                                        <button className={'button button--danger'} onClick={this.handleDeletionWarning.bind(this, true, 'post')} value={post.id}>
                                            Delete post
                                        </button>
                                        {this.state.deletionWarning === true && this.state.deletionType === 'post' ?
                                            <DeletionWarning
                                                type={'post'}
                                                deletionMethod={this.handlePostDeletion}
                                                visibilityMethod={this.handleDeletionWarning}
                                                id={post.id}
                                            />
                                        : null}
                                    </footer>
                                </div>
                            }
                            {post.children !== null ?
                                <ul className={'replies'}>
                                    {post.children.map(reply => (
                                        <li key={reply.id}>
                                            {reply.is_hidden || !reply.is_published ?
                                                <div className={'card card--noHeader card--noFooter card--warning'}>
                                                    <div className={'card__content'}>
                                                        This reply was deleted.
                                                    </div>
                                                </div>
                                                :
                                                <div className={'card card--noHeader card--default'}>
                                                    <div className={'card__content'}>
                                                        {reply.content}
                                                    </div>
                                                    <footer className={'card__footer'}>
                                                        <button className={'button button--danger'}
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
                                                    </footer>
                                                </div>
                                            }
                                        </li>
                                    ))}
                                </ul>
                            : null}
                        </li>
                    ))}
                </ul>
                {topic.editable ?
                    <Link to={`/topics/${topic.id}/create-post`}>Add to the discussion</Link>
                : null}
            </div>
        )
    }
}

export default ViewTopic;
