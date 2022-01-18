import styled from 'styled-components/macro';
import css from '@styled-system/css';

const StyledHeader = styled('header')(
  css({
    borderBottom: `4px solid`,
    borderBottomColor: 'primary',
    padding: [8, 16],
  })
);

export default function Header() {
  return (
    <StyledHeader>
      <img src="/logo.svg" alt="match" width="110" />
    </StyledHeader>
  );
}
