import React, { useState } from "react";
import { Text, StatusBar, TextInput, Dimensions, StyleSheet, View, Alert } from "react-native"
import styled from "styled-components/native";
import { Button as PaperButton } from 'react-native-paper';
import SelectDropdown from 'react-native-select-dropdown';
const {width} = Dimensions.get('window');
import { styles } from "../styles/deposit.styles";

const Bakcground = styled.View`
background-color: ${(props) => props.theme.colors.primary};
flex: 1;
${StatusBar.currentHeight && `margin-top: ${StatusBar.currentHeight}`};
`;

const FormContainer = styled.View`
margin-top: 100px;
align-items: center
justify-content: center;
`;

const Title = styled.Text`
font-size: 25px;
color: #ffffff;
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


export const AddMoneyScreen = ({ navigation }) => {
     const [amount, setAmount] = useState(null)
     const [method, setMethod] = useState(null)

     const methods = ["Paystack", "Flutterwave", "Stripe"]


     const handleDeposit = () => {
         if(!method || !amount) {
          Alert.alert(
            "Error",
            "Amount and the method must not be empty",
            [{ text: "Okay", onPress: () => console.log("OK Pressed") }],
            {
              cancelable: true,
            }
          )
          return
        }

        if(amount < 100) {
          Alert.alert(
            "Error",
            "Amount must not be less than 100",
            [{ text: "Okay", onPress: () => console.log("OK Pressed") }],
            {
              cancelable: true,
            }
          )
          return
        }

        if(method === "Paystack") {
          navigation.navigate("Pay With Paystack", {
            amount: amount
          })
        }


         }
    
    return (
       <Bakcground>
       <FormContainer>
       <Input
       onChangeText={setAmount}
       placeholderTextColor="gainsboro"
        placeholder="Amount"
        keyboardType="decimal-pad"
        
      />
       <SelectDropdown
            data={methods}
            // defaultValueByIndex={1}
            // defaultValue={'Egypt'}
            onSelect={(selectedItem, index) => {
              setMethod(selectedItem)
              
            }}
            defaultButtonText={'Select Method'}
            buttonTextAfterSelection={(selectedItem, index) => {
              return selectedItem;
            }}
            rowTextForSelection={(item, index) => {
              return <View>
                <Text>{item}</Text>
              </View>;
            }}
            buttonStyle={styles.dropdown1BtnStyle}
            buttonTextStyle={styles.dropdown1BtnTxtStyle}
            dropdownIconPosition={'right'}
            dropdownStyle={styles.dropdown1DropdownStyle}
            rowStyle={styles.dropdown1RowStyle}
            rowTextStyle={styles.dropdown1RowTxtStyle}
            selectedRowStyle={styles.dropdown1SelectedRowStyle}
          />
     <Button mode="contained" onPress={() => handleDeposit()}>
    Submit
  </Button>

       </FormContainer>
       </Bakcground>
    )
}