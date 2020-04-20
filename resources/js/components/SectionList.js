import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class SectionList extends Component {
    constructor () {
        super()
        this.state = {
            sections: []
        }
    }

    componentDidMount () {
        axios.get('/api/sections').then(response => {
            this.setState({
                sections: response.data
            })
        })
    }

    render () {
        const { sections } = this.state
        const baseRoute = '/section';
        return (
            <ul>
                {sections.map(section => (
                    <li key={section.id}>
                        <Link to={`${baseRoute}/${section.slug}`}>{section.title}</Link>
                        {section.children !== null ?
                            <ul>
                                {section.children.map(subsection => (
                                    <li key={subsection.id}>
                                        <Link to={`${baseRoute}/${section.slug}/${subsection.slug}`}>{subsection.title}</Link>
                                    </li>
                                ))}
                            </ul>
                        : null}
                    </li>
                ))}
            </ul>
        )
    }
}

export default SectionList;
