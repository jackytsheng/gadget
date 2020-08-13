import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from './Home';
import SudokuSolver from '../components/SudokuSolver';
import FullSizeCanvas from '../Layout/FullSizeCanvas';

export default () => (
  <Router basename="/">
    <Switch>
      <Route path="/" exact>
        <FullSizeCanvas>
          <Home />
        </FullSizeCanvas>
      </Route>
      <Route path="/sudokusolver" exact>
        <FullSizeCanvas>
          <SudokuSolver />
        </FullSizeCanvas>
      </Route>
    </Switch>
  </Router>
);