import { useContext } from 'react';
import styled from 'styled-components/macro';
// COMPONENTS
import { ProfileContext } from './ProfilesContextProvider';
import Box from './Box';
import MinimalButton from './MinimalButton';
import Header from './Header';
import SearchCard from './SearchCard';

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
  const { dispatch, profiles } = useContext(ProfileContext);
  const handleSortAscending = () => dispatch({ type: 'ascending' });
  const handleSortDescending = () => dispatch({ type: 'descending' });

  return (
    <>
      <Header />

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
            <SearchCard
              key={profile.id}
              photoUrl={profile.photoUrl}
              handle={profile.handle}
              location={profile.location}
              age={profile.age}
              photoCount={profile.photoCount}
            />
          ))}
        </StyledResults>
      </StyledMain>
    </>
  );
};

export default SearchPage;
