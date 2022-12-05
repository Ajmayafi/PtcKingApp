import React, { useContext, useState } from "react";
import { useAuth } from "../../../services/hooks/useAuth";
import { ScrollView, SafeAreaView, StatusBar, TouchableOpacity, StyleSheet } from "react-native"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Avatar, List, Switch, Surface } from 'react-native-paper';
import LottieView from "lottie-react-native";
import styled from "styled-components/native";

const SettingsBackground = styled(SafeAreaView)`
flex: 1;
background-color: ${(props) => props.theme.colors.primary};
${StatusBar.currentHeight && `margin-top: ${StatusBar.currentHeight}px`};
padding: 12px;
padding-bottom: 13px;
`;

const SettingsBgAni = styled.View`
position: absolute;
width: 100%;
height: 100%
`;

const TitleNum = styled.Text`
font-size: 15px;
color: white;
`;

const AvatarContainer = styled.View`
align-items: center;
margin-top: 12px;
`;

const AvatarCard = styled(Avatar.Text)`
background-color: ${(props) => props.theme.colors.ui.button};
`;

const Title = styled.Text`
padding-top: 20px;
font-size: 28px;
color: white;
`;

const SetIBackground  = styled(Surface)`
margin: 10px;
border-radius: 10px;
background-color: ${(props) => props.theme.colors.ui.input}
`;

const SettingsItem = styled(List.Item).attrs({
    titleStyle: {
        color: 'white'
    },
    descriptionStyle: {
        color: 'gainsboro'
    }
})`

`;

const VersionTitle = styled.Text`
font-size: 13px;
color: white;
text-align: center;
`;

export const SettingsScreen = ({ navigation }) => {

   const { user, dispatch } = useAuth()

   const str = user.name;

   const date = user.cpe_date && user.cpe_date !== null ? user.cpe_date.toDate().toDateString() : null


   const logout = async () => {
    try {
      await AsyncStorage.removeItem('@user')
      dispatch({ type: 'LOGOUT'})
    } catch(e) {
        console.log(e)
    }
  }

  return (
     <SettingsBackground>
      <ScrollView>
      <AvatarContainer>
       <Avatar.Text elevation={3} size={120}  label={str.substring(0, 1)} />
       <Title>{user.name}</Title>
       {user.cpe_date && user.cpe_date !== null && <TitleNum>Current plan expire on: {date.toString()}</TitleNum> }
       {!user.cpe_date && <TitleNum>You are not subscribe to any plan</TitleNum>}
       </AvatarContainer>
       <List.Section>
        <SetIBackground>
         <SettingsItem
    onPress={() => navigation.navigate("Profile Details")}
    title="Profile"
    description="Update your account details"
    left={props => <List.Icon {...props} color="white" icon="account" />}
  />
  </SetIBackground>
  <SetIBackground>
         <SettingsItem
    onPress={() => navigation.navigate("Account Settings")}
    title="Settings"
    description="More controls of your account"
    left={props => <List.Icon {...props} color="white" icon="wrench" />}
  />
  </SetIBackground>
  <SetIBackground>
    <SettingsItem
    title="Support"
    description="This feature is coming soon!"
    color="white"
    left={props => <List.Icon {...props} color="white" icon="phone" />}
  />
  </SetIBackground>
  <SetIBackground style={styles.shadow}>
    <SettingsItem
     onPress={() => logout()}
    title="Log out"
    description="Sign out your account"
    left={props => <List.Icon {...props} icon="arrow-right-bold-box-outline" color="white" />}
  />
  </SetIBackground>
       </List.Section>
       <VersionTitle>V1.0</VersionTitle>
       </ScrollView>
       </SettingsBackground>
  )
}


const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
  }
})