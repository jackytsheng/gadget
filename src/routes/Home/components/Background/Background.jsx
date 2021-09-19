import React from 'react';
import styled from 'styled-components';
import Ghost from '../Ghost';
import Elephant from '../Elephant';
import Clock from '../Clock';

const Layout = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`;

export default () => (
  <Layout>
    <Elephant />
  </Layout>
);
