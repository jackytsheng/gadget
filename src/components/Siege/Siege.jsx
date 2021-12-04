import React from 'react'
import { useWindowSize } from '../../hooks/useWindowSize';
import Title from '../../Layout/Title';
import CenterWrapper from "../../Layout/CenterWrapper";
import GameBoard from "./components/GameBoard";
import styled from "styled-components";

const ResponsiveFlex = styled(CenterWrapper)`
  @media (max-width: 1000px) {
    flex-direction:column;
  }
`;

export default () => {
  const size = useWindowSize();
  return (
    <ResponsiveFlex>
      <Title
        width={size.width < 1000 ? (size.width < 650 ? 385: 490) : 250}
        title="Siege"
      />
      <GameBoard/>
    </ResponsiveFlex>
  );
};