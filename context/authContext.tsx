import React, { createContext, useEffect, useState } from 'react';
import { detectarCambiosEnLaSesion, getUserData, logOut as SignOut } from '../firebase/authQueries';
import { getFixtureByUid } from '../firebase/fixtureQueries';
import { FixtureData } from '../interfaces';
import { FixtureState } from './creatorReducer';

interface AuthContextProps {
  isLoading: boolean;
  isAuthenticated: boolean;
  user: UserData | null;
  userFixture: FixtureData | undefined;
  logIn: (uid: string) => void;
  logOut: () => void;
  setUserData: (uid?:string) => void;
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
  const [userFixture, setUserFixture] = useState<FixtureData>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    checkIfLogged();
  },[]);

  const checkIfLogged = async () => {
    await detectarCambiosEnLaSesion(logIn);
    setIsLoading(false);
  }
  const logOut = () => {
    setAuth(false);
    setUser(null);
    SignOut();
  }

  const logIn = async(uid: string) => {
    const {ok, data} = await getUserData(uid);
    if(ok){
      setAuth(true);
      setUser({
        uid,
        email: data.email,
        name: data.name,
        photoURL: data.photoURL,
        score: data.score
      });

      getUserFixture(uid);
    }
  }

  const setUserData = async (uid?:string) => {
    if (!user) return;

    const resp = await getUserData(uid ? uid : user.uid);
    if (resp.ok) {
      setUser({
        ...user,
        ...resp.data
      })
    }
  }

  const getUserFixture = async(uid:string) => {
    const {ok, data} = await getFixtureByUid(uid);
    if(ok){
      setUserFixture(data);
    }
  }

  return (
    <AuthContext.Provider value={{
      isLoading,
      isAuthenticated: auth,
      user,
      userFixture,
      logOut,
      logIn,
      setUserData
    }}>
      {children}
    </AuthContext.Provider>
  )
}

