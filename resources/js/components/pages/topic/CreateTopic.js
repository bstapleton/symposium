import axios from 'axios';
import React, { Component } from 'react';
import {getSectionBySlug} from "../../../utils";

class CreateTopic extends Component {
    constructor (props) {
        super(props);
        this.state = {
            section: {},
            title: '',
            content: '',
            errors: []
        }

        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.handleCreateNewTopic = this.handleCreateNewTopic.bind(this);
        this.hasErrorFor = this.hasErrorFor.bind(this);
        this.renderErrorFor = this.renderErrorFor.bind(this);
    }

    componentDidMount() {
        getSectionBySlug(this.props.match.params.sectionSlug).then((response) => {
            this.setState({
                section: response.data
            });
        });
    }

    handleFieldChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleCreateNewTopic(event) {
        event.preventDefault();

        const { history } = this.props;

        const topic = {
            section_id: this.state.section.id,
            title: this.state.title,
            content: this.state.content
        };

        axios.post('/api/topics', topic)
            .then(response => {
                console.log(response);
                history.push(`/topics/${response.data}`);
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
                <p>Fill out the form</p>
                <form onSubmit={this.handleCreateNewTopic}>
                    <div>
                        <input
                            type={'text'}
                            name={'title'}
                            id={'title'}
                            value={this.state.title}
                            onChange={this.handleFieldChange}
                        />
                        {this.renderErrorFor('title')}
                    </div>
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
            </div>
        );
    }
}

export default CreateTopic;
