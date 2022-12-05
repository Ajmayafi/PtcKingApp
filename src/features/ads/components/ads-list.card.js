import React from "react";
import styled from "styled-components/native";
import { View, Text, Button as RNButton, ScrollView, FlatList, Pressable, Alert } from "react-native";
import { useAuth } from "../../../services/hooks/useAuth";
import { collection, query, where, getDocs, doc, updateDoc, increment , getDoc } from "firebase/firestore";
import { db } from "../../../../firebase.config";
import { Surface } from "react-native-paper";
import { useNavigation } from '@react-navigation/native';


const CardsContainer = styled.View`

`;

const CardItem = styled(Surface)`
width: 90%;
background-color: #333333;
border-radius: 8px;
padding: 12px;
margin-bottom: 35px;
flex-direction: row;
`;

const Button = styled(Surface)`
width: 120px;
align-items: center;
padding: 6px;
border-radius: 10px;
background-color: ${(props) => props.theme.colors.ui.button};
`;

const ButtonText = styled.Text`
font-size: 20px;
color: white;
`;

const CardASec = styled.View`

`;

const CardBSec = styled.View`
margin-left: auto;
`;

const AdsTitle = styled.Text`
font-size: 20px;
color: white;
padding-bottom: 6px;
`;

const AmountTitle = styled.Text`
font-size: 23px;
padding-bottom: 6px;
text-align: right;
padding-right: 6px;
color: white;
`;

const Paragraph = styled.Text`
font-size: 14px;
padding-bottom: 6px;
color: gainsboro;
`;

export const AdsCardComponent = ({ adsdata }) => {
    const navigation = useNavigation()
    const { user } = useAuth()

    const taskChecker = async (item, index) => {
       if(user.plan_id === null) {
        Alert.alert(
          "Error",
          "You have to subscribe to a plan before you can view task",
          [
            { text: "Okay", onPress: () => navigation.navigate("Dashboard") }
          ],
          {
           cancelable: false,
         }
        );
         return
       }

  const docRef = doc(db, "plans", user.plan_id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
  const docData = docSnap.data()
  console.log("Document data:", docSnap.data());

  if(Number(user.tdt) < Number(docData.daily_limit)) {
    navigation.navigate("View Ad", {
      adsdata: item
     })
  } else {
    Alert.alert(
      "Error",
      "You have to reached the maximum ad views for your plan! Wait till next day",
      [
        { text: "Okay", onPress: () => navigation.navigate("Dashboard") }
      ],
      {
       cancelable: false,
     }
    );
  }


  } else {
  console.log("No such document!");
 }

    }

    const renderItem = ({ item, index }) => (
        <CardItem>
        <CardASec>
        <AdsTitle>Advertisement</AdsTitle>
        <Paragraph>Duration: {item.duration}</Paragraph>
        </CardASec>
        <CardBSec>
         <AmountTitle>{item.amount}</AmountTitle>
         <Pressable onPress={() => taskChecker(item, index)}>
         <Button><ButtonText>View Ad</ButtonText></Button>
         </Pressable>
        </CardBSec>
    </CardItem>
      );

    return (
        <FlatList
           contentContainerStyle={{ marginLeft: 22, paddingTop: 20}}
           data={adsdata}
           renderItem={renderItem}
           keyExtractor={item => item.id}
         /> 
    )
}