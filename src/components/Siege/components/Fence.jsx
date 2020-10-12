import React from "react";
import styled from "styled-components";
import PlayerOneFence from "../svg/PlayerOneFence.svg";
import PlayerTwoFence from "../svg/PlayerTwoFence.svg"; 

const FenceBase = styled.div`
  position: absolute;
  width: 85%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 31%;
  z-index: 15;
  opacity: ${(props) => (props.hoverable ? 0.4 : 1)};
  &:hover {
    cursor: ${(props) => (props.hoverable ? 'pointer' : 'auto')};
    opacity: 1;
  }
`;


const TopFence = styled(FenceBase)`
  transform: rotateZ(180deg);
  top: -15%;
`;

const BottomFence = styled(FenceBase)`
  bottom:-15%;
`;
const RightFence = styled(FenceBase)`
  transform: rotateZ(-90deg);
  right:-42%;
`;

const LeftFence = styled(FenceBase)`
  transform: rotateZ(90deg);
  left: -42%;
`;


const FenceWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow:hidden;
`;
const FenceImg = styled.img`
  width:100%;
`;

// const LeftFence =
// const LeftFence =
// const LeftFence =

const renderFence = (FenceCodeArray,row,column) => {

  return FenceCodeArray.map(fenceCode => {

    let player = parseInt(fenceCode[0]);

    let dirCode = fenceCode[1];
    switch (dirCode) {
      case "U":
        return (
          <TopFence key={"U" + row + column}>
            <FenceImg
              key={"U_IMG" + row + column}
              src={player === 1 ? PlayerOneFence : PlayerTwoFence}
              alt={"Player fence"}
            ></FenceImg>
          </TopFence>
        );
        
      case "L":
        return (
          <LeftFence key={"L" + row + column}>
            <FenceImg
              key={"L_IMG" + row + column}
              src={player === 1 ? PlayerOneFence:PlayerTwoFence}
              alt={"Player fence"}
            ></FenceImg>
          </LeftFence>
        );
      case "R":
          return (
            <RightFence key={"R" + row + column}>
              <FenceImg
                key={"R_IMG" + row + column}
                src={player === 1 ? PlayerOneFence : PlayerTwoFence}
                alt={"Player fence"}
              ></FenceImg>
            </RightFence>
          );
      case "D":
          return (
            <BottomFence key={"D" + row + column}>
              <FenceImg
                key={"D_IMG" + row + column}
                src={player === 1 ? PlayerOneFence : PlayerTwoFence}
                alt={"Player fence"}
              ></FenceImg>
            </BottomFence>
          );
      default:
        return null;
    }

  })
}


const renderHoverableFence = (selectableFence,onClick,player,row,column)=>
  selectableFence.map(fenceDir => {
    switch (fenceDir) {
      case "U":
        return (
          <TopFence
            key={"U" + row + column}
            hoverable={true}
            onClick={(e) => onClick("U", player, row, column)}
          >
            <FenceImg
              key={"U_IMG" + row + column}
              src={player === 1 ? PlayerOneFence : PlayerTwoFence}
              alt={"Player fence"}
            ></FenceImg>
          </TopFence>
        );

      case "L":
        return (
          <LeftFence
            key={"L" + row + column}
            hoverable={true}
            onClick={(e) => onClick("L", player, row, column)}
          >
            <FenceImg
              key={"L_IMG" + row + column}
              src={player === 1 ? PlayerOneFence : PlayerTwoFence}
              alt={"Player fence"}
            ></FenceImg>
          </LeftFence>
        );
      case "R":
        return (
          <RightFence
            key={"R" + row + column}
            hoverable={true}
            onClick={(e) => onClick("R", player, row, column)}
          >
            <FenceImg
              key={"R_IMG" + row + column}
              src={player === 1 ? PlayerOneFence : PlayerTwoFence}
              alt={"Player fence"}
            ></FenceImg>
          </RightFence>
        );
      case "D":
        return (
          <BottomFence
            key={"D" + row + column}
            hoverable={true}
            onClick={(e) => onClick("D", player, row, column)}
          >
            <FenceImg
              key={"D_IMG" + row + column}
              src={player === 1 ? PlayerOneFence : PlayerTwoFence}
              alt={"Player fence"}
            ></FenceImg>
          </BottomFence>
        );
      default:
        return null;
    }
  })

;

const Fence = ({
  onClick,
  player,
  selectableFence,
  confirmedFence,
  row,
  column,
}) => (
  <FenceWrapper>
    {renderFence(confirmedFence, row, column)}
    {renderHoverableFence(selectableFence,onClick,player,row,column)}
  </FenceWrapper>
);

export default Fence;
