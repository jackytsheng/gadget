import React from 'react';
import styled from 'styled-components';
import { Redirect } from 'react-router-dom';
import { withStyles } from '@material-ui/styles';
import ProjectCard from './components/ProjectCard';
import sudoku from './img/sudoku-demo.png'; // Tell webpack this JS file uses this image
import Background from './components/Background';
import Tetris from './img/tetris.png';
import TwoZeroFourEightDemo from './img/2048.png';
import DobutsuShogi from './img/dobutsu-shogi.png';
import Siege from './img/siege.png';
import SpinningWheel from './img/spinning-wheel.png';
import Snake from './img/snake.png';
import Typography from '@material-ui/core/Typography';

const WIDTH = '325px';
const MEDIA_HEIGHT = '140px';

const DisplayContainer = styled.div`
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
const Copyright = withStyles({
  root: {
    margin: '0 0 30px',
    display: 'flex',
    justifyContent: 'center',
    fontSize: '0.8rem',
    color: '#3b3e40',
  },
})(Typography);

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: '/',
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(url) {
    this.setState({ redirect: url });
  }

  render() {
    return (
      <React.Fragment>
        <Background />
        <DisplayContainer>
          <ProjectCard
            width={WIDTH}
            height={MEDIA_HEIGHT}
            img={Snake}
            title='Snake'
            subTitle='developed in 2019'
            description='A simple retro pixel snake game that brings back memory'
            handleClick={() => {
              this.handleClick('/snake');
            }}
            stacks={['React']}
          />
          <ProjectCard
            width={WIDTH}
            height={MEDIA_HEIGHT}
            img={Tetris}
            title='Tetris'
            subTitle='developed in 2019'
            stacks={['React']}
            description="Who doesn't love tetris? Another epic childhood memory"
            handleClick={() => {
              this.handleClick('/tetris');
            }}
          />
          <ProjectCard
            width={WIDTH}
            height={MEDIA_HEIGHT}
            img={TwoZeroFourEightDemo}
            title='2048 Clone'
            subTitle='developed in 2020'
            description='A clone of 2048, with Score recorded in the local storage'
            handleClick={() => {
              this.handleClick('/2048');
            }}
            stacks={['React']}
          />
          <ProjectCard
            width={WIDTH}
            img={sudoku}
            height={MEDIA_HEIGHT}
            title='Sudoku Solver'
            subTitle='developed in 2020'
            description='Solving sudoku puzzle with input number provided, returning all possible solutions.'
            handleClick={() => {
              this.handleClick('/sudokusolver');
            }}
            stacks={['React', 'Lambda']}
          />
          <ProjectCard
            width={WIDTH}
            img={DobutsuShogi}
            height={MEDIA_HEIGHT}
            title='Dobutsu Shogi'
            subTitle='developed in 2020'
            description='Familarise yourself with Mini Shogi. Have fun with your friend!'
            handleClick={() => {
              this.handleClick('/dobutsushogi');
            }}
            stacks={['React']}
          />
          <ProjectCard
            width={WIDTH}
            img={Siege}
            height={MEDIA_HEIGHT}
            title='Siege'
            subTitle='developed in 2020'
            description="Love to play game of Go but don't have much time? Try Siege"
            handleClick={() => {
              this.handleClick('/siege');
            }}
            stacks={['React']}
          />
          <ProjectCard
            width={WIDTH}
            img={SpinningWheel}
            height={MEDIA_HEIGHT}
            title='Spinning Wheel'
            subTitle='developed in 2021'
            description='Want to enjoy the most out of your party game ? Spin this roulette'
            handleClick={() => {
              this.handleClick('/spinning-wheel');
            }}
            stacks={['React']}
          />
          <ProjectCard
            width={WIDTH}
            img={SpinningWheel}
            height={MEDIA_HEIGHT}
            title='Tic Tac Bigger Toe'
            subTitle='developed in 2022'
            description='Of course you know how to play Tic Tac Toe, but what about this variant ? bigger toe?'
            handleClick={() => {
              this.handleClick('/tictacbiggertoe');
            }}
            stacks={['React']}
          />
          {/* <ProjectCard
            width={WIDTH}
            img={Siege}
            height={MEDIA_HEIGHT}
            title="Logic Simulator"
            description="Want to build your own abstructive logic gates ? Put your hands on it"
            handleClick={() => {
              this.handleClick("/logicsimulator");
            }}
          /> */}
          <Filler />
          <Filler />
          <Filler />
          <Filler />
          <Filler />
          <Filler />
        </DisplayContainer>
        <Redirect to={this.state.redirect} />
        <Copyright component='div'>
          Copyright &copy; 2022 Jiajin Zheng. All rights reserved.
        </Copyright>
      </React.Fragment>
    );
  }
}
export default Home;
