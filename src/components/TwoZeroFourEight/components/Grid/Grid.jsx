import React from "react";
import styled from 'styled-components';
import CenterWrapper from '../../../../Layout/CenterWrapper';

const EMPTY_CELL ='#ccc0b4';
const BG_COLOR = "#bbada0";
export const NUMBER_COLOR = "#ffffed";
const FONT_SIZE_ARRAY = ["30px", "28px", "23px", "18px"];
const BG_ARRAY = ['#f1d04a', '#e95937', '#f57c5e', '#ec8c53', '#f2b179', '#ece0c9', '#eee4da', '#ccc0b4'];
const TEXT_COLOR = ['#766d64', NUMBER_COLOR];

const Board = styled.div`
  background-color: ${BG_COLOR};
  box-sizing:border-box;
  padding: 8px;
  height: 100%;
  width: 100%;
  border-radius: 5px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(4, 1fr);
  grid-gap: 5px;
`;
const Cell = styled.div`
  width:100%;
  height:100%;
  background-color: ${EMPTY_CELL};
  border-radius: 2px;
  position:relative;
  overflow:hidden;
`;

const CellNumber = styled.div`
  background-color: ${(props) => props.bg};
  font-size: ${(props) => props.fontSize};
  color: ${(props) => props.color};
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  font-weight:600;
`;
CellNumber.defaultProps = {
  bg: EMPTY_CELL,
  fontSize: FONT_SIZE_ARRAY[0],
  color:NUMBER_COLOR,
};


const determineSize = (number) =>{
  if (number > 10000) {
    return FONT_SIZE_ARRAY[3];
  } else if (number > 1000) {
    return FONT_SIZE_ARRAY[2];
  } else if (number > 100) {
    return FONT_SIZE_ARRAY[1];
  }
}

const determineGB = (number) => {
  switch (number) {
    case 2:
      return BG_ARRAY[6];
    case 4:
      return BG_ARRAY[5];
    case 8:
      return BG_ARRAY[4];
    case 16:
      return BG_ARRAY[3];
    case 32:
      return BG_ARRAY[2];
    case 64:
      return BG_ARRAY[1];
    default:
      return BG_ARRAY[0];
  }
};

const gridGenerator = (gameBoard) =>{
  let renderArray = []
  for (let y = 0; y < 4; y++){
    let row = [];
    for (let x = 0; x < 4; x++) {
        row.push(
          <Cell key={`2048_Grid_ID_(${y},${x})`}>
            {gameBoard[y][x] !== 0 ? (
              <CellNumber
                fontSize={determineSize(gameBoard[y][x])}
                bg={determineGB(gameBoard[y][x])}
                color={gameBoard[y][x] < 5 ? TEXT_COLOR[0] : TEXT_COLOR[1]}
              >
                <CenterWrapper key={`2048_Grid_Wrapper_(${y},${x})`}>
                  {gameBoard[y][x]}
                </CenterWrapper>
              </CellNumber>
            ) : null}
          </Cell>
        );
        }
      renderArray.push(row);
    }
    return renderArray;
  }

export default ({ gameBoard }) => <Board>{gridGenerator(gameBoard)} </Board>;