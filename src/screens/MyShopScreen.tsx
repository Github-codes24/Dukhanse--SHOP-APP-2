import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

export default function MyShopScreen({ navigation }) {
  const [shopName, setShopName] = useState("");
  const [gstin, setGstin] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [shopTime, setShopTime] = useState("");

  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Shop</Text>
      </View>

      {/* Shop Image */}
      <View style={styles.dpContainer}>
        <View style={styles.dp}></View>
      </View>

      {/* Shop Details Inputs */}
      <View style={styles.detailsBox}>
        <Text style={styles.label}>Shop Name</Text>
        <TextInput
          style={styles.input}
          value={shopName}
          onChangeText={setShopName}
          placeholder="Enter your shop name"
        />

        <Text style={styles.label}>GSTIN Number</Text>
        <TextInput
          style={styles.input}
          value={gstin}
          onChangeText={setGstin}
          placeholder="Enter GSTIN number"
          keyboardType="numeric"
        />

        <Text style={styles.label}>Shop Owner’s Name</Text>
        <TextInput
          style={styles.input}
          value={ownerName}
          onChangeText={setOwnerName}
          placeholder="Enter owner's name"
        />

        <Text style={styles.label}>Mobile Number</Text>
        <TextInput
          style={styles.input}
          value={mobile}
          onChangeText={setMobile}
          placeholder="Enter mobile number"
          keyboardType="phone-pad"
        />

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Enter email"
          keyboardType="email-address"
        />

        <Text style={styles.label}>Address</Text>
        <TextInput
          style={[styles.input, { height: 70 }]}
          value={address}
          onChangeText={setAddress}
          placeholder="Enter address"
          multiline
        />

        <Text style={styles.label}>Shop Time</Text>
        <TextInput
          style={styles.input}
          value={shopTime}
          onChangeText={setShopTime}
          placeholder="e.g. 08:00 AM to 08:00 PM"
        />
      </View>

      {/* Save Button */}
      <TouchableOpacity style={styles.editBtn}>
        <Text style={styles.editBtnText}>Save Shop Info</Text>
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

  dpContainer: { alignItems: "center", marginVertical: 20 },
  dp: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#eee",
  },

  detailsBox: { paddingHorizontal: 20, paddingBottom: 10 },
  label: { fontSize: 14, color: "#888", marginTop: 12 },
  input: {
    fontSize: 15,
    fontWeight: "500",
    color: "#333",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginTop: 6,
  },

  editBtn: {
    margin: 20,
    backgroundColor: "#F9A825",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  editBtnText: { fontSize: 15, fontWeight: "700", color: "#fff" },
});
