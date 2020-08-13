import React from "react";
import CenterWrapper from "../../Layout/CenterWrapper";
import styled from "styled-components";
import Grid from './components/Grid';
import Button from "@material-ui/core/Button";



const SudokuGridWrapper = styled.div`
  width: 415px;
  height: 400px;
  margin-bottom:20px;
  border-radius: 5px;
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


class SudokuSolver extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      grid,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  registerNumberOnGrid(y, x, n) {
    grid[y][x] = n;
    this.setState({ grid });
  }
  handleChange(e, y, x) {
    e.preventDefault();
    const { value } = e.target.value ? e.target : { value: 0 };
    if (this.validate(value)) {
      this.registerNumberOnGrid(y, x, parseInt(value));
    }
  }
  validate(value) {
    const regex = /[0-9]/;
    if (regex.test(value)) {
      this.setState({ error: "" });
      return true;
    }
    this.setState({ error: `${value} is not a valid number` }, () =>
      console.log(this.state.error)
    );
    return false;
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
            <Grid handleChange={this.handleChange} />
          </SudokuGridWrapper>
          <Button variant="contained" color="default" onClick={e=>console.log(this.state.grid)}>
            Solve
          </Button>
        </FlexVerticalWrapper>
      </CenterWrapper>
    );
  }
} 

export default SudokuSolver;