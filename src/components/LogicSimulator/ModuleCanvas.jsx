import React from 'react';
import styled from "styled-components";
const Wrapper = styled.div(({CanvasHeight})=>({
  border: '2px solid black',
  width: '700px',
  borderRadius: '10px',
  height:CanvasHeight,
  margin:'0 20px',
}));
export default ({CanvasHeight})=>
<Wrapper CanvasHeight={CanvasHeight}>
</Wrapper>