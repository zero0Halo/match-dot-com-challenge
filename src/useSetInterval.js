import { useEffect, useRef, useState } from 'react';

export default function useSetInterval(countTil, cb) {
  const [count, setCount] = useState(1);
  const timer = useRef(null);

  function stop() {
    clearInterval(timer.current);
  }

  useEffect(() => {
    timer.current = setInterval(
      () =>
        setCount((state) => {
          const tmpCount = state + 1;
          const countReached = tmpCount > countTil;

          if (cb && typeof cb === 'function' && countReached) {
            cb();
          }

          return countReached ? 1 : tmpCount;
        }),
      1 * 1000
    );

    return () => stop();
  }, [cb, countTil]);

  return { count, setCount, stop };
}
