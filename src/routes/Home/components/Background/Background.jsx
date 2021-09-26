import React from 'react';
import styled from 'styled-components';
import Elephant from '../Elephant';

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
