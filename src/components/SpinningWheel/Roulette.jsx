import React, { useState } from 'react';
import { Wheel } from 'react-custom-roulette';
import { Button } from '@mui/material';
import styled from 'styled-components';
import Shuffle from '@mui/icons-material/Shuffle';
import AutoRenew from '@mui/icons-material/Autorenew';
import Delete from '@mui/icons-material/Delete';
import colors from './colors';

const WheelWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ButtonGroup = styled.div`
  width: 100%;
  margin: 20px;
  display: flex;
  justify-content: space-evenly;
`;

// Function to shuffle array
const shuffle = (orgArr) => {
  let arr = orgArr.slice();
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

export default ({ rouletteData, setRouletteData }) => {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);

  const handleSpinClick = () => {
    const newPrizeNumber = Math.floor(Math.random() * rouletteData.length);
    setPrizeNumber(newPrizeNumber);
    setMustSpin(true);
  };

  const data = [
    { option: '0', style: { backgroundColor: 'green', textColor: 'black' } },
    { option: '1', style: { backgroundColor: 'white' } },
    { option: '2' },
  ];

  return (
    <WheelWrapper>
      <ButtonGroup>
        <Button
          variant='outlined'
          onClick={handleSpinClick}
          startIcon={<AutoRenew />}
          sx={{
            '& .MuiButtonBase-root-MuiButton-root': {
              color: 'black',
            },
          }}
        >
          Spin
        </Button>
        <Button
          variant='outlined'
          onClick={() => setRouletteData(shuffle(rouletteData))}
          endIcon={<Shuffle />}
        >
          Shuffle
        </Button>
        <Button
          color='error'
          variant='outlined'
          onClick={() =>
            setRouletteData([
              { option: 'Option 1', style: {} },
              { option: 'Option 2', style: {} },
              { option: 'Option 3', style: {} },
              { option: 'Option 4', style: {} },
            ])
          }
          endIcon={<Delete />}
        >
          Clear
        </Button>
      </ButtonGroup>
      <Wheel
        mustStartSpinning={mustSpin}
        prizeNumber={prizeNumber}
        onStopSpinning={() => setMustSpin(false)}
        data={rouletteData}
        textColors={[colors.BROWN]}
        backgroundColors={[colors.RED, colors.YELLOW]}
        outerBorderColor={colors.DARK}
        radiusLineColor={colors.DARK}
        outerBorderWidth='15'
        innerBorderWidth='20'
        innerBorderColor={colors.DARK}
        radiusLineWidth='1'
        textDistance='70'
        fontSize='16'
      />
    </WheelWrapper>
  );
};
