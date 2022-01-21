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
        console.log(props.selectedColorPosition);
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
  '1',
  '1. 指定',
  '1. 喝酒',
  '2',
  '2. 喝酒',
  '3',
  '3. 喝酒',
  '4',
  '2. 指定',
  '4. 喝酒',
  '5',
  '5. 喝酒',
  '6',
  '6. 喝酒',
  '7',
  '3. 指定',
  '7. 喝酒',
  '8',
  '8. 喝酒',
  '9',
  '9. 喝酒',
  '10',
  '4. 指定',
  '10. 喝酒',
  '11',
  '11. 喝酒',
  '12',
  '12. 喝酒',
  '13',
  '13. 喝酒',
  '5. 指定',
  '14',
  '14. 喝酒',
  '15',
  '15. 喝酒',
  '16',
  '16. 喝酒',
  '6. 指定',
  '17',
  '17. 喝酒',
  '18',
  '18. 喝酒',
  '19.',
  '19. 喝酒',
];

const defaultColors = [colors.RED, colors.GREEN, colors.YELLOW];

const pickColor = (text) => {
  switch (text.split(' ')[1]) {
    case '指定':
      return defaultColors[1];
    case '喝酒':
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
