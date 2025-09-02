import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  Modal,
  Keyboard,
  Dimensions,
  Animated,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { registerUser } from "../redux/userSlice";

const OTP_LENGTH = 4;

interface City {
  id: string;
  name: string;
}

const SignUpScreen: React.FC = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [isOtpVisible, setOtpVisible] = useState(false);
  const [otpDigits, setOtpDigits] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const inputsRef = useRef<Array<TextInput | null>>([]);
  const sheetAnim = useRef(new Animated.Value(0)).current;
  const deviceHeight = Dimensions.get("window").height;
  const sheetHeight = Math.round(deviceHeight * 0.34);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedCityId, setSelectedCityId] = useState<string>("");
  const [cityModalVisible, setCityModalVisible] = useState(false);
  const [citiesData, setCitiesData] = useState<City[]>([]);
  const [loadingCities, setLoadingCities] = useState(false);
  const [name, setName] = useState("");
  const [shopName, setShopName] = useState("");
  const [isOtpSent, setOtpSent] = useState(false);
  const [responseOtp, setResponseOtp] = useState("");
  const [verifyButtonVisible, setVerifyButtonVisible] = useState(false);

  useEffect(() => {
    fetchCities();
  }, []);

  const fetchCities = async () => {
    setLoadingCities(true);
    try {
      const response = await axios.get("https://dukanse-be-jq9m.onrender.com/api/cityNames/getAllCities");
      if (response.data && Array.isArray(response.data.getAllCities)) {
        const mappedCities = response.data.getAllCities.map((city: any) => ({
          id: city._id,
          name: city.cityName,
        }));
        setCitiesData(mappedCities);
      }
    } catch (error) {
      // Optionally show error toast for city fetch
    } finally {
      setLoadingCities(false);
    }
  };

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

  const handleSendOtp = async () => {
    if (!name.trim()) {
      Toast.show({ type: "error", text1: "Please enter owner name." });
      return;
    }
    if (!shopName.trim()) {
      Toast.show({ type: "error", text1: "Please enter shop name." });
      return;
    }
    if (!phoneNumber.match(/^\d{10}$/)) {
      Toast.show({ type: "error", text1: "Please enter a valid 10-digit phone number." });
      return;
    }
    if (!selectedCity) {
      Toast.show({ type: "error", text1: "Please select a city." });
      return;
    }
    try {
      const payload = {
        ownerName: name,
        shopName: shopName,
        phoneNumber: phoneNumber,
        city: selectedCity,
      };
      const response = await axios.post("https://dukanse-be-f5w4.onrender.com/api/shop/register", payload);
      if (response.data.success) {
        setOtpSent(true);
        setResponseOtp(response.data.data.otp);
        console.log("response.data.data.otp",response.data.data.otp)
        Toast.show({ type: "success", text1: "OTP sent successfully" });
        openOtpSheet();
      } else {
        Toast.show({ type: "error", text1: response.data.message || "Failed to send OTP" });
      }
    } catch {
      Toast.show({ type: "error", text1: "Network error, try again" });
    }
  };

  const handleOtpChange = (idx: number, value: string) => {
    if (/^[0-9]?$/g.test(value)) {
      const digits = [...otpDigits];
      digits[idx] = value;
      setOtpDigits(digits);
      if (value && idx < OTP_LENGTH - 1) {
        inputsRef.current[idx + 1]?.focus();
      }
      if (!value && idx > 0) {
        inputsRef.current[idx - 1]?.focus();
      }
    }
  };

  const handleOtpKeyPress = (index: number, event: any) => {
    if (event.nativeEvent.key === "Backspace" && otpDigits[index] === "" && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  // Save details to AsyncStorage and navigate after Register
  const handleRegister = async () => {
    try {
    dispatch(
      registerUser({
        phoneNumber,
        ownerName: name,
        shopName,
      })
    );
      Toast.show({ type: "success", text1: "Registered successfully" });
      navigation.navigate("Dashboard" as never);
    } catch (e) {
      Toast.show({ type: "error", text1: "Could not save user data" });
    }
  };

  const handleVerifyOtp = () => {
    const enteredOtp = otpDigits.join("");
    if (enteredOtp.length < OTP_LENGTH) {
      Toast.show({ type: "error", text1: `Enter all ${OTP_LENGTH} OTP digits.` });
      return;
    }
    if (enteredOtp !== responseOtp) {
      Toast.show({ type: "error", text1: "Invalid OTP entered." });
      return;
    }
    Toast.show({ type: "success", text1: "OTP verified successfully!" });
    closeOtpSheet();
    setVerifyButtonVisible(true);
  };

  const bottom = sheetAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-sheetHeight, 0],
  });

  const handleCitySelect = (city: City) => {
    setSelectedCity(city.name);
    setSelectedCityId(city.id);
    setCityModalVisible(false);
  };

  const CustomRadioButton = ({ selected }: { selected: boolean }) => (
    <View
      style={{
        height: 22,
        width: 22,
        borderRadius: 11,
        borderWidth: 2,
        borderColor: selected ? "#888" : "#666",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {selected ? (
        <View
          style={{
            height: 12,
            width: 12,
            borderRadius: 6,
            backgroundColor: "#888",
          }}
        />
      ) : null}
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={styles.container}>
        <Text style={styles.header}>Dukaanसे</Text>
        <Text style={styles.title}>Sign Up</Text>
        <Text style={styles.subtitle}>Register to take your store online</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your full name"
          placeholderTextColor="#888"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter your shop name"
          placeholderTextColor="#888"
          value={shopName}
          onChangeText={setShopName}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter your phone number"
          placeholderTextColor="#888"
          keyboardType="phone-pad"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        />
        <TouchableOpacity style={styles.dropdown} onPress={() => setCityModalVisible(true)}>
          <Text style={{ flex: 1, color: selectedCity ? "#222" : "#aaa", fontSize: 15 }}>
            {selectedCity || "Select City"}
          </Text>
          <MaterialIcons name="arrow-drop-down" size={24} color="#888" />
        </TouchableOpacity>
       
        {!verifyButtonVisible && (
          <TouchableOpacity
            style={styles.otpButton}
            onPress={isOtpSent ? handleVerifyOtp : handleSendOtp}
          >
            <Text style={styles.otpButtonText}>{isOtpSent ? "Verify OTP" : "Send OTP"}</Text>
          </TouchableOpacity>
        )}
        {verifyButtonVisible && (
          <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
            <Text style={styles.registerButtonText}>Register</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* City Picker Modal */}
      <Modal
        visible={cityModalVisible}
        transparent={false}
        animationType="slide"
        onRequestClose={() => setCityModalVisible(false)}
      >
        <View style={{ flex: 1, backgroundColor: "#fff" }}>
          <View style={styles.cityModalHeader}>
            <Text style={styles.cityModalHeaderText}>Select City</Text>
          </View>
          <FlatList
            data={citiesData}
            keyExtractor={(item) => item.id}
            ListHeaderComponent={() =>
              loadingCities ? (
                <ActivityIndicator size="large" color="#2196F3" style={{ marginVertical: 20 }} />
              ) : null
            }
            ListEmptyComponent={() =>
              !loadingCities && (
                <Text style={{ textAlign: "center", padding: 20 }}>No cities available</Text>
              )
            }
            renderItem={({ item: city }) => {
              const isSelected = selectedCityId === city.id;
              return (
                <TouchableOpacity
                  style={[
                    styles.cityOption,
                    {
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      backgroundColor: isSelected ? "#ddd" : "#fff",
                      borderTopLeftRadius: isSelected ? 12 : 0,
                      borderBottomLeftRadius: isSelected ? 12 : 0,
                      marginVertical: 6,
                      marginRight: 6,
                      marginLeft: 10,
                      borderWidth: 1,
                      borderColor: isSelected ? "#888" : "#eee",
                    },
                  ]}
                  onPress={() => handleCitySelect(city)}
                  activeOpacity={0.7}
                >
                  <Text style={[styles.cityText, { color: isSelected ? "#000" : "#222" }]}>{city.name}</Text>
                  <CustomRadioButton selected={isSelected} />
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </Modal>

      {/* OTP Bottom Sheet Modal */}
      <Modal visible={isOtpVisible} transparent animationType="none" onRequestClose={() => {}}>
        <View style={styles.modalOverlay}>
          <Animated.View style={[styles.bottomSheetContent, { bottom: bottom, height: sheetHeight }]}>
            <View style={[styles.otpSheetContainer, { minHeight: sheetHeight - 20 }]}>
              <Text style={styles.otpOverlayHeading}>VERIFY OTP</Text>
              <Text style={styles.otpTitle}>Please enter the 4-digit OTP sent to your mobile number.</Text>
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
              <View style={{ width: "100%" }}>
                <TouchableOpacity style={styles.otpCompleteBtn} onPress={handleVerifyOtp}>
                  <Text style={styles.otpCompleteText}>Verify OTP</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Animated.View>
        </View>
      </Modal>
      <Toast />
    </View>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
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
  dropdown: {
    width: "100%",
    height: 44,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#888",
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    marginBottom: 12,
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
    marginBottom: 10,
  },
  otpButtonText: {
    color: "#D32F2F",
    fontSize: 14,
    fontWeight: "600",
  },
  registerButton: {
    width: "100%",
    backgroundColor: "#ffd700",
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  registerButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  footerText: {
    fontSize: 14,
    color: "#000",
  },
  signInLink: {
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
  otpCompleteBtn: {
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
  cityModalHeader: {
    paddingVertical: 14,
    backgroundColor: "#2196F3",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#1976D2",
  },
  cityModalHeaderText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
  cityOption: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  cityText: {
    fontSize: 16,
    color: "#222",
  },
});
