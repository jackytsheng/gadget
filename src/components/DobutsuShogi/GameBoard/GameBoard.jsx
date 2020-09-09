import React from 'react';
import styled from 'styled-components';
import CenterWrapper from '../../../Layout/CenterWrapper';
import BackgroundImg from "./background.png";

const BOARD_HEIGHT = '540px';
const BOARD_WIDTH = "380px";
const DASH_COLOR = "#b52838";
const Board = styled.div`
  width: ${BOARD_WIDTH};
  height: ${BOARD_HEIGHT};
  border-radius: 5px;
  border: 1px solid black;
  overflow:hidden;
  position:relative;
`;

const Img = styled.img`
  width: ${BOARD_WIDTH};
  height: ${BOARD_HEIGHT};
  position:absolute;
`;
const GridSquare = styled.div`
  width: ${(props) => (props.rightLast ? "100px" : "99px")};
  height: ${(props) => (props.bottomLast ? "100px" : "99px")};
  border-bottom: ${(props) =>
    props.bottomLast ? null : "1px dashed " + DASH_COLOR};
  border-right: ${(props) =>
    props.rightLast ? null : "1px dashed" + DASH_COLOR};
`;
const Grid = styled.div`
  width: 300px;
  height: 400px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(4, 1fr);
  border: 1px dashed ${DASH_COLOR};
  z-index: 2;
`;

export default () => (
  <Board>
    <Img src={BackgroundImg} alt={"background"} />
    <CenterWrapper>
      <Grid>
        <GridSquare />
        <GridSquare />
        <GridSquare rightLast={true} />
        <GridSquare />
        <GridSquare />
        <GridSquare rightLast={true} />
        <GridSquare />
        <GridSquare />
        <GridSquare rightLast={true} />
        <GridSquare bottomLast={true} />
        <GridSquare bottomLast={true} />
        <GridSquare bottomLast={true} rightLast={true} />
      </Grid>
    </CenterWrapper>
  </Board>
);
