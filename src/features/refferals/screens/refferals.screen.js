import React, { useContext, useState, useEffect } from "react";
import {  Button, Surface, ActivityIndicator, Snackbar } from "react-native-paper";
import styled from "styled-components/native";
import { StatusBar, SafeAreaView, Image, TouchableOpacity, Text } from "react-native";
import LottieView from "lottie-react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';
import { auth, db } from "../../../../firebase.config";
import {
  doc,
  setDoc,
  getDoc,
  serverTimestamp,
  where,
  collection,
  increment,
  getDocs,
  query,
  updateDoc,
  addDoc,
} from "firebase/firestore";
import { useAuth } from "../../../services/hooks/useAuth";
import * as Clipboard from 'expo-clipboard'


const RPBackground = styled(SafeAreaView)`
flex: 1;
background-color: ${(props) => props.theme.colors.primary};
align-items: center;
${StatusBar.currentHeight && `margin-top: ${StatusBar.currentHeight}`};
padding-top: 50px;
`;


const Title = styled.Text`
font-size: 19px;
padding-left: 10px;
font-weight: bold;
text-align: center;
color: white;

`;

const Paragraph = styled.Text`
font-size: 16px;
padding-top: 6px;
padding-left: 10px;
padding-right: 10px;
color: white;
text-align: center;
`;

const TitleView = styled.View`

`;

const ImageContainer = styled.View`

`;

const InfoContainer = styled.View`
justify-content: center;
align-items: center;
text-align: center;
margin-top: 50px;
`;

const InputWrapper = styled.View`
align-items: flex-start;
margin: 12px;
`;

const DOBInput = styled(Surface)`
width: 320px;
height: 66px;
margin: 12px;
background-color: ${(props) => props.theme.colors.ui.input};
font-size: 19px;
color: #C1C1C1;
align-items: flex-start;
justify-content: center;
border-radius: 5px;
`;

const Label = styled.Text`
font-size: 17px;
text-align: left;
color: white;
padding-left: 10px;
`;

const SnackWrapper = styled.View`
margin-top: 40px;
aling-items: center;
justify-content: center;
`;



export const RefferalsScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false)
  const [visible, setVisible] = useState(false);
  const { dispatch, user } = useAuth() 

  const handleGenerateRCode = async () => {
     setLoading(true)
      try {
        const userRef = doc(db, "users", user.id);
        await updateDoc(userRef, {
          ref_code: uuid.v4().substring(0, 7)
        });

        setLoading(false)
      } catch(error) {
        console.log(error)
        setLoading(false)
      }
  }

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(user.ref_code);
    setVisible(true)
  };
  

  useEffect(() => {
     
  }, [])

  return (
    <RPBackground>
   <InfoContainer>
    <ImageContainer>
        <Image style={{ width: 110, height: 100}} source={require("../../../assets/annouce.png")} />
    </ImageContainer>
    <TitleView>
    <Title>Get rewarded for your refferal!!</Title>
    <Paragraph>spread love to people around you and earn per refferal according to your plan</Paragraph>
      </TitleView>
    {user.ref_code &&  <InputWrapper>
      <Label>Refferal Code</Label>
      <TouchableOpacity onPress={copyToClipboard}>
        <DOBInput>
          <Text style={{ fontSize: 18, textAlign: 'left', color: 'white', padding: 10 }}>{user.ref_code}</Text>
        </DOBInput>
        </TouchableOpacity>
        </InputWrapper>
      }
      
     {!user.ref_code && !loading && <Button onPress={() => handleGenerateRCode()} mode="contained" style={{ width: 300, padding: 10, marginTop: 60 }}>Generate</Button> }
     {loading && <ActivityIndicator color="white" size={"46"} /> }  
     <SnackWrapper>
     <Snackbar
     style={{ }}
        visible={visible}
        onDismiss={() => setVisible(false)}>
        Refferal code copied!
      </Snackbar> 
      </SnackWrapper>
   </InfoContainer>
  </RPBackground>
  )
}


