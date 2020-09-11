import React from "react";
import styled from "styled-components";
import CenterWrapper from "../../../Layout/CenterWrapper";
import BackgroundImg from "./background.png";
import Chess from "../Chess";

const BOARD_HEIGHT = "540px";
const BOARD_WIDTH = "380px";
const DASH_COLOR = "#b52838";
const Board = styled.div`
  width: ${BOARD_WIDTH};
  height: ${BOARD_HEIGHT};
  border-radius: 5px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  overflow: hidden;
  position: relative;
`;

const Img = styled.img`
  width: ${BOARD_WIDTH};
  height: ${BOARD_HEIGHT};
  position: absolute;
`;
const GridSquare = styled.div`
  width: ${(props) => (props.rightLast ? "100px" : "99px")};
  height: ${(props) => (props.bottomLast ? "100px" : "99px")};
  position:relative;
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
  :hover{
    cursor:${props => props.isMovable ? "pointer" : "auto"};
  }
  position:absolute;
  top:0;
  left:0;
  bottom:0;
  right:0;
`

const CapturedChessWrapper = styled.div`
  display:flex;
  justify-content:center;
  align-items:center;
  width:100px;
  height:100px;
`;
const CapturePool = styled.div`
  width: 305px;
  height: 305px;
  display: flex;
  flex-wrap: wrap;
`;

const ReverseCapturePool = styled(CapturePool)`
  flex-direction:row-reverse;
`
const BaseStyleCapture = styled.div`
  height: ${BOARD_HEIGHT};
  display:flex;
  flex-direction:column;
`;
const SecondPlayerCapture = styled(BaseStyleCapture)``;
const FirstPlayerCapture = styled(BaseStyleCapture)`
  flex-direction: column-reverse;
`;


