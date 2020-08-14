import React from 'react';
import styled from 'styled-components';
import Profile from '../../components/Profile';
import Navbar from "../../components/Navbar";
import Display from "../../components/Display";
import {Redirect} from 'react-router-dom';

const Layout = styled.section`
  display:flex;
  flex-direction:column;
  justify-content:space-evenly;
  align-items:center;
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
        <Profile />
        <Navbar />
        <button onClick = {this.handleClick}>
          Redirect
        </button>
        {this.state.redirect ? <Redirect to="/sudokusolver" /> : null}
        <Display header="Current Header" />
      </Layout>
    );
  }
}
export default Home;

