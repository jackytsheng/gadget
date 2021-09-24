
import { useEffect, useRef } from 'react';

enum Direction {
  Up = 'Up',
  Down = 'Down',
  Left = 'Left',
  Right = 'Right'
}

type Slide = {
  xDown: number;
  yDown: number;
}
type DirectionProps = Direction | null;

export default (callback: (arg: DirectionProps) => {}) => {
  const directionRef = useRef<DirectionProps>(null);
  const swipeRef = useRef<Slide>({ xDown: 0, yDown: 0 });

  const changeDirection = (dir: Direction) => {
    callback(dir);
    directionRef.current = dir;
  }

  // On mount add the listener
  useEffect(() => {
    console.log('Using Touch hook');
    document.addEventListener('touchstart', handleTouchStart);
    document.addEventListener('touchmove', handleTouchMove);
    return () => {
      console.log('Removing listener');
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  const handleTouchStart = (evt: TouchEvent) => {
    const xDown = evt.touches[0].clientX;
    const yDown = evt.touches[0].clientY;
    swipeRef.current = { xDown, yDown };
  };

  const handleTouchMove = (evt: TouchEvent) => {
    const { xDown, yDown } = swipeRef.current;
    if (!xDown || !yDown) {
      return;
    }

    let xUp = evt.touches[0].clientX;
    let yUp = evt.touches[0].clientY;

    let xDiff = xDown - xUp;
    let yDiff = yDown - yUp;

    if (xDiff === 0 && yDiff === 0) {
      directionRef.current = null;
      return;
    }

    if (Math.abs(xDiff) > Math.abs(yDiff)) {
      /*most significant*/
      if (xDiff > 0) {
        /* left swipe */
        changeDirection(Direction.Left)
      } else {
        /* right swipe */
        changeDirection(Direction.Right)
      }
    } else {
      if (yDiff > 0) {
        /* up swipe */
        changeDirection(Direction.Up)
      } else {
        /* down swipe */
        changeDirection(Direction.Down)
      }
    }
  };

  return { direction: directionRef.current };
};
