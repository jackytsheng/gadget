import React, { useRef, useEffect, useState } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import AssignmentIcon from '@material-ui/icons/Assignment';
import AssistantPhoto from '@material-ui/icons/AssistantPhoto';
import LinearScale from '@material-ui/icons/LinearScale';
import useSnakeHook from '../hooks/useSnakeHook';
import { useWindowSize } from '../../../hooks/useWindowSize';
import Information from './Information';
import CenterWrapper from '../../../Layout/CenterWrapper';
import ArrowPad from '../../ArrowPad';

const Wrapper = styled.div`
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  position: relative;
`;

const Record = styled.div`
  position: relative;
  width: 160px;
  display: flex;
  flex-direction: column;

  @media (max-width: 850px) {
    position: fixed;
    top: 10%;
    right: 15%;
  }
  @media (max-width: 500px) {
    position: fixed;
    top: 10px;
    right: 15%;
  }
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

const useStyles = makeStyles((theme) =>
  createStyles({
    avatar: {
      border: '1px solid #3f51b5',
      backgroundColor: 'transparent',
    },
    chip: {
      width: '150px',
      justifyContent: 'flex-start',
      paddingLeft: '10px',
      margin: '10px 0 10px 10px',
      '@media (max-width:850px)': {
        paddingLeft: 0,
        margin: '5px 0 5px 5px',
      },
      '@media (max-width:500px)': {
        paddingLeft: 0,
        margin: '1px 0 1px 1px',
      },
    },
  })
);

export default () => {
  const classes = useStyles();
  const canvasRef = useRef(null);
  const [lose, useLose] = useState(false);
  const [record, useRecord] = useState({ score: 0, level: 1, length: 1 });
  const [clickRestart, useClickRestart] = useState(false);
  const size = useWindowSize();
  const isMobileSize = size.width < 500;
  // Size of the canvas
  const CANVAS_WIDTH = 300;
  const CANVAS_HEIGHT = 300;

  // Size of one Unit
  const SCALE = 10;

  const { useCtx, resetGame, changeDirection } = useSnakeHook(
    CANVAS_WIDTH,
    CANVAS_HEIGHT,
    SCALE,
    useLose,
    useRecord
  );
  const setTouchPadDirection = (dir) => {
    changeDirection(dir);
  };

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
    useRecord({ score: 0, level: 1, length: 1 });

    resetGame();
  }, [clickRestart]);
  return (
    <>
      <Wrapper width={CANVAS_WIDTH} height={CANVAS_HEIGHT}>
        <Canvas ref={canvasRef} width={CANVAS_WIDTH} height={CANVAS_HEIGHT} />
        {lose && (
          <LosePop>
            <PopUpWrapper>
              <LostText>You lost !</LostText>
              <LostText>Score : {record.score}</LostText>
              <LostText>Snake Length : {record.length}</LostText>
              <LostText>Level : {record.level}</LostText>
              <RestartBtn
                variant='outlined'
                onClick={() => useClickRestart(true)}
              >
                Restart
              </RestartBtn>
            </PopUpWrapper>
          </LosePop>
        )}
        <Information />
        {isMobileSize && <ArrowPad setDirection={setTouchPadDirection} />}
      </Wrapper>
      <Record>
        <Chip
          className={classes.chip}
          icon={<AssignmentIcon />}
          label={'Score: ' + record.score}
          variant='outlined'
        />
        <Chip
          className={classes.chip}
          icon={<LinearScale />}
          label={'Length: ' + record.length}
          variant='outlined'
        />
        <Chip
          className={classes.chip}
          icon={<AssistantPhoto />}
          label={'Level: ' + record.level}
          variant='outlined'
        />
      </Record>
    </>
  );
};
