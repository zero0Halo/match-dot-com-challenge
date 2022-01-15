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
  overflow: 'hidden',
})``;

const StyledAvatar = styled(Box).attrs({
  height: '200px',
  position: 'relative',
  width: '200px',
})``;

const StyledDetailsWrapper = styled(Box).attrs({
  borderRadius: 'inherit',
  bottom: '0',
  overflow: 'hidden',
  position: 'absolute',
  width: '100%',
})``;

const StyledDetails = styled(Box).attrs({
  alignItems: 'flex-end',
  display: 'flex',
  justifyContent: 'space-between',
  margin: 8,
  position: 'relative',
})``;

const StyledHandle = styled(Box).attrs({
  color: 'white',
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
})``;

const StyledH6 = styled(Box).attrs({
  as: 'h6',
  alignItems: 'center',
  display: 'flex',
  fontSize: 16,
  mb: 4,
})``;

const StyledDetailsRow = styled(Box).attrs({
  alignItems: 'baseline',
  display: 'flex',
  justifyContent: 'space-between',
})``;

const StyledAge = styled(Box).attrs({
  alignItems: 'center',
  display: 'flex',
  mb: 4,
})``;

const StyledPhotoCount = styled(Box).attrs({
  color: 'white',
  display: 'inline-block',
  height: '0.9375 rem',
  mr: 4,
})``;

const SearchCard = ({ data }) => {
  const { name, image, hp, types } = data;

  return (
    <StyledCardWrapper>
      <StyledCard>
        <StyledAvatar>
          <img src={image} alt="potential date" style={{ width: '90%', height: 'auto' }}></img>

          <StyledDetailsWrapper>
            <StyledDetails>
              <StyledHandle>
                <StyledH6>{name}</StyledH6>

                <StyledDetailsRow>
                  {/* <StyledAge>{location ? `${age} • ${location}` : age}</StyledAge>

                  {photoCount > 1 && <StyledPhotoCount>{photoCount}</StyledPhotoCount>} */}
                </StyledDetailsRow>
              </StyledHandle>
            </StyledDetails>
          </StyledDetailsWrapper>
        </StyledAvatar>
      </StyledCard>
    </StyledCardWrapper>
  );
};

export default SearchCard;
