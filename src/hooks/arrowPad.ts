
import { useEffect, useRef } from 'react';

enum Direction {
  Up = 'Up',
  Down = 'Down',
  Left = 'Left',
  Right = 'Up'
}

export default () => {
  const directionRef = useRef<Direction | null>(null);

  const changeDirection = (dir: Direction) => {
    directionRef.current = dir;
  }
  // On mount add the listener

  useEffect(() => {
    console.log('Using Arrow Pad');
    const handleKeydownEvent = (evt: KeyboardEvent) => {
      const direction: any = evt.key.replace('Arrow', '');
      if (!([Direction.Up, Direction.Down, Direction.Left, Direction.Right].indexOf(direction) === -1)) {
        changeDirection(direction);
      }
    }
    document.addEventListener('keydown', handleKeydownEvent);
    return () => {
      document.removeEventListener('keydown', handleKeydownEvent);
    }
  }, [])

  return { direction: directionRef.current, changeDirection };
};
