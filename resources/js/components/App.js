import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Header from './Header'

class App extends Component {
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
        return (
            <BrowserRouter>
                <div>
                    <Header />
                    <p>stuff</p>
                    {console.log(sections)}
                    {sections.map(section => (
                        <p>{section.title}</p>
                    ))}
                </div>
            </BrowserRouter>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('app'))
