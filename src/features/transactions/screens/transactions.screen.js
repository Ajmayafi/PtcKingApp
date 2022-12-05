import React, { useState, useEffect } from "react";
import { Text, StatusBar, ScrollView, TextInput, SafeAreaView } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { collection, query, where, getDocs, doc, updateDoc, decrement, addDoc, orderBy } from "firebase/firestore";
import styled from "styled-components/native";
import { db } from "../../../../firebase.config";

import { useAuth } from "../../../services/hooks/useAuth";

import { TransactionsCardComponent } from "../components/transaction.card";

const Bakcground = styled(SafeAreaView)`
background-color: ${(props) => props.theme.colors.primary};
flex: 1;
${StatusBar.currentHeight && `margin-top: ${StatusBar.currentHeight}`};
`;

const AdsContainer = styled.View`
width: 100%;
height: 100%;
margin-left: 20px;
margin-top: 70px;
padding-bottom: 30px;
`;

const NotFoundView = styled.View`

`;

const NotFoundText = styled.Text`
font-size: 20px;
text-align: center;
color: white;
`;


export const TransactionsScreen = () => {
      const [data, setData] = useState(false)
      const [loading, setLoading] = useState(false)

      const { user } = useAuth()

      useEffect(() => {
         async function getNotifications() {
            setLoading(true)
             try {
               const notFicRef = collection(db, "transactions");
              let results = []
              const q = query(notFicRef, where("made_by", "==", user.id), orderBy("date", "desc"));
              const querySnapshot = await getDocs(q);
              querySnapshot.forEach((doc) => {
              results.push({id: doc.id, ...doc.data()})
              setData(results)
            })
             
            if(results.length <1) {
                setData([])
            }
            setLoading(false)
             } catch(error) {
               setLoading(false)
                console.log(error)
             }
            
          }
   
          getNotifications()
   
       }, [])

    return (
       <Bakcground>
       <AdsContainer>
       {loading && <ActivityIndicator color="white" size={45} />}
       {!loading && data && data.length === 0 && <NotFoundView>
         <NotFoundText>No transactions found</NotFoundText>
         </NotFoundView>}
      {data && data.length >=1 && <TransactionsCardComponent transactions={data} /> }
       </AdsContainer>
       </Bakcground>
    )
}