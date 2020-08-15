import React from 'react';
import styled from 'styled-components';
import {Redirect} from 'react-router-dom';
import { Button } from "@material-ui/core";
import {Alert,AlertTitle} from '@material-ui/lab';

const Layout = styled.section`
  display:flex;
  flex-direction:column;
  justify-content:space-evenly;
  align-items:center;
  height:300px; 
`;


class Home extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      redirect:false
    }
    this.handleClick = this.handleClick.bind(this);
  }


  handleClick(){

    this.setState({ redirect: true },()=>{console.log("i got run")});
  }

  render() {
    return (
      <Layout>
        <Alert severity="info">
          <AlertTitle>Progress</AlertTitle>
          I'm currently working on this home page...
        </Alert>
        <Button variant="outlined" color="primary" onClick={this.handleClick}>
          Redirect to sudoku solver
        </Button>
        {this.state.redirect ? <Redirect to="/sudokusolver" /> : null}
      </Layout>
    );
  }
}
export default Home;

