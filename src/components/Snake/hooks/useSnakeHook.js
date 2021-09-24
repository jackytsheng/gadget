import { useEffect, useState, useRef } from 'react';
import touchMoveHook from '../../../hooks/touchMoveHook';
import useArrowPad from '../../../hooks/arrowPad';

// TODO :
// 1. Level
// 2. Score
// 3. Lose Retry
// 4. Screenshot
export default (
  width,
  height,
  scale,
  useLose,
  useRecord,
  useBestRecord,
  previousRecord
) => {
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
  const levelRef = useRef(1);
  const scoreRef = useRef(0);

  const changeDirection = (direction) => {
    if (direction === 'Up' && headingRef.current !== 'Down') {
      headingRef.current = direction;
      speedRef.current = { xSpeed: 0, ySpeed: -scale };
    } else if (direction === 'Down' && headingRef.current !== 'Up') {
      headingRef.current = direction;
      speedRef.current = { xSpeed: 0, ySpeed: scale };
    } else if (direction === 'Left' && headingRef.current !== 'Right') {
      headingRef.current = direction;
      speedRef.current = { xSpeed: -scale, ySpeed: 0 };
    } else if (direction === 'Right' && headingRef.current !== 'Left') {
      headingRef.current = direction;
      speedRef.current = { xSpeed: scale, ySpeed: 0 };
    }
  };

  const { touchDirection } = touchMoveHook(changeDirection);
  const { arrowDirection, changeDirection: setDir } =
    useArrowPad(changeDirection);

  // Scoring system
  useEffect(() => {
    const scoreInterval = setInterval(() => {
      // If not lost
      if (!checkLose(snakeTailPosRef.current[0].id)) {
        // Update Scoring & Level
        updateLevel();
        if (scoreRef.current > previousRecord.score) {
          useBestRecord({ score: scoreRef.current, level: levelRef.current });
        }

        useRecord({ score: scoreRef.current, level: levelRef.current });
      }
    }, 500);

    return () => {
      clearInterval(scoreInterval);
    };
  }, []);

  // When ctx is received
  useEffect(() => {
    // Initial tail position is the same as the head
    if (!ctx) {
      return;
    }

    const timeInterval = Math.floor(300 / (levelRef.current * 0.4 + 1));
    console.log('Time Interval', timeInterval);

    const gameInterval = setInterval(() => {
      // Checkout lose
      const lost = checkLose(snakeTailPosRef.current[0].id);
      if (lost) {
        if (scoreRef.current > previousRecord.score) {
          localStorage.setItem(
            'Snake-Best',
            JSON.stringify({ score: scoreRef.current, level: levelRef.current })
          );
        }
        useLose(true);
      } else {
        update();
        draw(ctx);
      }
    }, timeInterval);

    // Add a listening

    return () => {
      clearInterval(gameInterval);
    };
  }, [ctx, levelRef.current]);

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
    levelRef.current = 1;
    scoreRef.current = 0;
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

  const calNextScore = () =>
    Math.floor(
      50 * (levelRef.current * 0.1 + levelRef.current) * levelRef.current
    );

  const updateLevel = () => {
    scoreRef.current += levelRef.current;
    if (scoreRef.current > calNextScore()) {
      levelRef.current += 1;
      console.log('next level threshold', calNextScore());
    }
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
      const bonus = Math.floor(
        scoreRef.current * 0.03 + levelRef.current * 0.1 + levelRef.current
      );
      scoreRef.current += bonus;

      console.log('Current Fruit Bonus:', bonus);
      fruitPosRef.current = {
        x: Math.floor(Math.random() * rows) * scale,
        y: Math.floor(Math.random() * columns) * scale,
      };
    }
    return eaten;
  };

  return { useCtx, resetGame: resetAll };
};
