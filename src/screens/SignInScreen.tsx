import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Keyboard,
  Modal,
  Dimensions,
  Animated,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Toast from "react-native-toast-message";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUserToken, setUserData } from "../redux/userSlice"; // Adjust import based on your redux slice

const OTP_LENGTH = 4;

const SignInScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [phone, setPhone] = useState("");
  const [referralCode, setReferralCode] = useState("");
  const [isOtpVisible, setOtpVisible] = useState(false);
  const [otpDigits, setOtpDigits] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const [serverOtp, setServerOtp] = useState("");
  const inputsRef = useRef<Array<TextInput | null>>([]);
  const sheetAnim = useRef(new Animated.Value(0)).current;
  const deviceHeight = Dimensions.get("window").height;
  const sheetHeight = Math.round(deviceHeight * 0.34);

  // Open & Close OTP modal
  const openOtpSheet = () => {
    setOtpVisible(true);
    Animated.timing(sheetAnim, {
      toValue: 1,
      duration: 250,
      useNativeDriver: false,
    }).start();
  };
  const closeOtpSheet = () => {
    Animated.timing(sheetAnim, {
      toValue: 0,
      duration: 180,
      useNativeDriver: false,
    }).start(() => {
      setOtpVisible(false);
      Keyboard.dismiss();
      setOtpDigits(Array(OTP_LENGTH).fill(""));
    });
  };

  // Send OTP API call
  const handleSendOtp = async () => {
    if (!phone.match(/^\d{10}$/)) {
      Toast.show({ type: "error", text1: "Please enter valid 10-digit phone number" });
      return;
    }
    try {
      const payload = { phoneNumber: Number(phone) };
      const response = await axios.post("https://dukanse-be-f5w4.onrender.com/api/shop/login", payload);
      if (response.data.success) {
        setServerOtp(response.data.data.otp);
        console.log("74489====",response.data.data.otp)
        Toast.show({ type: "success", text1: "Login OTP sent successfully" });
        openOtpSheet();
      } else {
        Toast.show({ type: "error", text1: response.data.message || "Failed to send OTP" });
      }
    } catch {
      Toast.show({ type: "error", text1: "Network error, try again" });
    }
  };

  // OTP Input handling
  const handleOtpChange = (idx: number, value: string) => {
    if (/^[0-9]{0,1}$/.test(value)) {
      const digits = [...otpDigits];
      digits[idx] = value;
      setOtpDigits(digits);
      if (value && idx < OTP_LENGTH -1) inputsRef.current[idx + 1]?.focus();
      if (!value && idx > 0) inputsRef.current[idx - 1]?.focus();
    }
  };
  const handleOtpKeyPress = (index: number, event: any) => {
    if(event.nativeEvent.key === "Backspace" && otpDigits[index] === "" && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  // Verify OTP API call
  const handleVerifyOtp = async () => {
    const enteredOtp = otpDigits.join("");
    if (enteredOtp.length < OTP_LENGTH || otpDigits.some(d => !d)) {
      Toast.show({ type: "error", text1: `Please enter the full ${OTP_LENGTH}-digit OTP` });
      return;
    }
     // Compare with serverOtp stored after sending OTP
    if (enteredOtp !== serverOtp) {
    Toast.show({ type: "error", text1: "Please enter the correct OTP" });
    return;
    }
    try {
      const payload = { otp: enteredOtp, phoneNumber: Number(phone) };
      const response = await axios.post("https://dukanse-be-f5w4.onrender.com/api/shop/verify-otp", payload);

      if (response.data.success) {
        // Save token and user data to Redux Persist
        dispatch(setUserToken(response.data.token));
        dispatch(setUserData(response.data.data));

        Toast.show({ type: "success", text1: "OTP verified successfully" });
        closeOtpSheet();
        navigation.navigate("Dashboard" as never);
      } else {
        Toast.show({ type: "error", text1: response.data.message || "OTP verification failed" });
      }
    } catch {
      Toast.show({ type: "error", text1: "Network error on OTP verification" });
    }
  };

  const bottom = sheetAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-sheetHeight, 0],
  });


  const handleResendOtp = async () => {
  try {
    const payload = { phoneNumber: Number(phone) };
    
    const response = await axios.post('https://dukanse-be-f5w4.onrender.com/api/shop/resend-otp', payload);
    if (response.data.success) {
      setServerOtp(response.data.data.otp);
      console.log("resend otp ",response.data.data.otp )
      Toast.show({ type: 'success', text1: 'OTP resent successfully' });
    } else {
      Toast.show({ type: 'error', text1: 'Failed to resend OTP' });
    }
  } catch {
    Toast.show({ type: 'error', text1: 'Network error while resending OTP' });
  }
};

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
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

        {/* <TextInput
          style={styles.input}
          placeholder="Enter referral code (optional)"
          placeholderTextColor="#888"
          value={""} // not used currently but can bind if needed
          onChangeText={() => {}}
        /> */}

        <TouchableOpacity style={styles.otpButton} onPress={handleSendOtp}>
          <Text style={styles.otpButtonText}>Send OTP</Text>
        </TouchableOpacity>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp' as never)}>
            <Text style={styles.signupText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* OTP Modal */}
      <Modal visible={isOtpVisible} transparent animationType="none" onRequestClose={closeOtpSheet}>
        <View style={styles.modalOverlay}>
          <Animated.View style={[styles.bottomSheetContent, { bottom: bottom, height: sheetHeight }]}>
            <View style={[styles.otpSheetContainer, { minHeight: sheetHeight - 20 }]}>
              <Text style={styles.otpOverlayHeading}>VERIFY OTP</Text>
              <Text style={styles.otpTitle}>
                Please enter the 4-digit OTP sent to your mobile number.
              </Text>
              <View style={styles.otpInputsRow}>
                {otpDigits.map((digit, idx) => (
                  <TextInput
                    key={idx}
                    ref={(ref) => (inputsRef.current[idx] = ref)}
                    style={styles.otpInput}
                    value={digit}
                    onChangeText={(v) => handleOtpChange(idx, v)}
                    keyboardType="number-pad"
                    maxLength={1}
                    returnKeyType="next"
                    onKeyPress={(e) => handleOtpKeyPress(idx, e)}
                    blurOnSubmit={false}
                    autoFocus={idx === 0}
                  />
                ))}
              </View>

              {/* Resend OTP */}
        <TouchableOpacity onPress={handleResendOtp} style={styles.resendContainer}>
          <Text style={styles.resendText}>
            Didn’t receive the code?{" "}
            <Text style={styles.resendOtpText}>Resend OTP</Text>
          </Text>
        </TouchableOpacity>
              <View style={styles.otpBtnRow}>
                <TouchableOpacity style={styles.otpCancelBtn} onPress={closeOtpSheet}>
                  <Text style={styles.cancelText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.otpCompleteBtn} onPress={handleVerifyOtp}>
                  <Text style={styles.otpCompleteText}>Verify OTP</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Animated.View>
        </View>
      </Modal>
    </View>
  );
};

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
    fontSize: 18,
    color: "#333",
    fontWeight: "500",
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 12,
    color: "#888",
    marginBottom: 24,
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
    marginBottom: 10,
  },
  otpButtonText: {
    color: "#D32F2F",
    fontSize: 14,
    fontWeight: "600",
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
  },
  footerText: {
    fontSize: 14,
    color: "#000",
  },
  signupText: {
    fontSize: 14,
    color: "#D32F2F",
    fontWeight: "600",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.22)",
    justifyContent: "flex-end",
  },
  bottomSheetContent: {
    position: "absolute",
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    elevation: 30,
    alignItems: "center",
    paddingTop: 20,
  },
  otpSheetContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: 18,
    width: "100%",
  },
  otpOverlayHeading: {
    fontSize: 17,
    color: "#2196F3",
    fontWeight: "bold",
    letterSpacing: 1,
    marginBottom: 10,
  },
  otpTitle: {
    fontSize: 15,
    color: "#222",
    fontWeight: "500",
    textAlign: "center",
    marginBottom: 23,
    marginTop: 0,
    lineHeight: 22,
  },
  otpInputsRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 26,
    marginTop: 6,
  },
  otpInput: {
    width: 44,
    height: 44,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#DDD",
    marginHorizontal: 6,
    fontSize: 22,
    textAlign: "center",
    backgroundColor: "#F8F8F8",
  },
  otpBtnRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 18,
    marginBottom: 4,
  },
  otpCancelBtn: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#E53935",
    borderRadius: 8,
    paddingVertical: 13,
    alignItems: "center",
    backgroundColor: "#fff",
    marginRight: 13,
  },
  otpCompleteBtn: {
    flex: 1,
    backgroundColor: "#FFD700",
    borderRadius: 8,
    paddingVertical: 13,
    alignItems: "center",
  },
  otpCompleteText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
  },
  resendContainer: {
  marginVertical: 12,
},
resendText: {
  fontSize: 14,
  color: "#555",
  textAlign: "center",
},
resendOtpText: {
  fontSize: 14,
  color: "#D32F2F", // Red color
  fontWeight: "bold",
},

});

export default SignInScreen;
