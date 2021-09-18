import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import useSnakeHook from '../hooks/useSnakeHook';

const Canvas = styled.canvas`
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  background-color: #616161cc;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
`;

export default () => {
  const canvasRef = useRef(null);
  // Size of the canvas
  const CANVAS_WIDTH = 300;
  const CANVAS_HEIGHT = 300;

  // Size of one Unit
  const SCALE = 10;

  const { useCtx } = useSnakeHook(CANVAS_WIDTH, CANVAS_HEIGHT, SCALE);

  // on Mount
  useEffect(() => {
    const canvas = canvasRef.current;
    // pass the context
    useCtx(canvas.getContext('2d'));
    // Initialise speed
  }, []);

  return <Canvas ref={canvasRef} width={CANVAS_WIDTH} height={CANVAS_HEIGHT} />;
};
