import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from "@expo/vector-icons";

import { Countdown } from "../../features/ads/components/countdown.component";

// SCREENS
import { DashboardScreen } from "../../features/dashboard/screens/dashboard.screen";
import { NotificationsScreen } from "../../features/notifications/screens/notifications.screen";
import { PlansListScreen } from "../../features/plans/screens/plans-lists.screen";
import { AdsListScreen } from "../../features/ads/screens/ads-list.screen";
import { AddMoneyScreen } from "../../features/deposit/screens/deposit.screen";
import { WithdrawScreen } from "../../features/withdrawals/screens/withdraw.screen";
import { TransactionsScreen } from "../../features/transactions/screens/transactions.screen";
import { OverviewScreen } from "../../features/overview/screens/overview.screen";
import { ViewAdScreen } from "../../features/ads/screens/view-ads.screen";
import { SettingsScreen } from "../../features/account/screens/settings.screen";
import { ViewTransactionDetailScreen } from "../../features/transactions/screens/view-transaction.screen";
import { ProfileDetailsScreen } from "../../features/account/screens/profile-details.screen";
import { AccountSettingsScreen } from "../../features/account/screens/account.settings.screen";
import { RefferalsScreen } from "../../features/refferals/screens/refferals.screen";
import { PayWithPaystack } from "../../features/payments/screens/paystack.screen";

import { useAuth } from "../../services/hooks/useAuth";

import { View, Text } from "react-native";

const Tab = createBottomTabNavigator();

const Stack = createStackNavigator();

const TAB_ICON = {
  Dashboard: "home-outline",
  PaymentTab: "wallet-outline",
  Settings: "md-settings",
  Overview: "pie-chart",
  Notifications: "notifications-circle",
  Refferals: "person-outline"
};


const createScreenOptions = ({ route }) => {
  const iconName = TAB_ICON[route.name];

  return {
    tabBarIcon: ({ size, color }) => (
      <Ionicons name={iconName} size={size} color={color} />
    ),
    tabBarActiveTintColor: "#1E90FF",
    tabBarInactiveTintColor: "gray",
    tabBarStyle: { backgroundColor: '#1A1A1A' },
  };
};



function HomeTabs() {
   const { user } = useAuth()

    return (
      <Tab.Navigator screenOptions={createScreenOptions}>
        <Tab.Screen name="Dashboard" component={DashboardScreen} options={{
          header: () => null
        }} />
        <Tab.Screen name="Overview" component={OverviewScreen} options={{
          header: () => null
        }} />
         <Tab.Screen name="Refferals" component={RefferalsScreen} options={{
          header: () => null
        }} />
        <Tab.Screen name="Notifications" options={{
          tabBarBadge: user.notification_counter === 0 ? null : user.notification_counter,
          header: () => null 
        }} component={NotificationsScreen} />
        <Tab.Screen name="Settings" options={{
          header: () => null
        }} component={SettingsScreen} />
      </Tab.Navigator>
    );
  }


export const AccountNavigation = () => {
    

    return (
     <Stack.Navigator>
        <Stack.Screen name="Home" options={{
            header: () => null
        }} component={HomeTabs} />
        <Stack.Screen name="Add Money" options={{
           headerBackTitleVisible: false,
           headerBackgroundContainerStyle: { backgroundColor: 'transparent' },
           headerTransparent: true,
           headerTintColor: 'white'
        }} component={AddMoneyScreen} />
        <Stack.Screen name="View Ad" component={ViewAdScreen}
         options={{
          headerBackTitleVisible: false,
          headerTintColor: 'white',
          headerStyle: { backgroundColor: '#1A1A1A'}
        }}
        />
        <Stack.Screen name="View Plans" options={{
          headerBackTitleVisible: false,
          headerTintColor: 'white',
          headerStyle: { backgroundColor: '#1A1A1A'}
        }} component={PlansListScreen} />
        <Stack.Screen name="Ads List" options={{
            headerBackTitleVisible: false,
            headerTintColor: 'white',
            headerStyle: { backgroundColor: '#1A1A1A'}
        }} component={AdsListScreen} />
            <Stack.Screen name="Withdraw" options={{
          headerBackTitleVisible: false,
          headerBackgroundContainerStyle: { backgroundColor: 'transparent' },
          headerTransparent: true,
          headerTintColor: 'white'
        }} component={WithdrawScreen} />
            <Stack.Screen name="Transactions" options={{
          headerBackTitleVisible: false,
          headerBackgroundContainerStyle: { backgroundColor: 'transparent' },
          headerTransparent: true,
          headerTintColor: 'white'
        }} component={TransactionsScreen} />
          <Stack.Screen name="View Transaction Detail" options={{
           headerBackTitleVisible: false,
           headerTintColor: 'white',
           headerStyle: { backgroundColor: '#1A1A1A'},
           title: "Transaction Details"
        }} component={ViewTransactionDetailScreen} />
          <Stack.Screen name="Profile Details" options={{
           headerBackTitleVisible: false,
           headerTintColor: 'white',
           headerStyle: { backgroundColor: '#1A1A1A'},
           title: "Account Details"
        }} component={ProfileDetailsScreen} />
           <Stack.Screen name="Account Settings" options={{
           headerBackTitleVisible: false,
           headerTintColor: 'white',
           headerStyle: { backgroundColor: '#1A1A1A'},
           title: "Account Settings"
        }} component={AccountSettingsScreen} />
         <Stack.Screen name="Pay With Paystack" options={{
           header: () => null
        }} component={PayWithPaystack} />
      </Stack.Navigator>      
    )
}