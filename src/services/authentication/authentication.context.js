import React, { createContext, useEffect, useReducer } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../../firebase.config";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();


const AuthReducer = (state, action) => {
  switch(action.type) {
     case 'AUTH_IS_READY':
     return {...state, authIsReady: true, user: action.payload }
     case 'LOGIN':
      return { ...state, user: action.payload, isLogin: true }
     case 'UPDATE_USER':
      return { ...state, user: action.payload }
     case 'SAVE CARDS':
      return { ...state, cards: action.payload }
     case 'LOGOUT':
      return { ...state, user: null }
      default:
        return state
  }
}


export const AuthContextProvider = ({ children }) => {
     const [state, dispatch] = useReducer(AuthReducer, {
      user: null,
      authIsReady: false,
      isLogin: false
     })  

     useEffect(() => {
       async function checkUser() {
        try {
          const jsonValue = await AsyncStorage.getItem('@user')
          return jsonValue != null ? dispatch({ type: 'LOGIN', payload: JSON.parse(jsonValue)}) : null;
        } catch(e) {
          
        }
       }

       checkUser()
     }, [])

     useEffect(() => {
      if(state.isLogin) {
        onSnapshot(doc(db, "users", state.user.id), (doc) => {
          const source = doc.metadata.hasPendingWrites ? "Local" : "Server";
          console.log(source, " data: ", doc.data());
          const jsonValue = JSON.stringify(doc.data())
           AsyncStorage.setItem('@user', jsonValue)
          if(doc.data() !== state.user) {
            dispatch({ type: 'UPDATE_USER', payload: doc.data()})
          }
          
        })
      }
     }, [state.isLogin])

  
  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
    {children}
    </AuthContext.Provider>
  )
}