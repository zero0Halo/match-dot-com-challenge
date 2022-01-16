import styled from 'styled-components/macro';
import css from '@styled-system/css';
// COMPONENTS
import Box from './Box';

const StyledHeader = styled(Box).attrs({
  as: 'header',
})(
  css({
    borderBottom: `1px solid #efefef`,
    padding: [8, 16],
  })
);

export default function Header() {
  return (
    <StyledHeader>
      <img src="./logo.svg" alt="match" width="110" />
    </StyledHeader>
  );
}
