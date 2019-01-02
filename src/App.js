import React, { Component } from 'react';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import Home from './screens/Home';
import './App.css';

export default class App extends Component {
  
  render() {
    return (
        <Router>
          <div>
            <Route exact path="/" component={Home} />
            {/* <Route path="/Preview" component={Preview} /> */}
          </div>
        </Router>
    );
  }
}

