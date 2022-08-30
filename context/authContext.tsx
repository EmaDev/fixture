import React, { createContext, useState } from 'react';

interface AuthContextProps {
  isAuthenticated: boolean;
  logIn: () => void;
  logOut: () => void;
}

export const AuthContext = createContext({} as AuthContextProps);

  
export const AuthContextProvider = ({children}:any) => {
  
  const [auth, setAuth] = useState<boolean>(true);

  const logOut = () => {
    setAuth(false);
  }

  const logIn = () => {
    setAuth(true);
  }
  return (
    <AuthContext.Provider value={{
      isAuthenticated: auth,
      logOut,
      logIn
    }}>
      {children}
    </AuthContext.Provider>
  )
}
