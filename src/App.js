import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { createGlobalStyle, ThemeProvider } from 'styled-components/macro';
// COMPONENTS
import theme from './theme';
import SearchPage from './components/SearchPage';
import Profile from './components/Profile';
import ProfilesContextProvider from './components/ProfilesContextProvider';

const GlobalStyle = createGlobalStyle`
  body {
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    display:block;
    font-family: ${({ theme }) => theme.fonts.base};
    font-size: 16px;
    margin: 0;
    padding: 0;
    width: 100%;
  }
`;

function App() {
  return (
    <ProfilesContextProvider>
      <ThemeProvider theme={theme}>
        <GlobalStyle />

        <Router>
          <Routes>
            <Route path="/" element={<SearchPage />}>
              <Route path="/profile/:id" element={<Profile />} />
            </Route>
          </Routes>
        </Router>
      </ThemeProvider>
    </ProfilesContextProvider>
  );
}

export default App;
