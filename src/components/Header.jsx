import styled from 'styled-components/macro';
import css from '@styled-system/css';

const StyledHeader = styled('header')(
  css({
    borderBottom: `4px solid`,
    borderBottomColor: 'primary',
    px: [8, 32],
    py: 8,
  })
);

const StyledImage = styled('img')(
  css({
    boxSizing: 'border-box',
    maxWidth: '8.5rem',
    width: '100%',
  })
);

export default function Header() {
  return (
    <StyledHeader>
      <StyledImage src="/special-logo.png" alt="Match" />
    </StyledHeader>
  );
}
