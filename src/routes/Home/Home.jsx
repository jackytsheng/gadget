import React from 'react';
import styled from 'styled-components';
import {Redirect} from 'react-router-dom';
import {Alert,AlertTitle} from '@material-ui/lab';
import ProjectCard from './ProjectCard';


const Layout = styled.section`
  display:flex;
  flex-direction:column;
  justify-content:space-evenly;
  align-items:center;
  height:300px; 
`;

const DisplayConatiner = styled.div`
  width:100%;
  display: flex;
  justify-content: space-evenly;
  flex-wrap:wrap;
  box-sizing:border-box;
`

const Filler = styled.div`
  width:345px;
`

class Home extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      redirect:"/"
    }
    this.handleClick = this.handleClick.bind(this);
  }


  handleClick(url){
    this.setState({ redirect: url });
  }

  render() {
    return (
      <React.Fragment>
        <Layout>
          <Alert severity="info">
            <AlertTitle>Progress</AlertTitle>
            I'm currently working on this home page...
          </Alert>
        </Layout>
        <DisplayConatiner>
          <ProjectCard
            title="SudoKu Solver"
            description="Solving sudoku puzzle with input number provided, returning all possible solutions."
            handleClick={() => {
              this.handleClick("/sudokusolver");
            }}
          />
          <ProjectCard
            title="SudoKu Solver"
            description="Solving sudoku puzzle with input number provided, returning all possible solutions."
            handleClick={() => {
              this.handleClick("/sudokusolver");
            }}
          />
          <ProjectCard
            title="SudoKu Solver"
            description="Solving sudoku puzzle with input number provided, returning all possible solutions."
            handleClick={() => {
              this.handleClick("/sudokusolver");
            }}
          />
          <Filler />
          <Filler />
        </DisplayConatiner>
        <Redirect to={this.state.redirect} />
      </React.Fragment>
    );
  }
}
export default Home;

