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

class GameBoard extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      gameBoard: JSON.parse(JSON.stringify(gameBoard)),
      selectedChess: null,
    }
    this.handleClickChess = this.handleClickChess.bind(this);
  }
  generateChess(board){
    return board.map((row, i) =>
    row.map((chessCode, j) => (
      <GridSquare
        key={"Square" + chessCode + i + j}
        rightLast={j === 2}
        bottomLast={i === 3}
      >
        {chessCode ? (
          <Chess
            selected = {this.state.selectedChess === chessCode}
            onClick = {()=> this.handleClickChess(chessCode)}
            key={"Chess" + chessCode + i + j}
            chessType={renderType(chessCode)}
            rotated={chessCode < "z" && chessCode > "a"}
          />
        ) : null}
      </GridSquare>
    ))
  );
}
  handleClickChess(chessCode){
    this.setState({selectedChess:chessCode});
  }
  render(){
    return (<Board>
      <Img src={BackgroundImg} alt={"background"} />
      <CenterWrapper>
        <Grid>{this.generateChess(this.state.gameBoard)}</Grid>
      </CenterWrapper>
    </Board>)
  }
  
}

export default GameBoard;