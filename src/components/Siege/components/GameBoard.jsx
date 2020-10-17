import React from 'react';
import styled from "styled-components";
import CenterWrapper from '../../../Layout/CenterWrapper';
import WhiteKnight from '../svg/WhiteKnight.svg';
import DarkKnight from "../svg/DarkKnight.svg";
import Chess from './Chess';
import HoverCanvas, { hoverGrid, GridBase, Slot } from "./HoverCanvas";
import PlayerInfo from './PlayerInfo';
import Fence from './Fence';
import {WinnerPop,Text,RestartBtn} from './WinnerPop.jsx';


const BG_COLOR_LIGHT = "#ffc982";
const BG_COLOR_DARK = "#ab7039";

const grid = [
  [0 ,"",0 ,"",0 ,"",0 ,"",0 ,"",0 ,"",0 ],
  ["","","","","","","","","","","","",""],
  [0 ,"",0 ,"",0 ,"",0 ,"",0 ,"",0 ,"",0 ],
  ["","","","","","","","","","","","",""],
  [0 ,"",0 ,"",0 ,"",0 ,"",0 ,"",0 ,"",0 ],
  ["","","","","","","","","","","","",""],
  [0 ,"",0 ,"",0 ,"",0 ,"",0 ,"",0 ,"",0 ],
  ["","","","","","","","","","","","",""],
  [0 ,"",0 ,"",0 ,"",0 ,"",0 ,"",0 ,"",0 ],
  ["","","","","","","","","","","","",""],
  [0 ,"",0 ,"",0 ,"",0 ,"",0 ,"",0 ,"",0 ],
  ["","","","","","","","","","","","",""],
  [0 ,"",0 ,"",0 ,"",0 ,"",0 ,"",0 ,"",0 ],
]


const MainWrapper = styled.div`
  position:relative;
`

const GridLayout = styled(GridBase)`
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
`;


const copy = (array) => JSON.parse(JSON.stringify(array));
   
class GameBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          player:1,
          readyToPlaceGrid: false,
          P1Coor: { x: 0, y: 0 },
          P2Coor: { x: 6, y: 6 },
          gameBoard: copy(grid),
        },
      ],
      gameBoard: copy(grid),
      P1Coor: { x: 0, y: 0 },
      P2Coor: { x: 6, y: 6 },
      player: 1,
      fenceSelectionOn: false,
      selected: false,
      hoverGrid: copy(hoverGrid),
      readyToPlaceGrid: false,
      winner:null,
    };
    this.surrender = this.surrender.bind(this);
    this.registerFence = this.registerFence.bind(this);
    this.redo = this.redo.bind(this);
    this.handleMove = this.handleMove.bind(this);
    this.toggleSelected = this.toggleSelected.bind(this);
    this.replay= this.replay.bind(this);
  }

  toggleSelected(player) {
    let hoverGrid = this.generateMovableSlot(player);

    this.setState({ selected: !this.state.selected, hoverGrid });
  }

  isOtherPlayerOnSpot(x, y) {
    const { P1Coor, P2Coor, player } = this.state;
    if (player === 1) {
      return x === P2Coor.x && y === P2Coor.y;
    } else {
      return x === P1Coor.x && y === P1Coor.y;
    }
  }

  

  checkMove(i, j) {
    let grid = copy(hoverGrid);
    const { gameBoard, P1Coor, P2Coor } = this.state;
    let stepLeft = 3;

    const canMove = (i, j, stepLeft, comeFrom) => {
      if (stepLeft === 0) {
        return;
      }

      if (i - 1 >= 0) {
        // try to move up , if possible
        if (
          !gameBoard[i * 2 - 1][j * 2] &&
          comeFrom !== "up" &&
          !(i - 1 === P1Coor.y && j === P1Coor.x) &&
          !(i - 1 === P2Coor.y && j === P2Coor.x)
        ) {
          grid[i - 1][j] = "o";
          canMove(i - 1, j, stepLeft - 1, "down");
        }
      }
      if (i + 1 < 7) {
        // try to move down , if possible
        if (
          !gameBoard[i * 2 + 1][j * 2] &&
          comeFrom !== "down" &&
          !(i + 1 === P1Coor.y && j === P1Coor.x) &&
          !(i + 1 === P2Coor.y && j === P2Coor.x)
        ) {
          grid[i + 1][j] = "o";
          canMove(i + 1, j, stepLeft - 1, "up");
        }
      }
      if (j + 1 < 7) {
        // try to move right , if possible
        if (
          !gameBoard[i * 2][j * 2 + 1] &&
          comeFrom !== "right" &&
          !(i === P1Coor.y && j + 1 === P1Coor.x) &&
          !(i === P2Coor.y && j + 1 === P2Coor.x)
        ) {
          grid[i][j + 1] = "o";
          canMove(i, j + 1, stepLeft - 1, "left");
        }
      }
      if (j - 1 >= 0) {
        // try to move left , if possible
        if (
          !gameBoard[i * 2][j * 2 - 1] &&
          comeFrom !== "left" &&
          !(i === P1Coor.y && j - 1 === P1Coor.x) &&
          !(i === P2Coor.y && j - 1 === P2Coor.x)
        ) {
          grid[i][j - 1] = "o";
          canMove(i, j - 1, stepLeft - 1, "right");
        }
      }
    };
    canMove(i, j, stepLeft, "");
    grid[P1Coor.y][P1Coor.x] = "x";
    grid[P2Coor.y][P2Coor.x] = "x";
    return copy(grid);
  }

  handleMove(x, y, player) {
    let { history, P1Coor, P2Coor, gameBoard} = this.state;

    if (player === 1) {
      history.push({
        player:1,
        P1Coor: { x, y },
        P2Coor,
        gameBoard: copy(gameBoard),
        readyToPlaceGrid:true,
      });
      this.setState({
        player: 1,
        history,
        selected: false,
        P1Coor: { x, y },
        readyToPlaceGrid: true,
      });
    } else {
      history.push({
        player:2,
        P2Coor: { x, y },
        P1Coor,
        gameBoard: copy(gameBoard),
        readyToPlaceGrid: true,
      });
      this.setState({
        player: 2,
        history,
        selected: false,
        P2Coor: { x, y },
        readyToPlaceGrid: true,
      });
    }
  }

  generateMovableSlot(player) {
    const { P1Coor, P2Coor } = this.state;
    if (player === 1) {
      const { x, y } = P1Coor;
      // x represent column, y represent row
      return this.checkMove(y, x);
    } else {
      const { x, y } = P2Coor;
      return this.checkMove(y, x);
    }
  }

  playerSlot(P1Coor, P2Coor, row, column) {
    if (P1Coor.x === column && P1Coor.y === row) {
      return (
        <Chess
          src={DarkKnight}
          alt="Dark Knight"
          disabled={this.state.player === 2 || this.state.readyToPlaceGrid}
          onClick={() =>
            this.state.player === 1 ? this.toggleSelected(1) : undefined
          }
        ></Chess>
      );
    } else if (P2Coor.x === column && P2Coor.y === row) {
      return (
        <Chess
          src={WhiteKnight}
          alt="White Knight"
          disabled={this.state.player === 1 || this.state.readyToPlaceGrid}
          onClick={() =>
            this.state.player === 2 ? this.toggleSelected(2) : undefined
          }
        ></Chess>
      );
    }
  }

  generateFence(row, column) {
    const { gameBoard, readyToPlaceGrid, P1Coor, P2Coor, player } = this.state;

    let confirmedFence = [];
    let selectableFence = [];
    let shouldShowHover;

    if (player === 1) {
      shouldShowHover =
        readyToPlaceGrid && P1Coor.x === column && P1Coor.y === row;
    } else {
      shouldShowHover =
        readyToPlaceGrid && P2Coor.x === column && P2Coor.y === row;
    }

    // Top left corner
    if (row === 0) {
      if (column === 0) {
        if (gameBoard[0][1]) {
          if (gameBoard[0][1][1] === "R") confirmedFence.push(gameBoard[0][1]);
        } else {
          selectableFence.push("R");
        }
        if (gameBoard[1][0]) {
          if (gameBoard[1][0][1] === "D") confirmedFence.push(gameBoard[1][0]);
        } else {
          selectableFence.push("D");
        }
      }
    }

    // Top right corner
    if (row === 0) {
      if (column === 6) {
        if (gameBoard[0][11]) {
          if (gameBoard[0][11][1] === "L")
            confirmedFence.push(gameBoard[0][11]);
        } else {
          selectableFence.push("L");
        }
        if (gameBoard[1][12]) {
          if (gameBoard[1][12][1] === "D")
            confirmedFence.push(gameBoard[1][12]);
        } else {
          selectableFence.push("D");
        }
      }
    }

    // bottom left corner
    if (row === 6) {
      if (column === 0) {
        if (gameBoard[11][0]) {
          if (gameBoard[11][0][1] === "U")
            confirmedFence.push(gameBoard[11][0]);
        } else {
          selectableFence.push("U");
        }
        if (gameBoard[12][1]) {
          if (gameBoard[12][1][1] === "R")
            confirmedFence.push(gameBoard[12][1]);
        } else {
          selectableFence.push("R");
        }
      }
    }

    // bottom right corner
    if (row === 6) {
      if (column === 6) {
        if (gameBoard[11][12]) {
          if (gameBoard[11][12][1] === "U")
            confirmedFence.push(gameBoard[11][12]);
        } else {
          selectableFence.push("U");
        }
        if (gameBoard[12][11]) {
          if (gameBoard[12][11][1] === "L")
            confirmedFence.push(gameBoard[12][11]);
        } else {
          selectableFence.push("L");
        }
      }
    }

    // top edge
    if (row === 0 && !(column === 0 || column === 6)) {
      if (gameBoard[row * 2][column * 2 - 1]) {
        if (gameBoard[row * 2][column * 2 - 1][1] === "L")
          confirmedFence.push(gameBoard[row * 2][column * 2 - 1]);
      } else {
        selectableFence.push("L");
      }
      if (gameBoard[row * 2][column * 2 + 1]) {
        if (gameBoard[row * 2][column * 2 + 1][1] === "R")
          confirmedFence.push(gameBoard[row * 2][column * 2 + 1]);
      } else {
        selectableFence.push("R");
      }
      if (gameBoard[row * 2 + 1][column * 2]) {
        if (gameBoard[row * 2 + 1][column * 2][1] === "D")
          confirmedFence.push(gameBoard[row * 2 + 1][column * 2]);
      } else {
        selectableFence.push("D");
      }
    }
    // bottom edge
    if (row === 6 && !(column === 0 || column === 6)) {
      if (gameBoard[row * 2][column * 2 - 1]) {
        if (gameBoard[row * 2][column * 2 - 1][1] === "L")
          confirmedFence.push(gameBoard[row * 2][column * 2 - 1]);
      } else {
        selectableFence.push("L");
      }
      if (gameBoard[row * 2][column * 2 + 1]) {
        if (gameBoard[row * 2][column * 2 + 1][1] === "R")
          confirmedFence.push(gameBoard[row * 2][column * 2 + 1]);
      } else {
        selectableFence.push("R");
      }
      if (gameBoard[row * 2 - 1][column * 2]) {
        if (gameBoard[row * 2 - 1][column * 2][1] === "U")
          confirmedFence.push(gameBoard[row * 2 + 1][column * 2]);
      } else {
        selectableFence.push("U");
      }
    }

    // right edge
    if (column === 6 && !(row === 0 || row === 6)) {
      if (gameBoard[row * 2 - 1][column * 2]) {
        if (gameBoard[row * 2 - 1][column * 2][1] === "U")
          confirmedFence.push(gameBoard[row * 2 - 1][column * 2]);
      } else {
        selectableFence.push("U");
      }
      if (gameBoard[row * 2][column * 2 - 1]) {
        if (gameBoard[row * 2][column * 2 - 1][1] === "L")
          confirmedFence.push(gameBoard[row * 2][column * 2 - 1]);
      } else {
        selectableFence.push("L");
      }
      if (gameBoard[row * 2 + 1][column * 2]) {
        if (gameBoard[row * 2 + 1][column * 2][1] === "D")
          confirmedFence.push(gameBoard[row * 2 + 1][column * 2]);
      } else {
        selectableFence.push("D");
      }
    }

    // left edge
    if (column === 0 && !(row === 0 || row === 6)) {
      if (gameBoard[row * 2 - 1][column * 2]) {
        if (gameBoard[row * 2 - 1][column * 2][1] === "U")
          confirmedFence.push(gameBoard[row * 2 - 1][column * 2]);
      } else {
        selectableFence.push("U");
      }
      if (gameBoard[row * 2][column * 2 + 1]) {
        if (gameBoard[row * 2][column * 2 + 1][1] === "R")
          confirmedFence.push(gameBoard[row * 2][column * 2 + 1]);
      } else {
        selectableFence.push("R");
      }
      if (gameBoard[row * 2 + 1][column * 2]) {
        if (gameBoard[row * 2 + 1][column * 2][1] === "D")
          confirmedFence.push(gameBoard[row * 2 + 1][column * 2]);
      } else {
        selectableFence.push("D");
      }
    }

    // every other slot edge
    if (!(column === 0 || column === 6 || row === 0 || row === 6)) {
      if (gameBoard[row * 2 - 1][column * 2]) {
        if (gameBoard[row * 2 - 1][column * 2][1] === "U")
          confirmedFence.push(gameBoard[row * 2 - 1][column * 2]);
      } else {
        selectableFence.push("U");
      }
      if (gameBoard[row * 2][column * 2 - 1]) {
        if (gameBoard[row * 2][column * 2 - 1][1] === "L")
          confirmedFence.push(gameBoard[row * 2][column * 2 - 1]);
      } else {
        selectableFence.push("L");
      }
      if (gameBoard[row * 2][column * 2 + 1]) {
        if (gameBoard[row * 2][column * 2 + 1][1] === "R")
          confirmedFence.push(gameBoard[row * 2][column * 2 + 1]);
      } else {
        selectableFence.push("R");
      }
      if (gameBoard[row * 2 + 1][column * 2]) {
        if (gameBoard[row * 2 + 1][column * 2][1] === "D")
          confirmedFence.push(gameBoard[row * 2 + 1][column * 2]);
      } else {
        selectableFence.push("D");
      }
    }

    return (
      <Fence
        selectableFence={shouldShowHover ? selectableFence : []}
        confirmedFence={confirmedFence}
        player={player}
        row={row}
        column={column}
        onClick={this.registerFence}
      />
    );
  }
  registerFence(direction, player, row, column) {
    let { gameBoard, history} = this.state;
    const { P1Coor, P2Coor } = history[history.length - 1];
    let newGameBoard = copy(gameBoard);

    switch (direction) {
      case "U":
        newGameBoard[row * 2 - 1][column * 2] =
          JSON.stringify(player) + direction;
        break;
      case "D":
        newGameBoard[row * 2 + 1][column * 2] =
          JSON.stringify(player) + direction;
        break;
      case "L":
        newGameBoard[row * 2][column * 2 - 1] =
          JSON.stringify(player) + direction;
        break;
      case "R":
        newGameBoard[row * 2][column * 2 + 1] =
          JSON.stringify(player) + direction;
        break;
      default:
    }
    newGameBoard = copy(newGameBoard);
    history.push({
      player: player === 1 ? 2 : 1,
      P1Coor,
      P2Coor,
      gameBoard: newGameBoard,
      readyToPlaceGrid: false,
    });
    this.setState(
      {
        readyToPlaceGrid: false,
        player: player === 1 ? 2 : 1,
        history,
        gameBoard: newGameBoard,
      },
     this.checkWin
    );
  }
  checkWin(){;
    const {P1Coor,P2Coor,gameBoard} = this.state;
    let MoveObjectGrid = Array(7).fill(
      Array(7).fill(0)
    );
    MoveObjectGrid = MoveObjectGrid.map(row=>row.map(()=> false))

    const isVisited=(row,column)=>{
      return MoveObjectGrid[row][column];
    }
    
    const dfsGrid=(row,column)=>{
      MoveObjectGrid[row][column] = true;
      // move up
        if(row-1 >=0 && !isVisited(row-1,column) && !gameBoard[row*2-1][column*2]){

          dfsGrid(row-1,column);
        }
        // move down
        if (
          row + 1 < 7 &&
          !isVisited(row + 1, column) &&
          !gameBoard[row * 2 + 1][column * 2]
        ) {
         
          dfsGrid(row + 1, column);
        }
        // move right
        if (
          column + 1 < 7 &&
          !isVisited(row, column + 1) &&
          !gameBoard[row * 2][column * 2 + 1]
        ) {
   
          dfsGrid(row, column + 1);
        }
        // move left
        if (
          column - 1 >= 0 &&
          !isVisited(row, column - 1) &&
          !gameBoard[row * 2][column * 2 - 1]
        ) {

          dfsGrid(row, column - 1);
        }      
    }
    const CountSquare = () => {
      let count = 0;
      MoveObjectGrid.forEach(row=>row.forEach(visited => {
        if(visited){
          count ++;
        }
      }))
      return count;
    };


    dfsGrid(P1Coor.y,P1Coor.x);
    //reset Grid
    const P1Square = CountSquare()
    MoveObjectGrid = MoveObjectGrid.map(row=>row.map(()=> false))
    dfsGrid(P2Coor.y,P2Coor.x,2);
    const P2Square = CountSquare()
    if(P2Square !== P1Square){
      if(P1Square>P2Square){
        this.setState({ winner :1 });
      }else{
        this.setState({ winner: 2}); 
      }
    }
  }
  //TODO : this is not a working logic. Needed to be refine with better algorithm, currently no checking algorithm is implemented
  // checkWin(){
    // let MoveObjectGrid = Array(7).fill(
    //   Array(7).fill(0)
    // );

  //   MoveObjectGrid = MoveObjectGrid.map(row=>row.map(obj => 
  //     ({ checkedDown: false, checkedUp: false, checkedLeft:false,checkedRight:false})
  //     ));
  //   let foundP2 = false;
  //   const { gameBoard, P1Coor, P2Coor } = this.state;

  //   // Always try to start from where P1 and find P2

  //   const tryMove = (i, j) => {
  //     console.log(copy(MoveObjectGrid));
  //     // Found P2 
  //     if ( i === P2Coor.y && j === P2Coor.x) {
  //       console.log("P1 can reach P2")
  //       foundP2 = true;
  //       return true;

  //     }else if (
  //       MoveObjectGrid[i][j].checkedDown &&
  //       MoveObjectGrid[i][j].checkedRight &&
  //       MoveObjectGrid[i][j].checkedLeft &&
  //       MoveObjectGrid[i][j].checkedUp
  //     ) {
  //       // this cell has tried every possibly direction
  //       return false;
  //     }

  //     if (i - 1 >= 0) {
  //         // try to move up , if possible and have not yet head towards up yet.
  //         if (!gameBoard[i * 2 - 1][j * 2] && !MoveObjectGrid[i][j].checkedUp) {
  //           MoveObjectGrid[i][j].checkedUp = true;
  //           return foundP2 || tryMove(i - 1, j);
  //         }
  //       }
  //     if (i + 1 < 7) {
  //       // try to move down , if possible and have not yet head towards down yet.
  //         if (!gameBoard[i * 2 + 1][j * 2] && !MoveObjectGrid[i][j].checkedDown) {
  //           MoveObjectGrid[i][j].checkedDown = true;
  //           return foundP2 || tryMove(i + 1, j);
  //         }
  //       }
  //     if (j + 1 < 7) {
  //       // try to move right , if possible and have not yet head towards right yet.
  //         if (!gameBoard[i * 2][j * 2 + 1] && !MoveObjectGrid[i][j].checkedRight) {
  //           MoveObjectGrid[i][j].checkedRight = true;
  //           return foundP2 || tryMove(i, j + 1);
  //         }
  //       }
  //     if (j - 1 >= 0) {
  //       //  try to move left , if possible and have not yet head towards left yet.
  //         if (!gameBoard[i * 2][j * 2 - 1] && !MoveObjectGrid[i][j].checkedLeft) {
  //           MoveObjectGrid[i][j].checkedLeft = true;
  //           return foundP2 || tryMove(i, j - 1);
  //         }
  //       }
  //   };
  //   tryMove(P1Coor.y,P1Coor.x);
  //   return copy(MoveObjectGrid);
  // }
  generateGrid(P1Coor, P2Coor) {
    let renderArray = grid.filter((row, i) => i % 2 === 0);
    renderArray = renderArray.map((row) =>
      row.filter((slot, i) => i % 2 === 0)
    );

    return renderArray.map((row, i) =>
      row.map((slot, j) => {
        return (
          <Slot
            key={"Slot" + i + j}
            bgColor={(i + j) % 2 === 0 ? BG_COLOR_DARK : BG_COLOR_LIGHT}
          >
            <CenterWrapper>
              {this.playerSlot(P1Coor, P2Coor, i, j)}
            </CenterWrapper>
            {this.generateFence(i, j)}
          </Slot>
        );
      })
    );
  }
  replay(){
     this.setState({
       history: [
         {
           player: 1,
           readyToPlaceGrid: false,
           P1Coor: { x: 0, y: 0 },
           P2Coor: { x: 6, y: 6 },
           gameBoard: copy(grid),
         },
       ],
       gameBoard: copy(grid),
       P1Coor: { x: 0, y: 0 },
       P2Coor: { x: 6, y: 6 },
       player: 1,
       fenceSelectionOn: false,
       selected: false,
       hoverGrid: copy(hoverGrid),
       readyToPlaceGrid: false,
       winner: null,
     })
  }
  redo() {
    let { history} = this.state;

    //...history gives P1Coor and P2 Coor
    history.pop();
    const { P1Coor, P2Coor,gameBoard,readyToPlaceGrid,player } = history[history.length - 1];
    this.setState({
      history,
      readyToPlaceGrid,
      gameBoard,
      P1Coor,
      P2Coor,
      player,
    });
  }
  surrender(){
    const {player} = this.state;
    this.setState({
      winner: player === 1? 2:1
    })
  }
  render() {
    const { P1Coor, P2Coor, selected, hoverGrid, player, history, winner } = this.state;

    return (
      <React.Fragment>
        <MainWrapper>
          <GridLayout>
            {this.generateGrid(P1Coor, P2Coor)}
            {winner ? (
              <WinnerPop bgcolor={"#ffffffd9"}>
                <Text color={BG_COLOR_DARK}>Player {winner} Wins !</Text>
                <RestartBtn
                  bgcolor={"#ffffffd9"}
                  btncolor={BG_COLOR_DARK}
                  btnbordercolor={BG_COLOR_DARK}
                  btnhovercolor={"white"}
                  btnhoverbgcolor={BG_COLOR_DARK}
                  variant="outlined"
                  onClick={this.replay}
                >
                  Replay
                </RestartBtn>
              </WinnerPop>
            ) : null}
          </GridLayout>
          {selected ? (
            <HoverCanvas
              hoverGrid={hoverGrid}
              player={player}
              onClick={this.handleMove}
            />
          ) : null}
        </MainWrapper>
        <PlayerInfo
          player={player}
          surrenderDisabled={history.length === 1 || !!winner}
          redoDisabled={history.length === 1 || !!winner}
          redo={this.redo}
          surrender={this.surrender}
        />
      </React.Fragment>
    );
  }
}


export default GameBoard;