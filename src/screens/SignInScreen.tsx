import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SignInScreen = () => {
  const navigation = useNavigation();
  const [phone, setPhone] = useState('');

  const handleSendOtp = () => {
    console.log('Send OTP clicked for:', phone);
   
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        {/* <Image
          source={require('../../assets/image/shop_img.png')}
          style={styles.image}
          resizeMode="contain"
        /> */}
         <Text style={styles.header}>Dukaanसे</Text>
        
        <Text style={styles.subtitle}>Namaste. Start Selling Today!</Text>
        <Text style={styles.title}>Login or Sign up to continue</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter registered mobile number"
          placeholderTextColor="#888"
          keyboardType="phone-pad"
          maxLength={10}
          value={phone}
          onChangeText={setPhone}
        />

        <TouchableOpacity style={styles.otpButton} onPress={handleSendOtp}>
          <Text style={styles.otpButtonText}>Send OTP</Text>
        </TouchableOpacity>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.signupText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 24,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 24,
  },
  header:{
    fontSize:32,
    color:'#EC2D01',
    fontWeight:600
  },
  image: {
    width: 260,
    height: 300,
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    color: '#333',
    fontWeight: '500',
    marginBottom: 6,
    
  },
  subtitle: {
    fontSize: 12,
    color: '#888',
    marginBottom: 24,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#888',
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    color: '#000',
    marginBottom: 20,
  },
  otpButton: {
    width: '100%',
    backgroundColor: '#FFD700',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    marginBottom: 20,
  },
  otpButtonText: {
    color: '#D32F2F',
    fontSize: 14,
    fontWeight: '600',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#000',
  },
  signupText: {
    fontSize: 14,
    color: '#D32F2F',
    fontWeight: '600',
  },
});

export default SignInScreen;
