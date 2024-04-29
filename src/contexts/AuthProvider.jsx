import React, { createContext, useEffect, useState } from "react";
import { getIsAuth, signInUser } from "../api/auth";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();
const defaultAuthInfo = {
  profile: null,
  isLoggedIn: false,
  isPending: false,
  error: "",
};

export default function AuthProvider({ children }) {
    const navigate = useNavigate()
  const [authInfo, setAuthInfo] = useState({ ...defaultAuthInfo });
  const handleLogin = async (email, password) => {
    setAuthInfo({ ...authInfo, isPending: true });
    const { error, user } = await signInUser({ email, password });
    if (error) {
      return setAuthInfo({ ...authInfo, isPending: false, error });
    }
    //USER DATA IS HERE, THE ISSUE IS AFTER THIS
    
    setAuthInfo({
      profile: { ...user },
      isLoggedIn: true,
      isPending: false,
      error: "",
    });
    localStorage.setItem("auth-token", user.token);
  };

  //isAuth is used to check if the user visiting this site is already registered and has their jwttoken in localstorage, if there is then straight away log them in instead of asking for email and password
  const isAuth = async () => {
    const token = localStorage.getItem("auth-token");
    if (!token) return;

    setAuthInfo({ ...authInfo, isPending: true });
    const { error, user } = await getIsAuth(token);
    if (error) {
      return setAuthInfo({ ...authInfo, isPending: false, error });
    }
    setAuthInfo({
      profile: { ...user },
      isLoggedIn: true,
      isPending: false,
      error: "",
    });
    };

  useEffect(() => {
    isAuth(); //this runs as the page loads
  }, []);

  const handleLogout = ()=>{
    localStorage.removeItem('auth-token')
    setAuthInfo({...defaultAuthInfo});
    navigate('/')
  }
  return (
    <AuthContext.Provider value={{ authInfo, handleLogin, handleLogout}}>
      {children}
    </AuthContext.Provider>
  );
}
