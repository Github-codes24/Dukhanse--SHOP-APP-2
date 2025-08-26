import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

export default function EditBankDetailsScreen({ navigation }: any) {
  const [bankName, setBankName] = useState("State Bank Of India");
  const [accountType, setAccountType] = useState("Savings");
  const [accountNumber, setAccountNumber] = useState("359876543210");
  const [ifsc, setIfsc] = useState("SBIN0001234");
  const [holderName, setHolderName] = useState("Jagdish Singh");
  const [passbook, setPassbook] = useState<string | null>(null);

  const handleUpload = () => {
    // TODO: Replace with image picker (expo-image-picker or react-native-image-picker)
    setPassbook("https://via.placeholder.com/300x200.png");
  };

  const handleUpdate = () => {
    navigation.navigate("BankDetailsScreen", {
      bankName,
      accountType,
      accountNumber,
      ifsc,
      holderName,
      passbook,
    });
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Bank Details</Text>
      </View>

      {/* Input Fields */}
      <View style={styles.form}>
        <Text style={styles.label}>Bank Name</Text>
        <TextInput
          style={styles.input}
          value={bankName}
          onChangeText={setBankName}
          placeholder="Enter Bank Name"
          placeholderTextColor="#999"
        />

        <Text style={styles.label}>Account Type</Text>
        <TextInput
          style={styles.input}
          value={accountType}
          onChangeText={setAccountType}
          placeholder="Enter Account Type"
          placeholderTextColor="#999"
        />

        <Text style={styles.label}>Account Number</Text>
        <TextInput
          style={styles.input}
          value={accountNumber}
          onChangeText={setAccountNumber}
          keyboardType="numeric"
          placeholder="Enter Account Number"
          placeholderTextColor="#999"
        />

        <Text style={styles.label}>IFSC Code</Text>
        <TextInput
          style={styles.input}
          value={ifsc}
          onChangeText={setIfsc}
          placeholder="Enter IFSC Code"
          placeholderTextColor="#999"
        />

        <Text style={styles.label}>Account Holder Name</Text>
        <TextInput
          style={styles.input}
          value={holderName}
          onChangeText={setHolderName}
          placeholder="Enter Account Holder Name"
          placeholderTextColor="#999"
        />

        {/* 🔵 Upload Passbook */}
        <Text style={styles.label}>Upload Bank Passbook</Text>
        <TouchableOpacity style={styles.uploadBox} onPress={handleUpload}>
          {passbook ? (
            <Image source={{ uri: passbook }} style={styles.passbookImage} />
          ) : (
            <View style={{ alignItems: "center" }}>
              <MaterialIcons name="upload-file" size={40} color="#4A90E2" />
              <Text style={styles.uploadText}>Tap to Upload</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      {/* Update Button */}
      <TouchableOpacity style={styles.updateBtn} onPress={handleUpdate}>
        <Text style={styles.updateBtnText}>Save Bank Details</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },

  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  headerTitle: { fontSize: 18, fontWeight: "700", marginLeft: 12 },

  form: { padding: 16 },

  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#444",
    marginTop: 14,
    marginBottom: 6,
  },
  input: {
    backgroundColor: "#f5f7fa", // light grey input background
    borderRadius: 10,
    padding: 12,
    fontSize: 15,
    borderWidth: 1,
    borderColor: "#ddd",
    color: "#222",
  },

  // Upload box
  uploadBox: {
    marginTop: 10,
    height: 150,
    borderWidth: 1.5,
    borderColor: "#4A90E2",
    borderStyle: "dashed",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f6ff",
  },
  uploadText: { color: "#4A90E2", fontSize: 14, marginTop: 8 },
  passbookImage: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
    resizeMode: "cover",
  },

  updateBtn: {
    margin: 20,
    backgroundColor: "#F9A825",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  updateBtnText: { fontSize: 15, fontWeight: "700", color: "black" },
});
