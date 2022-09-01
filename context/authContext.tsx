import React, { createContext, useEffect, useState } from 'react';
import { detectarCambiosEnLaSesion, getUserData, logOut as SignOut } from '../firebase/authQueries';

interface AuthContextProps {
  isAuthenticated: boolean;
  user: UserData | null;
  logIn: (uid: string) => void;
  logOut: () => void;
  setUserData: () => void;
}

export interface UserData {
  uid: string;
  name: string;
  email: string;
  photoURL: string;
  score: {
    total: number;
    history: []
  }
}


export const AuthContext = createContext({} as AuthContextProps);


export const AuthContextProvider = ({ children }: any) => {

  const [auth, setAuth] = useState<boolean>(false);
  const [user, setUser] = useState<UserData | null>(null);

  useEffect(() => {
    checkIfLogged();
  },[]);

  const checkIfLogged = async () => {
    await detectarCambiosEnLaSesion(logIn);
  }
  const logOut = () => {
    setAuth(false);
    setUser(null);
    SignOut();
  }

  const logIn = (uid: string) => {
    setAuth(true);
    setUser({
      uid,
      email: '',
      name: '',
      photoURL: '',
      score: {
        history: [],
        total: 0
      }
    });
  }

  const setUserData = async () => {
    if (!user) return;

    const resp = await getUserData(user.uid);
    if (resp.ok) {
      setUser({
        ...user,
        ...resp.data
      })
    }
  }

  return (
    <AuthContext.Provider value={{
      isAuthenticated: auth,
      user,
      logOut,
      logIn,
      setUserData
    }}>
      {children}
    </AuthContext.Provider>
  )
}

