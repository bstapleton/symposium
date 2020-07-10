import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getTopicById } from "../../utils";

class CreatePost extends Component {
    constructor (props) {
        super(props);
        this.state = {
            topic: {},
            content: '',
            errors: []
        }

        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.handleCreateNewPost = this.handleCreateNewPost.bind(this);
        this.hasErrorFor = this.hasErrorFor.bind(this);
        this.renderErrorFor = this.renderErrorFor.bind(this);
    }

    componentDidMount() {
        getTopicById(this.props.match.params.id).then((response) => {
            this.setState({
                topic: response.data
            });
        });
    }

    handleFieldChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleCreateNewPost(event) {
        event.preventDefault();

        const { history } = this.props;

        const post = {
            topic_id: this.state.topic.id,
            content: this.state.content
        };

        axios.post('/api/posts', post)
            .then(response => {
                history.push(`/topics/${post.topic_id}`);
            })
            .catch(error => {
                this.setState({
                    errors: error.response.data.errors
                });
            });
    }

    hasErrorFor(field) {
        return !!this.state.errors[field];
    }

    renderErrorFor(field) {
        if (this.hasErrorFor(field)) {
            return(
                <span className={'invalid-feedback'}>
                    <strong>{this.state.errors[field][0]}</strong>
                </span>
            )
        }
    }

    render() {
        return(
            <div>
                {this.state.topic.editable ?
                    <form onSubmit={this.handleCreateNewPost}>
                        <p>You are replying to:</p>
                        <div>
                            <pre>{this.state.topic.content}</pre>
                        </div>
                        <p>Fill out the form</p>
                        <div>
                            <textarea
                                name={'content'}
                                id={'content'}
                                value={this.state.content}
                                rows={'5'}
                                onChange={this.handleFieldChange}
                            />
                            {this.renderErrorFor('content')}
                        </div>
                        <button>Create</button>
                    </form>
                :
                    <div>No more posts can be added to this topic as it was last modified more than a year ago. <Link to={`/topics/${this.state.topic.id}`}>Click here to go back</Link>.</div>
                }
            </div>
        );
    }
}

export default CreatePost;
