import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  position:fixed;
  min-height:100vh;
  top:0;
  bottom:0;
  left:0;
  right:0;
`

export default ({children})=><Wrapper>{children}</Wrapper>