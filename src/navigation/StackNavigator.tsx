import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native-safe-area-context";

import Splashscreen from "../screens/Splashscreen";
import SignInScreen from "../screens/SignInScreen";
import SignUpScreen from "../screens/SignUpScreen";
import AboutScreen from "../screens/AboutScreen";
import TabNavigator from "./TabNavigator";
import ProfileScreen from "../screens/ProfileScreen";
import MyShopScreen from "../screens/MyShopScreen";
import EditShopInfoScreen from "../screens/EditShopInfoScreen";
import BankDetailsScreen from "../screens/BankDetailsScreen";
import EditBankDetailsScreen from "../screens/EditBankDetailsScreen";
import MyWalletScreen from "../screens/MyWalletScreen";
import HelpAndSupportScreen from "../screens/HelpAndSupportScreen";
import FAQScreen from "../screens/FAQScreen";

export type RootStackParamList = {
  Splash: undefined;
  SignIn: undefined;
  SignUp: undefined;
  About: undefined;
  Dashboard: undefined;
  Profile: undefined;
  MyShop: undefined;
  EditShopInfoScreen: {
    shopName?: string;
    gstin?: string;
    ownerName?: string;
    mobile?: string;
    email?: string;
    address?: string;
    shopTime?: string;
  };
  BankDetailsScreen: undefined;
  EditBankDetailsScreen: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const StackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={Splashscreen} />
      <Stack.Screen name="SignIn" component={SignInScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="About" component={AboutScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="MyShop" component={MyShopScreen} />
      <Stack.Screen name="EditShopInfoScreen" component={EditShopInfoScreen} />
      <Stack.Screen name="BankDetailsScreen" component={BankDetailsScreen} />
      <Stack.Screen name="MyWalletScreen" component={MyWalletScreen} />
      <Stack.Screen name="HelpAndSupportScreen" component={HelpAndSupportScreen} />
      <Stack.Screen name="FAQScreen" component={FAQScreen} />
      <Stack.Screen
        name="EditBankDetailsScreen"
        component={EditBankDetailsScreen}
      />

      <Stack.Screen
        name="Dashboard"
        component={() => (
          <SafeAreaView style={{ flex: 1 }} edges={["bottom"]}>
            <TabNavigator />
          </SafeAreaView>
        )}
      />
    </Stack.Navigator>
  );
};

export default StackNavigator;
