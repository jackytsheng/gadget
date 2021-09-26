import { useEffect, useState, useRef } from 'react';
import useTouchMoveHook from '../../../hooks/touchMoveHook';
import useArrowPad from '../../../hooks/arrowPad';

export default (width, height, scale, useLose, useRecord) => {
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
  const curDirectionRef = useRef('Right');

  const speedRef = useRef({ xSpeed: scale, ySpeed: 0 });
  const lastEatenRef = useRef(Date.now());
  const recordRef = useRef({ level: 1, length: 1, score: 0 });
  const intervalRef = useRef(0);

  const changeDirection = (direction) => {
    if (direction === 'Up' && curDirectionRef.current !== 'Down') {
      headingRef.current = direction;
      speedRef.current = { xSpeed: 0, ySpeed: -scale };
    } else if (direction === 'Down' && curDirectionRef.current !== 'Up') {
      headingRef.current = direction;
      speedRef.current = { xSpeed: 0, ySpeed: scale };
    } else if (direction === 'Left' && curDirectionRef.current !== 'Right') {
      headingRef.current = direction;
      speedRef.current = { xSpeed: -scale, ySpeed: 0 };
    } else if (direction === 'Right' && curDirectionRef.current !== 'Left') {
      headingRef.current = direction;
      speedRef.current = { xSpeed: scale, ySpeed: 0 };
    }
  };

  useTouchMoveHook(changeDirection);
  useArrowPad(changeDirection);

  const InitialTime = 400;
  // When ctx is received
  useEffect(() => {
    // Initial tail position is the same as the head
    if (!ctx) {
      return;
    }

    console.log('Time Interval', InitialTime);

    intervalRef.current = setInterval(() => {
      // Checkout lose
      const lost = checkLose(snakeTailPosRef.current[0].id);
      if (lost) {
        useLose(true);
      } else {
        update();
        draw(ctx);
      }
    }, InitialTime);

    return () => {
      clearInterval(intervalRef.current);
    };
  }, [ctx]);

  const newInterval = () => {
    const timeInterval = Math.floor(
      InitialTime / (recordRef.current.level * 0.4 + 1)
    );
    clearInterval(intervalRef.current);
    console.log('Time Interval', timeInterval);

    intervalRef.current = setInterval(() => {
      // Checkout lose
      const lost = checkLose(snakeTailPosRef.current[0].id);
      if (lost) {
        useLose(true);
      } else {
        update();
        draw(ctx);
      }
    }, timeInterval);
  };

  const resetAll = () => {
    snakePosRef.current = {
      x: Math.floor(Math.random() * rows) * scale,
      y: Math.floor(Math.random() * columns) * scale,
    };
    fruitPosRef.current = {
      x: Math.floor(Math.random() * rows) * scale,
      y: Math.floor(Math.random() * columns) * scale,
    };
    snakeTailPosRef.current = [{ x: 0, y: 0, id: '00' }];
    headingRef.current = 'Right';
    speedRef.current = { xSpeed: scale, ySpeed: 0 };
    recordRef.current = { level: 1, length: 1, score: 0 };
  };

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
    curDirectionRef.current = headingRef.current;
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

    snakeTailPosRef.current.unshift({ x, y, id });

    // Set head position
    snakePosRef.current = { x, y };

    // If eaten then not need to pop
    !eatenFruit() && snakeTailPosRef.current.pop();
  };

  const UpdateRecord = () => {
    // Get the time different between fruit eaten
    const length = snakeTailPosRef.current?.length;
    let { level, score } = recordRef.current;
    const newNow = Date.now();
    score += Math.floor(100000 / (newNow - lastEatenRef.current));
    lastEatenRef.current = newNow;

    // every 5 fruit, level up
    const fruitEaten = length - 1;
    if (fruitEaten % 4 === 0) {
      // ignore the first
      if (fruitEaten) {
        level++;
        newInterval();
      }
    }

    recordRef.current = { level, length, score };
    useRecord(recordRef.current);
  };

  const checkLose = (id) => {
    const filterArray = snakeTailPosRef.current.filter((pos) => pos.id === id);
    if (filterArray.length !== 1) {
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

      UpdateRecord();
    }
    return eaten;
  };

  return { useCtx, resetGame: resetAll };
};
