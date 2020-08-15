import React from "react";
import CenterWrapper from "../../Layout/CenterWrapper";
import styled from "styled-components";
import Grid from './components/Grid';
import {Button,CircularProgress} from "@material-ui/core";
import {Alert} from "@material-ui/lab";
import axios from "axios";

const MINIMUM_INPUT = 19;
const GRID_WIDTH = '415px';
const GRID_HEIGHT = "400px";
const GRID_WIDTH_SM = "315px";
const GRID_HEIGHT_SM = "300px";
const API_KEY = "ZY7dfBSnxU4izbMYFNHED9so3dxiVcC12Fza7MXb";
const config = {
  headers: {
    "X-Api-Key": API_KEY,
  },
};


const Wrapper = styled(CenterWrapper)`
  @media (max-width: 850px) {
    flex-direction: column;
  }
`;
const SOLVER_URL =
  "https://umvovqu86c.execute-api.ap-southeast-2.amazonaws.com/test/sudokusolver";
const SudokuGridWrapper = styled.div`
  width: ${GRID_WIDTH};
  height: ${GRID_HEIGHT};
  @media (max-width: 500px) {
    width: ${GRID_WIDTH_SM};
    height: ${GRID_HEIGHT_SM};
  }
  margin: 20px 0;
  border-radius: 5px;
  position: relative;
  
`;
const Title = styled.div`
  width: ${GRID_WIDTH};
  margin-bottom: 20px;
  font-size: 50px;
  font-weight: 700;
  @media (max-width: 500px) {
    font-size: 30px;
    width: ${GRID_WIDTH_SM};
  }
`;
const SubTitle = styled.div`
  width: ${GRID_WIDTH};
  font-size: 20px;
  @media (max-width: 500px) {
    font-size: 18px;
    width: ${GRID_WIDTH_SM};
  }
`;

const FlexVerticalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  margin: 20px 0;
  @media (max-width: 500px) {
    margin: 5px 0;
  }
`; 

const WarningFlexWrapper = styled.div`
  margin-top: 10px;
  position: absolute;
  bottom: -120px;
  display: flex;
  flex-direction: column;
  height:100px;
  justify-content:space-between;
`;

const ButtonFlexWrapper = styled.div`
  margin-top: 10px;
  position: relative;
  display: flex;
  width: ${GRID_WIDTH};
  @media (max-width: 500px) {
    width: ${GRID_WIDTH_SM};
  }
  justify-content: space-evenly;
`;

const ButtonInvisable = styled(Button)`
  color:#fff;
`

const ClearBtn = styled(Button)`
  color: #fff;
  margin-bottom: 30px;
  align-self:flex-start;
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

