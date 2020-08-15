import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from './Home';
import SudokuSolver from '../components/SudokuSolver';
import FullSizeCanvas from '../Layout/FullSizeCanvas';

//TODO: Fixed the Client router problem with Gh-pages

export default () => {
return (
  <Router>
    <Switch>
      <Route path="/sudokusolver" exact>
        <FullSizeCanvas>
          <SudokuSolver />
        </FullSizeCanvas>
      </Route>
      <Route path="/" exact>
        <FullSizeCanvas>
          <Home />
        </FullSizeCanvas>
      </Route>
    </Switch>
  </Router>
);}