import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import { theme, BasicShapeProps } from "./Theme";
import { Rect, Text, Circle } from "react-konva";

const BaseCircleProps = {
  ...BasicShapeProps,
  radius: theme.dimension.circleRaidus,
  fill: theme.color.AshGray,
};

export default ({ stageRef, onClick }) => {
  const [outputPlaceHolder, setOutputPlaceholder] = useState();
  const [outputs, setOutputs] = useState([]);
  const [outputsPosHistory, setOutputPosHistory] = useState([]);
  const isRegisterable = useRef(true);

  const mouseOnOutputSpace = ({ evt }) => {
    stageRef.current.container().style.cursor = "pointer";
    let occupied = false;
    outputsPosHistory.forEach((yPos) => {
      if (
        evt.layerY < yPos + theme.dimension.circleRaidus + 15 &&
        evt.layerY > yPos - theme.dimension.circleRaidus - 15
      ) {
        occupied = true;
      }
    });

    if (!occupied) {
      isRegisterable.current = true;
      setOutputPlaceholder(
        <Circle
          {...BaseCircleProps}
          x={theme.dimension.canvasWidth + theme.dimension.inputWidth}
          y={evt.layerY}
          opacity={theme.opacity.placeholder}
        />
      );
    } else {
      isRegisterable.current = false;
      setOutputPlaceholder();
      stageRef.current.container().style.cursor = "default";
    }
  };

  const mouseLeaveOutputSpace = () => {
    setOutputPlaceholder(undefined);
    stageRef.current.container().style.cursor = "default";
  };

  const registerOutputs = ({ evt }) => {
    const newOutput = (
      <Circle
        onMouseEnter={() =>
          (stageRef.current.container().style.cursor = "pointer")
        }
        onMouseLeave={() =>
          (stageRef.current.container().style.cursor = "default")
        }
        onMouseDown={onClick}
        key={evt.layerY}
        {...BaseCircleProps}
        x={theme.dimension.canvasWidth + theme.dimension.inputWidth}
        y={evt.layerY}
      />
    );
    setOutputPosHistory([...outputsPosHistory, evt.layerY]);
    setOutputs([...outputs, newOutput]);
  };

  return (
    <>
      <Rect
        x={theme.dimension.canvasWidth + theme.dimension.inputWidth}
        y={0}
        width={theme.dimension.outputWidth}
        height={theme.height.large}
        fill={theme.color.Ebony}
        onMouseMove={mouseOnOutputSpace}
        onMouseLeave={mouseLeaveOutputSpace}
        onMouseDown={isRegisterable.current ? registerOutputs : undefined}
      />
      {outputPlaceHolder}
      {outputs}
    </>
  );
};
