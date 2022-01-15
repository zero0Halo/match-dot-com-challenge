import { createGlobalStyle, ThemeProvider } from 'styled-components/macro';
// COMPONENTS
import theme from './theme';
import SearchPage from './components/SearchPage';
import ProfilesContextProvider from './components/ProfilesContextProvider';

const GlobalStyle = createGlobalStyle`
  body {
    font-size: 16px;
    margin: 0;
    padding: 0;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-family: ${({ theme }) => theme.fonts.base};
  }
`;

function App() {
  return (
    <ProfilesContextProvider>
      <ThemeProvider theme={theme}>
        <GlobalStyle />

        <SearchPage />
      </ThemeProvider>
    </ProfilesContextProvider>
  );
}

export default App;
