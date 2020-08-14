import React from "react";
import CenterWrapper from "../../Layout/CenterWrapper";
import styled from "styled-components";
import Grid from './components/Grid';
import {Button,CircularProgress} from "@material-ui/core";
import {Alert} from "@material-ui/lab";



const  MINIMUM_INPUT = 19;

const SudokuGridWrapper = styled.div`
  width: 415px;
  height: 400px;
  margin-bottom:20px;
  border-radius: 5px;
  position:relative;
`;
const Title = styled.div`
  width:415px;
  margin-bottom:20px;
  font-size:50px;
  font-weight:700;
`
const SubTitle = styled.div`
  width: 415px;
  font-size: 20px;
`;

const FlexVerticalWrapper = styled.div`
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;
  position:relative;
` 

const WarningFlexWrapper = styled.div`
  margin-top: 10px;
  position: absolute;
  bottom: -100px;
  display: flex;
  flex-direction: column;
`;

const LoaderWrapper =styled.div`
  z-index:5;
  background-color: rgba(0,0,0,0.4);
  display:flex;
  justify-content:center;
  align-items:center;
  bottom:0;
  left:0;
  right:0;
  top:0;
  position:absolute;
`

let grid = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
];

// better not do any algorithm at the client site .. too slow
class SudokuSolver extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      grid,
      errorQueue:[],
      loading:false,
      // validGrid:true,
    };
    this.handleChange = this.handleChange.bind(this);
  }


  
//   isValidNumber(y,x,n){
//     const {grid} = this.state;
//     for (let i = 0; i < 9; i++) {
//       if (grid[y][i] === n) {
//         this.setState({validGrid: false });
//         return 
//       }
//     }

//     for (let i = 0; i < 9; i++) {
//       if (grid[i][x] === n) {
//         this.setState({validGrid: false });
//         return 
//       }
//     }
//     const x_0 = Math.floor(x / 3) * 3;
//     const y_0 = Math.floor(y / 3) * 3;
//     for (let i = 0; i < 3; i++) {
//       for (let j = 0; j < 3; j++) {
//         if (grid[y_0 + i][x_0 + j] === n) {
//           this.setState({validGrid: false });
//           return 
//         }
//       }
//     }
//     this.setState({validGrid: true });
// }

// // isValidGrid(){
// //   for (let i = 0; i < 9; i++) {
// //       for (let j = 0; j < 9; j++) {
// //         if (this.state.grid[i][j]!==0){
// //           this.isValidNumber(i, j, this.state.grid[i][j]);
// //         }
// //       }
// //     }
// // }

  validCoordinate(y,x){
    let filterArray = this.state.errorQueue.filter((cor) => (cor.y !== y || cor.x !== x));
    this.setState({errorQueue:filterArray});
  }

  registerNumberOnGrid(y, x, n) {
    grid[y][x] = n;
    this.setState({ grid },()=> this.validCoordinate(y,x));
  }
  handleChange(e, y, x) {
    e.preventDefault();
    
      const { value } = e.target.value ? e.target : { value: 0 };
    if (this.validate(value) && parseInt(e.target.value) !== 0) {
      // this.isValidGrid();
      this.registerNumberOnGrid(y, x, parseInt(value));
    } else {
      let errorQueue = this.state.errorQueue;
      errorQueue.push({ y, x });
      this.setState({ errorQueue });
    }
  }
  validate(value) {
    const regex = /[0-9]/;
    if (regex.test(value)) {
      return true;
    }
    return false;
  }
  countGrid(){
    const {grid} = this.state;
    let count = 0;
    grid.forEach(row=>row.forEach(n => {
      if(n!==0){
        count ++;
      }
    }))
    return count;
  }

  render() {
    return (
      <CenterWrapper>
        <FlexVerticalWrapper>
          <Title>Sudoku Solver</Title>
          <SubTitle>By Jiajin Zheng</SubTitle>
        </FlexVerticalWrapper>
        <FlexVerticalWrapper>
          <SudokuGridWrapper>
            {this.state.loading?
            <LoaderWrapper>
              <CircularProgress color="primary" />
            </LoaderWrapper>:null
            }
            <Grid
              handleChange={this.handleChange}
              errorQueue={this.state.errorQueue}
            />
          </SudokuGridWrapper>
          <Button
            variant="contained"
            color="default"
            onClick={(e) => console.log(this.state.grid)}
            disabled={
              !(
                this.state.errorQueue.length === 0 &&
                this.countGrid() > MINIMUM_INPUT &&
                this.state.validGrid
              )
            }
          >
            Solve
          </Button>

          <WarningFlexWrapper>
            {this.countGrid() > MINIMUM_INPUT ? null : (
              <Alert severity="error">
                At least <strong>{MINIMUM_INPUT + 1}</strong> numbers are
                required.
              </Alert>
            )}
            {this.state.errorQueue.length === 0 ? null : (
              <Alert severity="error">
                Please input only <strong>1-9</strong>.
              </Alert>
            )}
            {/* {this.state.validGrid ? null : (
              <Alert severity="error">No duplicated input is allowed.</Alert>
            )} */}
          </WarningFlexWrapper>
        </FlexVerticalWrapper>
      </CenterWrapper>
    );
  }
} 

export default SudokuSolver;