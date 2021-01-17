import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import '../styles/MainContent.css';
import CustomerPanel from './CustomerPanel';
import Header from './Header';
import Login from './Login';
import Logout from './Logout';
import Register from './Register';

function MainContent() {
    return (
        <Router>
            <Header />
            <div id="content">
                <Switch>
                    <Route path="/register">
                        <Register />
                    </Route>
                    <Route path="/logout">
                        <Logout />
                    </Route>
                    <Route path="/customerPanel">
                        <CustomerPanel />
                    </Route>
                    <Route path="/">
                        <Login />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

export default MainContent;