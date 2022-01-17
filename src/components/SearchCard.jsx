import { useState } from 'react';
import styled from 'styled-components/macro';
import css from '@styled-system/css';

const StyledCardWrapper = styled('article')(
  css({
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
  })
);

const StyledCard = styled('div')(
  css({
    border: '1px solid lightgray',
    borderRadius: 'base',
    boxShadow: '0 3px 6px lightgray, 0 3px 6px',
    display: 'flex',
    height: '12.5rem',
    justifyContent: 'center',
    overflow: 'hidden',
    position: 'relative',
    width: '12.5rem',
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
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
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
  const { name, image, hp, types } = data;
  const [loaded, setLoaded] = useState(false);

  return (
    <StyledCardWrapper>
      <StyledCard>
        <StyledImage
          alt="potential date"
          className={loaded ? 'fadeIn' : undefined}
          onLoad={() => setLoaded(true)}
          src={image}
        />

        <StyledDetails>
          <StyledH6>{name}</StyledH6>

          <StyledDetailsRow>
            <div>HP: {hp}</div>
            <div>{types.join(', ')}</div>
          </StyledDetailsRow>
        </StyledDetails>
      </StyledCard>
    </StyledCardWrapper>
  );
};

export default SearchCard;
