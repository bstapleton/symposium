import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getSectionBySlug, getTopicsBySectionId } from "../utils";

class TopicList extends Component {
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
        const baseRoute = `/section/${section.slug}/topics`;
        return (
            <div>
                <h1>{this.state.section.title}</h1>
            <ul>
                {topics.map(topic => (
                    <li key={topic.id}>
                        <Link to={`${baseRoute}/${topic.id}`}>{topic.title}</Link>
                    </li>
                ))}
            </ul>
            </div>
        )
    }
}

export default TopicList;
