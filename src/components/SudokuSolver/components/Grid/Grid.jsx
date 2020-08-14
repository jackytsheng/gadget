import React from "react";
import styled from "styled-components";
import CenterWrapper from '../../../../Layout/CenterWrapper';
import FillCanvas from '../../../../Layout/FillCanvas';

const Input = styled.input`
  width: 80%;
  height: 80%;
  border-radius:2px;
  border: 2px solid ${props => props.borderColor};
  font-weight: 700;
  text-align: center;
  font-size: 20px;
  background-color: ${props => props.bg};
`
const errorColor = "#db6f93";
const greyTile = "#dedde5";
Input.defaultProps = {
  bg: "white",
  borderColor: "black",
};

const Wrapper = styled.div`
  display: grid;
  width:100%;
  height:100%;
  grid-template-columns: repeat(9, 1fr);
  grid-template-rows: repeat(9, 1fr);
`;



export default ({ handleChange, errorQueue }) => {
const validError = (errorQueue,y,x) => {
  let result = false;
  errorQueue.forEach((cor) => {
    if (cor.y === y && cor.x === x) {
      result = true;
    }
  });
  return result;
}
const gridGenerator = () =>{
  let renderArray = []
  for (let y = 0; y < 9; y++){
    let row = [];
    for (let x = 0; x < 9; x++) {
        row.push(
          <CenterWrapper key={`Grid_Wrapper_(${y},${x})`}>
            <Input
              onFocus={(e) => e.currentTarget.select()}
              onChange={(e) => {
                handleChange(e, y, x);
              }}
              borderColor={validError(errorQueue, y, x) ? errorColor : null}
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
