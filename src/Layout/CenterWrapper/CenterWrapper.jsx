import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  width:100%;
  height:100%;
  display:flex;
  justify-content:center;
  align-items:center;
  position:relative;
`

export default ({children})=><Wrapper>{children}</Wrapper>