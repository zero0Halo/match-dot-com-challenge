import { useContext } from 'react';
import styled from 'styled-components/macro';
import css from '@styled-system/css';
import { ProfileContext } from './ProfilesContextProvider';
import Box from './Box';

const StyledButton = styled(Box).attrs({
  as: 'button',
  type: 'button',
})(
  css({
    bg: '#1730e5',
    border: 'solid gray 1px',
    borderRadius: 'rounded',
    color: '#FCF5E5',
    fontSize: 16,
    fontWeight: 'bold',
    height: '2rem',
    lineHeight: 1.5,
    px: 16,
  })
);

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

const StyledCount = styled(Box)(({ count }) =>
  css({
    alignItems: 'center',
    bg: colorScale[count - 1],
    borderRadius: 'round',
    color: '#FCF5E5',
    display: 'flex',
    fontSize: 16,
    fontWeight: 'bold',
    height: '2rem',
    justifyContent: 'center',
    lineHeight: 1.5,
    ml: 8,
    transition: 'background 250ms',
    width: '2rem',
  })
);

function Countdown() {
  const { count, timerIsRunning, timerRestart, timerPause } = useContext(ProfileContext);

  return (
    <div style={{ display: 'flex', marginRight: 'auto' }}>
      {timerIsRunning ? (
        <StyledButton onClick={timerPause}>Stop Auto-Loading</StyledButton>
      ) : (
        <StyledButton onClick={timerRestart}>Start Auto-Loading</StyledButton>
      )}

      <StyledCount count={count}>{count}</StyledCount>
    </div>
  );
}

export default Countdown;
