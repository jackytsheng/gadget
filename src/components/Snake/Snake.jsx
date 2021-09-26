import React from 'react';
import styled from 'styled-components';
import CenterWrapper from '../../Layout/CenterWrapper';
import Canvas from './components/Canvas';

const GRID_WIDTH = '300px';

const Wrapper = styled(CenterWrapper)`
  @media (max-width: 850px) {
    flex-direction: column;
  }
  @media (max-width: 500px) {
    margin-top: 40px;
    justify-content: flex-start;
  }
`;

const Title = styled.div`
  width: ${GRID_WIDTH};
  margin-bottom: 20px;
  font-size: 50px;
  font-weight: 700;
  @media (max-width: 500px) {
    font-size: 25px;
    margin-bottom: 10px;
    width: ${GRID_WIDTH};
  }
`;
const SubTitle = styled.div`
  width: ${GRID_WIDTH};
  font-size: 20px;
  @media (max-width: 500px) {
    font-size: 18px;
    width: ${GRID_WIDTH};
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

const Flex = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  margin: 20px 0;
  @media (max-width: 500px) {
    margin: 5px 0;
  }
`;

export default () => {
  return (
    <Wrapper>
      <FlexVerticalWrapper>
        <Title>Snake</Title>
        <SubTitle>By Jiajin Zheng</SubTitle>
      </FlexVerticalWrapper>
      <Flex>
        <Canvas />
      </Flex>
    </Wrapper>
  );
};
