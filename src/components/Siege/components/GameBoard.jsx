import React from 'react';
import styled from "styled-components";
import CenterWrapper from '../../../Layout/CenterWrapper';
import WhiteKnight from '../svg/WhiteKnight.svg';
import DarkKnight from "../svg/DarkKnight.svg";

const CHESS_COLOR_DARK = "#622f00";
const CHESS_COLOR_LIGHT = "#f99d25";
const BG_COLOR_LIGHT = "#ffc982";
const BG_COLOR_DARK = "#ab7039";
const PLAYER_ONE_HOVER_COLOR  = "#ffc98261";
const PLAYER_TWO_HOVER_COLOR  = "#ab703961";

// game board
// [
//   [0 ,"",0 ,"",0 ,"",0 ,"",0 ,"",0 ,"",0 ],
//   ["","","","","","","","","","","","",""],
//   [0 ,"",0 ,"",0 ,"",0 ,"",0 ,"",0 ,"",0 ],
//   ["","","","","","","","","","","","",""],
//   [0 ,"",0 ,"",0 ,"",0 ,"",0 ,"",0 ,"",0 ],
//   ["","","","","","","","","","","","",""],
//   [0 ,"",0 ,"",0 ,"",0 ,"",0 ,"",0 ,"",0 ],
//   ["","","","","","","","","","","","",""],
//   [0 ,"",0 ,"",0 ,"",0 ,"",0 ,"",0 ,"",0 ],
//   ["","","","","","","","","","","","",""],
//   [0 ,"",0 ,"",0 ,"",0 ,"",0 ,"",0 ,"",0 ],
//   ["","","","","","","","","","","","",""],
//   [0 ,"",0 ,"",0 ,"",0 ,"",0 ,"",0 ,"",0 ],
// ]

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

const hoverGrid = [
  ["x", "o", "x", "x", "x", "x", "x"],
  ["x", "o", "x", "x", "x", "x", "x"],
  ["x", "o", "x", "x", "x", "x", "x"],
  ["x", "o", "x", "x", "x", "x", "x"],
  ["x", "o", "x", "x", "x", "x", "x"],
  ["x", "o", "x", "x", "x", "x", "x"],
];

const MainWrapper = styled.div`
  position:relative;
`


const GridBase = styled.div`
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
const GridLayout = styled(GridBase)`
 
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
 
`;

const HoverLayout= styled(GridBase)`
  position:absolute;
  top:0;
  bottom:0;
  left:0;
  right:0;
`;


const Slot = styled.div`
  width: 100%;
  height: 100%;
  background-color:${props => props.bgColor};
`;

const HoverSlot = styled(Slot)`

  &:hover{
    background-color:green;
  }
`
const HoverSlotFiller = styled.div`
  width: 100%;
  height: 100%;
`

const Chess = styled.img`
  width: 60px;
  height: 60px;
  &:hover{
    cursor:pointer;
  }
  @media (max-width: 650px) {
    width: 47px;
    height: 47px;
  }
`;


const generateHoverGrid = (grid, onClick,player) => {

  return grid.map(row => row.map(column => {
    
    if(column === "o"){
      return (
        <HoverSlot
          key={"Hover" + row + column}
          onClick={() => onClick(row, column)}
          bgColor={
            player === 1 ? PLAYER_ONE_HOVER_COLOR : PLAYER_TWO_HOVER_COLOR
          }
        />
      );
    }else{
      return <HoverSlotFiller key={("Hover" + row + column)}/>
    }
  }))

  
};

const HoverCanvas = ({onClick,player,hoverGrid}) =>{

return (
  <HoverLayout>{generateHoverGrid(hoverGrid, onClick, player)}</HoverLayout>
);


}




class GameBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [],
      P1Coor: { x: 0, y: 0 },
      P2Coor: { x: 6, y: 6 },
      player: 1,
      selected: false,
    };
    this.toggleSelected = this.toggleSelected.bind(this);
  }

  toggleSelected(){
    console.log("click")
    this.setState({selected:!this.state.selected})
  }

  playerSlot(P1Coor, P2Coor, row, column){
    if (P1Coor.x === column && P1Coor.y === row) {
      return <Chess src={DarkKnight} alt="Dark Knight" onClick={this.toggleSelected}></Chess>;
    } else if (P2Coor.x === column && P2Coor.y === row) {
      return (
        <Chess
          src={WhiteKnight}
          alt="White Knight"
          onClick={this.toggleSelected}
        ></Chess>
      );
    }
  };

  generateGrid(P1Coor, P2Coor){
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
            <CenterWrapper>{this.playerSlot(P1Coor, P2Coor, i, j)}</CenterWrapper>
          </Slot>
        );
      })
    );
  };

  generateMovableGrid(){
    

  }
  render() {
    const { P1Coor, P2Coor, selected } = this.state;

    return (
      <MainWrapper>
        <HoverCanvas hoverGrid={hoverGrid} player={1} onClick={()=>console.log("i'm click")}></HoverCanvas>
        <GridLayout>
          {this.generateGrid(P1Coor, P2Coor)}
          {selected ? this.generateMovableGrid() : null}
        </GridLayout>
      </MainWrapper>
    );
  }
}


export default GameBoard;