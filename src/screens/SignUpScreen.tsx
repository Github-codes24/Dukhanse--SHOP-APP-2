import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  Modal,
  FlatList,
  TouchableHighlight,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

interface City {
  _id: string;
  cityName: string;
}

const SignUpScreen = () => {
  const navigation = useNavigation();
  const [isOtpVisible, setOtpVisible] = useState(false);
  const [otpValues, setOtpValues] = useState<string[]>(Array(6).fill(""));
  const [phoneNumber, setPhoneNumber] = useState("");

  const [isCityModalVisible, setCityModalVisible] = useState(false);
  const [cities, setCities] = useState<City[]>([]);
  const [selectedCity, setSelectedCity] = useState<City | null>(null);

  useEffect(() => {
    if (isCityModalVisible) {
      fetchCities();
    }
  }, [isCityModalVisible]);

  const fetchCities = async () => {
    try {
      const response = await fetch(
        "https://dukanse-be-jq9m.onrender.com/api/cityNames/getAllCities",
      );
      const json = await response.json();
      setCities(json.data || []);
    } catch (error) {
      Alert.alert("Error", "Failed to fetch cities");
    }
  };

  const handleCitySelect = (city: City) => {
    setSelectedCity(city);
    setCityModalVisible(false);
  };

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
    // navigation or further logic here
  };

  const handleOtpChange = (value: string, index: number) => {
    const newOtp = [...otpValues];
    newOtp[index] = value;
    setOtpValues(newOtp);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
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

        {/* City Selector */}
        <TouchableOpacity
          style={[styles.input, { justifyContent: "center" }]}
          onPress={() => setCityModalVisible(true)}
        >
          <Text style={{ color: selectedCity ? "#000" : "#888" }}>
            {selectedCity ? selectedCity.cityName : "Select City"}
          </Text>
        </TouchableOpacity>

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

        {/* <Text
          style={styles.skipLink}
          onPress={() => navigation.navigate("About" as never)}
        >
          Skip and go
        </Text> */}
      </ScrollView>

      {/* City Modal - outside ScrollView */}
      <Modal visible={isCityModalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Select City</Text>
            <FlatList
              data={cities}
              keyExtractor={(item) => item._id}
              renderItem={({ item }) => (
                <TouchableHighlight
                  underlayColor="#EEE"
                  onPress={() => handleCitySelect(item)}
                >
                  <View style={styles.cityItem}>
                    <Text style={styles.cityName}>{item.cityName}</Text>
                  </View>
                </TouchableHighlight>
              )}
              ListEmptyComponent={<Text>No cities available</Text>}
            />
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => setCityModalVisible(false)}
            >
              <Text style={{ color: "#D32F2F" }}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  scrollContent: {
    flexGrow: 1,
    alignItems: "center",
    paddingHorizontal: 24,
    paddingTop: 50,
    paddingBottom: 24,
  },
  header: {
    fontSize: 30,
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
  otpButtonText: { color: "#D32F2F", fontSize: 14, fontWeight: "600" },
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
  footerText: { fontSize: 14, color: "#000" },
  signInLink: { color: "#D32F2F", fontWeight: "600" },
  skipLink: { marginTop: 10, color: "blue", fontWeight: "600", fontSize: 14 },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    paddingHorizontal: 40,
  },
  modalContainer: {
    backgroundColor: "#fff",
    borderRadius: 12,
    maxHeight: "60%",
    paddingVertical: 16,
    paddingHorizontal: 12,
  },
  modalTitle: {
    fontSize: 20,
    color: "#000",
    fontWeight: "700",
    marginBottom: 12,
    alignSelf: "center",
  },
  cityItem: {
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderBottomColor: "#eee",
    borderBottomWidth: 1,
  },
  cityName: { fontSize: 16, color: "#222" },
  modalCloseButton: { paddingVertical: 12, alignItems: "center" },
});

export default SignUpScreen;
