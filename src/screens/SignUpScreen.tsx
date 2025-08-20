import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const SignUpScreen = () => {
  const navigation = useNavigation();
  const [isOtpVisible, setOtpVisible] = useState(false);
  const [otpValues, setOtpValues] = useState<string[]>(Array(6).fill(""));
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleSendOtp = () => {
    if (!phoneNumber) {
      Alert.alert("Error", "Please enter mobile number first");
      return;
    }
    setOtpVisible(true);
  };

  const handleVerify = () => {
    const otp = otpValues.join("");
    console.log("Entered OTP:", otp);
    // ✅ Replace this with your backend OTP verify
    // navigation.navigate("LocationAccessScreen" as never);
  };

  const handleOtpChange = (value: string, index: number) => {
    const newOtp = [...otpValues];
    newOtp[index] = value;
    setOtpValues(newOtp);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Dukaanसे</Text>
      <Text style={styles.title}>Sign Up</Text>
      <Text style={styles.subtitle}>Register to take your store online</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter shop name"
        placeholderTextColor="#888"
      />
      <TextInput
        style={styles.input}
        placeholder="Enter GSTIN Number"
        placeholderTextColor="#888"
      />
      <TextInput
        style={styles.input}
        placeholder="Enter shop owner name"
        placeholderTextColor="#888"
      />
      <TextInput
        style={styles.input}
        placeholder="Enter mobile number"
        placeholderTextColor="#888"
        keyboardType="phone-pad"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter referral code (optional)"
        placeholderTextColor="#888"
      />

      {!isOtpVisible ? (
        <TouchableOpacity style={styles.otpButton} onPress={handleSendOtp}>
          <Text style={styles.otpButtonText}>Send OTP</Text>
        </TouchableOpacity>
      ) : (
        <>
          <View style={styles.otpContainer}>
            {otpValues.map((digit, index) => (
              <TextInput
                key={index}
                style={styles.otpInput}
                keyboardType="number-pad"
                maxLength={1}
                value={digit}
                onChangeText={(value) => handleOtpChange(value, index)}
              />
            ))}
          </View>
          <TouchableOpacity style={styles.otpButton} onPress={handleVerify}>
            <Text style={styles.otpButtonText}>Verify OTP</Text>
          </TouchableOpacity>
        </>
      )}

      <Text style={styles.footerText}>
        Already have an account?{" "}
        <Text
          style={styles.signInLink}
          onPress={() => navigation.navigate("SignInScreen" as never)}
        >
          Sign In
        </Text>
      </Text>

      <Text
        style={styles.skipLink}
        onPress={() => navigation.navigate("About" as never)}
      >
        Skip and go
      </Text>
    </ScrollView>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 24,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 40,
    paddingBottom: 24,
  },
  header: {
    fontSize: 32,
    color: "#EC2D01",
    fontWeight: "600",
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    color: "#333",
    fontWeight: "600",
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 12,
    color: "#888",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#888",
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    color: "#000",
    marginBottom: 15,
  },
  otpButton: {
    width: "100%",
    backgroundColor: "#FFD700",
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
    elevation: 2,
    marginBottom: 20,
  },
  otpButtonText: {
    color: "#D32F2F",
    fontSize: 14,
    fontWeight: "600",
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    marginVertical: 15,
  },
  otpInput: {
    borderWidth: 1,
    borderColor: "#888",
    borderRadius: 8,
    textAlign: "center",
    fontSize: 18,
    padding: 10,
    width: 45,
    height: 50,
  },
  footerText: {
    fontSize: 14,
    color: "#000",
  },
  signInLink: {
    color: "#D32F2F",
    fontWeight: "600",
  },
  skipLink: {
    marginTop: 10,
    color: "blue",
    fontWeight: "600",
    fontSize: 14,
  },
});
