import styled from 'styled-components/macro';
import css from '@styled-system/css';
import Box from './Box';

const StyledMinimalButton = styled(Box).attrs({
  as: 'button',
})(({ disabled }) =>
  css({
    backgroundColor: 'transparent',
    border: 0,
    cursor: disabled ? 'default' : 'pointer',
    margin: 8,
    opacity: disabled ? 0.25 : 1,
  })
);

function MinimalButton({ children, disabled = false, onClick, ...props }) {
  return (
    <StyledMinimalButton disabled={disabled} onClick={onClick} {...props}>
      {children}
    </StyledMinimalButton>
  );
}

export default MinimalButton;
