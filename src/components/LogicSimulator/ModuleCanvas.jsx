import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import theme from "./Theme";
import { Stage, Layer, Rect, Text, Circle, Line } from "react-konva";

const MIDDLE_ROW_HEIGHT = `${theme.height.large.replace("px", "") - 100}px`;
const Wrapper = styled.div({
  width: "700px",
  minWidth: "700px",
  borderRadius: "10px",
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  height: theme.height.large,
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
const SignalInput = styled.div({
  height: MIDDLE_ROW_HEIGHT,
  flex: 1,
});
const SignalOutput = styled.div({
  height: MIDDLE_ROW_HEIGHT,
  flex: 1,
});
const Row = styled.div({
  width: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: MIDDLE_ROW_HEIGHT,
});
export default () => (
  <Wrapper>
    <ModuleNameField placeholder="Enter Module Name" />
    <Row>
      <SignalInput />
      <Canvas width={600} height={400} fill={theme.color.Artichoke}>
        <Layer>
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
          />
        </Layer>
      </Canvas>
      <SignalOutput />
    </Row>
  </Wrapper>
);
