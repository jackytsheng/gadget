import React, { useState } from 'react';
import styled from 'styled-components';
import { Chip, IconButton, TextField } from '@mui/material';
import Cancel from '@mui/icons-material/Cancel';
import Send from '@mui/icons-material/Send';
import Roulette from './Roulette';
import { CirclePicker as Circle } from 'react-color';
import colors from './colors';

const Wrapper = styled.div`
  background-color: ${colors.BACK_GROUND};
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  overflow-y: auto;
  overflow-x: hidden;

  h2 {
    color: ${colors.BROWN};
    font-family: 'Pushster', cursive;
  }

  h1,
  h3,
  h4,
  h5,
  h6,
  p {
    color: ${colors.TEXT};
  }

  .MuiButton-outlinedPrimary,
  .MuiIconButton-colorPrimary {
    color: ${colors.BROWN};
    border-color: ${colors.BROWN + '80'};

    :hover {
      border-color: ${colors.BROWN};

      background-color: ${colors.BROWN + '0a'};
    }
  }
  .MuiButton-outlinedError {
    color: ${colors.BRIGHT_RED};
    border-color: ${colors.BRIGHT_RED + '80'};

    :hover {
      border-color: ${colors.BRIGHT_RED};
      background-color: ${colors.BRIGHT_RED + '0a'};
    }
  }
`;

const LabelLists = styled.div`
  div {
    margin: 2px;
  }
`;
const CirclePicker = styled(Circle)`
  span:nth-child(${(props) => {
        return props.selectedColorPosition;
      }})
    div
    span
    div {
    box-sizing: border-box;
    border: 3px ${colors.BROWN} solid;
  }
`;

const GameSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const InputGroup = styled.div`
  margin: 20px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;
const rouletteData = [
  '1. Prize',
  '1',
  '1. Punish',
  '2',
  '2. Punish',
  '3',
  '3. Punish',
  '4',
  '2. Prize',
  '4. Punish',
  '5',
  '5. Punish',
  '6',
  '6. Punish',
  '7',
  '3. Prize',
  '7. Punish',
  '8',
  '8. Punish',
  '9',
  '9. Punish',
  '10',
];

const defaultColors = [colors.RED, colors.GREEN, colors.YELLOW];

const pickColor = (text) => {
  switch (text.split(' ')[1]) {
    case 'Prize':
      return defaultColors[1];
    case 'Punish':
      return defaultColors[0];
    default:
      return defaultColors[2];
  }
};

const generateOption = (option, backgroundColor) => ({
  option,
  style: {
    backgroundColor,
  },
});

export default () => {
  const [data, setData] = useState(
    rouletteData.map((o) => generateOption(o, pickColor(o)))
  );
  const [labelValue, setLabelValue] = useState('');
  const [pickedColor, setPickedColor] = useState(colors.GREEN);

  const deleteLabel = (index) => {
    setData(data.filter((_, i) => i !== index));
  };

  const confirmLabelValue = () => {
    if (labelValue.trim()) {
      setData([...data, generateOption(labelValue.trim(), pickedColor)]);
      setLabelValue('');
      setPickedColor(defaultColors[1]);
    }
  };

  return (
    <Wrapper>
      <GameSection>
        <Roulette rouletteData={data} setRouletteData={setData} />
      </GameSection>

      <InputGroup>
        <CirclePicker
          selectedColorPosition={defaultColors.indexOf(pickedColor) + 1}
          width='150px'
          colors={defaultColors}
          defaultColors={pickedColor}
          onChange={(e) => setPickedColor(e.hex.toUpperCase())}
        />
        <TextField
          label='Enter Label'
          id='outlined-size-small'
          variant='outlined'
          color='primary'
          size='small'
          sx={{
            '& .Mui-focused': {
              color: colors.BROWN + ' !important',
              borderColor: colors.BROWN + ' !important',
            },
            '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: colors.BROWN + ' !important',
            },
          }}
          value={labelValue}
          onChange={(e) => setLabelValue(e.target.value)}
        />

        <IconButton
          color='primary'
          aria-label='confirm label'
          onClick={confirmLabelValue}
          component='span'
        >
          <Send />
        </IconButton>
      </InputGroup>
      <LabelLists>
        {data.map((obj, index) => (
          <Chip
            sx={{
              backgroundColor: obj.style.backgroundColor,
              color: colors.BROWN,
              fontWeight: 600,
            }}
            label='small'
            key={`${index}+${obj.option}`}
            label={`${obj.option}`}
            deleteIcon={<Cancel />}
            variant='outlined'
            onDelete={() => deleteLabel(index)}
          />
        ))}
      </LabelLists>
    </Wrapper>
  );
};