const defaultGrid = [
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
let grid = [
  [5, 3, 0, 0, 7, 0, 0, 0, 0],
  [6, 0, 0, 1, 9, 5, 0, 0, 0],
  [0, 9, 8, 0, 0, 0, 0, 6, 0],
  [8, 0, 0, 0, 6, 0, 0, 0, 3],
  [4, 0, 0, 8, 0, 3, 0, 0, 1],
  [7, 0, 0, 0, 2, 0, 0, 0, 6],
  [0, 6, 0, 0, 0, 0, 2, 8, 0],
  [0, 0, 0, 4, 1, 9, 0, 0, 5],
  [0, 0, 0, 0, 8, 0, 0, 7, 9],
];
// let resultGrid = [[
//   [5, 3, 4, 6, 7, 8, 9, 1, 2],
//   [6, 7, 2, 1, 9, 5, 3, 4, 8],
//   [1, 9, 8, 3, 4, 2, 5, 6, 7],
//   [8, 5, 9, 7, 6, 1, 4, 2, 3],
//   [4, 2, 6, 8, 5, 3, 7, 9, 1],
//   [7, 1, 3, 9, 2, 4, 8, 5, 6],
//   [9, 6, 1, 5, 3, 7, 2, 8, 4],
//   [2, 8, 7, 4, 1, 9, 6, 3, 5],
//   [3, 4, 5, 2, 8, 6, 1, 7, 9],
// ]];

// better not do any algorithm at the client site .. too slow
class SudokuSolver extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      grid:JSON.parse(JSON.stringify(grid)),
      loading: false,
      result: [],
      currResult: 0,
      noAns: false,
      systemError:false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleResultChange = this.handleResultChange.bind(this);
    this.clearGrid = this.clearGrid.bind(this);
  }

  clearGrid(){
    this.setState({ grid:JSON.parse(JSON.stringify(defaultGrid)), result: [] });
  }
  handleResultChange(type) {
    switch (type) {
      case "NEXT":
        this.setState({ currResult: this.state.currResult + 1 });
        return;
      case "PREV":
        this.setState({ currResult: this.state.currResult - 1 });
        return;
      default:
        return;
    }
  }

  async postGrid() {
    this.setState({
      loading: true,
    });
    await axios
      .post(SOLVER_URL, {
        grid: JSON.stringify(this.state.grid),
      },config)
      .then((res) => {
        this.setState(
          {
            loading: false,
            result: res.data,
            noAns: res.data.length === 0,
          },
          () => {
            setTimeout(() => this.setState({ noAns: false }), 3000);
          }
        );

        console.log(res.data);
      })
      .catch((err) => {
        this.setState({ loading: false, systemError: true }, () => {
          setTimeout(() => this.setState({ systemError: false}), 5000);
        });
        console.log(err);
      });
  }

  registerNumberOnGrid(y, x, n) {
    let grid = JSON.parse(JSON.stringify(this.state.grid));
    grid[y][x] = n;
    this.setState({ noAns: false, grid, result: [] });
  }
  handleChange(e, y, x) {
    e.preventDefault();

    const { value } = e.target.value ? e.target : { value: 0 };
    if (this.validate(value) && parseInt(e.target.value) !== 0) {
      this.registerNumberOnGrid(y, x, parseInt(value));
    }
  }
  validate(value) {
    const regex = /[0-9]/;
    if (regex.test(value)) {
      return true;
    }
    return false;
  }
  countGrid() {
    const { grid } = this.state;
    let count = 0;
    grid.forEach((row) =>
      row.forEach((n) => {
        if (n !== 0) {
          count++;
        }
      })
    );
    return count;
  }

  render() {
    return (
      <Wrapper>
        <FlexVerticalWrapper>
          <Title>Sudoku Solver</Title>
          <SubTitle>By Jiajin Zheng</SubTitle>
        </FlexVerticalWrapper>
        <FlexVerticalWrapper>
          <ClearBtn variant="outlined" onClick={this.clearGrid}>
            Clear Grid
          </ClearBtn>
          <SudokuGridWrapper>
            {this.state.loading ? (
              <LoaderWrapper>
                <CircularProgress color="primary" />
              </LoaderWrapper>
            ) : null}
            <Grid
              grid={this.state.grid}
              resultGrid={
                this.state.result.length
                  ? this.state.result[this.state.currResult]
                  : []
              }
              handleChange={this.handleChange}
            />
          </SudokuGridWrapper>
          <ButtonFlexWrapper>
            {this.state.result.length === 0 ? null : this.state.currResult >
              0 ? (
              <Button onClick={(e) => this.handleResultChange("PREV")}>
                Prev Ans
              </Button>
            ) : (
              <ButtonInvisable disabled>Prev Ans</ButtonInvisable>
            )}
            <Button
              variant="contained"
              color="default"
              onClick={(e) => {
                this.postGrid();
              }}
              disabled={!(this.countGrid() > MINIMUM_INPUT)}
            >
              Solve
            </Button>
            {this.state.result.length === 0 ? null : this.state.currResult <
              this.state.result.length - 1 ? (
              <Button onClick={(e) => this.handleResultChange("NEXT")}>
                Next Ans
              </Button>
            ) : (
              <ButtonInvisable disabled>Next Ans</ButtonInvisable>
            )}
          </ButtonFlexWrapper>
          <WarningFlexWrapper>
            {this.countGrid() > MINIMUM_INPUT ? null : (
              <Alert severity="info">
                At least <strong>{MINIMUM_INPUT + 1}</strong> numbers are
                required.
              </Alert>
            )}
            {this.state.noAns ? (
              <Alert severity="warning">
                No solution can be found,{" "}
                <strong> please check your inputs</strong>.
              </Alert>
            ) : null}
            {this.state.systemError ? (
              <Alert severity="error">
                <strong>Oops!</strong> Something doesn't seem right, Please try again later.
              </Alert>
            ) : null}
          </WarningFlexWrapper>
        </FlexVerticalWrapper>
      </Wrapper>
    );
  }
} 

export default SudokuSolver;