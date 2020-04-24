import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Header from './layout/Header'
import Home from './pages/Home';
import ViewSection from "./pages/section/ViewSection";
import CreateSection from './pages/section/CreateSection';
import ViewTopic from "./pages/topic/ViewTopic";
import CreateTopic from "./pages/topic/CreateTopic";
import CreatePost from "./pages/post/CreatePost";

class App extends Component {
    render () {
        return (
            <BrowserRouter>
                <div>
                    <Header />
                    <Switch>
                        <Route exact path={'/'} component={Home} />
                        <Route exact path={'/sections/:sectionSlug'} component={ViewSection} />
                        <Route exact path={'/create-section'} component={CreateSection} />
                        <Route path={'/sections/:sectionSlug/create-topic'} component={CreateTopic} />
                        <Route exact path={'/topics/:id'} component={ViewTopic} />
                        <Route path={'/topics/:id/create-post'} component={CreatePost} />
                    </Switch>
                </div>
            </BrowserRouter>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('app'))
