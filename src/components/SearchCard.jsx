import styled from 'styled-components/macro';
// COMPONENTS
import Box from './Box';

const StyledCardWrapper = styled(Box).attrs({
  as: 'article',
  alignItems: 'center',
  display: 'flex',
  justifyContent: 'center',
})``;

const StyledCard = styled(Box).attrs({
  border: '1px solid lightgray',
  borderRadius: 8,
  boxShadow: '0 3px 6px lightgray, 0 3px 6px',
  display: 'flex',
  height: '12.5rem',
  justifyContent: 'center',
  overflow: 'hidden',
  position: 'relative',
  width: '12.5rem',
})``;

const StyledImage = styled(Box).attrs({
  as: 'img',
  height: 'auto',
  width: '75%',
})``;

const StyledDetails = styled(Box).attrs({
  backgroundColor: 'rgba(255, 255, 255, 0.9)',
  borderRadius: 'inherit',
  bottom: '0',
  padding: 8,
  overflow: 'hidden',
  position: 'absolute',
  width: '100%',
})``;

const StyledH6 = styled(Box).attrs({
  as: 'h6',
  alignItems: 'center',
  display: 'flex',
  fontSize: 16,
  m: 0,
  mb: 4,
})``;

const StyledDetailsRow = styled(Box).attrs({
  alignItems: 'baseline',
  display: 'flex',
  justifyContent: 'space-between',
})``;

const SearchCard = ({ data }) => {
  const { name, image, hp, types } = data;

  return (
    <StyledCardWrapper>
      <StyledCard>
        <StyledImage src={image} alt="potential date" />

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
