import React from "react";
import styled from "styled-components";
import PlayerOneFence from "../svg/PlayerOneFence.svg";

const UpFence = styled.div``;
const FenceBase = styled.div``;
const FenceWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;
const FenceImg = styled.img`
  position: relative;
  top: 50%;
  width: 100%;
`;

// const LeftFence =
// const LeftFence =
// const LeftFence =

const Fence = ({ onClick, player, fenceOption, confirmed }) => (
  <FenceWrapper>
    <FenceImg src={PlayerOneFence} alt={"Player one fence"}></FenceImg>
  </FenceWrapper>
);

export default Fence;
