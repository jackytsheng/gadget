import React from "react";
import styled from "styled-components";
import PlayerOneFence from "../svg/PlayerOneFence.svg";

const UpFence = styled.div``;


const FenceBase = styled.div`
  position: relative;
  top: 85%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 31%;
  
`;
const FenceWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;
const FenceImg = styled.img`
  width:100%;
`;

// const LeftFence =
// const LeftFence =
// const LeftFence =

const Fence = ({ onClick, player, fenceOption, confirmed }) => (
  <FenceWrapper>
    <FenceBase>
      <FenceImg src={PlayerOneFence} alt={"Player one fence"}></FenceImg>
    </FenceBase>
  </FenceWrapper>
);

export default Fence;
