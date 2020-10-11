import React from "react";
import styled from "styled-components";
import PlayerOneFence from "../svg/PlayerOneFence.svg";
import PlayerTwoFence from "../svg/PlayerTwoFence.svg"; 

const FenceBase = styled.div`
  position: absolute;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 31%;
  z-index:15;
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
  right:-50%;
`;

const LeftFence = styled(FenceBase)`
  transform: rotateZ(90deg);
  left: -50%;
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

const Fence = ({ onClick, player, fenceOption, confirmed }) => (
  <FenceWrapper>
    <LeftFence>
      <FenceImg src={PlayerTwoFence} alt={"Player one fence"}></FenceImg>
    </LeftFence>
    <BottomFence>
      <FenceImg src={PlayerOneFence} alt={"Player one fence"}></FenceImg>
    </BottomFence>
    <TopFence>
      <FenceImg src={PlayerOneFence} alt={"Player one fence"}></FenceImg>
    </TopFence>
  </FenceWrapper>
);

export default Fence;
