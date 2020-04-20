import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Header from './Header'
import SectionList from './SectionList';
import TopicList from "./TopicList";

class App extends Component {
    render () {
        return (
            <BrowserRouter>
                <div>
                    <Header />
                    <Switch>
                        <Route exact path={'/'} component={SectionList} />
                        <Route path={'/sections/:sectionSlug/topics'} component={TopicList} />
                    </Switch>
                </div>
            </BrowserRouter>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('app'))
