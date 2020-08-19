import React from "react";
import CenterWrapper from "../../Layout/CenterWrapper";
import styled from 'styled-components';
import Grid from './components/Grid';

const BG_COLOR = "#bbada0";
const BORDER_COLOR = '#766d64';
const WIDTH = '280px';
const SCORE_COLOR = "#ffffed";
const sixtyfourabove = " #f1d04a";
const sixtyfour =' #e95937';
const thirtytwo ='#f57c5e';
const sixteen ='#ec8c53';
const eight ='#f2b179';
const four ='#ece0c9';
const two ='#eee4da';

const lightcolor ='white';
const twoDigitFont ='30px';
const threeDigitFont ='28px';
const fourDigitFont ='23px';
const fiveDigitFont ='18px';

const GRID_WIDTH = "380px";
const GRID_WIDTH_SM = "315px";

const Title = styled.div`
  width: ${GRID_WIDTH};
  margin-bottom: 20px;
  font-size: 50px;
  font-weight: 700;
  @media (max-width: 500px) {
    font-size: 25px;
    margin-bottom: 10px;
    width: ${GRID_WIDTH_SM};
  }
`;
const SubTitle = styled.div`
  width: ${GRID_WIDTH};
  font-size: 20px;
  @media (max-width: 500px) {
    font-size: 18px;
    width: ${GRID_WIDTH_SM};
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

const RoundDiv = styled.div`
  border-radius:5px;
`

const GameBoard = styled(RoundDiv)`

  font-family: "Ubuntu", sans-serif;
  display: flex;
  flex-direction:column;
  background-color: #fbf8ef;
  padding:10px;
  border: solid;
  border-color: ${BORDER_COLOR};
  overflow: hidden;
`;
const TopRow = styled.div`
  display: flex;
`;

const Logo = styled(RoundDiv)`
  background-color: #e7c34b;
  height: 60px;
  width: 60px;
`;

const LogoText = styled.div`
  color: #ffffed;
  font-size: 22px;
  font-weight: 600;
  letter-spacing: 1px;
`;


const Score = styled(RoundDiv)`
  background-color: ${BG_COLOR};
  height: 60px;
  width: 70px;
  margin-left: 10px;
  display: flex;
  flex-direction:column;
`;

const ScoreText = styled.div`
  color: #ece0d2;
  margin-top: 5px;
  font-size: 12px;
  font-weight: 500;
  display: flex;
  justify-content: center;
  letter-spacing: 0.3px;
`;

const ScoreNumber = styled.div`
  flex: 1;
  color: ${SCORE_COLOR};
  font-weight:600;
  font-size : 20px;
  letter-spacing: 0.5px;
  padding-bottom:5px;
`;

const Description = styled.div`
  margin:10px 0;
  display:flex;
`

const Text = styled.div`
  font-size: 12px;
  font-weight: 500;
  color: #807871;
`;
const SquareBoard = styled.div`
  width: ${WIDTH};
  height: ${WIDTH};
`;

const FillerBlock = styled.div`
  flex:1;
`
export default () => (
  <CenterWrapper>
    <FlexVerticalWrapper>
      <Title>2048 Clone</Title>
      <SubTitle>By Jiajin Zheng</SubTitle>
    </FlexVerticalWrapper>
    <GameBoard>
      <TopRow>
        <Logo>
          <CenterWrapper>
            <LogoText>2048</LogoText>
          </CenterWrapper>
        </Logo>
        <FillerBlock />
        <Score>
          <ScoreText>SCORE</ScoreText>
          <ScoreNumber>
            <CenterWrapper>0</CenterWrapper>
          </ScoreNumber>
        </Score>
        <Score>
          <ScoreText>BEST</ScoreText>
          <ScoreNumber>
            <CenterWrapper>0</CenterWrapper>
          </ScoreNumber>
        </Score>
      </TopRow>
      <Description>
        <Text>Join the numbers and get to the 2048 tile! </Text>
      </Description>
      <SquareBoard>
        <Grid />
      </SquareBoard>
    </GameBoard>
  </CenterWrapper>
);