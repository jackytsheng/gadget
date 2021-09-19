import { useEffect, useRef } from 'react';

export default () => {
  const swipeRef = useRef({ xDown: 0, yDown: 0 });
  const directionRef = useRef(null);

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
  const handleTouchStart = (evt) => {
    const xDown = evt.touches[0].clientX;
    const yDown = evt.touches[0].clientY;
    swipeRef.current = { xDown, yDown };
  };

  const handleTouchMove = (evt) => {
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
        /* right swipe */
        directionRef.current = 'Left';
        console.log('swipe left');
      } else {
        /* right swipe */
        directionRef.current = 'Right';
        console.log('swipe right');
      }
    } else {
      if (yDiff > 0) {
        /* up swipe */
        directionRef.current = 'Up';
        console.log('swipe up');
      } else {
        /* down swipe */
        directionRef.current = 'Down';
        console.log('swipe down');
      }
    }
  };

  return { direction: directionRef.current };
};
