import { useCallback, useEffect, useReducer, useRef } from 'react';

export const ACTIONS = {
  PAUSE_TIMER: 'PAUSE_TIMER',
  RESUME_TIMER: 'RESUME_TIMER',
  START_TIMER: 'START_TIMER',
  STOP_TIMER: 'STOP_TIMER',
  UPDATE_COUNT: 'UPDATE_COUNT',
};

const initialState = {
  count: null,
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
      return { count: payload, timerRunning: true, timerStopped: false };
    case ACTIONS.STOP_TIMER:
      return { ...initialState, timerRunning: false, timerStopped: true };
    case ACTIONS.UPDATE_COUNT:
      return { ...state, count: payload };
    default:
      return state;
  }
}

export default function useTimer({
  duration,
  autoRestart = false,
  autoStart = false,
  callback,
  callbackImmediately,
}) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const timerRef = useRef(null);

  const tick = useCallback(() => {
    timerRef.current = setInterval(async () => {
      const newCount = state.count - 1;

      if (newCount === 0 && typeof callback === 'function') {
        await callback(state);
        dispatch({
          type: autoRestart ? ACTIONS.START_TIMER : ACTIONS.STOP_TIMER,
          payload: duration,
        });
      } else {
        dispatch({ type: ACTIONS.UPDATE_COUNT, payload: newCount });
      }
    }, 1000);
  }, [state, duration, callback, autoRestart]);

  useEffect(() => {
    if (state.timerRunning) {
      tick();
    }

    return () => clearInterval(timerRef.current);
  }, [state.count, state.timerRunning, tick]);

  useEffect(() => {
    const invokeCallback = async () => await callback(state);

    if (autoStart) {
      if (typeof callback === 'function' && callbackImmediately) {
        invokeCallback().then(() => dispatch({ type: ACTIONS.START_TIMER, payload: duration }));
      } else {
        dispatch({ type: ACTIONS.START_TIMER, payload: duration });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { ...state, timerDispatch: dispatch };
}
