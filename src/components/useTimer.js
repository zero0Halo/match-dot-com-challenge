import { useCallback, useEffect, useReducer, useRef } from 'react';

export const ACTIONS = {
  PAUSE_TIMER: 'PAUSE_TIMER',
  RESUME_TIMER: 'RESUME_TIMER',
  START_TIMER: 'START_TIMER',
  STOP_TIMER: 'STOP_TIMER',
  UPDATE_COUNT: 'UPDATE_COUNT',
};

const initialState = {
  count: 1,
  timerRunning: false,
  timerStopped: false,
};

function reducer(state, { type, payload }) {
  switch (type) {
    case ACTIONS.PAUSE_TIMER:
      return { ...state, timerRunning: false, timerStopped: true };
    case ACTIONS.RESUME_TIMER:
      return { ...state, timerRunning: true, timerStopped: false };
    case ACTIONS.START_TIMER:
      return { ...initialState, timerRunning: true, timerStopped: false };
    case ACTIONS.STOP_TIMER:
      return { ...initialState, timerRunning: false, timerStopped: true };
    case ACTIONS.UPDATE_COUNT:
      return { ...state, count: payload };
    default:
      return state;
  }
}

export default function useTimer({ duration, autoRestart = false, autoStart = false, onExpire }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const timerRef = useRef(null);

  const tick = useCallback(() => {
    timerRef.current = setInterval(() => {
      const newCount = state.count + 1;
      dispatch({ type: ACTIONS.UPDATE_COUNT, payload: newCount });

      if (newCount === duration && typeof onExpire === 'function') {
        onExpire(state);
        dispatch({ type: autoRestart ? ACTIONS.START_TIMER : ACTIONS.STOP_TIMER });
      }
    }, 1000);
  }, [autoRestart, duration, onExpire, state]);

  useEffect(() => {
    if (state.timerRunning) {
      tick();
    }

    return () => clearInterval(timerRef.current);
  }, [state.count, state.timerRunning, tick]);

  useEffect(() => {
    if (autoStart) {
      dispatch({ type: ACTIONS.START_TIMER });
    }
  }, [autoStart]);

  return { ...state, timerDispatch: dispatch };
}
