import React from 'react';
import styled from "styled-components";
const Wrapper = styled.div(({CanvasHeight})=>({
  border: '2px solid black',
  width: '200px',
  borderRadius: '10px',
  height:CanvasHeight,
}));

export default ({CanvasHeight})=>
<Wrapper CanvasHeight={CanvasHeight}>
</Wrapper>
