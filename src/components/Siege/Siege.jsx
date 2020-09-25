import React from 'react'
import { useState, useEffect } from "react";
import Title from '../../Layout/Title';
import CenterWrapper from "../../Layout/CenterWrapper";
import GameBoard from "./components/GameBoard";
import styled from "styled-components";

const ResponsiveFlex = styled(CenterWrapper)`
  @media (max-width: 1000px) {
    flex-direction:column;
  }
`;

const useWindowSize = () => {

  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    // Handler to call on window resize
    const handleResize = () => {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Call handler right away so state gets updated with initial window size
    handleResize();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize
}


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