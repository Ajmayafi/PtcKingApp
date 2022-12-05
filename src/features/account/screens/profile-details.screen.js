import React, { useState } from "react";
import { Text, StatusBar, ScrollView, TextInput, StyleSheet, Dimensions, View } from "react-native"
import styled from "styled-components/native";
import {  Button as PaperButton, ProgressBar, ActivityIndicator } from 'react-native-paper';
import { useAuth } from "../../../services/hooks/useAuth";

const Bakcground = styled.View`
background-color: ${(props) => props.theme.colors.primary};
flex: 1;
width: 100%;
margin: auto;
`;

const FormContainer = styled.View`
width: 100%;
height: 100%;
`;

const Title = styled.Text`
font-size: 19px;
color: #ffffff;
`;

const Input = styled(TextInput).attrs({
    editable: true
})`
width: 320px;
height: 66px;
background-color: ${(props) => props.theme.colors.ui.input};
font-size: 19px;
color: #C1C1C1;
`;

const DisabledInput = styled(TextInput).attrs({
    editable: false
})`
width: 320px;
height: 66px;
background-color: ${(props) => props.theme.colors.ui.input};
font-size: 19px;
color: #C1C1C1;
`;

const Button = styled(PaperButton)`
width: 190px;
margin-top: 18px;
padding: 7px;
`;

const InputWrapper = styled.View`
align-items: flex-start;
margin: 12px;
`;

const Label = styled.Text`
font-size: 17px;
text-align: left;
color: white;
`;

const ErrorTitle = styled.Text`
font-size: 16px;
color: red;
width: 95%;
text-align: center;
padding: 10px;
`;



export const ProfileDetailsScreen = ({ navigation }) => {
     

     const { user } = useAuth()


    return (
       <Bakcground>
       <FormContainer>
    <ScrollView keyboardDismissMode="on-drag" contentContainerStyle={{ alignItems: 'center', justifyContent: 'center', paddingTop: 50, paddingBottom: 50}}>
       <Title>Update your account details</Title>
      <InputWrapper>
      <Label>Email:</Label>
       <DisabledInput
        value={user.email}
        keyboardType="email-address"
        placeholderTextColor="gainsboro"
      />
      </InputWrapper>
      <InputWrapper>
      <Label>Name:</Label>
        <Input
        value={user.name}
        disabled
        keyboardType="text"
      />
      </InputWrapper>
      <InputWrapper>
      <Label>Country</Label>
        <DisabledInput
        value={user.country}
        editable={false}
        placeholderTextColor="gainsboro"
        keyboardType="password"
      />
      </InputWrapper>
      <InputWrapper>
      <Label>Gender</Label>
        <DisabledInput
        value={user.gender}
        editable={false}
        placeholderTextColor="gainsboro"
        keyboardType="password"
      />
      </InputWrapper>
      <InputWrapper>
      <Label>Date of Birth</Label>
        <DisabledInput
        value={user.dob.toDate().toDateString()}
        disabled={true}
        placeholderTextColor="gainsboro"
        keyboardType="password"
      />
      </InputWrapper>
 <Button mode="contained" onPress={() => console.log("Hi")}>Update Profile</Button> 
  </ScrollView>
       </FormContainer>
       </Bakcground>
    )
}

