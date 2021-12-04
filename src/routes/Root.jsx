import React from 'react';
import { Switch, Route, useHistory, useLocation } from 'react-router-dom';
import Home from './Home';
import SudokuSolver from '../components/SudokuSolver';
import FullSizeCanvas from '../Layout/FullSizeCanvas';
import styled from 'styled-components';
import { Button } from '@material-ui/core';
import TwoZeroFourEight from '../components/TwoZeroFourEight';
import Tetris from '../components/Tetris';
import DobutsuShogi from '../components/DobutsuShogi';
import Siege from '../components/Siege';
import Snake from '../components/Snake';
import LogicSimulator from '../components/LogicSimulator';
import { useWindowSize } from '../hooks/useWindowSize';
import { IconButton } from '@material-ui/core';
import ArrowBackRounded from '@material-ui/icons/ArrowBackRounded';

const ReturnHome = ({ handleClick }) => {
  const size = useWindowSize();
  const mobileSize  = size.width < 500;
  return ( mobileSize ?
    <IconButton color="primary" aria-label="back to home" onClick={handleClick} >
      <ArrowBackRounded />
    </IconButton> : 
    <ReturnHomeBtn color='primary' onClick={handleClick}>
      Return Home
    </ReturnHomeBtn> 
  );
};

const ReturnHomeBtn = styled(Button)`
  position: absolute;
  top: 10px;
  left: 40px;
`;
const Wrapper = styled.div`
  top: 0;
  width: 100%;
  height: 20px;
  position: fixed;
  z-index: 50;
`;

export default () => {
  const curUrl = useLocation();
  let history = useHistory();
  const handleClick = () => {
    history.push('/');
  };
  return (
    <React.Fragment>
      {curUrl.pathname !== '/' ? (
        <Wrapper>
          <ReturnHome handleClick={handleClick} />
        </Wrapper>
      ) : null}
      <Switch>
        <Route path='/tetris' exact>
          <FullSizeCanvas>
            <Tetris />
          </FullSizeCanvas>
        </Route>
        <Route path='/snake' exact>
          <FullSizeCanvas>
            <Snake />
          </FullSizeCanvas>
        </Route>
        <Route path='/siege' exact>
          <FullSizeCanvas>
            <Siege />
          </FullSizeCanvas>
        </Route>
        <Route path='/dobutsushogi' exact>
          <FullSizeCanvas>
            <DobutsuShogi />
          </FullSizeCanvas>
        </Route>
        <Route path='/sudokusolver' exact>
          <FullSizeCanvas>
            <SudokuSolver />
          </FullSizeCanvas>
        </Route>
        <Route path='/2048' exact>
          <FullSizeCanvas>
            <TwoZeroFourEight />
          </FullSizeCanvas>
        </Route>
        {/*Come back when I feel like*/}
        <Route path='/logicsimulator' exact>
          <FullSizeCanvas>
            <LogicSimulator />
          </FullSizeCanvas>
        </Route>
        <Route path='/' exact>
          <Home />
        </Route>
      </Switch>
    </React.Fragment>
  );
};
