import React from 'react';
import mockProfiles from '../profiles.json';

export const ProfileContext = React.createContext({
  profiles: [],
});

export const ACTIONS = {
  ASCENDING: 'ascending',
  DESCENDING: 'descending',
};

function ProfilesReducer(state, action) {
  let profiles;

  switch (action.type) {
    case ACTIONS.ASCENDING:
      profiles = [...state.profiles];
      profiles.sort((profileA, profileB) => (profileA.handle > profileB.handle ? 1 : -1));
      return { profiles };

    case ACTIONS.DESCENDING:
      profiles = [...state.profiles];
      profiles.sort((profileA, profileB) => (profileA.handle < profileB.handle ? 1 : -1));
      return { profiles };

    default:
      throw new Error();
  }
}

function ProfilesContextProvider({ children }) {
  const [state, dispatch] = React.useReducer(ProfilesReducer, {
    profiles: mockProfiles,
  });

  return (
    <ProfileContext.Provider value={{ ...state, dispatch }}>{children}</ProfileContext.Provider>
  );
}

export default ProfilesContextProvider;
