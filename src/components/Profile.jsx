import { useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components/macro';
import css from '@styled-system/css';
// COMPONENTS
import { useProfileContext } from './ProfilesContextProvider';
import { ACTIONS as TIMER_ACTIONS } from './useTimer';

// Additional CSS filters for the background card depending on the 'type' passed
const colorFilter = {
  bug: 'hue-rotate(246deg)',
  electric: 'hue-rotate(199deg) contrast(2)',
  fairy: 'hue-rotate(104deg)',
  fire: 'hue-rotate(151deg) contrast(2)',
  grass: 'hue-rotate(246deg)',
  ground: 'hue-rotate(194deg)',
  normal: 'grayscale(100%)',
  poison: 'hue-rotate(71deg)',
  rock: 'hue-rotate(194deg)',
  water: 'hue-rotate(3deg)',
};

const StyledOverlay = styled('div')(
  css({
    alignItems: 'center',
    bg: 'white80',
    display: 'flex',
    height: '100%',
    justifyContent: 'center',
    left: 0,
    position: 'fixed',
    top: 0,
    width: '100%',
  })
);

const StyledProfile = styled('section')(
  css({
    aspectRatio: '5 / 7',
    bg: 'white',
    border: 'solid 10px',
    borderColor: 'pokeYellow',
    borderRadius: 'large',
    boxShadow: 'base',
    display: 'block',
    pb: 16,
    position: 'relative',
    width: ['16rem', '25rem'],
  })
);

const StyledCloseButton = styled('button')(
  css({
    bg: 'primary',
    borderRadius: 'round',
    borderStyle: 'none',
    color: 'white',
    cursor: 'pointer',
    display: 'block',
    fontSize: 20,
    fontWeight: 'bold',
    height: '2rem',
    position: 'absolute',
    right: '-20px',
    top: '-20px',
    transform: 'rotate(45deg)',
    width: '2rem',
    zIndex: 1000,
  })
);

const StyledBackgroundImage = styled('img')(({ type }) =>
  css({
    filter: `opacity(50%) ${colorFilter[type] ? colorFilter[type] : ''}`,
    height: '100%',
    position: 'absolute',
    width: '100%',
    zIndex: '0',
  })
);

const StyledName = styled('h3')(
  css({
    bg: 'white40',
    fontSize: [18, 24],
    fontWeight: 'bold',
    m: 0,
    p: 8,
    position: 'relative',
    textTransform: 'capitalize',
    zIndex: '1',
  })
);

const StyledImageContainer = styled('div')(
  css({
    alignItems: 'center',
    aspectRatio: '4 / 3',
    bg: 'white',
    border: 'ridge 4px',
    borderColor: 'neutrals.base',
    boxShadow: 'base',
    boxSizing: 'border-box',
    display: 'flex',
    justifyContent: 'center',
    mx: 'auto',
    overflow: 'hidden',
    p: 16,
    position: 'relative',
    width: '90%',
    zIndex: '1',
  })
);

const StyledImage = styled('img')(
  css({
    display: 'block',
    height: 'auto',
    width: '80%',
  })
);

const StyledStats = styled('section')(
  css({
    display: 'grid',
    gridGap: [0, 16],
    gridTemplateColumns: ['1fr', '1fr 1fr'],
    position: 'relative',
    px: [16, 24],
    py: [8, 24],
    zIndex: '1',
  })
);

const StyledStatName = styled('span')(
  css({
    fontSize: 16,
    fontWeight: 'bold',
    textTransform: 'capitalize',
  })
);

const StyledTypes = styled('footer')(
  css({
    bg: 'black50',
    bottom: 0,
    color: 'white',
    display: 'flex',
    fontWeight: 'bold',
    justifyContent: 'space-around',
    lineHeight: '2',
    position: 'absolute',
    textAlign: 'center',
    textTransform: 'capitalize',
    width: '100%',
  })
);

// Helper function that 'freezes' the position of the body to prevent background scrolling when
// the page loads. Passing true to the thaw argument unfreezes the body to allow scrolling again.
// https://css-tricks.com/prevent-page-scrolling-when-a-modal-is-open/
function freezeBody(thaw = false) {
  if (thaw) {
    const scrollY = document.body.style.top;
    document.body.style.position = '';
    document.body.style.top = '';
    window.scrollTo(0, parseInt(scrollY || '0') * -1);
  } else {
    document.body.style.top = `-${window.scrollY}px`;
    document.body.style.position = 'fixed';
  }
}

function Profile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const profiles = useProfileContext((ctx) => ctx.profiles);
  const timerDispatch = useProfileContext((ctx) => ctx.timerDispatch);
  const [profile] = useMemo(() => profiles.filter((profile) => profile.id === id), [id, profiles]);

  const closeHandler = (e) => {
    if (e && e.target === e.currentTarget) {
      e.stopPropagation();
      e.nativeEvent.stopImmediatePropagation();
      navigate('/');
    }
  };

  // On initial render the auto-refresh timer is paused and the body is frozen
  useEffect(() => {
    timerDispatch({ type: TIMER_ACTIONS.PAUSE_TIMER });
    freezeBody();

    return () => freezeBody(true);
  }, [timerDispatch]);

  return (
    <StyledOverlay onClick={closeHandler}>
      <StyledProfile>
        <StyledCloseButton onClick={closeHandler}>+</StyledCloseButton>

        <StyledBackgroundImage src="/card-bg-optimized.png" type={profile?.types[0]} />

        <StyledName>{profile?.name}</StyledName>

        <StyledImageContainer>
          <StyledImage src={profile?.image} alt="Profile of Your Date" />
        </StyledImageContainer>

        <StyledStats>
          {profile?.stats &&
            Object.entries(profile?.stats).map(([statName, statValue]) => (
              <div key={statName}>
                <StyledStatName>{statName}:</StyledStatName> {statValue}
              </div>
            ))}
        </StyledStats>

        <StyledTypes>
          {profile?.types.map((type) => (
            <span key={type}>{type}</span>
          ))}
        </StyledTypes>
      </StyledProfile>
    </StyledOverlay>
  );
}

export default Profile;
