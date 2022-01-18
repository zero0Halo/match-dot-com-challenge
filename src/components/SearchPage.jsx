import { Outlet } from 'react-router-dom';
import styled from 'styled-components/macro';
import css from '@styled-system/css';
// COMPONENTS
import Countdown from './Countdown';
import MinimalButton from './MinimalButton';
import { ACTIONS, useProfileContext } from './ProfilesContextProvider';
import SearchCard from './SearchCard';

const StyledError = styled('div')(
  css({
    backgroundColor: 'error',
    borderRadius: 'base',
    color: 'white',
    display: 'block',
    fontSize: 32,
    mx: 'auto',
    px: 16,
    py: 8,
    textAlign: 'center',
    width: 'fit-content',
  })
);

const StyledMain = styled('main')(
  css({
    mb: 32,
    mx: 'auto',
    maxWidth: ['500px', '750px', '1000px', '1400px'],
  })
);

const StyledControls = styled('div')(
  css({
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'flex-end',
    my: 16,
  })
);

const StyledResults = styled('section')(
  css({
    display: 'grid',
    gridGap: 16,
    gridTemplateColumns: ['1fr', '1fr 1fr', '1fr 1fr 1fr', '1fr 1fr 1fr 1fr'],
    p: 16,
  })
);

const SearchPage = () => {
  const dispatch = useProfileContext((ctx) => ctx.dispatch);
  const error = useProfileContext((ctx) => ctx.error);
  const profiles = useProfileContext((ctx) => ctx.profiles);
  const handleSortAscending = () => dispatch({ type: ACTIONS.ASCENDING });
  const handleSortDescending = () => dispatch({ type: ACTIONS.DESCENDING });

  return (
    <>
      {error && <StyledError>OMG! There was a problem retrieving new profiles!</StyledError>}

      <StyledMain>
        <StyledControls>
          <Countdown />

          <MinimalButton disabled>
            <img src="/filter.svg" width={22} alt="filter" />
          </MinimalButton>

          <MinimalButton onClick={handleSortAscending}>
            <img src="/ascending.svg" width={22} alt="Sort ascending" />
          </MinimalButton>

          <MinimalButton onClick={handleSortDescending}>
            <img src="/descending.svg" width={22} alt="Sort descending" />
          </MinimalButton>
        </StyledControls>

        <StyledResults>
          {profiles.map((profile) => (
            <SearchCard data={profile} key={profile.id} />
          ))}
        </StyledResults>

        <Outlet />
      </StyledMain>
    </>
  );
};

export default SearchPage;
