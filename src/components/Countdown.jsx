import { useEffect } from 'react';
import styled from 'styled-components/macro';
import css from '@styled-system/css';
import { ACTIONS as PROFILES_ACTIONS, useProfileContext } from './ProfilesContextProvider';
import useTimer, { ACTIONS as TIMER_ACTIONS } from './useTimer';

// https://gka.github.io/palettes/#/10|s|ff3300,1730e5|ffffe0,ff005e,93003a|1|1
const colorScale = [
  '#ff3300',
  '#f32f2c',
  '#e72b46',
  '#d9285d',
  '#ca2673',
  '#b9268a',
  '#a527a0',
  '#8c29b7',
  '#682cce',
  '#1730e5',
];

const StyledCountdown = styled('div')(
  css({
    display: 'flex',
    mr: 'auto',
  })
);

const StyledButton = styled('button').attrs({
  type: 'button',
})(
  css({
    alignItems: 'center',
    bg: 'secondary',
    borderRadius: 'rounded',
    color: 'white',
    cursor: 'pointer',
    display: 'flex',
    fontSize: [12, 16],
    fontWeight: 'bold',
    height: ['2rem', '3rem'],
    lineHeight: 1.5,
    pl: [10, 16],
    pr: [4, 6],
  })
);

const StyledButtonText = styled('span')(
  css({
    width: ['7rem', '9rem'],
  })
);

const StyledCount = styled('div')(({ count }) =>
  css({
    alignItems: 'center',
    bg: colorScale[count - 1],
    borderRadius: 'round',
    color: 'white',
    display: 'flex',
    fontSize: [12, 16],
    fontWeight: 'bold',
    height: ['1.5rem', '2rem'],
    justifyContent: 'center',
    lineHeight: 1.5,
    ml: [4, 8],
    transition: 'background 250ms',
    width: ['1.5rem', '2rem'],
  })
);

function Countdown() {
  const asyncDispatchLoadProfiles = useProfileContext((ctx) => ctx.asyncDispatchLoadProfiles);
  const profilesDispatch = useProfileContext((ctx) => ctx.dispatch);
  const { count, timerDispatch, timerRunning } = useTimer({
    autoStart: true,
    autoRestart: true,
    callback: async () => await asyncDispatchLoadProfiles(),
    callbackImmediately: true,
    duration: 10,
  });
  const loadingProfiles = useProfileContext((ctx) => ctx.loading);
  const clickHandler = () => {
    if (timerRunning || loadingProfiles) {
      timerDispatch({ type: TIMER_ACTIONS.PAUSE_TIMER });
    } else {
      timerDispatch({ type: TIMER_ACTIONS.RESUME_TIMER });
    }
  };

  useEffect(() => {
    profilesDispatch({ type: PROFILES_ACTIONS.SET_TIMER_DISPATCH, payload: timerDispatch });
  }, [profilesDispatch, timerDispatch]);

  return (
    <StyledCountdown>
      <StyledButton onClick={clickHandler}>
        <StyledButtonText>
          {timerRunning || loadingProfiles ? 'Stop' : 'Resume'} Loading
        </StyledButtonText>
        <StyledCount count={count}>{count}</StyledCount>
      </StyledButton>
    </StyledCountdown>
  );
}

export default Countdown;
