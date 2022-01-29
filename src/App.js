import { useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { createGlobalStyle, ThemeProvider } from 'styled-components/macro';
// COMPONENTS
import theme from './theme';
import Header from './components/Header';
import Profile from './components/Profile';
import ProfilesContextProvider from './components/ProfilesContextProvider';
import SearchPage from './components/SearchPage';
import useTimer, { ACTIONS } from './components/useTimer';

const GlobalStyle = createGlobalStyle`
  body {
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    display: block;
    font-family: ${({ theme }) => theme.fonts.base};
    font-size: 16px;
    margin: 0;
    padding: 0;
    width: 100%;
  }
`;

function App() {
  const { count: count2, timerDispatch } = useTimer({
    autoStart: true,
    autoRestart: true,
    duration: 10,
    onExpire: () => console.log('tick'),
  });

  return (
    <ProfilesContextProvider>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <button onClick={() => timerDispatch({ type: ACTIONS.START_TIMER })}>Start</button>
        <button onClick={() => timerDispatch({ type: ACTIONS.STOP_TIMER })}>Stop</button> <br />
        <button onClick={() => timerDispatch({ type: ACTIONS.PAUSE_TIMER })}>Pause</button>
        <button onClick={() => timerDispatch({ type: ACTIONS.RESUME_TIMER })}>Resume</button> <br />
        <Header />
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
