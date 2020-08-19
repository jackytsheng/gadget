import React from "react";
import styled from 'styled-components';
import CenterWrapper from '../../../../Layout/CenterWrapper';

const EMPTY_CELL ='#ccc0b4';
const BG_COLOR = "#bbada0";

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
`;


const gridGenerator = () =>{
  let renderArray = []
  for (let y = 0; y < 4; y++){
    let row = [];
    for (let x = 0; x < 4; x++) {
        row.push(
          <Cell
              key={`2048_Grid_ID_(${y},${x})`}
            >
               <CenterWrapper key={`2048_Grid_Wrapper_(${y},${x})`}>
          </CenterWrapper>
          </Cell>
        );
        }
      renderArray.push(row);
    }
    return renderArray;
  }

export default () => <Board>{gridGenerator()} </Board> ;