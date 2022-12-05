import React from "react";
import { Text, StatusBar } from "react-native"
import styled from "styled-components/native";
import { TextInput, Button as PaperButton } from 'react-native-paper';

const Bakcground = styled.View`
background-color: ${(props) => props.theme.colors.primary};
flex: 1;
width: 100%;
height: 100%;
${StatusBar.currentHeight && `margin-top: ${StatusBar.currentHeight}`};
`;

const FormContainer = styled.View`
margin: auto;
align-items: center
justify-content: center;
`;

const Title = styled.Text`
font-size: 25px;
`;


const Button = styled(PaperButton)`
width: 190px;
margin-top: 18px;
padding: 7px;
`;


export const MainScreen = ({ navigation }) => {

    return (
       <Bakcground>
       <FormContainer>
       <Title>Welcome</Title>
     <Button mode="contained" onPress={() => navigation.navigate("Login")}>Login</Button>
     <Button mode="contained" onPress={() => navigation.navigate("Register")}>Register</Button>
       </FormContainer>
       </Bakcground>
    )
}