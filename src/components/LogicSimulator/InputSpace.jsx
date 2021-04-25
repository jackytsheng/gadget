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
  const [inputPlaceHolder, setInputPlaceholder] = useState();
  const [inputs, setInputs] = useState([]);
  const [inputsPosHistory, setInputPosHistory] = useState([]);
  const isRegisterable = useRef(true);

  const mouseOnInputSpace = ({ evt }) => {
    stageRef.current.container().style.cursor = "pointer";
    let occupied = false;
    inputsPosHistory.forEach((yPos) => {
      if (
        evt.layerY < yPos + theme.dimension.circleRaidus + 15 &&
        evt.layerY > yPos - theme.dimension.circleRaidus - 15
      ) {
        occupied = true;
      }
    });

    if (!occupied) {
      isRegisterable.current = true;
      setInputPlaceholder(
        <Circle
          {...BaseCircleProps}
          x={theme.dimension.inputWidth}
          y={evt.layerY}
          opacity={theme.opacity.placeholder}
        />
      );
    } else {
      isRegisterable.current = false;
      setInputPlaceholder();
      stageRef.current.container().style.cursor = "default";
    }
  };

  const mouseLeaveInputSpace = () => {
    setInputPlaceholder(undefined);
    stageRef.current.container().style.cursor = "default";
  };

  const registerInputs = ({ evt }) => {
    const newInput = (
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
        x={theme.dimension.inputWidth}
        y={evt.layerY}
      />
    );
    setInputPosHistory([...inputsPosHistory, evt.layerY]);
    setInputs([...inputs, newInput]);
  };

  return (
    <>
      <Rect
        x={0}
        y={0}
        width={theme.dimension.inputWidth}
        height={theme.height.large}
        fill={theme.color.Ebony}
        onMouseMove={mouseOnInputSpace}
        onMouseLeave={mouseLeaveInputSpace}
        onMouseDown={isRegisterable.current ? registerInputs : undefined}
      />
      {inputPlaceHolder}
      {inputs}
    </>
  );
};
