import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { theme, BasicShapeProps, BaseLineProps } from './Theme';
import { Stage, Layer, Rect, Line } from 'react-konva';
import InputSpace from './InputSpace';
import OutputSpace from './OutputSpace';

const Wrapper = styled.div({
  width: `${theme.width.large}px`,
  minWidth: `${theme.width.large}px`,
  height: `${theme.height.large}px`,
  borderRadius: '10px',
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  margin: '0 20px',
  backgroundColor: theme.color.Ebony,
});

const Canvas = styled(Stage)({
  backgroundColor: theme.color.Artichoke,
});

const BaseRectProps = { ...BasicShapeProps };

const ModuleNameField = styled.input({
  height: '50px',
  textAlign: 'center',
  fontSize: theme.font.large,
  backgroundColor: theme.color.Ebony,
  color: theme.color.AshGray,
  outline: 'none',
  letterSpacing: '4px',
  border: 'none',
  '::placeholder': {
    color: theme.color.Artichoke,
    opacity: 0.5,
  },
});

const Row = styled.div({
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

// TODO: not to clash with other components
// TODO: connect dot to
export default () => {
  const [canvasHeight] = useState(400);

  const [lines, setLines] = useState([]);
  const [connectingLine, setConnectingLine] = useState();
  const stageRef = useRef();
  const startPoint = useRef({});
  const currentPos = useRef({});
  const registeringLine = useRef(false);
  const componentWidth = 100;
  const componentHeight = 100;
  const canvasWidth = theme.width.large;
  const InputWidth = theme.dimension.inputWidth;
  const OutputWidth = theme.dimension.outputWidth;

  const dragBoundFuc = ({ x, y }) => {
    let newY;
    let newX;
    if (y < 0) {
      newY = 5;
    } else if (y > canvasHeight - componentHeight) {
      newY = canvasHeight - componentHeight - 5;
    } else {
      newY = y;
    }
    if (x < InputWidth) {
      newX = 5 + InputWidth;
    } else if (x > canvasWidth - OutputWidth - componentWidth) {
      newX = canvasWidth - OutputWidth - componentHeight - 5;
    } else {
      newX = x;
    }
    return {
      x: newX,
      y: newY,
    };
  };

  const clickOnCircle = ({ evt }) => {
    registeringLine.current = !registeringLine.current;
    if (!registeringLine.current) {
      console.log('finish registering');
      registerLine(evt.layerX, evt.layerY);
      setConnectingLine();
    } else if (registeringLine) {
      console.log('registering for line');
      startPoint.current = { x: evt.layerX, y: evt.layerY };
      console.log(stageRef.current);
    }
  };

  const registerCurrentPos = ({ evt }) => {
    if (evt && registeringLine.current) {
      currentPos.current = { x: evt.layerX, y: evt.layerY };
      const { x: currentX, y: currentY } = currentPos.current;
      const { x: startX, y: startY } = startPoint.current;
      setConnectingLine(
        <Line
          {...BaseLineProps}
          opacity={theme.opacity.placeholder}
          x={startX}
          y={startY}
          points={[
            0,
            0,
            (currentX - startX) / 2,
            0,
            (currentX - startX) / 2,
            currentY - startY,
            currentX - startX,
            currentY - startY,
          ]}
        />
      );
    }
  };

  const registerLine = (x, y) => {
    const { x: startX, y: startY } = startPoint.current;
    const line = (
      <Line
        key={x + y}
        {...startPoint.current}
        {...BaseLineProps}
        onMouseEnter={() => {
          stageRef.current.container().style.cursor = 'pointer';
        }}
        onMouseLeave={() => {
          stageRef.current.container().style.cursor = 'default';
        }}
        onMouseDown={() => {
          let newLines = lines.filter((line) => line.key !== x + y);
          setLines(newLines);
          stageRef.current.container().style.cursor = 'default';
        }}
        points={[
          0,
          0,
          (x - startX) / 2,
          0,
          (x - startX) / 2,
          y - startY,
          x - startX,
          y - startY,
        ]}
      />
    );
    console.log(x, y);
    const newLines = [...lines, line];
    setLines(newLines);
  };
  return (
    <Wrapper>
      <ModuleNameField placeholder='Enter Module Name' />
      <Row>
        <Canvas
          width={theme.width.large}
          height={canvasHeight}
          ref={stageRef}
          onMouseMove={registerCurrentPos}
        >
          <Layer>
            {connectingLine}
            {lines}
            <InputSpace stageRef={stageRef} onClick={clickOnCircle} />
            <Rect
              {...BaseRectProps}
              x={70}
              dragBoundFunc={dragBoundFuc}
              y={110}
              fill={theme.color.AntiqueBrass}
              width={componentHeight}
              height={componentHeight}
            />
            <Rect
              {...BaseRectProps}
              x={300}
              y={100}
              fill={theme.color.AshGray}
              width={componentHeight}
              height={componentHeight}
            />
            <OutputSpace stageRef={stageRef} onClick={clickOnCircle} />
          </Layer>
        </Canvas>
      </Row>
    </Wrapper>
  );
};
