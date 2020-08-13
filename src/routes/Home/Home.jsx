import React from 'react';
import styled from 'styled-components';
import Profile from '../../components/Profile';
import Navbar from "../../components/Navbar";
import Display from "../../components/Display";


const Layout = styled.section`
  display:flex;
  flex-direction:column;
  justify-content:space-evenly;
  align-items:center;
`;

export default () => (
  <Layout>
    <Profile/>
    <Navbar/>
    <Display header = "Current Header"/>
  </Layout>)