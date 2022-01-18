import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components/macro';
import css from '@styled-system/css';
import { useProfileContext } from './ProfilesContextProvider';

const StyledLink = styled(Link)(
  css({
    color: 'neutrals.dark',
  })
);

const StyledCardWrapper = styled('article')(
  css({
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
  })
);

const StyledCard = styled('div')(
  css({
    aspectRatio: '1 / 1',
    border: '2px solid',
    borderColor: 'neutrals.base',
    borderRadius: 'base',
    boxShadow: 'light',
    display: 'flex',
    height: '100%',
    justifyContent: 'center',
    overflow: 'hidden',
    position: 'relative',
    transition: 'border 250ms',
    width: '100%',
    '&:hover': {
      borderColor: 'primary',
    },
  })
);

const StyledImage = styled('img')`
  height: auto;
  opacity: 0;
  width: 75%;

  &.fadeIn {
    opacity: 1;
    transition: opacity 250ms;
  }
`;

const StyledDetails = styled('div')(
  css({
    backgroundColor: 'white80',
    bottom: '0',
    boxSizing: 'border-box',
    overflow: 'hidden',
    padding: 8,
    position: 'absolute',
    width: '100%',
  })
);

const StyledH6 = styled('h2')(
  css({
    alignItems: 'center',
    display: 'flex',
    fontSize: 16,
    m: 0,
    mb: 4,
  })
);

const StyledDetailsRow = styled('div')(
  css({
    alignItems: 'baseline',
    display: 'flex',
    fontSize: 12,
    justifyContent: 'space-between',
  })
);

const SearchCard = ({ data }) => {
  const { name, id, image, stats, types } = data;
  const timerPause = useProfileContext((ctx) => ctx.timerPause);
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <StyledLink to={`/profile/${id}`} onClick={timerPause}>
      <StyledCardWrapper>
        <StyledCard>
          <StyledImage
            alt="potential date"
            className={imageLoaded ? 'fadeIn' : undefined}
            onLoad={() => setImageLoaded(true)}
            src={image}
          />

          <StyledDetails>
            <StyledH6>{name}</StyledH6>

            <StyledDetailsRow>
              <div>HP: {stats?.hp}</div>
              <div>{types.join(', ')}</div>
            </StyledDetailsRow>
          </StyledDetails>
        </StyledCard>
      </StyledCardWrapper>
    </StyledLink>
  );
};

export default SearchCard;
