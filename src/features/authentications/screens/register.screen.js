import React, { useState } from "react";
import {
  Text,
  StatusBar,
  ScrollView,
  TextInput,
  StyleSheet,
  Dimensions,
  View,
  Alert,
  Platform,
  TouchableOpacity,
} from "react-native";
import styled from "styled-components/native";
import {
  Button as PaperButton,
  ProgressBar,
  ActivityIndicator,
  Surface,
} from "react-native-paper";
import { auth, db } from "../../../../firebase.config";
import {
  doc,
  setDoc,
  getDoc,
  serverTimestamp,
  where,
  collection,
  increment,
  getDocs,
  query,
  updateDoc,
  addDoc,
} from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useAuth } from "../../../services/hooks/useAuth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SelectDropdown from "react-native-select-dropdown";
import { countryList } from "../items/country-list";
import { Ionicons } from "@expo/vector-icons";
import { Spacer } from "../components/spacer.component";
import DateTimePickerModal from "react-native-modal-datetime-picker";

import { styles } from "../items/authentication.styles";

const Bakcground = styled.View`
  background-color: ${(props) => props.theme.colors.primary};
  flex: 1;
  width: 100%;
  margin: auto;
  ${StatusBar.currentHeight && `margin-top: ${StatusBar.currentHeight}`};
`;

const FormContainer = styled.View`
  width: 100%;
  height: 100%;
  margin-top: 70px;
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

const DOBInput = styled(Surface)`
  width: 320px;
  height: 66px;
  margin: 12px;
  background-color: ${(props) => props.theme.colors.ui.input};
  font-size: 19px;
  color: #c1c1c1;
  align-items: flex-start;
  justify-content: center;
  border-radius: 5px;
`;

const ErrorTitle = styled.Text`
  font-size: 16px;
  color: red;
  width: 95%;
  text-align: center;
  padding: 10px;
