import { useState, createContext } from 'react';

// 1. Create the context
export const UserContext = createContext();

// 2. Create the provider component
const UserProvider = ({ children }) => {
const [userId,setUserId]=useState(null)

  return (
    <UserContext.Provider value={{userId,setUserId}} >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
