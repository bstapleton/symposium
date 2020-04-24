import axios from 'axios';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextBox from "../TextBox";
import Textarea from "../Textarea";
import Select from "../Select";
import Icons from '../../data/Icons';

class CreateSectionForm extends Component {
    constructor (props) {
        super(props);
        this.state = {
            title: '',
            description: '',
            icon_url: '',
            parent_section_id: null,
            errors: []
        }

        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.handleCreateNewSection = this.handleCreateNewSection.bind(this);
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

    handleCreateNewSection(event) {
        event.preventDefault();

        const section = {
            parent_section_id: parseInt(this.state.parent_section_id),
            title: this.state.title,
            description: this.state.description,
            icon_url: this.state.icon_url
        };

        console.log(section);

        axios.post('/api/sections', section)
            .then(response => {
                if (response.status === 200) {
                    this.props.successMethod(`/sections/${response.data}`);
                }
            })
            .catch(error => {
                this.setState({
                    errors: error.response.data.errors
                });
            });
    }

    render() {
        let icons = Icons;
        return(
            <form onSubmit={this.handleCreateNewSection}>
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
                    name={'description'}
                    existingValue={this.state.description}
                    onChangeMethod={this.handleFieldChange}
                />
                <Select
                    name={'icon_url'}
                    options={icons}
                    defaultOption={Object({value: '', text: 'No icon, thanks'})}
                    onChangeMethod={this.handleFieldChange}
                />
                {this.props.parentSections.length > 0 ?
                    <Select
                        name={'parent_section_id'}
                        options={this.props.parentSections}
                        defaultOption={Object({value: '', text: 'None, make this top-level'})}
                        onChangeMethod={this.handleFieldChange}
                    />
                : null}
                <button>Create section</button>
            </form>
        );
    }
}

CreateSectionForm.propTypes = {
    successMethod: PropTypes.func.isRequired,
    parentSections: PropTypes.array,
}

export default CreateSectionForm;
