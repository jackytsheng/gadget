import { useEffect, useRef } from 'react';

enum Direction {
  Up = 'Up',
  Down = 'Down',
  Left = 'Left',
  Right = 'Right'
}

type ArrowPadPros = Direction | null;

export default <T>(callback?: (arg: any) => any, moreEvent?: T[]) => {
  const directionRef = useRef<ArrowPadPros>(null);

  const changeDirection = (dir: Direction) => {
    callback && callback(dir);
    directionRef.current = dir;
  }

  // On mount add the listener
  useEffect(() => {
    console.log('Using Arrow Pad');
    const handleKeydownEvent = (evt: KeyboardEvent) => {
      const direction: any = evt.key.replace('Arrow', '');
      const directionArray: Array<Direction | T> = [Direction.Up, Direction.Down, Direction.Left, Direction.Right];
      if (!(directionArray.concat(moreEvent || []).indexOf(direction) === -1)) {
        console.log("Key Pressed: ", direction);
        changeDirection(direction);
      }
    }

    document.addEventListener('keydown', handleKeydownEvent);
    return () => {
      document.removeEventListener('keydown', handleKeydownEvent);
    }
  }, [])

  return { direction: directionRef.current };
};
