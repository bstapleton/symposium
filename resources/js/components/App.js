import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Header from './Header'
import SectionList from './SectionList';
import TopicList from "./TopicList";
import ReplyList from "./ReplyList";
import CreateTopic from "./CreateTopic";

class App extends Component {
    render () {
        return (
            <BrowserRouter>
                <div>
                    <Header />
                    <Switch>
                        <Route exact path={'/'} component={SectionList} />
                        <Route path={'/sections/:sectionSlug'} component={TopicList} exact />
                        <Route path={'/sections/:sectionSlug/create-topic'} component={CreateTopic} />
                        <Route path={'/topics/:id'} component={ReplyList} />
                    </Switch>
                </div>
            </BrowserRouter>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('app'))
