import React from "react";
import styled from "styled-components/native";
import { View, Text, Button as RNButton, ScrollView, TouchableOpacity, Image } from "react-native";
import { Surface, List } from "react-native-paper";
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
width: 130px;
align-items: center;
padding: 10px;
border-radius: 10px;
background-color: ${(props) => props.theme.colors.ui.button};
`;

const ButtonText = styled.Text`
font-size: 24px;
color: white;
`;

const CardASec = styled.View`

`;

const CardBSec = styled.View`
margin-left: auto;
`;

const AdsTitle = styled.Text`
font-size: 25px;
color: white;
padding-bottom: 6px;
`;

const AmountTitle = styled.Text`
font-size: 22px;
text-align: right;
padding-right: 15px;
font-weight: bold;
`;

const Paragraph = styled.Text`
font-size: 19px;
padding-bottom: 6px;
color: gainsboro;
`;

export const TransactionsCardComponent = ({ transactions }) => {
    const navigation = useNavigation()

    return (
       <ScrollView contentContainerStyle={{ alignContent: 'center'}}>
      {transactions.map((t) => (
     <TouchableOpacity   key={t.id} onPress={() => navigation.navigate("View Transaction Detail", {
      details: t
     })}>
     <List.Item
     title={t.title}
   description={t.date.toDate().toDateString().toString()}
   titleStyle={{ color: 'white'}}
   descriptionStyle={{ color: 'white'}}
   left={props => <Image style={{ width: 40, height: 40 }} source={require("../../../assets/notifications.png")} />}
   right={props =>  <AmountTitle style={{ color: t.type === "Money In" ? "green" : "red" }}>${t.amount === 0 ? "0.00" : t.amount}</AmountTitle>}
   />
   </TouchableOpacity>
      ))}
       </ScrollView>
    )
}