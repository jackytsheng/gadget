import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import { checkWin, deepCopy, isGameEnd, makeMove } from './util';
import Button from '@material-ui/core/Button';
import darkPawn from './assets/dark-pawn.svg';
import lightPawn from './assets/light-pawn.svg';
import darkBishop from './assets/dark-bishop.svg';
import lightBishop from './assets/light-bishop.svg';
import darkKnight from './assets/dark-knight.svg';
import lightKnight from './assets/light-knight.svg';
const sizeSm = 60;
const sizeXsm = 10;
const sizeXSMMobile = 5;
const size = 110;
const padding = 70;
const paddingSm = 20;
const radius = 30;
const darkColor = '#595f74';
const cogColor = '#DFE0DF';
const hightLightColor = '#cbecf5';
const slotBgColor = '#e9d8d0';
const Wrapper = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const BaseBoardStyle = styled.div`
  width: ${sizeSm * 3 + padding}px;
  height: ${sizeSm * 3 + padding}px;
  display: flex;
  justify-content: center;
  align-content: center;
  flex-direction: column;
  text-align: center;
  border-radius: ${radius}px;
  background-color: rgba(255, 255, 255, 0.4);

  &:before {
    content: '';
    position: absolute;
    z-index: -1;
    top: -15px;
    left: -15px;
    right: -15px;
    bottom: -15px;
    border-radius: 45px;
    border: 15px solid rgba(0, 0, 0, 0.05);
  }

  @media (min-width: 450px) {
    width: ${size * 3 + padding}px;
    height: ${size * 3 + padding}px;
  }
`;

const Board = styled(BaseBoardStyle)`
  position: relative;
  margin: 40px auto;
`;

const RestartBtn = styled(Button)`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 15px !important;
  width: 120px;
  letter-spacing: 0.5px !important;
  font-weight: 600 !important;
  height: 40px;
  font-size: 20px !important;
  color: ${darkColor} !important;
  border-radius: 5px;
  border: 2px solid ${darkColor} !important;
  cursor: pointer;
  &:hover {
    color: ${darkColor} !important;
    background-color: ${hightLightColor} !important;
  }
`;
const Row = styled.div`
  display: block;
`;

const Slot = styled.div`
  display: inline-block;
  width: ${sizeSm}px;
  height: ${sizeSm}px;
  box-sizing: border-box;
  position: relative;
  cursor: ${(props) => (props.placeable ? 'pointer' : 'auto')};
  border-radius: 15px;
  background-color: ${slotBgColor};
  margin: 5px;
  @media (min-width: 450px) {
    height: ${size}px;
    width: ${size}px;
    border-radius: ${radius}px;
  }
  ${(props) =>
    props.placeable
      ? `
  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }

  &:active {
    border: 2px solid rgba(0, 0, 0, 0.09);
  } `
      : ''}
`;

const Modal = styled(BaseBoardStyle)`
  font-family: monospace;
  font-size: 30px;
  position: absolute;
  background-color: ${slotBgColor};
  border-radius: 30px;
  z-index: 1;
  display: flex;
  justify-content: space-evenly;
  color: ${darkColor};
  align-items: center;
  font-weight: 600;
`;
const ModalWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
`;

const IconWrapper = styled.div`
  width: 30px;
  position: absolute;
  top: -15px;
  left: -15px;
  width: 30px;
  height: 30px;
  font-size: 2em;
  background-color: ${cogColor};
  border-radius: 50%;
  border: 10px solid ${cogColor};
  cursor: pointer;
  z-index: 2;
  color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  &:before {
    content: '';
    position: absolute;
    z-index: -1;
    top: -15px;
    left: -15px;
    right: -15px;
    bottom: -15px;
    border-radius: 51px;
    border: 15px solid rgba(0, 0, 0, 0.05);
  }
  &:hover {
    box-shadow: 1px 1px 2px 5px rgb(0 0 0 / 5%);
  }
`;
const PiecesBag = styled.div`
  width: ${sizeSm * 3 + padding}px;
  height: ${sizeXSMMobile * 3 + paddingSm}px;
  display: flex;
  justify-content: space-evenly;
  align-content: center;
  border-radius: ${radius}px;
  background-color: rgba(255, 255, 255, 0.4);
  position: relative;
  &:before {
    content: '';
    position: absolute;
    z-index: -1;
    top: -15px;
    left: -15px;
    right: -15px;
    bottom: -15px;
    border-radius: ${radius + 21}px;
    border: 15px solid rgba(0, 0, 0, 0.05);
  }

  @media (min-width: 450px) {
    width: ${size * 3 + padding}px;
    height: ${sizeXsm * 3 + paddingSm}px;
  }
