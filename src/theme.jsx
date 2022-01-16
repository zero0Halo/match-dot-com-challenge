const breakpoints = ['600px', '960px', '1280px', '1920px'];
breakpoints.xs = breakpoints[0];
breakpoints.sm = breakpoints[1];
breakpoints.md = breakpoints[2];
breakpoints.lg = breakpoints[3];
// breakpoints.xl = breakpoints[4];

const theme = {
  breakpoints,
  fonts: {
    base: 'Arial, Helvetica, sans-serif',
  },
  fontSizes: {
    10: '0.625rem',
    12: '0.75rem',
    14: '0.875rem',
    16: '1rem',
    18: '1.125rem',
    22: '1.375rem',
    26: '1.625rem',
  },
  radii: {
    base: '8px',
    round: '50%',
    rounded: '1000px',
  },
  space: {
    0: 0,
    1: '0.0625rem',
    2: '0.125rem',
    4: '0.25rem',
    8: '0.5rem',
    12: '0.75rem',
    16: '1rem',
    20: '1.25rem',
    24: '1.5rem',
    32: '2rem',
    64: '4rem',
  },
};

export default theme;
