import React, { Component } from 'react';
import { getSectionBySlug } from "../../utils";
import CreateTopicForm from "../../components/forms/CreateTopicForm";
import {Link} from "react-router-dom";

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
        const { section } = this.state;
        return(
            <div>
                {!section.is_locked ? // TODO - check against user role_id to show as well
                    <div>
                        <p>Fill out the form</p>
                        <CreateTopicForm
                            sectionId={section.id}
                            successMethod={this.redirectOnSuccess}
                        />
                    </div>
                    :
                    <div>This section is locked from new posts except by administrators. <Link to={`/sections/${section.slug}`}>Click here to go back</Link>.</div>
                }
            </div>
        );
    }
}

export default CreateTopic;
