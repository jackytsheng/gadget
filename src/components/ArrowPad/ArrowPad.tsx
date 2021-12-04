import { Button } from '@material-ui/core';
import styled from 'styled-components';
import React, { useState } from 'react';
import Arrow from './Arrow';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
`;
export default ({ setDirection }: any) => {
  const [arrowPadOn, setArrowPadOn] = useState(true);
  return (
    <Wrapper>
      {arrowPadOn ? (
        <Arrow
          setDirection={setDirection}
          closeArrowPad={() => setArrowPadOn(false)}
        />
      ) : (
        <Button
          variant='outlined'
          color='primary'
          onClick={() => setArrowPadOn(true)}
        >
          Arrow Pad
        </Button>
      )}
    </Wrapper>
  );
};
