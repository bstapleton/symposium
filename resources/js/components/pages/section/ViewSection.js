import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getSectionBySlug, getTopicsBySectionId } from "../../../utils";

class ViewSection extends Component {
    constructor (props) {
        super(props);
        this.state = {
            topics: [],
            section: {}
        }
    }

    componentDidMount () {
        getSectionBySlug(this.props.match.params.sectionSlug).then((response) => {
            this.setState({
                section: response.data
            });
        }).then(() => {
            getTopicsBySectionId(this.state.section.id).then((response) => {
                this.setState({
                    topics: response.data
                });
            });
        });
    }

    render () {
        const { topics } = this.state;
        const { section } = this.state;
        const baseRoute = `/topics`;
        return (
            <div>
                <h1>{section.title}</h1>
                <ul>
                    {topics.map(topic => (
                        <li key={topic.id}>
                            <Link to={`${baseRoute}/${topic.id}`}>{topic.title}</Link>
                        </li>
                    ))}
                </ul>
                <Link to={`/sections/${this.props.match.params.sectionSlug}/create-topic`}>Create new topic</Link>
            </div>
        )
    }
}

export default ViewSection;
