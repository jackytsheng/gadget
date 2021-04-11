import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import theme from "./Theme";
import { Stage, Layer, Rect, Text, Circle, Line } from "react-konva";

const Wrapper = styled.div({
  width: `${theme.width.large}px`,
  minWidth: `${theme.width.large}px`,
  height: `${theme.height.large}px`,
  borderRadius: "10px",
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  margin: "0 20px",
  backgroundColor: theme.color.Ebony,
});

const Canvas = styled(Stage)({
  backgroundColor: theme.color.Artichoke,
});

const BaseRectProps = {
  shadowBlur: 3,
  stroke: theme.color.DarkEdge,
  strokeWidth: 2,
  cornerRadius: 10,
};

const BaseCircleProps = {
  ...BaseRectProps,
  radius: 10,
  fill: theme.color.AshGray,
};

const BaseLineProps = {
  stroke: theme.color.DarkEdge,
  strokeWidth: 2,
  shadowBlur: 3,
  lineCap: "round",
  lineJoin: "round",
};

const ModuleNameField = styled.input({
  height: "50px",
  textAlign: "center",
  fontSize: theme.font.large,
  backgroundColor: theme.color.Ebony,
  color: theme.color.AshGray,
  outline: "none",
  letterSpacing: "4px",
  border: "none",
  "::placeholder": {
    color: theme.color.Artichoke,
    opacity: 0.5,
  },
});
const InputSpace = (props) => <Rect {...props} />;
const OutputSpace = (props) => <Rect {...props} />;

const Row = styled.div({
  width: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

// TODO: not to clash with other components
// TODO: connect dot to
export default () => {
  const [canvasHeight, setCanvasHeight] = useState(400);
  const [inputY, setInputY] = useState();
  const [lines, setLines] = useState([]);
  const startPoint = useRef({});
  const registeringLine = useRef(false);

  const componentWidth = 100;
  const componentHeight = 100;
  const canvasWidth = theme.width.large;
  const InputWidth = 50;
  const OutputWidth = 50;

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

  const clickOnCanvas = ({ evt }) => {
    registeringLine.current = !registeringLine.current;
    console.log(evt);
    if (!registeringLine.current) {
      console.log("finish registering");
      registerLine(evt.layerX, evt.layerY);
    } else {
      console.log("registering for line");
      startPoint.current = { x: evt.layerX, y: evt.layerY };
    }
  };
  const registerLine = (x, y) => {
    const { x: startX, y: startY } = startPoint.current;
    const line = (
      <Line
        key={x + y}
        {...startPoint.current}
        {...BaseLineProps}
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
  useEffect(() => {
    console.log(lines);
  }, [lines]);
  const generateLine = ({ evt }) => {
    if (registeringLine.current) {
      console.log(evt);
    }
  };
  return (
    <Wrapper>
      <ModuleNameField placeholder="Enter Module Name" />
      <Row>
        <Canvas
          width={theme.width.large}
          height={canvasHeight}
          onMouseDown={clickOnCanvas}
        >
          <Layer>
            {[lines]}
            <Line
              x={100}
              y={100}
              {...BaseLineProps}
              points={[0, 0, 150, 30, 100, 100, 120, 120]}
            />
            <InputSpace
              x={0}
              y={0}
              width={InputWidth}
              height={canvasHeight}
              fill={theme.color.Ebony}
              onMouseMove={({ evt }) => {
                setInputY(evt.layerY);
              }}
            />
            <Circle {...BaseCircleProps} x={50} y={inputY} />
            <Rect
              {...BaseRectProps}
              x={70}
              draggable={true}
              dragBoundFunc={dragBoundFuc}
              y={110}
              fill={theme.color.AntiqueBrass}
              width={componentHeight}
              height={componentHeight}
            />
            <Rect
              {...BaseRectProps}
              x={300}
              draggable={true}
              y={100}
              fill={theme.color.AshGray}
              width={componentHeight}
              height={componentHeight}
            />
            <OutputSpace
              x={650}
              y={0}
              width={50}
              height={500}
              fill={theme.color.Ebony}
            />
          </Layer>
        </Canvas>
      </Row>
    </Wrapper>
  );
};
