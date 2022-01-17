import { useContext, useMemo } from 'react';
import { ProfileContext } from './ProfilesContextProvider';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components/macro';
import css from '@styled-system/css';

const StyledProfile = styled('section')(
  css({
    bg: 'rgba(255,255,255, 0.8)',
    display: 'block',
    position: 'fixed',
    height: '100%',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    width: '100%',
  })
);

function Profile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { profiles, timerRestart } = useContext(ProfileContext);
  const [profile] = useMemo(() => profiles.filter((profile) => profile.id === id), [id, profiles]);

  return (
    <StyledProfile>
      <h2>Profile ID: {id}</h2>
      <h3>Name: {profile?.name}</h3>
      <button
        type="button"
        onClick={() => {
          navigate('/');
          timerRestart();
        }}
      >
        Close
      </button>
    </StyledProfile>
  );
}

export default Profile;