`;

export const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [country, setCountry] = useState(null);
  const [dob, setDob] = useState(null);
  const [gender, setGender] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [refCode, setRefCode] = useState(null);
  const [error, setError] = useState(null);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const { dispatch } = useAuth();

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    console.warn("A date has been picked: ", date);
    setDob(date);
    hideDatePicker();
  };

  const registerUser = async () => {
    setError(null);

    if (!email || !name || !password || !country || !gender || !dob) {
      Alert.alert(
        "Error",
        "All inputs must be filled, please check carefully, use the arrow icon to go back",
        [{ text: "Okay", onPress: () => console.log("OK Pressed") }],
        {
          cancelable: true,
        }
      );
      return;
    }

    try {
      setLoading(true);
      if (refCode) {
        let users = [];

        const q = query(
          collection(db, "users"),
          where("ref_code", "==", refCode)
        );

        const refbySnapshot = await getDocs(q);
        refbySnapshot.forEach((doc) => {
          users.push({ id: doc.id, ...doc.data() });
        });

        if (users.length >= 1) {
          const planRef = doc(db, "plans", users[0].plan_id);
          const planDoc = await getDoc(planRef);

          if (planDoc.exists()) {
            const planDatas = planDoc.data();

            const res = await createUserWithEmailAndPassword(
              auth,
              email,
              password
            );

            await setDoc(doc(db, "users", res.user.uid), {
              name: name,
              balance: 0.0,
              tdt: 0,
              id: res.user.uid,
              active: true,
              plan_id: null,
              joined: serverTimestamp(),
              ref_by: users[0].id,
              notification_counter: 0,
              dob: dob,
              country: country,
              email: email,
              gender: gender,
            });

            const refByReff = doc(db, "users", users[0].id);
            await updateDoc(refByReff, {
              balance: increment(+Number(planDatas.ref_bonus)),
              notification_counter: increment(+1),
            });

            await addDoc(collection(db, "transactions"), {
              amount: planDatas.ref_bonus,
              status: "Completed",
              made_by: users[0].id,
              type: "Money In",
              title: "Refferal Commission",
              method: "ref_commission",
              date: serverTimestamp(),
            });

            await addDoc(collection(db, "notifications"), {
              sent_to: users[0].id,
              title: "Refferal Commission",
              body: `You have successfully earned ${planDatas.ref_bonus} for inviting a new user, keep it up`,
            });

            const docRef = doc(db, "users", res.user.uid);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
              console.log("Document data:", docSnap.data());
              const jsonValue = JSON.stringify(docSnap.data());
              await AsyncStorage.setItem("@user", jsonValue);
              dispatch({ type: "LOGIN", payload: docSnap.data() });
              setLoading(false);
            } else {
              console.log("Aj i am having trouble getting this user document!");
              setLoading(false);
            }
            console.log(res.user);
            console.log(docSnap.data());
          } else {
            Alert.alert(
              "Error",
              "This user doesnt have any plan",
              [{ text: "Okay", onPress: () => console.log("OK Pressed") }],
              {
                cancelable: true,
              }
            );
          }
        } else {
          Alert.alert(
            "Error",
            "Invalid refferal code",
            [{ text: "Okay", onPress: () => setLoading(false) }],
            {
              cancelable: true,
            }
          );
        }
      } else {
        const res = await createUserWithEmailAndPassword(auth, email, password);

        await setDoc(doc(db, "users", res.user.uid), {
          name: name,
          balance: 0.0,
          tdt: 0,
          id: res.user.uid,
          active: true,
          plan_id: null,
          joined: serverTimestamp(),
          ref_by: null,
          notification_counter: 0,
          dob: dob,
          country: country,
          email: email,
          gender: gender,
        });

        const docRef = doc(db, "users", res.user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          console.log("Document data:", docSnap.data());
          const jsonValue = JSON.stringify(docSnap.data());
          await AsyncStorage.setItem("@user", jsonValue);
          dispatch({ type: "LOGIN", payload: docSnap.data() });
          setLoading(false);
        } else {
          console.log("Aj i am having trouble getting this user document!");
          setLoading(false);
        }
        console.log(res.user);
        console.log(docSnap.data());
      }
    } catch (error) {
      setError(error.message);
      console.log(error);
      setLoading(false);
      Alert.alert(
        "Error",
        `${error}`,
        [{ text: "Okay", onPress: () => console.log("OK Pressed") }],
        {
          cancelable: true,
        }
      );
    }
  };

  const genderList = ["Male", "Female"];

  return (
    <Bakcground>
      <FormContainer>
        <ScrollView
          keyboardDismissMode="on-drag"
          contentContainerStyle={{
            alignItems: "center",
            justifyContent: "center",
            paddingTop: 50,
          }}
        >
          <Title>Register</Title>
          {currentIndex === 0 && (
            <>
              <Input
                onChangeText={setEmail}
                placeholderTextColor="gainsboro"
                value={email}
                placeholder="Enter your email address"
                keyboardType="email-address"
              />
              <Input
                onChangeText={setName}
                value={name}
                placeholderTextColor="gainsboro"
                placeholder="Enter your name"
                keyboardType="text"
              />
              <Input
                onChangeText={setPassword}
                value={password}
                placeholder="Create password"
                secureTextEntry
                placeholderTextColor="gainsboro"
                keyboardType="password"
              />

              <SelectDropdown
                data={countryList}
                onSelect={(selectedItem, index) => {
                  setCountry(selectedItem);
                }}
                defaultButtonText={!country ? "Select country" : `${country}`}
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
                renderDropdownIcon={(isOpened) => {
                  return <Ionicons name="earth" size={23} color={"white"} />;
                }}
                dropdownIconPosition={"right"}
                dropdownStyle={styles.dropdown1DropdownStyle}
                rowStyle={styles.dropdown1RowStyle}
                rowTextStyle={styles.dropdown1RowTxtStyle}
                selectedRowStyle={styles.dropdown1SelectedRowStyle}
              />

              <Button
                mode="contained"
                onPress={() => {
                  if (!email || !password || !country || !name) {
                    Alert.alert(
                      "Error",
                      "You have to fiil up all the fields",
                      [
                        {
                          text: "Okay",
                          onPress: () => console.log("OK Pressed"),
                        },
                      ],
                      {
                        cancelable: true,
                      }
                    );
                  } else {
                    setCurrentIndex(1);
                  }
                }}
              >
                Next
              </Button>
            </>
          )}

          {currentIndex === 1 && (
            <>
              <Ionicons
                onPress={() => setCurrentIndex(0)}
                size={46}
                color={"white"}
                style={{
                  alignSelf: "flex-start",
                  paddingLeft: 22,
                  padding: 20,
                }}
                name="arrow-back-circle-sharp"
              />
              <TouchableOpacity onPress={() => setDatePickerVisibility(true)}>
                <DOBInput>
                  <Text
                    style={{
                      fontSize: 18,
                      textAlign: "left",
                      color: "white",
                      padding: 10,
                    }}
                  >
                    {dob ? dob.toDateString() : "Select Date Of Birth"}
                  </Text>
                </DOBInput>
              </TouchableOpacity>
              <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
                maximumDate={new Date(2006, 10, 20)}
                minimumDate={new Date(1950, 0, 1)}
              />

              <Input
                onChangeText={setRefCode}
                value={refCode}
                placeholder="Refferal Code (Optional)"
                placeholderTextColor="gainsboro"
                keyboardType="text"
              />

              <Spacer />
              <SelectDropdown
                data={genderList}
                // defaultValueByIndex={1}

                onSelect={(selectedItem, index) => {
                  setGender(selectedItem);
                  console.log(gender);
                }}
                defaultButtonText={gender ? gender : "Select Gender"}
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
                renderDropdownIcon={(isOpened) => {
                  return <Ionicons name="earth" size={23} color={"white"} />;
                }}
                dropdownIconPosition={"right"}
                dropdownStyle={styles.dropdown1DropdownStyle}
                rowStyle={styles.dropdown1RowStyle}
                rowTextStyle={styles.dropdown1RowTxtStyle}
                selectedRowStyle={styles.dropdown1SelectedRowStyle}
              />

              {loading && (
                <ActivityIndicator
                  style={{ marginTop: 10 }}
                  size={45}
                  color="white"
                />
              )}
              {!loading && (
                <Button mode="contained" onPress={() => registerUser()}>
                  Register
                </Button>
              )}

              <View style={{ padding: 70 }}></View>
            </>
          )}

          <Button mode="text" onPress={() => navigation.navigate("Login")}>
            Or login
          </Button>
        </ScrollView>
      </FormContainer>
    </Bakcground>
  );
};