`;
const Piece = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Img = styled.img`
  height: ${(props) => (props.big ? 40 : 25)}px;
  border-radius: 10%;
  ${(props) =>
    !props.big && props.hoverable
      ? `
      &:hover {
        padding: 2px 0;
        cursor: pointer;
        background-color: rgba(0, 0, 0, 0.1);}`
      : ''}
  border: 3px solid ${(props) =>
    props.active ? hightLightColor : 'transparent'};
  @media (min-width: 450px) {
    height: ${(props) => (props.big ? 50 : 35)}px;
  }
`;
const PieceHolder = styled.div`
  display: flex;
  align-items: center;
  width: 20px;
  @media (min-width: 450px) {
    width: 30px;
  }
`;
const TicTacBiggerToe = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [winner, setWinner] = useState(undefined);
  const [noMoreMove, setNoMoreMove] = useState(false);
  const [grid, setGrid] = useState([
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ]);
  const [p1Grid, setP1Grid] = useState({
    rows: [0, 0, 0],
    cols: [0, 0, 0],
    diag: [0, 0, 0],
    oDiag: [0, 0, 0],
  });
  const [p2Grid, setP2Grid] = useState({
    rows: [0, 0, 0],
    cols: [0, 0, 0],
    diag: [0, 0, 0],
    oDiag: [0, 0, 0],
  });
  const [p1Turn, setP1Turn] = useState(true);
  const [selectedPiece, setSelectedPiece] = useState(0);
  const [P1Holder, setP1Holder] = useState([3, 3, 3, 2, 2, 2, 1, 1, 1]);
  const [P2Holder, setP2Holder] = useState([3, 3, 3, 2, 2, 2, 1, 1, 1]);

  const nextBiggest = (holder) => {
    return holder.findIndex((el) => el !== 0);
  };
  const place = (row, col) => {
    const copiedGrid = deepCopy(grid);
    let nextPos;
    if (p1Turn) {
      let copiedP1Holder = deepCopy(P1Holder);
      copiedP1Holder[selectedPiece] = 0;
      copiedGrid[row][col] = 'O' + P1Holder[selectedPiece];
      setP1Holder(copiedP1Holder);
      nextPos = nextBiggest(P2Holder);
      setP1Grid(makeMove(p1Grid, row, col), () => {});
      registerMoveToGrid(row, col);
      setP1Turn(false);
    } else {
      let copiedP2Holder = deepCopy(P2Holder);
      copiedP2Holder[selectedPiece] = 0;
      copiedGrid[row][col] = 'X' + P2Holder[selectedPiece];
      setP2Holder(copiedP2Holder);
      nextPos = nextBiggest(P1Holder);
      setP2Grid(makeMove(p2Grid, row, col));
      registerMoveToGrid(row, col);
      setP1Turn(true);
    }
    setGrid(copiedGrid);
    setSelectedPiece(nextPos);
  };

  const checkPlaceable = (piece, inputPiece = '') => {
    if (piece === 0) {
      return true;
    }
    const player = piece[0] === 'O' ? 1 : 2;
    const pieceType = piece[1];
    if (p1Turn & (player === 1)) {
      return false;
    } else if (!p1Turn && player === 2) {
      return false;
    }
    if (inputPiece) {
      return inputPiece > pieceType;
    }
    if (p1Turn) {
      return P1Holder[selectedPiece] > pieceType;
    } else {
      return P2Holder[selectedPiece] > pieceType;
    }
  };
  const mapPieceCodeToSvg = (piece) => {
    const svgSet =
      piece[0] === 'O'
        ? [darkPawn, darkBishop, darkKnight]
        : [lightPawn, lightBishop, lightKnight];
    const index = parseInt(piece[1] - 1);
    return svgSet[index];
  };
  const renderGrid = () => {
    return grid.map((r, i) => (
      <Row key={'row' + i}>
        {r.map((c, j) => (
          <Slot
            key={'Slot' + i + j}
            onClick={() => checkPlaceable(c) && place(i, j)}
            placeable={checkPlaceable(c)}
          >
            {c !== 0 ? (
              <Piece key={'Piece' + i + j}>
                {<Img src={mapPieceCodeToSvg(c)} big />}
              </Piece>
            ) : (
              ''
            )}
          </Slot>
        ))}
      </Row>
    ));
  };

  useEffect(() => {
    checkWin(p1Grid.rows, p1Grid.cols, p1Grid.diag, p1Grid.oDiag) &&
      setWinner(1);
  }, [p1Grid]);

  useEffect(() => {
    checkWin(p2Grid.rows, p2Grid.cols, p2Grid.diag, p2Grid.oDiag) &&
      setWinner(2);
  }, [p2Grid]);

  const checkNoMoreMove = () => {
    let playerBiggest;
    if (p1Turn) {
      playerBiggest = 'O' + nextBiggest(P2Holder);
    } else {
      playerBiggest = 'X' + nextBiggest(P1Holder);
    }
    let canStillBePlace = 0;
    grid.forEach((r) =>
      r.forEach((c) => {
        if (checkPlaceable(c, playerBiggest)) {
          canStillBePlace = 1;
        }
      })
    );
    return canStillBePlace !== 1;
  };
  useEffect(() => {
    if (isGameEnd(grid) && checkNoMoreMove()) {
      setNoMoreMove(true);
    }
  }, [grid]);

  const registerMoveToGrid = (row, col) => {
    const deepCopied = deepCopy(grid);
    deepCopied[row][col] = p1Turn ? 'O' : 'X';
    setGrid(deepCopied);
  };

  const reset = () => {
    setP1Holder([3, 3, 3, 2, 2, 2, 1, 1, 1]);
    setP2Holder([3, 3, 3, 2, 2, 2, 1, 1, 1]);
    setGrid([
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ]);
    setP1Grid({
      rows: [0, 0, 0],
      cols: [0, 0, 0],
      diag: [0, 0, 0],
      oDiag: [0, 0, 0],
    });
    setP2Grid({
      rows: [0, 0, 0],
      cols: [0, 0, 0],
      diag: [0, 0, 0],
      oDiag: [0, 0, 0],
    });
    setP1Turn(true);
    setWinner(undefined);
    setNoMoreMove(false);
  };

  const mapNumberToPiece = (isP1, holderArray) => {
    return holderArray.map((n) => {
      switch (n) {
        case 3:
          return isP1 ? darkKnight : lightKnight;
        case 2:
          return isP1 ? darkBishop : lightBishop;
        case 1:
          return isP1 ? darkPawn : lightPawn;
        default:
          return undefined;
      }
    });
  };
  return (
    <Wrapper>
      <PiecesBag>
        {mapNumberToPiece(true, P1Holder).map((p, i) => (
          <PieceHolder key={'svg_p1' + i}>
            {p ? (
              <Img
                key={'img1' + i}
                src={p}
                alt={'piece'}
                onClick={() => p1Turn && setSelectedPiece(i)}
                active={i === selectedPiece && p1Turn}
                hoverable={p1Turn}
              />
            ) : (
              <></>
            )}
          </PieceHolder>
        ))}
      </PiecesBag>
      <Board>
        <IconWrapper>
          <FontAwesomeIcon
            icon={faCog}
            onClick={() => setModalOpen(!modalOpen)}
          />
        </IconWrapper>
        {modalOpen && (
          <Modal>
            <ModalWrapper>
              {<Img big src={darkKnight} alt={'piece'} />}
              <span>{'>'}</span>
              {<Img big src={lightBishop} alt={'piece'} />}
              <span>{'>'}</span>
              {<Img big src={darkPawn} alt={'piece'} />}
            </ModalWrapper>
            <RestartBtn onClick={reset}>Restart</RestartBtn>
          </Modal>
        )}
        {renderGrid()}
        {(winner || noMoreMove) && (
          <Modal>
            <ModalWrapper>
              {winner ? `Player ${winner} Win !` : 'Draw !'}
            </ModalWrapper>
            <RestartBtn onClick={reset}>Restart</RestartBtn>
          </Modal>
        )}
      </Board>
      <PiecesBag>
        {mapNumberToPiece(false, P2Holder).map((p, i) => (
          <PieceHolder key={'svg_p2' + i}>
            {p ? (
              <Img
                key={'img2' + i}
                src={p}
                alt={'piece'}
                onClick={() => !p1Turn && setSelectedPiece(i)}
                active={i === selectedPiece && !p1Turn}
                hoverable={!p1Turn}
              />
            ) : (
              <></>
            )}
          </PieceHolder>
        ))}
      </PiecesBag>
    </Wrapper>
  );
};

export default TicTacBiggerToe;
