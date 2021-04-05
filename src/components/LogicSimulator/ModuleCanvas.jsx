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
const InputSpace = styled(Rect)({});
const OutputSpace = styled(Rect)({});
const Row = styled.div({
  width: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});
export default () => {
  const [height, setHeight] = useState(400);
  return (
    <Wrapper>
      <ModuleNameField placeholder="Enter Module Name" />
      <Row>
        <Canvas
          width={theme.width.large}
          height={height}
          fill={theme.color.Artichoke}
        >
          <Layer>
            <InputSpace
              x={0}
              y={0}
              width={50}
              height={500}
              fill={theme.color.Ebony}
            />
            <Rect
              {...BaseRectProps}
              x={20}
              draggable
              y={50}
              fill={theme.color.AntiqueBrass}
              width={100}
              height={100}
            />
            <Rect
              {...BaseRectProps}
              x={300}
              draggable
              y={100}
              fill={theme.color.AshGray}
              width={100}
              height={100}
              zIndex={0}
            />
            <OutputSpace
              x={650}
              y={0}
              width={50}
              zIndex={0}
              height={500}
              fill={theme.color.Ebony}
            />
          </Layer>
        </Canvas>
      </Row>
    </Wrapper>
  );
};
