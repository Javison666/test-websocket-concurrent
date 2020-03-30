import React from "react";
import { BrowserRouter as Router, Route } from 'react-router-dom';
// import App from '../App';
import Todo from '../pages/todo';
import Dash from '../pages/Dash'

export default () => (
    <Router>
        <div>
            <Route exact path="/" component={Dash} />
            {/* <Route exact path="/" component={App} /> */}
            <Route exact path="/todo" component={Todo} />
        </div>
    </Router>
)
