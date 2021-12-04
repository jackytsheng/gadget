import { IconButton } from '@material-ui/core';
import styled from 'styled-components';
import React from 'react';
import {
  ArrowDropUp,
  ArrowDropDown,
  ArrowRight,
  ArrowLeft,
  Cancel,
} from '@material-ui/icons';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 10px;
  width: 150px;
  height: auto;
`;

const Square = styled.i`
  width: 50px;
  height: 25px;
`;

export default ({ closeArrowPad, children }: any) => {
  return (
    <Wrapper>
      <Square />
      <IconButton color='primary'>
        <ArrowDropUp />
      </IconButton>
      <IconButton color='primary' onClick={closeArrowPad}>
        <Cancel />
      </IconButton>
      <IconButton color='primary'>
        <ArrowLeft />
      </IconButton>
      <IconButton color='primary'>
        <ArrowDropDown />
      </IconButton>
      <IconButton color='primary'>
        <ArrowRight />
      </IconButton>
      {children}
    </Wrapper>
  );
};
