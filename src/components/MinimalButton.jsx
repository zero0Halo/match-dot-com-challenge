import styled, { css } from 'styled-components/macro';
import Box from './Box';

const StyledMinimalButton = styled(Box).attrs(({ disabled = false }) => ({
  as: 'button',
  backgroundColor: 'transparent',
  border: 0,
  margin: 8,
}))`
  cursor: pointer;

  ${({ disabled }) =>
    disabled &&
    css`
      opacity: 0.25;
      cursor: default;
    `}
`;

function MinimalButton({ children, disabled = false, onClick, ...props }) {
  return (
    <StyledMinimalButton disabled={disabled} onClick={onClick} {...props}>
      {children}
    </StyledMinimalButton>
  );
}

export default MinimalButton;
