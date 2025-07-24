import { useState, createContext } from 'react';

// 1. Create the context
export const UserContext = createContext();

// 2. Create the provider component
const UserProvider = ({ children }) => {

  return (
    <UserContext.Provider >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
