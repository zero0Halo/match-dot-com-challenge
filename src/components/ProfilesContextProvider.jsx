import React from 'react';
import mockProfiles from '../profiles.json';

export const ProfileContext = React.createContext({
  profiles: [],
});

export const ACTIONS = {
  ASCENDING: 'ascending',
  PROFILES_LOADED: 'PROFILES_LOADED',
  PROFILES_LOADING: 'PROFILES_LOADING',
  DESCENDING: 'descending',
};

const initialState = {
  loading: false,
  loaded: false,
  pokemon: [],
  profiles: mockProfiles,
};

function profilesReducer(state, action) {
  let profiles;

  switch (action.type) {
    case ACTIONS.ASCENDING:
      profiles = [...state.profiles];
      profiles.sort((profileA, profileB) => (profileA.handle > profileB.handle ? 1 : -1));
      return { ...state, profiles };

    case ACTIONS.PROFILES_LOADED:
      return { ...state, loading: false, loaded: true, pokemon: action.payload };

    case ACTIONS.PROFILES_LOADING:
      return { ...state, loading: true, loaded: false };

    case ACTIONS.DESCENDING:
      profiles = [...state.profiles];
      profiles.sort((profileA, profileB) => (profileA.handle < profileB.handle ? 1 : -1));
      return { ...state, profiles };

    default:
      throw new Error();
  }
}

function ProfilesContextProvider({ children }) {
  const [state, dispatch] = React.useReducer(profilesReducer, initialState);

  async function asyncDispatch() {
    dispatch({ type: ACTIONS.PROFILES_LOADING });

    const response = await fetch('https://pokeapi.co/api/v2/pokemon');
    const payload = await response.json();

    if (payload?.results) {
      const pokemon = await Promise.all(
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

      dispatch({ type: ACTIONS.PROFILES_LOADED, payload: pokemon });
    }
  }

  return (
    <ProfileContext.Provider value={{ ...state, asyncDispatch, dispatch }}>
      {children}
    </ProfileContext.Provider>
  );
}

export default ProfilesContextProvider;
