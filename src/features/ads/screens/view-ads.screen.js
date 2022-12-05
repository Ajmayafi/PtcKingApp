import React, { useState, useRef } from "react";
import { View, Text, StyleSheet, Button, Pressable, Alert, Image  } from "react-native";
import styled from "styled-components";
import { Surface, ActivityIndicator } from "react-native-paper";
import { Video, AVPlaybackStatus } from 'expo-av';
import { AdsCardComponent } from "../components/ads-list.card";
import { Countdown } from "../components/countdown.component";
import { ProgressBar, MD3Colors } from 'react-native-paper';
import { collection, query, where, getDocs, doc, updateDoc, increment , addDoc, serverTimestamp, writeBatch } from "firebase/firestore";
import { useAuth } from "../../../services/hooks/useAuth";
import { db } from "../../../../firebase.config";
import uuid from 'react-native-uuid';

const Background = styled.View`
flex: 1;
background-color: ${(props) => props.theme.colors.primary};
`;

const AdShowContainer = styled.View`
align-items: center;
`;

const VideoFrame = styled(Video)`
width: 320px;
height: 200px;
border-radius: 12px;
`;

const ButtonsWrapper = styled.View`

`;

const ButtonPlay = styled(Surface)`
width: 210px;
padding: 10px;
border-radius: 10px;
align-items: center;
background-color: ${(props) => props.theme.colors.ui.button};
`

const ButtonText = styled.Text`
font-size: 22px;
text-align: center;
color: white;
`;

const AdsDescription = styled.View`

`;

const AdsDescText = styled.Text`
color: white;
font-size: 18px;
`;

const ImageView = styled(Image)`
width: auto;
height: auto;
max-height: 300px;
max-width: 350px;
`;

export const ViewAdScreen = ({ navigation, route }) => {
    const video = useRef(null);
    const [status, setStatus] = useState({});
    const [progress, setProgress] = useState(1)
    const [loading, setLoading] = useState(false)

    const { user } = useAuth()

   const { adsdata } = route.params;


    const onProgress = (progress) => {
      setProgress(progress)
    };

    const showSuccessAlert = () => {
      Alert.alert(
        "Success",
        "You have successfully view this ad, click ok to go back",
        [
          { text: "Okay", onPress: () => navigation.navigate("Dashboard") }
        ],
        {
         cancelable: false,
       }
      );
    }



    const onEnd = async () => {
      const batch = writeBatch(db)
      
        try {
    
       


          const userRef = doc(db, "users", user.id)
          batch.update(userRef, {
          balance: increment(+adsdata.amount),
          tdt: increment(+1)
         })
    
         const adRef = doc(db, "ads", adsdata.id)
         batch.update(adRef, {
         showed: increment(+1)
        })

        const tRef = doc(db, "transactions", uuid.v4());

         batch.set(tRef, {
          amount: adsdata.amount,
          status: "Completed",
          made_by: user.id,
          type: 'Money In',
          title: "Commission from Ad view",
          date: serverTimestamp(),
          method: 'ad_view'
        });

        const adsRef =  doc(db, "ads_views", uuid.v4());
        batch.set(adsRef, {
          ads_id:  adsdata.id,
          watched_by: user.id,
          date: serverTimestamp()
        });

        await batch.commit()
       
        showSuccessAlert()
  
        } catch(error) {
          setLoading(false)
          console.log(error)
          Alert.alert(
            "Error",
            "Something went wrong please try again later",
            [
              { text: "Okay", onPress: () => navigation.navigate("Dashboard") }
            ],
            {
             cancelable: false,
           }
          );
        }
    }

    const MinutesC = {
      "15 Seconds": 0.25,
      "30 Seconds": 0.50,
      "1 Minute": 1,
      "5 Minute": 5,
      "10 Minute": 10,
      "30 Minute": 30
    }
   
    return (
        <Background>
          <ProgressBar progress={progress} color={MD3Colors.error50} />
            <AdShowContainer style={{ marginTop: 30}}>
      {adsdata && adsdata.type === "image" && (
        <>
         <Countdown minutes={MinutesC[adsdata.duration]} onEnd={onEnd} onProgress={onProgress} isPaused={false} /> 
         <AdsDescription>
        <AdsDescText>You need to stay here upto {adsdata.duration}</AdsDescText>
      </AdsDescription>  
        <Image source={{ uri: adsdata.body }} resizeMode="contain" style={{ alignSelf: 'center', width: 350, height: 350, marginTop:  20}} />
        {loading && <ActivityIndicator style={{ marginTop: 10}} size={45} color="white"  />}
        </>
      )}  
          
      {adsdata && adsdata.type === "video" &&  (
        <>
          <Countdown minutes={MinutesC[adsdata.duration]}  onEnd={onEnd} onProgress={onProgress} isPaused={status.isPlaying ? false : true } />   
      <AdsDescription>
        <AdsDescText>You need to watch this video upto {adsdata.duration}</AdsDescText>
      </AdsDescription>
      <VideoFrame
        ref={video}
        style={{ width: 320, height: 200}}
        source={{
          uri: adsdata.body,
        }}
        useNativeControls
        resizeMode="contain"
        isLooping
        onPlaybackStatusUpdate={status => setStatus(() => status)}
      />
      <ButtonsWrapper>
      {loading && <ActivityIndicator size={45} color="white" style={{ marginTop: 10}}  />}
      {!loading &&  <Pressable onPress={() =>
            status.isPlaying ? video.current.pauseAsync() : video.current.playAsync()
          }>
        <ButtonPlay>
            <ButtonText>{status.isPlaying ? 'Pause' : 'Play'}</ButtonText>
        </ButtonPlay>
        </Pressable> }
      </ButtonsWrapper>
      </>
      )}
         
       </AdShowContainer>
        </Background>
    )
}