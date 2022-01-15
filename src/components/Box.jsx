import styled from 'styled-components';
import {
  border,
  color,
  flexbox,
  grid,
  layout,
  // position,
  shadow,
  space,
  // typography,
} from 'styled-system';

const Box = styled.div(
  {
    boxSizing: 'border-box',
    minWidth: 0,
  },
  border,
  color,
  flexbox,
  grid,
  layout,
  // position,
  shadow,
  space
  // typography
);

export default Box;