const renderType=(chessCode)=>{
  switch(chessCode){
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
    default:
      return null;
  }

}


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
      gameBoard: JSON.parse(JSON.stringify(gameBoard)),
      selectedChess: null,
      player: 1,
      playerOneCapture: [],
      playerTwoCapture: [],
      selectedCaptureID:"",
      selectedCoor: {row:null,column:null},
    };
    this.handleClickChess = this.handleClickChess.bind(this);
    this.handleClickCapture = this.handleClickCapture.bind(this);
  }
  isPlayerTwo(chessCode) {
    return chessCode < "z" && chessCode > "a";
  }
  generateCapture(player) {
    const {playerOneCapture,playerTwoCapture} = this.state;
    let array = player === 1 ? playerOneCapture: playerTwoCapture;
    return array.map((chessCode) => (
      <CapturedChessWrapper key={"CaptureWrapper" + chessCode + Math.random()}>
        <Chess
          onClick={() => this.handleClickCapture(chessCode)}
          disable={this.state.player !== player}
          player={this.state.player}
          selected={this.state.selectedCaptureID === chessCode}
          key={"Capture" + chessCode + Math.random()}
          chessType={renderType(chessCode[0])}
          rotated={this.isPlayerTwo(chessCode[0])}
        />
      </CapturedChessWrapper>
    ));
    
  }
  generateChess() {
    return this.state.gameBoard.map((row, i) =>
      row.map((chessCode, j) => (
        <GridSquare
          key={"Square" + chessCode + i + j}
          rightLast={j === 2}
          bottomLast={i === 3}
        >
          {chessCode ? (
            <Chess
              disable = {!this.isPickable(chessCode) && !this.isMovable(
                this.state.selectedChess,this.state.selectedCoor,{ row: i, column: j })}

              player = {this.state.player}
              selected={this.state.selectedChess === chessCode && !this.state.selectedCaptureID}
              onClick={() =>
                this.handleClickChess(chessCode, { row: i, column: j })
              }
              key={"Chess" + chessCode + i + j}
              chessType={renderType(chessCode)}
              rotated={this.isPlayerTwo(chessCode)}
            />
          ) : (
            <EmptySpace
              isMovable={this.isMovable(
                this.state.selectedChess,
                this.state.selectedCoor,
                { row: i, column: j }
              ) || this.state.selectedCaptureID}
              onClick={() =>
                this.handleClickChess(chessCode, { row: i, column: j })
              }
            ></EmptySpace>
          )}
        </GridSquare>
      ))
    );
  }

  captureChess(coor){
    const {gameBoard} = this.state;
    let chessCode = gameBoard[coor.row][coor.column];
    let { player, playerOneCapture,playerTwoCapture} = this.state;
    playerOneCapture = JSON.parse(JSON.stringify(playerOneCapture));
    playerTwoCapture = JSON.parse(JSON.stringify(playerTwoCapture));
    // TODO: Account also for "HEN" chess
    if(player === 1){
      playerOneCapture.push(
        playerOneCapture.includes(chessCode.toUpperCase())
          ? chessCode.toUpperCase() + 2
          : chessCode.toUpperCase()
      );
      this.setState({ playerOneCapture }, () => console.log(playerOneCapture));
    }else{
      playerTwoCapture.push(
        playerTwoCapture.includes(chessCode.toLowerCase())
          ? chessCode.toLowerCase() + 2
          : chessCode.toLowerCase()
      );
      this.setState({ playerTwoCapture },()=> console.log(playerTwoCapture));
    }
  }
  
  swapPlayer(){
    const {player} = this.state;
    this.setState({player:player === 1? 2:1});
  }
  isPickable(chessCode){
    const { player } = this.state;
    return (
      (this.isPlayerTwo(chessCode) && player === 2) ||
      (!this.isPlayerTwo(chessCode) && player === 1)
    );
  }
  isMovable(selectedChess, oldCoor, newCoor){
    let totalDistance;
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
      case "c":
        return newCoor.row - oldCoor.row === 1;
      case "C":
        return oldCoor.row - newCoor.row === 1;
      default:
        return false;
    }
    
  }
  move(oldCoor, newCoor){
    const {gameBoard} = this.state;
    let newGameBoard = JSON.parse(JSON.stringify(gameBoard));
    console.log("Moving");
    this.setState({
      selectedChess: null,
      selectedCoor: { row: null, column: null },
    });

    if(newGameBoard[newCoor.row][newCoor.column] !== 0){
      this.captureChess(newCoor);
    }
      newGameBoard[newCoor.row][newCoor.column] =
        newGameBoard[oldCoor.row][oldCoor.column];
      newGameBoard[oldCoor.row][oldCoor.column] = 0;
      this.setState({gameBoard: JSON.parse(JSON.stringify(newGameBoard))},()=>console.log(this.state.gameBoard))
  }
  handleClickCapture(chessCode){
    const { selectedCaptureID } = this.state;
    if (selectedCaptureID === chessCode) {
      // Put it down
      this.setState({ selectedCaptureID:"" });
    } else if (this.isPickable(chessCode[0])){
      
      // Pick it up
      this.setState(
        {
          selectedCaptureID: chessCode,
          selectedChess: chessCode[0],
          selectedCoor: { row: null, column: null },
        },
        () => console.log(this.state.selectedCaptureID)
      );
    }
  }
  isPlacable(coor){
    const { gameBoard } = this.state;
    return !gameBoard[coor.row][coor.column];
  }

  place(coor){
    const {gameBoard,selectedCaptureID,selectedChess,playerOneCapture,playerTwoCapture} = this.state;
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

    this.setState({
      selectedCaptureID: "",
      selectedChess: null,
      selectedCoor: { row: null, column: null },
      playerOneCapture:newPlayerOneCapture,
      playerTwoCapture:newPlayerTwoCapture,
      gameBoard:JSON.parse(JSON.stringify(newGameBoard))
    },()=> console.log(this.state.gameBoard));
    
  }

  handleClickChess(chessCode,newCoordinate) {

    const { selectedChess, selectedCoor,selectedCaptureID } = this.state;
    if (selectedChess === chessCode && !selectedCaptureID) {
      // put it down
      this.setState({
        selectedChess: null,
        selectedCoor: { row: null, column: null },
      });

    } else if (chessCode === selectedCaptureID) {
      // put it down from capture and pick up from board
      this.setState({selectedCaptureID:"", selectedChess: chessCode, selectedCoor: newCoordinate })

    }else if (chessCode && this.isPickable(chessCode)) {
      // pick it up
      this.setState(
        { selectedChess: chessCode, selectedCoor: newCoordinate },
        () => console.log(this.state.selectedChess)
      );
    } else if (selectedCaptureID && this.isPlacable(newCoordinate)) {
      
      // place the chess
      this.place(newCoordinate);

      // swapPlayer
      this.swapPlayer();

    } else if (this.isMovable(selectedChess, selectedCoor, newCoordinate)) {
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
        </SecondPlayerCapture>
        <Board>
          <Img src={BackgroundImg} alt={"background"} />
          <CenterWrapper>
            <Grid>{this.generateChess()}</Grid>
          </CenterWrapper>
        </Board>
        <FirstPlayerCapture>
          <CapturePool>{this.generateCapture(1)}</CapturePool>
        </FirstPlayerCapture>
      </React.Fragment>
    );
  }
}

export default GameBoard;