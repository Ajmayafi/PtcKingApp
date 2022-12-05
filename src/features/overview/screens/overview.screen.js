import React, { useContext, useState, useEffect } from "react";
import {  ActivityIndicator, Button } from "react-native-paper";
import styled from "styled-components/native";
import { StatusBar, SafeAreaView } from "react-native";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../../../firebase.config";
import { useAuth } from "../../../services/hooks/useAuth";
import LottieView from "lottie-react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

const NotFoundBackground = styled(SafeAreaView)`
width: 100%;
height: 100%;
background-color: ${(props) => props.theme.colors.primary};
align-items: center;
${StatusBar.currentHeight && `margin-top: ${StatusBar.currentHeight}`}
`;

const AnimationWrapper = styled.View`
width: 100%;
height: 60%
`;

const Title = styled.Text`
font-size: 25px;
padding: 10px;
color: gainsboro;

`;

const TitleView = styled.View`

`;

const InfoContainer = styled.View`
justify-content: center;
align-items: center;
`;


export const OverviewScreen = ({ navigation }) => {
  const [totalAdsWatched, setTotalAdsWatched] = useState(null)
  const { dispatch, user } = useAuth() 

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('@user')
      dispatch({ type: 'LOGOUT'})
    } catch(e) {
        console.log(e)
    }
  }

  useEffect(() => {
   async function fetchData() {
    let data = []
    const wdRef = collection(db, "ads_views");
    const wDQ = query(wdRef, where("watched_by", "==", user.id));
     
    const wdtSnapshot = await getDocs(wDQ)
    wdtSnapshot.forEach((doc) => {
      data.push({id: doc.id, ...doc.data()})
       })
    setTotalAdsWatched(data)
   }

   fetchData()
  }, [])

  return (
    <NotFoundBackground>
   <AnimationWrapper>    
    <LottieView
     key="animation"
     autoPlay
     loop
     resizeMode="cover"
     source={require("../animations/analytics.json")}
   />
   </AnimationWrapper>
   <InfoContainer>
    <TitleView>
     {totalAdsWatched && <Title>Total ads view: {totalAdsWatched.length}</Title> }
      </TitleView>
      <TitleView>
      <Title>Total deposit: $50</Title> 
      </TitleView>
      <TitleView>
      <Title>Total withdraw: $60</Title>
      </TitleView>
   </InfoContainer>
  </NotFoundBackground>
  )
}


