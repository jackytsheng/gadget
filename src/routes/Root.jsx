import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from './Home';

export default () => (
  <Router basename="/">
    <Switch>
      <Route path="/">
        <Home />
      </Route>
    </Switch>
  </Router>
);