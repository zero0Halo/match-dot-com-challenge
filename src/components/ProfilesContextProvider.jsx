import { createContext, useCallback, useEffect, useReducer } from 'react';
import { useTimer } from 'react-timer-hook';
import dayjs from 'dayjs';

export const ProfileContext = createContext();

export const ACTIONS = {
  ASCENDING: 'ASCENDING',
  PROFILES_LOADED: 'PROFILES_LOADED',
  PROFILES_LOADING: 'PROFILES_LOADING',
  DESCENDING: 'DESCENDING',
  LOADING_ERROR: 'LOADING_ERROR',
};

// The API returns a pagination value in its response, so this is only used at first. However
// when there are no more profiles to return this value is used again, effectively creating a loop.
const startingAPIUrl = 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=12';

const initialState = {
  error: false,
  loading: false,
  loaded: false,
  nextPage: null,
  profiles: [],
};

function reducer(state, { payload, type }) {
  let profiles;

  switch (type) {
    case ACTIONS.ASCENDING:
      profiles = [...state.profiles];
      profiles.sort((profileA, profileB) => (profileA.name > profileB.name ? 1 : -1));
      return { ...state, profiles };

    case ACTIONS.DESCENDING:
      profiles = [...state.profiles];
      profiles.sort((profileA, profileB) => (profileA.name < profileB.name ? 1 : -1));
      return { ...state, profiles };

    case ACTIONS.LOADING_ERROR:
      return { ...state, error: true, loading: false, loaded: false };

    case ACTIONS.PROFILES_LOADED:
      return {
        ...state,
        error: false,
        loading: false,
        loaded: true,
        nextPage: payload.next,
        profiles: payload.profiles,
      };

    case ACTIONS.PROFILES_LOADING:
      return { ...state, error: false, loading: true, loaded: false };

    default:
      throw new Error();
  }
}

const getTenSeconds = () => dayjs().add(10, 'seconds').toDate();

function ProfilesContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    isRunning: timerIsRunning,
    pause: timerPause,
    restart,
    seconds: count,
    resume: timerResume,
  } = useTimer({
    autoStart: false,
    expiryTimestamp: getTenSeconds(),
    onExpire: () => asyncDispatchLoadProfiles(),
  });
  const timerRestart = useCallback(() => restart(getTenSeconds()), [restart]);

  // HOISTED!
  const asyncDispatchLoadProfiles = useCallback(async () => {
    dispatch({ type: ACTIONS.PROFILES_LOADING });

    try {
      const response = await fetch(state.nextPage || startingAPIUrl);
      const payload = await response.json();

      if (payload?.results) {
        const profiles = await Promise.all(
          payload.results.map(async (result) => {
            const response = await fetch(result.url);
            const payload = await response.json();

            const stats = payload?.stats.reduce((acc, next) => {
              acc[next?.stat?.name] = next?.base_stat;
              return acc;
            }, {});

            return {
              stats,
              id: payload?.id.toString(),
              image: payload?.sprites?.other?.dream_world?.front_default,
              name: payload?.name,
              types: payload?.types.map((type) => type.type.name),
            };
          })
        );

        dispatch({ type: ACTIONS.PROFILES_LOADED, payload: { profiles, next: payload.next } });

        timerRestart();
      }
    } catch (err) {
      dispatch({ type: ACTIONS.LOADING_ERROR });
      console.error(err);
    }
  }, [state.nextPage, timerRestart]);

  // Calls asyncDispatchLoadProfiles which gets our first batch of profiles.
  useEffect(() => {
    // These state values are only ever all false at the same time on first render
    if (!state.loaded && !state.loading && !state.error) {
      asyncDispatchLoadProfiles();
    }
  }, [asyncDispatchLoadProfiles, state.error, state.loaded, state.loading]);

  return (
    <ProfileContext.Provider
      value={{
        ...state,
        count,
        dispatch,
        timerIsRunning,
        timerPause,
        timerRestart,
        timerResume,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
}

export default ProfilesContextProvider;
