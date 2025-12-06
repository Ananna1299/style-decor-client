import React, { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";

import { auth } from "../../Firebase/firebase.config";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);

  const googleProvider = new GoogleAuthProvider();

  //signup
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  //signin
  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  //google signup
  const googleSignUp = () => {
    return signInWithPopup(auth, googleProvider);
  };

  //update profile
  const updateData = (profile) => {
    return updateProfile(auth.currentUser, profile);
  };

  //signOut
  const logout = () => {
    setLoading(true);
    return signOut(auth);
  };

  //set observer
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      //console.log(currentUser)
      setLoading(false);
    });
    //clear the observer
    return () => {
      unSubscribe();
    };
  }, []);

  const authInfo = {
    user,
    loading,
    createUser,
    signIn,
    logout,
    googleSignUp,
    updateData,
  };

  return <AuthContext value={authInfo}>{children}</AuthContext>;
};

export default AuthProvider;
