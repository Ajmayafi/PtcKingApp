import React, { useState } from "react";
import { Text, StatusBar, TextInput } from "react-native"
import styled from "styled-components/native";
import { Button as PaperButton, ProgressBar, ActivityIndicator } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { auth, db } from "../../../../firebase.config";
import {  signInWithEmailAndPassword } from "firebase/auth";
import { useAuth } from "../../../services/hooks/useAuth";
import { doc, getDoc  } from "firebase/firestore";

const Bakcground = styled.View`
background-color: ${(props) => props.theme.colors.primary};
flex: 1;
${StatusBar.currentHeight && `margin-top: ${StatusBar.currentHeight}`};
`;

const FormContainer = styled.View`
margin: auto;
align-items: center
justify-content: center;
`;

const Title = styled.Text`
font-size: 25px;
color: #ffffff;
`;

const Input = styled(TextInput)`
width: 320px;
height: 66px;
margin: 12px;
background-color: ${(props) => props.theme.colors.ui.input};
font-size: 19px;
color: #C1C1C1;
`;

const Button = styled(PaperButton)`
width: 190px;
margin-top: 18px;
padding: 7px;
`;

const ErrorTitle = styled.Text`
font-size: 16px;
color: red;
width: 95%;
text-align: center;
padding: 10px;
`;


export const LoginScreen = ({ navigation }) => {
     const [email, setEmail] = useState(null);
     const [password, setPassword] = useState(null);
     const [error, setError] = useState(null)
     const [loading, setLoading] = useState(false)
     const [incorrectL, setIncorrectL] = useState(false)

     const { dispatch } = useAuth()

     
  const loginUser = async () => {
    setError(null)
    setIncorrectL(false)

    if(!email || !password) {
      return setError("All field must be field")
    }

    setLoading(true)
    try{
     const res = await signInWithEmailAndPassword(auth, email, password)
     if(res.user) {

      const docRef = doc(db, "users", res.user.uid);
      const docSnap = await getDoc(docRef);
   
      if (docSnap.exists()) {
       const jsonValue = JSON.stringify(docSnap.data())
        await AsyncStorage.setItem('@user', jsonValue)
       dispatch({ type: 'LOGIN', payload: docSnap.data()})
       setLoading(false)
     } else {
       console.log("Aj i am having trouble logging this user!");
       setLoading(false)
     
      } 
    }
  }   
    catch(error) {
      setLoading(false)
     setIncorrectL(true)
  }
  }

    

    return (
       <Bakcground>
       <FormContainer>
       <Title>Login Now</Title>
       {error && <ErrorTitle>{error}</ErrorTitle>}
       {incorrectL && <ErrorTitle>Email or password was incrorrect</ErrorTitle>}
       <Input
        onChangeText={setEmail}
        value={email}
        placeholder="Enter your email address"
        placeholderTextColor="gainsboro"
        keyboardType="email-address"
      />
        <Input
        onChangeText={setPassword}
        value={password}
        secureTextEntry
        placeholder="Enter your password"
        placeholderTextColor="gainsboro"
        keyboardType="password"
      />
   {loading && <ActivityIndicator size={45} color="white" />}
   {!loading && <Button mode="contained" onPress={() => loginUser()}>
    Login
  </Button> }
  <Button mode="text" onPress={() => navigation.navigate('Register')}>
    Or register
  </Button>
       </FormContainer>
       </Bakcground>
    )
}