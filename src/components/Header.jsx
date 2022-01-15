import styled from 'styled-components/macro';
// COMPONENTS
import Box from './Box';

const StyledHeader = styled(Box).attrs({
  as: 'header',
  borderBottom: `1px solid #efefef`,
  padding: 16,
})``;

export default function Header() {
  return (
    <StyledHeader>
      <img src="./logo.svg" alt="match" width="110" />
    </StyledHeader>
  );
}
