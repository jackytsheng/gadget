import React from 'react';
import {
  Switch,
  Route,
  useHistory,
  useLocation,
} from "react-router-dom";
import Home from './Home';
import SudokuSolver from '../components/SudokuSolver';
import FullSizeCanvas from '../Layout/FullSizeCanvas';
import styled from "styled-components";
import { Button } from "@material-ui/core";
import TwoZeroFourEight from '../components/TwoZeroFourEight';
import DobutsuShogi from '../components/DobutsuShogi';
const ReturnHome = ({ handleClick }) => {
  return (
    <ReturnHomeBtn color="primary" onClick={handleClick}>
      Return Home
    </ReturnHomeBtn>
  );
};

const ReturnHomeBtn = styled(Button)`
  position:absolute;
  top:10px;
  left:40px;
  
`
const Wrapper = styled.div`
  top:0;
  width: 100%;
  height: 20px;
  position: fixed;
  z-index: 50;
`;


export default () => {
  const curUrl = useLocation();
  let history = useHistory();
  const handleClick = () => {
    history.push("/");
  }
  return (
    <React.Fragment>
      {curUrl.pathname !== "/" ? (
        <Wrapper>
          <ReturnHome handleClick={handleClick} />
        </Wrapper>
      ) : null}
      <Switch>
        <Route path="/dobutsushogi" exact>
          <FullSizeCanvas>
            <DobutsuShogi />
          </FullSizeCanvas>
        </Route>
        <Route path="/sudokusolver" exact>
          <FullSizeCanvas>
            <SudokuSolver />
          </FullSizeCanvas>
        </Route>
        <Route path="/2048" exact>
          <FullSizeCanvas>
            <TwoZeroFourEight />
          </FullSizeCanvas>
        </Route>
        <Route path="/" exact>
          <Home />
        </Route>
      </Switch>
    </React.Fragment>
  );}