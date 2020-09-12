import React from 'react';
import styled from 'styled-components';
import {Redirect} from 'react-router-dom';
import {Alert,AlertTitle} from '@material-ui/lab';
import ProjectCard from './components/ProjectCard';
import sudoku from './img/sudoku-demo.png'; // Tell webpack this JS file uses this image
import Ghost from './components/Ghost';
import TwoZeroFourEightDemo from './img/2048.png';
import DobutsuShogi from './img/dobutsu-shogi.png';


const WIDTH = '325px';
const MEDIA_HEIGHT = "140px";

const SHADOW_COLOR = "#b1b6d8";
const FILL_COLOR = "#e8f4fd";
const STROKE_COLOR = "#315c7d"; 

const Layout = styled.section`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  height: 300px;
  @media (max-width: 500px) {
    flex-direction: column;
    height: 400px;
  }
`;

const DisplayConatiner = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  box-sizing: border-box;
`;

const Filler = styled.div`
  width: ${WIDTH};
  margin: 10px;
`;

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
          <Ghost
            shadow={SHADOW_COLOR}
            fill={FILL_COLOR}
            stroke={STROKE_COLOR}
          />
          <Alert severity="info">
            <AlertTitle>Progress</AlertTitle>
            I'm <strong>improving UI </strong> on this home page...
          </Alert>
        </Layout>
        <DisplayConatiner>
          <ProjectCard
            width={WIDTH}
            height={MEDIA_HEIGHT}
            img={TwoZeroFourEightDemo}
            title="2048 Clone"
            description="A clone of 2048, with Score recorded in the local storage"
            handleClick={() => {
              this.handleClick("/2048");
            }}
          />
          <ProjectCard
            width={WIDTH}
            img={sudoku}
            height={MEDIA_HEIGHT}
            title="Sudoku Solver"
            description="Solving sudoku puzzle with input number provided, returning all possible solutions."
            handleClick={() => {
              this.handleClick("/sudokusolver");
            }}
          />
          <ProjectCard
            width={WIDTH}
            img={DobutsuShogi}
            height={MEDIA_HEIGHT}
            title="Dobutsu Shogi"
            description="Familarise yourself with Mini Shogi. Have fun with your friend!"
            handleClick={() => {
              this.handleClick("/dobutsushogi");
            }}
          />
          <Filler />
          <Filler />
          <Filler />
          <Filler />
          <Filler />
          <Filler />
        </DisplayConatiner>
        <Redirect to={this.state.redirect} />
      </React.Fragment>
    );
  }
}
export default Home;

