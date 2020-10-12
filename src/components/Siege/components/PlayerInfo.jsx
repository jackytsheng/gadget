import React from 'react';
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import styled from "styled-components";
import PropTypes from "prop-types";


const PlayerTurnInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media (max-width: 1000px) {
    margin-top: 10px;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
`;

const TurnInfo = styled.div`
  padding-left: 10px;
  font-size: 30px;
  font-weight: 500;
  margin: 20px 0;
  @media (max-width: 500px) {
    font-size: 18px;
  }
  @media (max-width: 1000px) {
    margin: 0 10px;
    font-size: 20px;
  }
`;

const HorizontalFlexWrapper = styled.div`
  width: ${props => props.width + "px"};
  display: flex;
  padding-left: 10px;
  @media (max-width: 1000px) {
    width: auto;
  }
`;

const PlayerInfo = ({
  redo,
  surrenderDisabled,
  redoDisabled,
  player,
  surrender,
  HorizontalWidth,
}) => (
  <PlayerTurnInfo>
    <TurnInfo>Player {player}'s turn</TurnInfo>
    <HorizontalFlexWrapper width={HorizontalWidth}>
      <ButtonGroup aria-label="outlined button group">
        <Button
          variant="outlined"
          color="primary"
          onClick={redo}
          disabled={redoDisabled}
        >
          Redo
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          onClick={surrender}
          disabled={surrenderDisabled}
        >
          Surrender
        </Button>
      </ButtonGroup>
    </HorizontalFlexWrapper>
  </PlayerTurnInfo>
);

PlayerInfo.propTypes = {
  HorizontalWidth: PropTypes.number,
  player: PropTypes.number.isRequired,
  surrender: PropTypes.func.isRequired,
  redo: PropTypes.func.isRequired,
  redoDisabled: PropTypes.bool.isRequired,
  surrenderDisabled: PropTypes.bool.isRequired,
};

export default PlayerInfo; 

