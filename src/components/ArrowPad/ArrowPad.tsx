import { Button } from '@material-ui/core';
import styled from 'styled-components';
import React, { useState } from 'react';
import Arrow from './Arrow';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`;
export default ({ setDirection, size }: any) => {
  const [arrowPadOn, setArrowPadOn] = useState(false);
  return (
    <Wrapper>
      {arrowPadOn ? (
        <Arrow
          setDirection={setDirection}
          closeArrowPad={() => setArrowPadOn(false)}
        />
      ) : (
        <Button
          size={size}
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
