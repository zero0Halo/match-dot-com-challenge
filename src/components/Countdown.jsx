import { useContext, useState } from 'react';
import styled from 'styled-components/macro';
import css from '@styled-system/css';
import { ProfileContext } from './ProfilesContextProvider';

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
    bg: '#1730e5',
    border: 'solid gray 1px',
    borderRadius: 'rounded',
    color: '#FCF5E5',
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
    width: ['8rem', '10rem'],
  })
);

const StyledCount = styled('div')(({ count }) =>
  css({
    alignItems: 'center',
    bg: colorScale[count - 1],
    borderRadius: 'round',
    color: '#FCF5E5',
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
  const { count, timerRestart, timerPause } = useContext(ProfileContext);
  const [showStopLoading, setShowStopLoading] = useState(true);
  const clickHandler = () => {
    if (showStopLoading) {
      timerPause();
    } else {
      timerRestart();
    }
    setShowStopLoading((state) => !state);
  };

  return (
    <StyledCountdown>
      <StyledButton onClick={clickHandler}>
        <StyledButtonText>{showStopLoading ? 'Stop' : 'Start'} Auto-Loading</StyledButtonText>
        <StyledCount count={count}>{count}</StyledCount>
      </StyledButton>
    </StyledCountdown>
  );
}

export default Countdown;
