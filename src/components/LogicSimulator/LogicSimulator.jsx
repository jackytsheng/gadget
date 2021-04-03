import React from 'react';
import styled from "styled-components";
import ModuleCanvas from './ModuleCanvas';
import ModulePool from './ModulePool';
import LogicTable from './LogicTable';
import theme from './Theme'
const Wrapper = styled.div`
  display: flex;
  height:100vh;
  width:100vw;
  justify-content:center;
  align-items: center;
  @media (max-width: 1000px) {
    flex-direction: column;
  }
`;
export default ()=>
<Wrapper>
  <ModulePool CanvasHeight={theme.height.large} />
  <ModuleCanvas CanvasHeight={theme.height.large} />
  <LogicTable CanvasHeight={theme.height.large} />
</Wrapper>
