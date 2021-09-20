import React, { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import FlagTwoTone from '@material-ui/icons/FlagTwoTone';
import useSnakeHook from '../hooks/useSnakeHook';
import CenterWrapper from '../../../Layout/CenterWrapper';

const Wrapper = styled.div`
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  position: relative;
`;

const Record = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: space-around;
  margin-top: 30px;
`;
const Canvas = styled.canvas`
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  background-color: #616161cc;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
`;

const POP_BG_COLOR = '#d0d4ed8c';
const BORDER_COLOR = '#353e69';

const BUTTON_BG_COLOR = '#dbdce273';
const BUTTON_HOVER_BG_COLOR = '#353e69';
const PopUpWrapper = styled(CenterWrapper)`
  flex-direction: column;
`;
const LosePop = styled.div`
  position: absolute;
  z-index: 30;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: ${POP_BG_COLOR};
`;
const LostText = styled.div`
  font-size: 25px;
  font-weight: 500;
  margin-bottom: 10px;
  color: ${BORDER_COLOR};
  letter-spacing: 0.3px;
`;
const RestartBtn = styled(Button)`
  margin-top: 15px !important;
  width: 120px;
  letter-spacing: 0.5px !important;
  font-weight: 600 !important;
  height: 40px;
  background-color: ${BUTTON_BG_COLOR} !important;
  font-size: 20px !important;
  color: ${BORDER_COLOR} !important;
  border-radius: 5px;
  border: 2px solid ${BORDER_COLOR} !important;
  cursor: pointer;
  &:hover {
    color: ${POP_BG_COLOR} !important;
    background-color: ${BUTTON_HOVER_BG_COLOR} !important;
  }
`;

export default () => {
  const canvasRef = useRef(null);
  const [lose, useLose] = useState(false);
  const [record, useRecord] = useState({ score: 0, level: 1 });
  const [best, useBestRecord] = useState(
    localStorage.getItem('Snake-Best')
      ? JSON.parse(localStorage.getItem('Snake-Best'))
      : { score: 0, level: 1 }
  );
  const [clickRestart, useClickRestart] = useState(false);
  // Size of the canvas
  const CANVAS_WIDTH = 300;
  const CANVAS_HEIGHT = 300;

  // Size of one Unit
  const SCALE = 10;

  const { useCtx, resetGame } = useSnakeHook(
    CANVAS_WIDTH,
    CANVAS_HEIGHT,
    SCALE,
    useLose,
    useRecord,
    useBestRecord,
    best
  );

  // on Mount
  useEffect(() => {
    const canvas = canvasRef.current;
    // pass the context
    useCtx(canvas.getContext('2d'));
    // Initialise speed
  }, []);

  useEffect(() => {
    // Only execute the following when clickRestart is true
    if (clickRestart === false) return;
    console.log('Restart is click');
    // Reset Lose state
    useLose(false);

    // Reset Restart
    useClickRestart(false);

    // Reset record
    useRecord({ score: 0, level: 1 });

    resetGame();
  }, [clickRestart]);
  return (
    <>
      <Wrapper width={CANVAS_WIDTH} height={CANVAS_HEIGHT}>
        <Canvas ref={canvasRef} width={CANVAS_WIDTH} height={CANVAS_HEIGHT} />
        {lose && (
          <LosePop>
            <PopUpWrapper>
              <LostText>Your lost !</LostText>
              <LostText>Level : {record.level}</LostText>
              <LostText>Score : {record.score}</LostText>
              <RestartBtn
                variant='outlined'
                onClick={() => useClickRestart(true)}
              >
                Restart
              </RestartBtn>
            </PopUpWrapper>
          </LosePop>
        )}
      </Wrapper>
      <Record>
        <Chip icon={<FlagTwoTone />} variant='outlined' label={record.score} />
        <Chip
          avatar={<Avatar>Lv</Avatar>}
          variant='outlined'
          label={record.level}
        />
        <Chip
          color='primary'
          icon={<FlagTwoTone />}
          variant='outlined'
          label={best.score}
        />
        <Chip
          color='primary'
          avatar={<Avatar>Lv</Avatar>}
          variant='outlined'
          label={best.level}
        />
      </Record>
    </>
  );
};