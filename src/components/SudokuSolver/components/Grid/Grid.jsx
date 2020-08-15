import React from "react";
import styled from "styled-components";
import CenterWrapper from '../../../../Layout/CenterWrapper';
import FillCanvas from '../../../../Layout/FillCanvas';

const Input = styled.input`
  width: 80%;
  height: 80%;
  border-radius: 2px;
  border: 2px solid #b2b1c0;
  font-weight: 700;
  color: ${(props) => props.answerColor};
  text-align: center;
  font-size: 25px;
  @media (max-width: 500px) {
    font-size: 20px;
    font-weight: 400;
    outline:none;
    border: 1px solid #b2b1c0;
  }
  background-color: ${(props) => props.bg};
`;
const greyTile = "#dedde5";
Input.defaultProps = {
  bg: "white",
  borderColor: "black",
  answerColor: "black",
};

const answerColor = "#47b5c8";
const Wrapper = styled.div`
  display: grid;
  width:100%;
  height:100%;
  grid-template-columns: repeat(9, 1fr);
  grid-template-rows: repeat(9, 1fr);
`;



export default ({ handleChange, grid, resultGrid }) => {
const gridGenerator = () =>{
  let renderArray = []
  for (let y = 0; y < 9; y++){
    let row = [];
    for (let x = 0; x < 9; x++) {
      let value ;
      let ans = false; 
      if(resultGrid.length !== 0){
        value = resultGrid[y][x];
        ans = resultGrid[y][x] !== grid[y][x];
      }else{
        value = grid[y][x] ? grid[y][x]:"";
      }
        row.push(
          <CenterWrapper key={`Grid_Wrapper_(${y},${x})`}>
            <Input
              onFocus={(e) => e.currentTarget.select()}
              onChange={(e) => {
                handleChange(e, y, x);
              }}
              answerColor={ans ? answerColor:null}
              bg={
                (Math.floor(x / 3) % 2 === 0 && Math.floor(y / 3) % 2 === 0) ||
                (Math.floor(x / 3) % 2 === 1 && Math.floor(y / 3) % 2 === 1)
                  ? null
                  : greyTile
              }
              key={`Grid_ID_(${y},${x})`}
              required
              type="text"
              maxLength="1"
              value={value}
            />
          </CenterWrapper>
        );
        }
      renderArray.push(row);
    }
    return renderArray;

}
  return (
  <CenterWrapper>
    <FillCanvas>
      <Wrapper>{gridGenerator()}</Wrapper>
    </FillCanvas>
  </CenterWrapper>);
}

