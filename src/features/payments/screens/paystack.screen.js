import React from 'react';
import  { Paystack }  from 'react-native-paystack-webview';
import { View } from 'react-native';
import { useAuth } from '../../../services/hooks/useAuth';
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

  import { db } from '../../../../firebase.config';

export const PayWithPaystack = ({ navigation, route }) => {
    const { amount } = route.params;
    const { user } = useAuth()

    const updateUserBalance = async () => {
        try {
            const userRef = doc(db, "users", user.id);
            await updateDoc(userRef, {
              balance: increment(+Number(amount)),
            })

            await addDoc(collection(db, "transactions"), {
                amount: amount,
                status: "Completed",
                made_by: user.id,
                type: "Money In",
                title: "Deposit Made",
                method: "deposit",
                gateway: "Paystack",
                date: serverTimestamp(),
              });
            
              navigation.navigate("Dashboard")
  
        } catch(error) {
           console.log(error)    
        }
    }
  return (
    <View style={{ flex: 1 }}>
      <Paystack  
        paystackKey="pk_test_c222469e10127bf77b40c0eb0496a529c0ec7bca"
        amount={amount}
        billingEmail={user.email}
        activityIndicatorColor="blue"
        onCancel={(e) => {
          // handle response here
        }}
        onSuccess={(res) => {
          updateUserBalance()
        }}
        autoStart={true}
      />
    </View>
  );
}