import React from "react";
import styled from "styled-components";
import CenterWrapper from '../../../Layout/CenterWrapper';
import ChessLayout from './components/ChessLayout';

const CHESS_BORDER = "#f5e379";
const CHESS_BORDER_BLACK = "#272016";
const SELECT_BORDER_BG_P1 = "#15cd3185";
const SELECT_BORDER_BG_P2 = "#1590cd85";
const CHESS_SIZE = 80;
const ChessWrapper = styled.div`
  &:hover {
    cursor: ${(props) => (props.disable ? "auto" : "pointer")};
    ${(props) =>
      props.disable
        ? ""
        : "box-shadow: 0 3px 15px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22)"};
  }
  width: ${CHESS_SIZE - 20}px;
  height: ${CHESS_SIZE - 20}px;
  border-radius: 10px;
  background: ${(props) =>
    props.selected
      ? props.player === 1
        ? SELECT_BORDER_BG_P1
        : SELECT_BORDER_BG_P2
      : CHESS_BORDER};
  box-shadow: 5px 1px 10px 3px rgba(0, 0, 0, 0.12),
    0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  padding: 10px;
`;
const InnerWrapper = styled.div`
  transform: ${(props) => (props.rotated ? "rotateZ(180deg)" : null)};
  border: 2px solid ${CHESS_BORDER_BLACK};
  width: ${CHESS_SIZE - 24}px;
  height: ${CHESS_SIZE - 24}px;
  border-radius: 5px;
  position: relative;
  overflow: hidden;
`;

const Chess = ({ chessType, rotated, onClick, selected, player, disable }) => (
  <ChessWrapper onClick={onClick} selected={selected} player={player} disable={disable}>
    <CenterWrapper>
      <InnerWrapper rotated={rotated}>
        <ChessLayout chessType={chessType} />
      </InnerWrapper>
    </CenterWrapper>
  </ChessWrapper>
);

export default (props) => (
  <CenterWrapper>
    <Chess {...props} />
  </CenterWrapper>
);
