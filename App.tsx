import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './src/navigation/StackNavigator';
import LanguageScreen from './src/screens/LanguageScreen';
import NotificationScreen from './src/screens/NotificationScreen';
import OrderDetailsScreen from './src/screens/OrderDetailsScreen';
import CancelReasonScreen from './src/screens/CancelResonScreen';
import PolicyScreen from './src/screens/PoliciesScreen';
import PrivacyPolicyScreen from './src/screens/PrivacyPolicyScreen';
import RefundCancellationPolicyScreen from './src/screens/Refund&CancellationScreen';
import ProductDetailsScreen from './src/screens/ProductDetailsScreen';
import TransactionsScreen from './src/screens/TransactionScreen';
import CommissionScreen from './src/screens/CommissionScreen';
import UpcomingPaymentsScreen from './src/screens/UpComingPaymentScreen';
import ReferralScreen from './src/screens/ReffralEarnScreen';
import BankDetailsScreen from './src/screens/BankDetailsScreen';
import OrderRelatedScreen from './src/screens/OrderRelatedScreen';
import AccountRelatedScreen from './src/screens/AccountRelatedScreen';
import PaymentRelatedScreen from './src/screens/PaymentRelatedScreen';
import SafetyRelatedScreen from './src/screens/SafetyRelatedScreen';
import CancellationTNC from './src/screens/CancellationScreen';
import OrderCancelledScreen from './src/screens/OrderCancelledScreen';
import FeedbackComplaintsScreen from './src/screens/FeedBack&Complaints';
import RaiseComplaintScreen from './src/screens/RaiseComplaintScreen';
import EditBankDetailsScreen from './src/screens/EditBankDetailsScreen';
import EditProductScreen from './src/screens/EditProductScreen';
import AddProductScreen from './src/screens/AddSingleProductScreen';
import EditKycDetailsScreen from './src/screens/EditKycDetailsScreen';
import AddMultipleProductScreen from './src/screens/AddMultipleProductScreen';



const App = () => {
  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
    //  <LanguageScreen/>
  //  <NotificationScreen/>
  // <CancelReasonScreen/>
//  <PolicyScreen/>
//  <PrivacyPolicyScreen/>
  //  <RefundCancellationPolicyScreen/>
  //  <ProductDetailsScreen/>
  //  <TransactionsScreen/>
    // <CommissionScreen/>
//  <UpcomingPaymentsScreen/>
// {/* <ReferralScreen/> */}
//{/* <BankDetailsScreen/> */}
  //  <OrderRelatedScreen/>
  // <AccountRelatedScreen/>
  // <PaymentRelatedScreen/>
  // <SafetyRelatedScreen/>
  // <CancellationTNC/>
  // <OrderCancelledScreen/>
  // <FeedbackComplaintsScreen/>
//  <RaiseComplaintScreen/>
//{/* <EditBankDetailsScreen/> */}
// {/* <EditProductScreen/> */}
  //  <AddProductScreen/>
  // <EditKycDetailsScreen/>
  //  <AddMultipleProductScreen/>
  );
};

export default App; 
