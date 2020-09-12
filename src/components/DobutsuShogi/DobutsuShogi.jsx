import React from 'react';
import CenterWrapper from '../../Layout/CenterWrapper';
import GameBoard from './GameBoard';
import styled from "styled-components";
const Wrapper = styled(CenterWrapper)`
  display: flex;
  @media (max-width: 1000px) {
    flex-direction: column;
  }
`;
export default ()=>
<Wrapper>
  <GameBoard/>
</Wrapper>
