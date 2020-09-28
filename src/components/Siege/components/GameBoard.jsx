import React from 'react';
import styled from "styled-components";
import CenterWrapper from '../../../Layout/CenterWrapper';
import WhiteKnight from '../svg/WhiteKnight.svg';
import DarkKnight from "../svg/DarkKnight.svg";
import Chess from './Chess';
import HoverCanvas, { hoverGrid, GridBase, Slot } from "./HoverCanvas";
import PlayerInfo from './PlayerInfo';

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
      history: [{ P1Coor: { x: 0, y: 0 }, P2Coor: { x: 6, y: 6 } }],
      gameBoard: copy(grid),
      P1Coor: { x: 0, y: 0 },
      P2Coor: { x: 6, y: 6 },
      player: 1,
      selected: false,
      hoverGrid: copy(hoverGrid),
    };
    this.redo = this.redo.bind(this);
    this.handleMove = this.handleMove.bind(this);
    this.toggleSelected = this.toggleSelected.bind(this);
  }

  toggleSelected(player) {
    let hoverGrid = this.generateMovableSlot(player);

    this.setState({ selected: !this.state.selected, hoverGrid,});
  }

  isOtherPlayerOnSpot(x, y) {
    const { P1Coor, P2Coor ,player} = this.state;
    if(player === 1){
      return (
        x === P2Coor.x && y === P2Coor.y
      );
    }else{
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
          gameBoard[i * 2 - 1][j * 2] !== "w" &&
          gameBoard[i * 2 - 1][j * 2] !== "W" &&
          comeFrom !== "up" 
        ) {
          grid[i - 1][j] = "o";
          canMove(i - 1, j, stepLeft - 1, "down");
        }
      }
      if (i + 1 < 7) {
        // try to move down , if possible
        if (
          gameBoard[i * 2 + 1][j * 2] !== "w" &&
          gameBoard[i * 2 + 1][j * 2] !== "W" &&
          comeFrom !== "down" 
        ) {
          grid[i + 1][j] = "o";
          canMove(i + 1, j, stepLeft - 1, "up");
        }
      }
      if (j + 1 < 7) {
        // try to move right , if possible
        if (
          gameBoard[i * 2][j * 2 + 1] !== "w" &&
          gameBoard[i * 2][j * 2 + 1] !== "W" &&
          comeFrom !== "right"
        ) {
          grid[i][j + 1] = "o";
          canMove(i, j + 1, stepLeft - 1, "left");
        }
      }
      if (j - 1 >= 0) {
        // try to move left , if possible
        if (
          gameBoard[i * 2][j * 2 - 1] !== "w" &&
          gameBoard[i * 2][j * 2 - 1] !== "W" &&
          comeFrom !== "left"
        ) {
          grid[i][j - 1] = "o";
          canMove(i, j - 1, stepLeft - 1, "right");
        }
      }
    };
    canMove(i, j, stepLeft, "");
    grid[P1Coor.y][P1Coor.x]="x";
    grid[P2Coor.y][P2Coor.x] = "x";
    return copy(grid);
  }

  handleMove(x, y, player) {
    let {history,P1Coor,P2Coor} = this.state;
    
    if (player === 1) {
      history.push({P1Coor:{x,y},P2Coor});
      this.setState({
        history,
        selected: false,
        P1Coor: { x, y },
        player: 2,
      });
    } else {
      history.push({ P2Coor: { x, y }, P1Coor });
      this.setState({
        history,
        selected: false,
        P2Coor: { x, y },
        player: 1,
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
          disabled={this.state.player === 2}
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
          disabled={this.state.player === 1}
          onClick={() => this.state.player === 2 ? this.toggleSelected(2) : undefined}
        ></Chess>
      );
    }
  }

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
          </Slot>
        );
      })
    );
  }
  redo(){
    let {history,player} = this.state;
    
    //...history gives P1Coor and P2 Coor
    history.pop();
    const { P1Coor, P2Coor } = history[history.length-1];
    this.setState({
        history,
        P1Coor, 
        P2Coor,
        player: player === 1 ? 2:1
      });
  }
  render() {
    const { P1Coor, P2Coor, selected, hoverGrid, player ,history} = this.state;

    return (
      <React.Fragment>
        <MainWrapper>
          <GridLayout>{this.generateGrid(P1Coor, P2Coor)}</GridLayout>
          {selected ? (
            <HoverCanvas
              hoverGrid={hoverGrid}
              player={player}
              onClick={this.handleMove}
            />
          ) : null}
        </MainWrapper>
        <PlayerInfo player={player} surrenderDisabled ={true} redoDisabled={ history.length === 1} redo={this.redo}/>
      </React.Fragment>
    );
  }
}


export default GameBoard;