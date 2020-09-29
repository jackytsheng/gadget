
import React from "react";
import styled from "styled-components";


export const GridBase = styled.div`
  width: 490px;
  height: 490px;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: repeat(7, 1fr);
  @media (max-width: 650px) {
    width: 385px;
    height: 385px;
  }
`;

export const Slot = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.bgColor};
  box-sizing: border-box;
  position:relative;
`;

const PLAYER_ONE_HOVER_COLOR = "#a4b894e0";
const PLAYER_TWO_HOVER_COLOR = "#95a5ddbf";

const PLAYER_ONE_CONFIRM_COLOR = "#bae26a";
const PLAYER_TWO_CONFIRM_COLOR = "#a86ae2";


export const hoverGrid = [
   ["x", "x", "x", "x", "x", "x", "x"],
   ["x", "x", "x", "x", "x", "x", "x"],
   ["x", "x", "x", "x", "x", "x", "x"],
   ["x", "x", "x", "x", "x", "x", "x"],
   ["x", "x", "x", "x", "x", "x", "x"],
   ["x", "x", "x", "x", "x", "x", "x"],
   ["x", "x", "x", "x", "x", "x", "x"],
 ];


const HoverLayout = styled(GridBase)`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`;


const HoverSlot = styled(Slot)`
  background-color:${(props) =>
    props.player === 1 ? PLAYER_ONE_HOVER_COLOR : PLAYER_TWO_HOVER_COLOR}}
  &:hover {
    background-color: ${(props) =>
      props.player === 1 ? PLAYER_ONE_CONFIRM_COLOR : PLAYER_TWO_CONFIRM_COLOR};
    cursor: pointer;
  }
`;
const HoverSlotFiller = styled.div`
  width: 100%;
  height: 100%;
`;


const generateHoverGrid = (grid, onClick, player) => {
  return grid.map((GridRow, row) =>
    GridRow.map((slot, column) => {
      if (slot === "o") {
        return (
          <HoverSlot
            key={"Hover" + row + column}
            onClick={() => onClick(column, row, player)}
            player={player}
            bgColor={
              player === 1 ? PLAYER_ONE_HOVER_COLOR : PLAYER_TWO_HOVER_COLOR
            }
          />
        );
      } else {
        return <HoverSlotFiller key={"Hover" + row + column} />;
      }
    })
  );
};



const HoverCanvas = ({ onClick, player, hoverGrid }) => {
  return (
    <HoverLayout>{generateHoverGrid(hoverGrid, onClick, player)}</HoverLayout>
  );
};

export default HoverCanvas;