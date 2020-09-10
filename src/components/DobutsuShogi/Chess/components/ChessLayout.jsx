import React from "react";
import styled from "styled-components";
import CenterWrapper from "../../../../Layout/CenterWrapper";
import ChickSvg from '../svg/animals-chick.svg';
import ElphtSvg from "../svg/animals-elephant.svg";
import LionSvg from "../svg/animals-lion.svg";
import GirafSvg from '../svg/animals-giraffe.svg';

const BG_CHICK = "#ecf0a4";
const BG_LION = "#f7c1c1";
const BG_GIRAF = "#d7b6d5"; 
const BG_ELPHT = "#d7b6d5";
const CHESS_BORDER_BLACK = "#272016";

const SVG_CONTAINER = '36px';

const DOT_BG_COLOR = "#ec5d31";

const Dot = styled.div`
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background-color: ${DOT_BG_COLOR};
  border: 1px solid ${CHESS_BORDER_BLACK};
`;

const ChessInnerWrapper = styled.div`
  position:absolute;
  top:0;
  bottom:0;
  left:0;
  right:0;
  display: grid;
  grid-template-columns: 10px auto 10px;
  grid-template-rows: 10px auto 10px;
  background-color: ${props => {
    switch (props.chessType) {
      case "CHICK":
        return BG_CHICK;
      case "LION":
        return BG_LION;
      case "GIRAF":
        return BG_GIRAF;
      case "ELPHT":
        return BG_ELPHT;
      default:
        return null
    }
  }};
`;


const ElephantImg = styled.img`
  width:70px;
  height:35px;
  position:absolute;
  left:-15px;
  top:2px;
`
const LionImg = styled.img`
  width: 40px;
  height: 30px;

  position: absolute;
`;

const generateChess=(chessType)=>{
  let renderArray = Array(9).fill(0);
  renderArray = renderArray.map((e,i) => <i key={chessType + Math.random() + i} />);
  switch(chessType){
      case "CHICK":
        renderArray[1] = (
          <CenterWrapper key={chessType + Math.random()}>
            <Dot key={chessType + "Dot" + Math.random()} />
          </CenterWrapper>
        );
        renderArray[4] = (
          <CenterWrapper key={chessType + Math.random()}>
              <img
                key = {chessType + "img" + Math.random()}
                width={SVG_CONTAINER}
                height={SVG_CONTAINER}
                src={ChickSvg}
                alt={"Chick"}
              />
          </CenterWrapper>
        );
        return renderArray;
      case "LION":
        renderArray = renderArray.map((e,i) => (
          <CenterWrapper key={chessType + Date.now() + i}>
            <Dot key={chessType + "Dot" + Date.now() + i} />
          </CenterWrapper>
        ));
        renderArray[4] = (
          <CenterWrapper key={chessType + Math.random()}>
            <LionImg
              key={chessType + "img" + Math.random()}
              width={SVG_CONTAINER}
              height={SVG_CONTAINER}
              src={LionSvg}
              alt={"Lion"}
            />
          </CenterWrapper>
        );
        return renderArray;
      case "GIRAF":
        renderArray = renderArray.map((e, i) => {
          switch(i){
            case 1:
            case 3:
            case 5:
            case 7:
              return (<CenterWrapper key={chessType + Date.now() + i}><Dot key={chessType + "Dot" + Date.now() + i} />
              </CenterWrapper>)
            default:
              return e;
        }})
        renderArray[4] = (
          <CenterWrapper key={chessType + Math.random()}>
            <img
              width={SVG_CONTAINER}
              height={SVG_CONTAINER}
              key={chessType + "img" + Math.random()}
              src={GirafSvg}
              alt={"Giraffe"}
            />
          </CenterWrapper>
        );
        return renderArray;
      case "ELPHT":
        renderArray = renderArray.map((e, i) => {
          switch(i){
            case 0:
            case 2:
            case 6:
            case 8:
              return (<CenterWrapper key={chessType + Date.now() + i}><Dot key={chessType + "Dot" + Date.now() + i} />
              </CenterWrapper>)
            default:
              return e;
        }})
        renderArray[4] = (
          <CenterWrapper key={chessType + Math.random()}>
            <ElephantImg
              key={chessType + "img" + Math.random()}
              src={ElphtSvg}
              alt={"Elephant"}
            />
          </CenterWrapper>
        );
        return renderArray;
      default:
        return null
    }
  }


export default ({ chessType}) => 
<ChessInnerWrapper chessType={chessType}>
  {generateChess(chessType)}
</ChessInnerWrapper>;