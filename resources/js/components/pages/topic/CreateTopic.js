import React, { Component } from 'react';
import { getSectionBySlug } from "../../../utils";
import CreateTopicForm from "../../forms/CreateTopicForm";

class CreateTopic extends Component {
    constructor (props) {
        super(props);
        this.state = {
            section: {
                id: 0
            },
        }

        this.redirectOnSuccess = this.redirectOnSuccess.bind(this);
    }

    componentDidMount() {
        getSectionBySlug(this.props.match.params.sectionSlug).then((response) => {
            this.setState({
                section: response.data
            });
        });
    }

    redirectOnSuccess(url) {
        const { history } = this.props;

        history.push(url);
    }

    render() {
        return(
            <div>
                <p>Fill out the form</p>
                <CreateTopicForm
                    sectionId={this.state.section.id}
                    successMethod={this.redirectOnSuccess}
                />
            </div>
        );
    }
}

export default CreateTopic;
