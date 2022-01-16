import { createContext, useCallback, useEffect, useReducer } from 'react';

export const ProfileContext = createContext();

export const ACTIONS = {
  ASCENDING: 'ASCENDING',
  PROFILES_LOADED: 'PROFILES_LOADED',
  PROFILES_LOADING: 'PROFILES_LOADING',
  DESCENDING: 'DESCENDING',
  LOADING_ERROR: 'LOADING_ERROR',
};

const startingAPIUrl = 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=12';

const initialState = {
  error: false,
  loading: false,
  loaded: false,
  nextPage: null,
  profiles: [],
};

function profilesReducer(state, { payload, type }) {
  let profiles;

  switch (type) {
    case ACTIONS.ASCENDING:
      profiles = [...state.profiles];
      profiles.sort((profileA, profileB) => (profileA.handle > profileB.handle ? 1 : -1));
      return { ...state, profiles };

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

    case ACTIONS.LOADING_ERROR:
      return { ...state, error: true, loading: false, loaded: false };

    case ACTIONS.DESCENDING:
      profiles = [...state.profiles];
      profiles.sort((profileA, profileB) => (profileA.handle < profileB.handle ? 1 : -1));
      return { ...state, profiles };

    default:
      throw new Error();
  }
}

function ProfilesContextProvider({ children }) {
  const [state, dispatch] = useReducer(profilesReducer, initialState);

  const asyncDispatch = useCallback(async () => {
    dispatch({ type: ACTIONS.PROFILES_LOADING });

    try {
      const response = await fetch(state.nextPage || startingAPIUrl);
      const payload = await response.json();

      if (payload?.results) {
        const profiles = await Promise.all(
          payload.results.map(async (result) => {
            const response = await fetch(result.url);
            const payload = await response.json();

            return {
              name: payload?.name,
              image: payload?.sprites?.other?.dream_world?.front_default,
              hp: payload?.stats[0]?.base_stat,
              types: payload?.types.map((type) => type.type.name),
            };
          })
        );

        dispatch({ type: ACTIONS.PROFILES_LOADED, payload: { profiles, next: payload.next } });
      }
    } catch (err) {
      dispatch({ type: ACTIONS.LOADING_ERROR });
      console.error(err);
    }
  }, [state.nextPage]);

  useEffect(() => {
    // This serves as the initial loading of profile data. The initial state has all of these
    // values as false and once profiles are attempted to be loaded the first time they never
    // will again.
    if (!state.loaded && !state.loading && !state.error) {
      asyncDispatch();
    }
  }, [asyncDispatch, state.error, state.loaded, state.loading]);

  useEffect(() => {
    const refreshTimer = setInterval(() => {
      asyncDispatch();
    }, 10 * 1000);

    return () => clearInterval(refreshTimer);
  }, [asyncDispatch]);

  return (
    <ProfileContext.Provider value={{ ...state, asyncDispatch, dispatch }}>
      {children}
    </ProfileContext.Provider>
  );
}

export default ProfilesContextProvider;
