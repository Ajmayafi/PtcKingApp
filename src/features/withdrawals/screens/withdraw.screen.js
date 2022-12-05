import React from "react";
import { Text, StatusBar, TextInput, Dimensions, View } from "react-native";
import styled from "styled-components/native";
import { Button as PaperButton } from "react-native-paper";
import SelectDropdown from "react-native-select-dropdown";
const { width } = Dimensions.get("window");
import { styles } from "../../deposit/styles/deposit.styles";

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
  color: #c1c1c1;
`;

const Button = styled(PaperButton)`
  width: 190px;
  margin-top: 18px;
  padding: 7px;
`;

export const WithdrawScreen = () => {
  const method = ["Bank Transfer", "Usdt"];

  return (
    <Bakcground>
      <FormContainer>
        <Input
          placeholderTextColor="gainsboro"
          // onChangeText={setEmail}
          placeholder="Amount"
          keyboardType="decimal-pad"
        />
        <SelectDropdown
          data={method}
          // defaultValueByIndex={1}
          // defaultValue={'Egypt'}
          onSelect={(selectedItem, index) => {
            console.log(selectedItem);
          }}
          defaultButtonText={"Select Method"}
          buttonTextAfterSelection={(selectedItem, index) => {
            return selectedItem;
          }}
          rowTextForSelection={(item, index) => {
            return (
              <View>
                <Text>{item}</Text>
              </View>
            );
          }}
          buttonStyle={styles.dropdown1BtnStyle}
          buttonTextStyle={styles.dropdown1BtnTxtStyle}
          dropdownIconPosition={"right"}
          dropdownStyle={styles.dropdown1DropdownStyle}
          rowStyle={styles.dropdown1RowStyle}
          rowTextStyle={styles.dropdown1RowTxtStyle}
          selectedRowStyle={styles.dropdown1SelectedRowStyle}
        />
        <Button mode="contained" onPress={() => console.log("Pressed")}>
          Submit
        </Button>
      </FormContainer>
    </Bakcground>
  );
};
