import React from "react";
import { Route, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const Wrapper = styled.div`
  height:300px;
  border: solid black 1px;
  width:300px;
`

export default () => {
  let url = useLocation();
  console.log(url.pathname);
  return (
    <Route path={url}>
      <Wrapper>
      </Wrapper>
    </Route>
  );
};