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

export default function EditShopInfoScreen({ route, navigation }: any) {
  const {
    shopName: initialShopName,
    gstin: initialGstin,
    ownerName: initialOwnerName,
    mobile: initialMobile,
    email: initialEmail,
    address: initialAddress,
    shopTime: initialShopTime,
  } = route.params;

  const [shopName, setShopName] = useState(initialShopName || "");
  const [gstin, setGstin] = useState(initialGstin || "");
  const [ownerName, setOwnerName] = useState(initialOwnerName || "");
  const [mobile, setMobile] = useState(initialMobile || "");
  const [email, setEmail] = useState(initialEmail || "");
  const [address, setAddress] = useState(initialAddress || "");
  const [shopTime, setShopTime] = useState(initialShopTime || "");

  const handleUpdate = () => {
    navigation.navigate("MyShopScreen", {
      shopName,
      gstin,
      ownerName,
      mobile,
      email,
      address,
      shopTime,
    });
  };

  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Shop Info</Text>
      </View>

      {/* Editable Inputs */}
      <View style={styles.detailsBox}>
        <Text style={styles.label}>Shop Name</Text>
        <TextInput style={styles.input} value={shopName} onChangeText={setShopName} />

        <Text style={styles.label}>GSTIN Number</Text>
        <TextInput
          style={styles.input}
          value={gstin}
          onChangeText={setGstin}
          keyboardType="numeric"
        />

        <Text style={styles.label}>Shop Owner’s Name</Text>
        <TextInput style={styles.input} value={ownerName} onChangeText={setOwnerName} />

        <Text style={styles.label}>Mobile Number</Text>
        <TextInput
          style={styles.input}
          value={mobile}
          onChangeText={setMobile}
          keyboardType="phone-pad"
        />

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />

        <Text style={styles.label}>Address</Text>
        <TextInput
          style={[styles.input, { height: 70 }]}
          value={address}
          onChangeText={setAddress}
          multiline
        />

        <Text style={styles.label}>Shop Time</Text>
        <TextInput style={styles.input} value={shopTime} onChangeText={setShopTime} />
      </View>

      {/* Update Button */}
      <TouchableOpacity style={styles.updateBtn} onPress={handleUpdate}>
        <Text style={styles.updateBtnText}>Update Shop Info</Text>
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

  updateBtn: {
    margin: 20,
    backgroundColor: "#43A047",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  updateBtnText: { fontSize: 15, fontWeight: "700", color: "#fff" },
});
