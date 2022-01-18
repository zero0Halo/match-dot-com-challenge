import { useContext, useEffect, useMemo } from 'react';
import { ProfileContext } from './ProfilesContextProvider';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components/macro';
import css from '@styled-system/css';

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
    bg: 'rgba(255,255,255,0.85)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'fixed',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
  })
);

const StyledProfile = styled('section')(
  css({
    aspectRatio: '5 / 7',
    bg: 'white',
    border: 'solid 10px',
    borderColor: '#FFE264',
    borderRadius: 'large',
    display: 'block',
    position: 'relative',
    width: ['16rem', '25rem'],
    boxShadow: '2px 2px 10px rgba(0, 0, 0, 0.5)',
    pb: 16,
  })
);

const StyledCloseButton = styled('button')(
  css({
    position: 'absolute',
    right: '-20px',
    top: '-20px',
    width: '2rem',
    height: '2rem',
    bg: 'red',
    color: 'white',
    display: 'block',
    zIndex: 1000,
    borderRadius: 'round',
    borderStyle: 'none',
    fontSize: 20,
    fontWeight: 'bold',
    transform: 'rotate(45deg)',
    cursor: 'pointer',
  })
);

const StyledBackgroundImage = styled('img')(({ type }) =>
  css({
    filter: `opacity(50%) ${colorFilter[type] ? colorFilter[type] : ''}`,
    position: 'absolute',
    zIndex: '0',
    width: '100%',
    height: '100%',
  })
);

const StyledName = styled('h3')(
  css({
    bg: 'rgba(255,255,255, 0.4)',
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
    aspectRatio: '4 / 3',
    bg: 'white',
    border: 'ridge silver 4px',
    boxSizing: 'border-box',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    p: 16,
    mx: 'auto',
    width: '90%',
    overflow: 'hidden',
    boxShadow: '2px 2px 10px rgba(0,0,0,0.4)',
    zIndex: '1',
    position: 'relative',
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
    gridGap: ['0', '1rem'],
    gridTemplateColumns: ['1fr', '1fr 1fr'],
    px: [16, 24],
    py: [8, 24],
    zIndex: '1',
    position: 'relative',
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
    position: 'absolute',
    bottom: 0,
    width: '100%',
    display: 'flex',
    bg: 'rgba(0,0,0, 0.5)',
    color: 'white',
    lineHeight: '2',
    textTransform: 'capitalize',
    textAlign: 'center',
    fontWeight: 'bold',
    justifyContent: 'space-around',
  })
);

// Helper function that 'freezes' the position of the body to prevent background scrolling when
// the page loads. Passing true to the thaw argument unfreezes the body to allow scrolling again.
function freezeBody(thaw = false) {
  if (thaw) {
    const scrollY = document.body.style.top;
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.left = '';
    window.scrollTo(0, parseInt(scrollY || '0') * -1);
  } else {
    document.body.style.top = `-${window.scrollY}px`;
    document.body.style.position = 'fixed';
  }
}

function Profile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { profiles, timerPause } = useContext(ProfileContext);
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
    timerPause();
    freezeBody();

    return () => freezeBody(true);
  }, [timerPause]);

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
