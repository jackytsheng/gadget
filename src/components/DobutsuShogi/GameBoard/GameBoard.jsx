import React from 'react';
import styled from 'styled-components';
import CenterWrapper from '../../../Layout/CenterWrapper';
import BoardSvg from './BoardSVG.svg';
const Board = styled.div`
  width: 380px;
  height: 540px;
  border-radius: 5px;
  border: 1px solid black;
`;

const GridSquare = styled.div`
  width: ${(props) => (props.rightLast ? "100px" : "99px")};
  height: ${(props) => (props.bottomLast ? "100px" : "99px")};
  border-bottom: ${(props) => (props.bottomLast ? null : "1px dashed red")};
  border-right: ${(props) => (props.rightLast ? null : "1px dashed red")};
`;
const Grid = styled.div`
  width: 300px;
  height: 400px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(4, 1fr);
  border: 1px dashed red;
`;

export default () => (
  <Board>
    <BoardSvg></BoardSvg>
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
