import axios from 'axios';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextBox from "../TextBox";
import Textarea from "../Textarea";

class CreateTopicForm extends Component {
    constructor (props) {
        super(props);
        this.state = {
            title: '',
            content: '',
            errors: []
        }

        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.handleCreateNewTopic = this.handleCreateNewTopic.bind(this);
        this.handleRedirection = this.handleRedirection.bind(this);
    }

    handleFieldChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleRedirection(url) {
        this.props.handleRedirection(url);
    }

    handleCreateNewTopic(event) {
        event.preventDefault();



        const topic = {
            section_id: this.props.sectionId,
            title: this.state.title,
            content: this.state.content
        };

        axios.post('/api/topics', topic)
            .then(response => {
                if (response.status === 200) {
                    this.props.successMethod(`/topics/${response.data}`);
                }
            })
            .catch(error => {
                this.setState({
                    errors: error.response.data.errors
                });
            });
    }

    render() {
        return(
            <form onSubmit={this.handleCreateNewTopic}>
                {Object.keys(this.state.errors).length > 0 && this.state.errors.constructor === Object ?
                    <div>
                        <strong>There was error(s) saving the form:</strong>
                        <pre>{JSON.stringify(this.state.errors)}</pre>
                    </div>
                : null}
                <TextBox
                    name={'title'}
                    existingValue={this.state.title}
                    isRequired={true}
                    onChangeMethod={this.handleFieldChange}
                />
                <Textarea
                    name={'content'}
                    existingValue={this.state.content}
                    isRequired={true}
                    onChangeMethod={this.handleFieldChange}
                />
                <button>Create</button>
            </form>
        );
    }
}

CreateTopicForm.propTypes = {
    sectionId: PropTypes.number.isRequired,
    successMethod: PropTypes.func.isRequired,
}

export default CreateTopicForm;
