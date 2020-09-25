import React from "react";
import styled from "styled-components";
import CenterWrapper from "../../../Layout/CenterWrapper";
import BackgroundImg from "./background.png";
import Chess from "../Chess";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";

const BOARD_HEIGHT = "540px";
const BOARD_WIDTH = "380px";
const POOL_WIDTH = "305px";
const DASH_COLOR = "#b52838";
const BORDER_COLOR = "#6d5532fa";
const WIN_INFO_BG = "#fefee2a6";
const WIN_TEXT_COLOR = "#6d5532fa";
const WIN_BTN_COLOR = "#6d5532fa";

const HorizontalFlexWrapper = styled.div`
  width: ${POOL_WIDTH};
  display: flex;
  padding-left: 10px;
  @media (max-width: 1000px) {
    width:auto;
  }
`;

const FlexVerticalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  
`;
const GagetInfo = styled(FlexVerticalWrapper)`
  @media (max-height: 800px) and (max-width:600px){
    position:fixed;
    right:40px;
    top:10px;
  }
`;

const PlayerTurnInfo = styled(FlexVerticalWrapper)`
  @media (max-width: 1000px) {
    margin-top:10px;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
`;


const Title = styled.div`
  width: ${POOL_WIDTH};
  margin-bottom: 20px;
  font-size: 40px;
  font-weight: 700;
  @media (max-width: 1000px) {
    width:auto;
    font-size: 25px;
    margin-bottom: 5px;
  }
  @media (max-width: 500px) {
    display:flex;
    justify: center;
  }
`;
const SubTitle = styled.div`
  width: ${POOL_WIDTH};
  font-size: 20px;
  margin: 20px 0px;
  @media (max-width: 1000px) {
    width: auto;
    font-size: 18px;
    margin: 0 0 2px 0;
  }
  @media (max-height: 800px) {
    padding-left:50px;
  }
`;

const TurnInfo = styled.div`
  padding-left: 10px;
  font-size: 30px;
  font-weight: 500;
  margin: 20px 0;
  @media (max-width: 500px) {
    font-size: 18px;
  }
  @media (max-width: 1000px) {
    margin:0 10px;
    font-size: 20px;
  }
`;

const Board = styled.div`
  width: ${BOARD_WIDTH};
  height: ${BOARD_HEIGHT};
  border-radius: 5px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  overflow: hidden;
  position: relative;
  @media (max-width: 600px) {
    width: 350px;
    height: 440px;
  }
`;


const Img = styled.img`
  width: ${BOARD_WIDTH};
  height: ${BOARD_HEIGHT};
  position: absolute;
  @media (max-width: 600px) {
    width: 350px;
    height: 440px;
  }
`;
const GridSquare = styled.div`
  width: ${(props) => (props.rightLast ? "100px" : "99px")};
  height: ${(props) => (props.bottomLast ? "100px" : "99px")};
  position: relative;
  border-bottom: ${(props) =>
    props.bottomLast ? null : "1px dashed " + DASH_COLOR};
  border-right: ${(props) =>
    props.rightLast ? null : "1px dashed" + DASH_COLOR};
`;
const Grid = styled.div`
  width: 300px;
  height: 400px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(4, 1fr);
  border: 1px dashed ${DASH_COLOR};
  z-index: 2;
`;

const EmptySpace = styled.div`
  :hover {
    cursor: ${(props) => (props.isMovable ? "pointer" : "auto")};
  }
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
`;

const PopUpWrapper = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 3000;
`;

const PopUp = styled.div`
  width: 350px;
  height: 350px;
  border-radius: 20px;
  display: flex;
  flex-direction:column;
  justify-content: center;
  align-items: center;
  position: fixed;

  background-color: #fefee2;
`;
const Mask = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #828282;
`;

const CapturedChessWrapper = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 100px;
`;
const ResponsiveCapturePool = styled.div`
  width: ${POOL_WIDTH};
  height: ${POOL_WIDTH};
  display: flex;
  flex-wrap: wrap;
`;
const CapturePool = styled.div`
  width: ${POOL_WIDTH};
  height: ${POOL_WIDTH};
  display: flex;
  flex-wrap: wrap;
  @media (max-width: 1000px) {
    display: none;
  }
`;

const ReverseCapturePool = styled(CapturePool)`
  flex-direction: row-reverse;
`;
const BaseStyleCapture = styled.div`
  height: ${BOARD_HEIGHT};
  display: flex;
  flex-direction: column;
  @media (max-width: 1000px) {
    height: auto;
  }
`;
const SecondPlayerCapture = styled(BaseStyleCapture)``;
const FirstPlayerCapture = styled(BaseStyleCapture)`
  flex-direction: column-reverse;
  justify-content: space-between;
`;

const ResponsiveCaptureBtn = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 5px;
  @media (min-width: 1000px) {
    display: none;
  }
`;
const WinnerPop = styled.div`
  position: absolute;
  z-index: 10;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${WIN_INFO_BG};
`;

const Text = styled.div`
  font-size: 25px;
  font-weight: 500;
  margin-bottom: 10px;
  color: ${WIN_TEXT_COLOR};
  letter-spacing: 0.3px;
  @media (max-width:1000px){
    margin-bottom: 0;
    font-size:20px;
  }
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
  background-color: ${WIN_INFO_BG} !important;
  font-size: 20px !important;
  color: ${WIN_BTN_COLOR}!important;
  border-radius: 5px;
  border: 2px solid ${BORDER_COLOR} !important;
  cursor: pointer;
  &:hover {
    color: ${BORDER_COLOR} !important;
    background-color: #cbecf5 !important;
  }
`;

const renderType = (chessCode) => {
  switch (chessCode) {
    case "E":
    case "e":
      return "ELPHT";
    case "C":
    case "c":
      return "CHICK";
    case "L":
    case "l":
      return "LION";
    case "G":
    case "g":
      return "GIRAF";
    case "H":
    case "h":
      return "HEN";
    default:
      return null;
  }
};

const gameBoard = [
  ["g", "l", "e"],
  [0, "c", 0],
  [0, "C", 0],
  ["E", "L", "G"],
];

class GameBoard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      displayCapture: 1,
      canvasOn: false,
      gameBoard: JSON.parse(JSON.stringify(gameBoard)),
      selectedChess: null,
      player: 1,
      playerOneCapture: [],
      playerTwoCapture: [],
      selectedCaptureID: "",
      history: [
        {
          gameBoard: JSON.parse(JSON.stringify(gameBoard)),
          playerOneCapture: [],
          playerTwoCapture: [],
        },
      ],
      winner: null,
      selectedCoor: { row: null, column: null },
    };
    this.openCapture = this.openCapture.bind(this);
    this.closeCapture = this.closeCapture.bind(this);
    this.redo = this.redo.bind(this);
    this.surrender = this.surrender.bind(this);
    this.replay = this.replay.bind(this);
    this.handleClickChess = this.handleClickChess.bind(this);
    this.handleClickCapture = this.handleClickCapture.bind(this);
  }

  openCapture(player) {
    this.setState({ canvasOn: true, displayCapture: player });
  }
  closeCapture() {
    this.setState({ canvasOn: false });
  }

  isPlayerTwo(chessCode) {
    return chessCode < "z" && chessCode > "a";
  }
  generateCapture(player) {
    const {
      playerOneCapture,
      playerTwoCapture,
      selectedCaptureID,
    } = this.state;
    let array = player === 1 ? playerOneCapture : playerTwoCapture;
    return array.map((chessCode) => (
      <CapturedChessWrapper key={"CaptureWrapper" + chessCode}>
        <Chess
          onClick={() => this.handleClickCapture(chessCode)}
          disable={this.state.player !== player}
          player={player}
          selected={selectedCaptureID === chessCode}
          key={"Capture" + chessCode}
          chessType={renderType(chessCode[0])}
          rotated={this.isPlayerTwo(chessCode[0])}
        />
      </CapturedChessWrapper>
    ));
  }
  win() {
    const { player } = this.state;
    this.setState({
      winner: player,
    });
  }
  surrender() {
    const { player } = this.state;
    this.setState({
      winner: player === 1 ? 2 : 1,
    });
  }
  replay() {
    this.setState({
      gameBoard: JSON.parse(JSON.stringify(gameBoard)),
      selectedChess: null,
      player: 1,
      playerOneCapture: [],
      playerTwoCapture: [],
      selectedCaptureID: "",
      history: [
        {
          gameBoard: JSON.parse(JSON.stringify(gameBoard)),
          playerOneCapture: [],
          playerTwoCapture: [],
        },
      ],
      winner: null,
      selectedCoor: { row: null, column: null },
    });
  }
  generateChess() {
    const {
      selectedChess,
      selectedCoor,
      player,
      selectedCaptureID,
      gameBoard,
    } = this.state;
    return gameBoard.map((row, i) =>
      row.map((chessCode, j) => (
        <GridSquare
          key={"Square" + chessCode + i + j}
          rightLast={j === 2}
          bottomLast={i === 3}
        >
          {chessCode ? (
            <Chess
              disable={
                !this.isPickable(chessCode) &&
                !this.isMovable(selectedChess, selectedCoor, {
                  row: i,
                  column: j,
                })
              }
              player={player}
              selected={i === selectedCoor.row && j === selectedCoor.column}
              onClick={() =>
                this.handleClickChess(chessCode, { row: i, column: j })
              }
              key={"Chess" + chessCode + i + j}
              chessType={renderType(chessCode)}
              rotated={this.isPlayerTwo(chessCode)}
            />
          ) : (
            <EmptySpace
              isMovable={
                this.isMovable(selectedChess, selectedCoor, {
                  row: i,
                  column: j,
                }) || selectedCaptureID
              }
              onClick={() =>
                this.handleClickChess(chessCode, { row: i, column: j })
              }
            ></EmptySpace>
          )}
        </GridSquare>
      ))
    );
  }

  captureChess(coor) {
    const { gameBoard } = this.state;
    let chessCode = gameBoard[coor.row][coor.column];
    let { player, playerOneCapture, playerTwoCapture } = this.state;
    playerOneCapture = [...playerOneCapture];
    playerTwoCapture = [...playerTwoCapture];

    if (chessCode === "H" || chessCode === "h") {
      chessCode = "c";
    }
    if (player === 1) {
      playerOneCapture.push(
        playerOneCapture.includes(chessCode.toUpperCase())
          ? chessCode.toUpperCase() + 2
          : chessCode.toUpperCase()
      );
      return playerOneCapture;
    } else {
      playerTwoCapture.push(
        playerTwoCapture.includes(chessCode.toLowerCase())
          ? chessCode.toLowerCase() + 2
          : chessCode.toLowerCase()
      );
      return playerTwoCapture;
    }
  }

  swapPlayer() {
    const { player } = this.state;
    this.setState({ player: player === 1 ? 2 : 1 });
  }
  isPickable(chessCode) {
    const { player } = this.state;
    return (
      (this.isPlayerTwo(chessCode) && player === 2) ||
      (!this.isPlayerTwo(chessCode) && player === 1)
    );
  }
  isMovable(selectedChess, oldCoor, newCoor) {
    let totalDistance;
    let leftDistance;
    let rightDistance;
    const { gameBoard } = this.state;

    // Check if it's alias's chess
    if (
      this.isPickable(gameBoard[newCoor.row][newCoor.column]) &&
      gameBoard[newCoor.row][newCoor.column] !== 0
    ) {
      return false;
    }

    switch (selectedChess) {
      case "L":
      case "l":
        return (
          Math.abs(oldCoor.row - newCoor.row) <= 1 &&
          Math.abs(oldCoor.column - newCoor.column) <= 1
        );
      case "g":
      case "G":
        totalDistance =
          Math.abs(oldCoor.column - newCoor.column) +
          Math.abs(oldCoor.row - newCoor.row);
        return totalDistance === 1;
      case "e":
      case "E":
        totalDistance =
          Math.abs(oldCoor.column - newCoor.column) +
          Math.abs(oldCoor.row - newCoor.row);
        return totalDistance === 2;

      case "H":
        // leftDiagonal
        leftDistance =
          oldCoor.column - newCoor.column + newCoor.row - oldCoor.row;
        // rightDiagonal
        rightDistance =
          newCoor.column - oldCoor.column + newCoor.row - oldCoor.row;
        return leftDistance !== 2 && rightDistance !== 2;
      case "h":
        // leftDiagonal
        leftDistance =
          oldCoor.column - newCoor.column + oldCoor.row - newCoor.row;
        // rightDiagonal
        rightDistance =
          newCoor.column - oldCoor.column + oldCoor.row - newCoor.row;
        return leftDistance !== 2 && rightDistance !== 2;

      case "c":
        return (
          newCoor.row - oldCoor.row === 1 && oldCoor.column === newCoor.column
        );
      case "C":
        return (
          oldCoor.row - newCoor.row === 1 && oldCoor.column === newCoor.column
        );
      default:
        return false;
    }
  }
  redo() {
    let { history, player } = this.state;
    history.pop();
    this.setState({
      player: player === 1 ? 2 : 1,
      gameBoard: history[history.length - 1].gameBoard,
      playerOneCapture: history[history.length - 1].playerOneCapture,
      playerTwoCapture: history[history.length - 1].playerTwoCapture,
      history,
    });
  }
  move(oldCoor, newCoor) {
    let {
      gameBoard,
      selectedChess,
      player,
      history,
      playerOneCapture,
      playerTwoCapture,
    } = this.state;
    let newGameBoard = JSON.parse(JSON.stringify(gameBoard));
    console.log("Moving");

    let oldChess = selectedChess;

    this.setState({
      selectedChess: null,
      selectedCoor: { row: null, column: null },
    });

    if (newGameBoard[newCoor.row][newCoor.column] !== 0) {
      if (player === 1) {
        playerOneCapture = this.captureChess(newCoor);
      } else {
        playerTwoCapture = this.captureChess(newCoor);
      }
    }

    if (oldChess === "l" || oldChess === "L") {
      if (
        (player === 1 && newCoor.row === 0) ||
        (player === 2 && newCoor.row === 3)
      ) {
        this.win();
      }
    }
    if (
      newGameBoard[newCoor.row][newCoor.column] === "l" ||
      newGameBoard[newCoor.row][newCoor.column] === "L"
    ) {
      this.win();
    }
    if (oldChess === "c" || oldChess === "C") {
      // For Promoting Chick to Hen
      if (player === 1 && newCoor.row === 0) {
        oldChess = "H";
      } else if (player === 2 && newCoor.row === 3) {
        oldChess = "h";
      }
    }

    newGameBoard[newCoor.row][newCoor.column] = oldChess;
    newGameBoard[oldCoor.row][oldCoor.column] = 0;
    history.push({
      gameBoard: JSON.parse(JSON.stringify(newGameBoard)),
      playerOneCapture,
      playerTwoCapture,
    });
    this.setState(
      {
        playerOneCapture,
        playerTwoCapture,
        gameBoard: JSON.parse(JSON.stringify(newGameBoard)),
        history,
      },
      () => console.log(this.state.history)
    );
  }

  handleClickCapture(chessCode) {
    const { selectedCaptureID } = this.state;
    if (selectedCaptureID === chessCode) {
      // selected it
      this.setState({ selectedCaptureID: "" });
    } else if (this.isPickable(chessCode[0])) {
      // Pick it up
      this.setState({
        canvasOn: false,
        selectedCaptureID: chessCode,
        selectedChess: chessCode[0],
        selectedCoor: { row: null, column: null },
      });
    }
  }
  isPlacable(coor) {
    const { gameBoard } = this.state;
    return !gameBoard[coor.row][coor.column];
  }

  place(coor) {
    const {
      gameBoard,
      selectedCaptureID,
      selectedChess,
      playerOneCapture,
      playerTwoCapture,
      history,
    } = this.state;
    let newGameBoard = JSON.parse(JSON.stringify(gameBoard));
    let newPlayerOneCapture = [...playerOneCapture];
    let newPlayerTwoCapture = [...playerTwoCapture];

    console.log("Placing");

    // place the chess on the board
    newGameBoard[coor.row][coor.column] = selectedChess;

    // update capture pool
    newPlayerOneCapture = playerOneCapture.filter(
      (chessCode) => chessCode !== selectedCaptureID
    );

    newPlayerTwoCapture = playerTwoCapture.filter(
      (chessCode) => chessCode !== selectedCaptureID
    );

    history.push({
      gameBoard: JSON.parse(JSON.stringify(newGameBoard)),
      playerOneCapture: newPlayerOneCapture,
      playerTwoCapture: newPlayerTwoCapture,
    });
    this.setState(
      {
        history,
        selectedCaptureID: "",
        selectedChess: null,
        selectedCoor: { row: null, column: null },
        playerOneCapture: newPlayerOneCapture,
        playerTwoCapture: newPlayerTwoCapture,
        gameBoard: JSON.parse(JSON.stringify(newGameBoard)),
      },
      () => console.log(this.state.history)
    );
  }

  handleClickChess(chessCode, newCoordinate) {
    const { selectedChess, selectedCoor, selectedCaptureID } = this.state;
    if (selectedCoor.row === newCoordinate.row && selectedCoor.column === newCoordinate.column && !selectedCaptureID) {
      // put it down
      this.setState({
        selectedChess: null,
        selectedCoor: { row: null, column: null },
      });
    } else if (chessCode === selectedCaptureID) {
      // put it down from capture and pick up from board
      this.setState({
        selectedCaptureID: "",
        selectedChess: chessCode,
        selectedCoor: newCoordinate,
      });
    } else if (chessCode && selectedCaptureID && this.isPickable(chessCode)) {
      // pick chess from board instead
      this.setState({
        selectedCaptureID: "",
        selectedChess: chessCode,
        selectedCoor: newCoordinate,
      });
    } else if (!selectedCaptureID && chessCode && this.isPickable(chessCode)) {
      // pick it up from board
      this.setState({ selectedChess: chessCode, selectedCoor: newCoordinate });
    } else if (selectedCaptureID && this.isPlacable(newCoordinate)) {
      // place the chess
      this.place(newCoordinate);

      // swapPlayer
      this.swapPlayer();
    } else if (
      !selectedCaptureID &&
      this.isMovable(selectedChess, selectedCoor, newCoordinate)
    ) {
      // Move to a new place
      this.move(selectedCoor, newCoordinate);

      // swapPlayer
      this.swapPlayer();
    }
  }
  render() {
    return (
      <React.Fragment>
        <SecondPlayerCapture>
          <ReverseCapturePool>{this.generateCapture(2)}</ReverseCapturePool>
          <GagetInfo>
            <Title>Dobutsu Shogi</Title>
            <SubTitle>By Jiajin Zheng</SubTitle>
          </GagetInfo>
          <ResponsiveCaptureBtn>
            <ButtonGroup aria-label="outlined button group">
              <Button
                disabled={this.state.playerTwoCapture.length === 0}
                variant="outlined"
                onClick={() => this.openCapture(2)}
              >
                P2 Capture
              </Button>
              <Button
                disabled={this.state.playerOneCapture.length === 0}
                variant="outlined"
                onClick={() => this.openCapture(1)}
              >
                P1 Capture
              </Button>
            </ButtonGroup>
          </ResponsiveCaptureBtn>
        </SecondPlayerCapture>
        <Board>
          {this.state.winner ? (
            <WinnerPop>
              <Text>Player {this.state.winner} Wins !</Text>
              <RestartBtn variant="outlined" onClick={this.replay}>
                Replay
              </RestartBtn>
            </WinnerPop>
          ) : null}
          <Img src={BackgroundImg} alt={"background"} />
          <CenterWrapper>
            <Grid>{this.generateChess()}</Grid>
          </CenterWrapper>

          {this.state.canvasOn ? (
            <PopUpWrapper>
              <Mask />
              <PopUp>
                <Text>Player {this.state.displayCapture} Capture</Text>
                <ResponsiveCapturePool>
                  {this.generateCapture(this.state.displayCapture)}
                </ResponsiveCapturePool>
                <Button
                  onClick={this.closeCapture}
                  variant="outlined"
                  color="secondary"
                  size = "small"
                >
                  Close
                </Button>
              </PopUp>
            </PopUpWrapper>
          ) : null}
        </Board>
        <FirstPlayerCapture>
          <CapturePool>{this.generateCapture(1)}</CapturePool>
          <PlayerTurnInfo>
            <TurnInfo>Player {this.state.player}'s turn</TurnInfo>
            <HorizontalFlexWrapper>
              <ButtonGroup aria-label="outlined button group">
              <Button
                variant="outlined"
                color="primary"
                onClick={this.redo}
                disabled={
                  this.state.history.length === 1 || !!this.state.winner
                }
              >
                Redo
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                onClick={this.surrender}
                disabled={!!this.state.winner}
              >
                Surrender
              </Button>
              </ButtonGroup>
            </HorizontalFlexWrapper>
          </PlayerTurnInfo>
        </FirstPlayerCapture>
      </React.Fragment>
    );
  }
}

export default GameBoard;
