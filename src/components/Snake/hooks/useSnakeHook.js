import { useEffect, useState, useRef } from 'react';

// TODO :
// 1. Level
// 2. Score
// 3. Lose Retry
export default (width, height, scale) => {
  // Note: This must be divisible
  const rows = height / scale;
  const columns = width / scale;

  const [ctx, useCtx] = useState(undefined);
  const snakePosRef = useRef({
    x: Math.floor(Math.random() * rows) * scale,
    y: Math.floor(Math.random() * columns) * scale,
  });
  const fruitPosRef = useRef({
    x: Math.floor(Math.random() * rows) * scale,
    y: Math.floor(Math.random() * columns) * scale,
  });
  const snakeTailPosRef = useRef([{ x: 0, y: 0, id: '00' }]);
  const headingRef = useRef('Right');
  const speedRef = useRef({ xSpeed: scale, ySpeed: 0 });

  // When ctx is received
  useEffect(() => {
    // Initial tail position is the same as the head
    if (!ctx) {
      return;
    }

    const gameInterval = setInterval(() => {
      update();
      draw(ctx);
    }, 100);
    // Add a listening

    const handleKeydownEvent = (evt) => {
      const direction = evt.key.replace('Arrow', '');
      if (!(['Up', 'Right', 'Left', 'Down'].indexOf(direction) === -1)) {
        console.log(direction);
        headingRef.current = direction;
        speedRef.current = changeDirection(direction);
      }
    };

    document.addEventListener('keydown', handleKeydownEvent);

    return () => {
      clearInterval(gameInterval);
      document.removeEventListener('keydown', handleKeydownEvent);
    };
  }, [ctx]);

  const draw = (ctx) => {
    // Clear canvas before draw
    ctx.clearRect(0, 0, width, height);

    snakeTailPosRef.current.forEach((coordinate, i) => {
      // Draw head in different color
      ctx.fillStyle = i ? 'white' : '#2c387e';
      const { x, y } = coordinate;
      ctx.fillRect(x, y, scale, scale);
    });

    // Draw fruit
    ctx.fillStyle = '#ff7961';
    const { x, y } = fruitPosRef.current;
    ctx.fillRect(x, y, scale, scale);
  };

  const update = () => {
    let x = snakePosRef.current.x + speedRef.current.xSpeed;
    let y = snakePosRef.current.y + speedRef.current.ySpeed;

    // When hitting boundary
    if (x === width) {
      x = 0;
    } else if (x === -scale) {
      x = width - scale;
    }
    if (y === height) {
      y = 0;
    } else if (y === -scale) {
      y = height - scale;
    }
    const id = x.toString(10).concat(y);

    // Checkout lose
    checkLose(id);
    snakeTailPosRef.current.unshift({ x, y, id });

    // Set head position
    snakePosRef.current = { x, y };

    // If eaten then not need to pop
    !eatenFruit() && snakeTailPosRef.current.pop();
  };

  const checkLose = (id) => {
    const filterArray = snakeTailPosRef.current.filter((pos) => pos.id === id);
    if (filterArray.length !== 0) {
      alert('You Lose !');
      return true;
    } else {
      return false;
    }
  };

  const eatenFruit = () => {
    const { x, y } = snakePosRef.current;
    const { x: fx, y: fy } = fruitPosRef.current;
    const eaten = x === fx && y === fy;

    if (eaten) {
      fruitPosRef.current = {
        x: Math.floor(Math.random() * rows) * scale,
        y: Math.floor(Math.random() * columns) * scale,
      };
    }
    return eaten;
  };

  const changeDirection = (direction) => {
    if (direction === 'Up' && headingRef.current !== 'Down') {
      return { xSpeed: 0, ySpeed: -scale };
    } else if (direction === 'Down' && headingRef.current !== 'Up') {
      return { xSpeed: 0, ySpeed: scale };
    } else if (direction === 'Left' && headingRef.current !== 'Right') {
      return { xSpeed: -scale, ySpeed: 0 };
    } else if (direction === 'Right' && headingRef.current !== 'Left') {
      return { xSpeed: scale, ySpeed: 0 };
    }
  };

  return { useCtx };
};
