import React, { Component } from 'react';
import CreateSectionForm from "../../forms/CreateSectionForm";
import { getAllSections } from "../../../utils";

class CreateSection extends Component {
    constructor (props) {
        super(props);
        this.state = {
            sections: [],
        }

        this.redirectOnSuccess = this.redirectOnSuccess.bind(this);
    }

    componentDidMount() {
        getAllSections().then((response) => {
            this.setState({
                sections: response.data
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
                <CreateSectionForm
                    successMethod={this.redirectOnSuccess}
                    parentSections={this.state.sections}
                />
            </div>
        );
    }
}

export default CreateSection;
