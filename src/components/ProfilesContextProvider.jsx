import { useCallback, useReducer } from 'react';
import { createContext, useContextSelector } from 'use-context-selector';

export const ProfileContext = createContext();
export const useProfileContext = (fn) => useContextSelector(ProfileContext, (ctx) => fn(ctx));

export const ACTIONS = {
  ASCENDING: 'ASCENDING',
  PROFILES_LOADED: 'PROFILES_LOADED',
  PROFILES_LOADING: 'PROFILES_LOADING',
  DESCENDING: 'DESCENDING',
  LOADING_ERROR: 'LOADING_ERROR',
  SET_TIMER_DISPATCH: 'SET_TIMER_DISPATCH',
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
  timerDispatch: null,
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

    case ACTIONS.SET_TIMER_DISPATCH:
      return { ...state, timerDispatch: payload };

    default:
      throw new Error();
  }
}

function ProfilesContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  // HOISTED!
  const asyncDispatchLoadProfiles = useCallback(async () => {
    dispatch({ type: ACTIONS.PROFILES_LOADING });

    try {
      const response = await fetch(state.nextPage || startingAPIUrl);
      const payload = await response.json();

      if (payload?.results) {
        // Unfortunately I have to make individual calls to each pokemon returned from the initial
        // results in order to get actual useful information.
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
      }
    } catch (err) {
      dispatch({ type: ACTIONS.LOADING_ERROR });
      console.error(err);
    }
  }, [state.nextPage]);

  return (
    <ProfileContext.Provider
      value={{
        ...state,
        asyncDispatchLoadProfiles,
        dispatch,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
}

export default ProfilesContextProvider;
