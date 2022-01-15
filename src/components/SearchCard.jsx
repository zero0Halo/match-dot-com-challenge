import React from 'react';
import styled from 'styled-components/macro';
// COMPONENTS
import Box from './Box';

const styles = {
  avatar: {
    position: 'relative',
    width: '200px',
    height: '200px',
  },
};

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

const SearchCard = ({ photoUrl = '', handle = '', location = '', age = 99, photoCount = 0 }) => {
  return (
    <StyledCardWrapper>
      <StyledCard>
        <div style={styles.avatar}>
          <img src={photoUrl} alt="potential date"></img>
          <div
            style={{
              position: 'absolute',
              width: '100%',
              bottom: '0',
              borderRadius: 'inherit',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                margin: 8,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
                position: 'relative',
              }}
            >
              <div
                style={{
                  color: 'white',
                  display: 'flex',
                  flexDirection: 'column',
                  width: '100%',
                }}
              >
                <h6 style={{ fontSize: '16px ' }}>
                  <div style={{ display: 'flex', marginBottom: '4px', alignItems: 'center' }}>
                    {handle}
                  </div>
                </h6>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'baseline',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      marginBottom: '4px',
                      alignItems: 'center',
                    }}
                  >
                    <span>{location ? `${age} • ${location}` : age}</span>
                  </div>
                  <div style={{ display: 'inline-block', height: '15px' }}>
                    {photoCount > 1 && (
                      <div>
                        <div style={{ marginRight: '4px' }}>
                          <span color="white">{photoCount}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </StyledCard>
    </StyledCardWrapper>
  );
};

export default SearchCard;
