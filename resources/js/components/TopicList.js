import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class TopicList extends Component {
    constructor () {
        super();
        this.state = {
            topics: [],
            sectionUrl: null
        }
    }

    componentDidMount () {
        axios.get('/api/topics').then(response => {
            this.setState({
                topics: response.data
            });
        });
    }

    render () {
        const { topics } = this.state
        const baseRoute = `/section/${this.state.sectionUrl}`;
        return (
            <ul>
                {topics.map(topic => (
                    <li key={topic.id}>
                        <Link to={`${baseRoute}/${topic.id}`}>{topic.title}</Link>
                    </li>
                ))}
            </ul>
        )
    }
}

export default TopicList;
