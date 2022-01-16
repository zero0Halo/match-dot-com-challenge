import { useContext } from 'react';
import styled from 'styled-components/macro';
// COMPONENTS
import Box from './Box';
import Header from './Header';
import MinimalButton from './MinimalButton';
import { ACTIONS, ProfileContext } from './ProfilesContextProvider';
import SearchCard from './SearchCard';
import Countdown from './Countdown';

const StyledError = styled(Box).attrs({
  backgroundColor: 'red',
  borderRadius: 8,
  color: 'white',
  display: 'block',
  fontSize: 32,
  mx: 'auto',
  px: 16,
  py: 8,
  textAlign: 'center',
  width: 'fit-content',
})``;

const StyledMain = styled(Box).attrs({ as: 'main', m: 24 })``;

const StyledControls = styled(Box).attrs({
  as: 'div',
  display: 'flex',
  justifyContent: 'flex-end',
})``;

const StyledResults = styled(Box).attrs({
  as: 'section',
  display: 'grid',
  gridTemplateColumns: '1fr 1fr 1fr 1fr',
  gridGap: '1rem',
})``;

const SearchPage = () => {
  const { dispatch, error, profiles } = useContext(ProfileContext);
  const handleSortAscending = () => dispatch({ type: ACTIONS.ASCENDING });
  const handleSortDescending = () => dispatch({ type: ACTIONS.DESCENDING });

  return (
    <>
      <Header />

      {error && <StyledError>OMG! There was a problem retrieving new profiles!</StyledError>}

      <Countdown />

      <StyledMain>
        <StyledControls>
          <MinimalButton disabled>
            <img src="filter.svg" width={22} alt="filter" />
          </MinimalButton>

          <MinimalButton onClick={handleSortAscending}>
            <img src="./ascending.svg" width={22} alt="Sort ascending" />
          </MinimalButton>

          <MinimalButton onClick={handleSortDescending}>
            <img src="./descending.svg" width={22} alt="Sort descending" />
          </MinimalButton>
        </StyledControls>

        <StyledResults>
          {profiles.map((profile) => (
            <SearchCard data={profile} key={profile.name} />
          ))}
        </StyledResults>
      </StyledMain>
    </>
  );
};

export default SearchPage;
