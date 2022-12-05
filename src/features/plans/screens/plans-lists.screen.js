import React, { useEffect, useState } from "react";
import { Text, StatusBar, ScrollView, TextInput, SafeAreaView, Button as RNButton, TouchableOpacity, Alert, FlatList } from "react-native"
import styled from "styled-components/native";
import {  Button as PaperButton, Surface, Divider, ActivityIndicator } from 'react-native-paper';
import { collection, query, where, getDocs, doc, updateDoc, increment , addDoc, serverTimestamp,  writeBatch } from "firebase/firestore";
import { db } from "../../../../firebase.config";
import { useAuth } from "../../../services/hooks/useAuth";
import uuid from 'react-native-uuid';

import { StatusBar as ExpoStatusBar } from 'expo-status-bar';



const Button = styled(Surface)`
width: 230px;
margin-top: 18px;
align-items: center;
padding: 13px;
border-radius: 10px;
background-color: ${(props) => props.theme.colors.ui.button};
margin-bottom: 18px;
`;

const ButtonText = styled.Text`
font-size: 24px;
color: white;
`;

const Paragraph = styled.Text`
font-size: 20px;
text-align: center;
width: 95%;
padding: 10px;
color: white;
`;

const SubItemCard = styled(Surface)`
width: 90%;
background-color: #333333;
border-radius: 8px;
border-radius: 10px;
margin-bottom: 35px;
align-items: center;
justify-content: center;
`;

const PlanName = styled.Text`
font-size: 32px;
color: white;
padding: 10px;
`;

const PlanPrice = styled.Text`
font-size: 40px;
color: white;
padding: 8px;
`;

const PlanHeaderSection = styled.View`
align-items: center;
width: 100%;
background-color: ${(props) => props.theme.colors.ui.button}
padding-bottom: 10px;
border-radius: 10px;
`;

const PlanFeatures = styled.View`
padding-top: 14px;
align-items: center;
`;

const PlanFTitle = styled.Text`
font-size: 23px;
font-weight: bold;
color: white;
`;

const PlanDTitle = styled.Text`
font-size: 22px;
color: white;
`;

// const ErrorTitle = styled.Text`
// font-size: 18px;
// color: red;
// width: 95%;
// text-align: center;
// padding: 10px;
// `;


const Background = styled.View`
flex: 1;
justify-content: center;
background-color: ${(props) => props.theme.colors.primary};
padding-left: 23px;
`;


export const PlansListScreen = ({ navigation }) => {
   const [plans, setPlans] = useState(null)
   const [error, setError] = useState(null)
   const [loading, setLoading] = useState(false) 

   const { user } = useAuth()

   const showErrorAlert = () =>
   Alert.alert(
     "Error",
     `${error}`,
     [
       { text: "Okay", onPress: () => console.log("OK Pressed") }
     ],
     {
      cancelable: true,
    }
   );


   const handleSubscribeToPlan = async (i) => {
      setError(null)
      if(plans[i].price > Number(user.balance)) {
          Alert.alert(
            "Error",
            "You don't have enough funds to subscribe to this plan",
            [
              { text: "Okay", onPress: () => console.log("OK Pressed") }
            ],
            {
             cancelable: true,
           }
          );
          return 
      }

    
      const today = new Date()
      const expiryDate = new Date(new Date().setDate(today.getDate() + plans[i].validity))
      
     try {
     
  const batch = writeBatch(db)

const sfRef = doc(db, "users", user.id);
batch.update(sfRef, {
  balance: increment(-Number(plans[i].price)),
  plan_id: plans[i].id,
  cpe_date: expiryDate,
  notification_counter: increment(+1)
});

const tRef = doc(db, "transactions", uuid.v4());
batch.set(tRef, {
  amount: plans[i].price,
  status: "Completed",
  made_by: user.id,
  type: 'Money Out',
  title: "Plan Subscription",
  method: 'plan_subscription',
  date: serverTimestamp()
});

const nRef = doc(db, "notifications", uuid.v4());
batch.set(nRef, {
  seen: false,
      sent_to: user.id,
      title: "Subscription Update",
      body: `Your subscription to ${plans[i].name} plan is successfull, enjoy earning`,
});

await batch.commit();
  
    console.log("Subscribed successfully")
  // NAVIGATES THE USER TO  SUCCESS PAGE
  Alert.alert(
    "Success",
    "You have successfully subscribed to the plan! Cheers",
    [
      { text: "Okay", onPress: () => console.log("OK Pressed") }
    ],
    {
     cancelable: true,
   }
  );

     } catch(error) {
        setLoading(false)
        console.log(error)
     }
   }

   const handleUnsubscribe = async (i) => {
       try {
        const userRef = doc(db, "users", user.id);
        await updateDoc(userRef, {
          plan_id: null,
          cpe_date: null
        });

        Alert.alert(
          "Success",
          "You have successfully unsubscribed to plan",
          [
            { text: "Okay", onPress: () => console.log("OK Pressed") }
          ],
          {
           cancelable: true,
         }
        );
        
       } catch(error) {

       }
   }


   const renderItem = ({ item, index }) => (
      <SubItemCard key={item.id}>
      <PlanHeaderSection>
      <PlanName>{item.name}</PlanName>
      <Divider />
      <PlanPrice>${item.price}</PlanPrice>
     </PlanHeaderSection>
  <PlanFeatures>
    <PlanFTitle>Plan details</PlanFTitle>
    <Text style={{ color: 'gray', fontSize: 27}}>------------------------</Text>
    <PlanDTitle>Daily Limit: {item.daily_limit}</PlanDTitle>
    <Text style={{ color: 'gray', fontSize: 27}}>------------------------</Text>
   <PlanDTitle>Refferal Bonus: ${item.ref_bonus}</PlanDTitle>
   <Text style={{ color: 'gray', fontSize: 27}}>------------------------</Text>
   <PlanDTitle>Price: ${item.price}</PlanDTitle>
   <Text style={{ color: 'gray', fontSize: 27}}>------------------------</Text>
   <PlanDTitle>Validity: {item.validity} Days</PlanDTitle>
   <Text style={{ color: 'gray', fontSize: 27}}>------------------------</Text>
  </PlanFeatures>
  
  <TouchableOpacity onPress={() => user.plan_id === item.id ? handleUnsubscribe(index) : handleSubscribeToPlan(index)}>
  <Button style={{ backgroundColor: user.plan_id === item.id ? "#333333" : "#1E90FF"}}><ButtonText style={{ color: user.plan_id === item.id ? "gainsboro" : 'white' }}>{user.plan_id === item.id ? "Unsubscribe" : "Subscribe Now"}</ButtonText></Button>
  </TouchableOpacity>
  </SubItemCard>
    );


   useEffect(() => {
    async function fetchPlans() {
     setLoading(true)
    const plansRef = collection(db, "plans");
    let results = []
    const q = query(plansRef, where("active", "==", true));
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc) => {
    results.push({id: doc.id, ...doc.data()})
    setLoading(false)
    setPlans(results)
    console.log(results)
    })
  }

    fetchPlans()
   }, [])

   useEffect(() => {

     console.log(error)

   }, [error])
    return (
        <Background>
     {loading && <ActivityIndicator animating={true} size="large" color="white" />}

     {!loading && <FlatList
        contentContainerStyle={{ marginLeft: 22, paddingTop: 20}}
        data={plans}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      /> }
        </Background>
    )
}