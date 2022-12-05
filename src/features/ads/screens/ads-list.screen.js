import React, { useState, useEffect } from "react";
import { Text, StatusBar, ScrollView, TextInput, SafeAreaView } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useAuth } from "../../../services/hooks/useAuth";
import { db } from "../../../../firebase.config";
import styled from "styled-components/native";

import { AdsCardComponent } from "../components/ads-list.card";

const Bakcground = styled(SafeAreaView)`
background-color: ${(props) => props.theme.colors.primary};
flex: 1;
`;

const AdsContainer = styled.View`
width: 100%;
height: 100%;

padding-bottom: 30px;
`;

const NotFoundView = styled.View`
margin-top: 50%;
`;

const NotFoundText = styled.Text`
font-size: 23px;
text-align: center;
color: white;
`;



export const AdsListScreen = () => {
      const [adsdata, setAdsData] = useState(null)
      const [loading, setLoading] = useState(false)
      const [watchedAds, setWatchedAds] = useState(null)

      const { user } = useAuth()

    function filterData() {
      let results = []

      if(watchedAds && watchedAds.length === 0) {
          for(const adss in adsdata) {
            if(adsdata[adss].showed < adsdata[adss].max_show) {
               results.push(adsdata[adss])
            }
          }
          return results
      }

      for(const ad in watchedAds) {
         for(const das in adsdata) {
            if(watchedAds[ad].ads_id !== adsdata[das].id && adsdata[das].showed < adsdata[das].max_show) {
               results.push(adsdata[das])
            }
         }
         return results
      }
    }

    const filteredAds =  filterData();

   useEffect(() => {
      async function fetchPlans() {

         try {
            setLoading(true)
            const wdRef = collection(db, "ads_views");
            const adsRef = collection(db, "ads");
            let results = []
            let data = []

            const q = query(adsRef, where("active", "==", true));
            const wDQ = query(wdRef, where("watched_by", "==", user.id));
             
            const wdtSnapshot = await getDocs(wDQ)
            const querySnapshot = await getDocs(q)
            wdtSnapshot.forEach((doc) => {
              data.push({id: doc.id, ...doc.data()})
               })
            querySnapshot.forEach((doc) => {
            results.push({id: doc.id, ...doc.data()}) 
            })
            setLoading(false)
            setWatchedAds(data)
            setAdsData(results)

         }catch(error) {
            setLoading(false)
            console.log(error)
         }
       
      }
    
        fetchPlans()
   }, [])
    return (
       <Bakcground>
       
    <AdsContainer>
    {loading && <ActivityIndicator animating={true} size="large" color="white" />}
      {adsdata && filteredAds.length >=1 && !loading && <AdsCardComponent adsdata={filteredAds} /> }
      {!loading && adsdata &&  filteredAds.length === 0 &&  <NotFoundView>
         <NotFoundText>No ads found!</NotFoundText>
         </NotFoundView> }
       </AdsContainer> 


       </Bakcground> 
    )
}