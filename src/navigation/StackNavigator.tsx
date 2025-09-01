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
import OrderDetailsScreen from "../screens/OrderDetailsScreen";
import PolicyScreen from "../screens/PoliciesScreen";
import TermsAndConditionsScreen from "../screens/Terms&ConditionsScreen";
import PrivacyPolicyScreen from "../screens/PrivacyPolicyScreen";
import RefundAndCancellationScreen from "../screens/Refund&CancellationScreen";
import TransactionsScreen from "../screens/TransactionScreen";
import ReferralScreen from "../screens/ReffralEarnScreen";
import UpcomingPaymentsScreen from "../screens/UpComingPaymentScreen";
import OrderRelatedScreen from "../screens/OrderRelatedScreen";
import AccountRelatedScreen from "../screens/AccountRelatedScreen";
import PaymentRelatedScreen from "../screens/PaymentRelatedScreen";
import FeedbackComplaintsScreen from "../screens/FeedBack&Complaints";
import RaiseComplaintScreen from "../screens/RaiseComplaintScreen";
import SafetyRelatedScreen from "../screens/SafetyRelatedScreen";
import ProductDetailsScreen from "../screens/ProductDetailsScreen";
import EditProductScreen from "../screens/EditProductScreen";
import AddProductScreen from "../screens/AddSingleProductScreen";
import NotificationScreen from "../screens/NotificationScreen";
import EditKycDetailsScreen from "../screens/EditKycDetailsScreen";
import KYCDetailsScreens from "../screens/KycDetailsScreen";


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
  EditBankDetailsScreen:undefined;
  OrderDetailsScreen:undefined;
  PolicyScreen:undefined;
  TermsAndConditionsScreen:undefined;
  PrivacyPolicyScreen:undefined;
  RefundAndCancellationScreen:undefined;
  TransactionsScreen:undefined;
  ReferralScreen:undefined;
  UpcomingPaymentsScreen:undefined;
  OrderRelatedScreen:undefined;
  AccountRelatedScreen:undefined;
  PaymentRelatedScreen:undefined;
  FeedbackComplaintsScreen:undefined;
  RaiseComplaintScreen:undefined;
  SafetyRelatedScreen:undefined;
  ProductDetailsScreen:undefined;
  EditProductScreen:undefined;
  AddProductScreen:undefined;
  NotificationScreen:undefined;
  KYCDetailsScreens:undefined;
  EditKycDetailsScreen:undefined;

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
      <Stack.Screen name="TransactionsScreen" component={TransactionsScreen} />
      <Stack.Screen name="ReferralScreen" component={ReferralScreen} />
      <Stack.Screen name="UpcomingPaymentsScreen" component={UpcomingPaymentsScreen} />
      <Stack.Screen name="HelpAndSupportScreen" component={HelpAndSupportScreen} />
      <Stack.Screen name="FAQScreen" component={FAQScreen} />
      <Stack.Screen name="ProductDetailsScreen" component={ProductDetailsScreen} />
       <Stack.Screen name="EditProductScreen" component={EditProductScreen} />
        <Stack.Screen name="AddProductScreen" component={AddProductScreen} />
      <Stack.Screen name ="OrderDetailsScreen"  component={OrderDetailsScreen}/>
      <Stack.Screen name ="PolicyScreen"  component={PolicyScreen}/>
      <Stack.Screen name ="PrivacyPolicyScreen"  component={PrivacyPolicyScreen}/>
      <Stack.Screen name ="TermsAndConditionsScreen"  component={TermsAndConditionsScreen}/>
      <Stack.Screen name ="RefundAndCancellationScreen"  component={RefundAndCancellationScreen}/>
      <Stack.Screen name ="OrderRelatedScreen"  component={OrderRelatedScreen}/>
       <Stack.Screen name ="AccountRelatedScreen"  component={AccountRelatedScreen}/>
        <Stack.Screen name ="PaymentRelatedScreen"  component={PaymentRelatedScreen}/>
         <Stack.Screen name ="FeedbackComplaintsScreen"  component={FeedbackComplaintsScreen}/>
          <Stack.Screen name ="RaiseComplaintScreen"  component={RaiseComplaintScreen}/>
          <Stack.Screen name ="SafetyRelatedScreen"  component={SafetyRelatedScreen}/>
           <Stack.Screen name ="NotificationScreen"  component={NotificationScreen}/>
           <Stack.Screen name ="KYCDetailsScreens"  component={KYCDetailsScreens}/>
            <Stack.Screen name ="EditKycDetailsScreen"  component={EditKycDetailsScreen}/>
            

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
