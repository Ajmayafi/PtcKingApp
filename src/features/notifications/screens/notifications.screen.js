import React, { useState, useEffect } from "react";
import { Text, StatusBar, ScrollView, TextInput, Image, SafeAreaView } from "react-native"
import styled from "styled-components/native";
import {  Button as PaperButton, List , ActivityIndicator } from 'react-native-paper';
import { collection, query, where, getDocs, doc, updateDoc, decrement, addDoc } from "firebase/firestore";
import { db } from "../../../../firebase.config";
import { useAuth } from "../../../services/hooks/useAuth";

const Bakcground = styled(SafeAreaView)`
background-color: ${(props) => props.theme.colors.primary};
flex: 1;
width: 100%;
margin: auto;
${StatusBar.currentHeight && `margin-top: ${StatusBar.currentHeight}`};
`;

const FormContainer = styled.View`
width: 100%;
height: 100%;
margin-top: 20px;
`;

const Title = styled.Text`
font-size: 25px;
color: #ffffff;
text-align: center;
padding-bottom: 20px;
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


const NotNotf = styled.View`

`;

const NoNotTitle = styled.Text`
font-size: 22px;
color: white;
text-align: center;
`;


const ListItem = styled(List.Item)`

`;



export const NotificationsScreen = () => {
    const [notifications, setNotifications] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const { user } = useAuth()

    useEffect(() => {
      async function getNotifications() {
         setLoading(true)
          try {
            const notFicRef = collection(db, "notifications");
           let results = []
           const q = query(notFicRef, where("sent_to", "==", user.id));
           const querySnapshot = await getDocs(q);
           querySnapshot.forEach((doc) => {
           results.push({id: doc.id, ...doc.data()})
           setNotifications(results)
         })
          
         if(results.length <1) {
             setNotifications([])
         }
         setLoading(false)
          } catch(error) {
            setLoading(false)
             console.log(error)
          }
         
       }

       getNotifications()

    }, [])

    useEffect(() => {

    const handleUpdateUserNotification = async () => {
      if(user.notification_counter >=1) {
       try {
         const userRef = doc(db, "users", user.id);
    await updateDoc(userRef, {
    notification_counter: 0
   });

       } catch(err) {
        console.log(err)
       }
      }
    }  


     if(notifications && notifications.length >= 1) {
        setTimeout(() => {
       handleUpdateUserNotification()
        }, 2000)  
     }
    }, [notifications])


    return (
       <Bakcground>
       <FormContainer>
    <Title>Notifications</Title>
    <ScrollView>
   <NotNotf>
   {loading && <ActivityIndicator color="white" size={45} />}
   {!loading && notifications && notifications.length === 0 && <NotNotf>
      <NoNotTitle>No Notifications Found</NoNotTitle>
   </NotNotf> }
   {notifications && notifications.length >=1 &&  notifications.map((n) => (
   <ListItem
   key={n.id}
   title={n.title}
   description={n.body}
   titleStyle={{ color: 'white'}}
   descriptionStyle={{ color: 'white'}}
   left={props => <Image style={{ width: 40, height: 40 }} source={require("../../../assets/notifications.png")} />}
   />
   ))}
   </NotNotf>
  </ScrollView>
       </FormContainer>
       </Bakcground>
    )
}
