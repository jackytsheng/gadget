import React from "react";
import styled from "styled-components";
import CenterWrapper from "../../../Layout/CenterWrapper";
import BackgroundImg from "./background.png";
import Chess from "../Chess";
const BOARD_HEIGHT = "540px";
const BOARD_WIDTH = "380px";
const DASH_COLOR = "#b52838";
const Board = styled.div`
  width: ${BOARD_WIDTH};
  height: ${BOARD_HEIGHT};
  border-radius: 5px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  overflow: hidden;
  position: relative;
`;

const Img = styled.img`
  width: ${BOARD_WIDTH};
  height: ${BOARD_HEIGHT};
  position: absolute;
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
        <GridSquare>
          <Chess chessType={"GIRAF"} rotated={true} />
        </GridSquare>
        <GridSquare>
          <Chess chessType={"LION"} rotated={true} />
        </GridSquare>
        <GridSquare rightLast={true}>
          <Chess chessType={"ELPHT"} rotated={true} />
        </GridSquare>
        <GridSquare />
        <GridSquare>
          <Chess chessType={"CHICK"} rotated={true} />
        </GridSquare>
        <GridSquare rightLast={true} />
        <GridSquare />
        <GridSquare>
          <Chess chessType={"CHICK"} />
        </GridSquare>
        <GridSquare rightLast={true} />
        <GridSquare bottomLast={true}>
          <Chess chessType={"ELPHT"} />
        </GridSquare>
        <GridSquare bottomLast={true}>
          <Chess chessType={"LION"} />
        </GridSquare>
        <GridSquare bottomLast={true} rightLast={true}>
          <Chess chessType={"GIRAF"} />
        </GridSquare>
      </Grid>
    </CenterWrapper>
  </Board>
);
