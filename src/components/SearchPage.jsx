import { useContext } from 'react';
import styled from 'styled-components/macro';
// COMPONENTS
import Box from './Box';
import Header from './Header';
import MinimalButton from './MinimalButton';
import { ACTIONS, ProfileContext } from './ProfilesContextProvider';
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
  const { asyncDispatch, dispatch, pokemon } = useContext(ProfileContext);
  const handleSortAscending = () => dispatch({ type: ACTIONS.ASCENDING });
  const handleSortDescending = () => dispatch({ type: ACTIONS.DESCENDING });

  return (
    <>
      <Header />

      <button onClick={asyncDispatch}>Get Pokemon</button>

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
          {pokemon.map((pokemonData) => (
            <SearchCard data={pokemonData} />
            // <SearchCard
            //   age={profile.age}
            //   handle={profile.handle}
            //   key={profile.id}
            //   location={profile.location}
            //   photoCount={profile.photoCount}
            //   photoUrl={profile.photoUrl}
            // />
          ))}
        </StyledResults>
      </StyledMain>
    </>
  );
};

export default SearchPage;
