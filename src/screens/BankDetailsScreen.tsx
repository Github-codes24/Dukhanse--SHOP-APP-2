import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

export default function BankDetailsScreen({ navigation }: any) {
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Bank Details</Text>
      </View>

      {/* Bank Card */}
      <View style={styles.card}>
        <View style={styles.row}>
          <Text style={styles.label}>Bank Name</Text>
          <Text style={styles.value}>State Bank Of India</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Account Type</Text>
          <Text style={styles.value}>Savings</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Account Number</Text>
          <Text style={styles.value}>359876543210</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>IFSC</Text>
          <Text style={styles.value}>SBIN0001234</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Account Holder Name</Text>
          <Text style={styles.value}>Jagdish Singh</Text>
        </View>
      </View>

      {/* Bank Illustration */}
      <Image
        // source={require("../assets/bank-illustration.png")}
        style={styles.illustration}
        resizeMode="contain"
      />

      {/* Edit Button */}
      <TouchableOpacity
        style={styles.editBtn}
        onPress={() => navigation.navigate("EditBankDetailsScreen")}
      >
        <Text style={styles.editBtnText}>Edit Bank Details</Text>
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

  card: {
    backgroundColor: "#fff",
    margin: 16,
    padding: 16,
    borderRadius: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 6,
  },
  label: { fontSize: 14, color: "#777" },
  value: { fontSize: 15, fontWeight: "600", color: "#333" },

  illustration: { width: "100%", height: 180, marginVertical: 12 },

  editBtn: {
    margin: 20,
    backgroundColor: "#F9A825",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  editBtnText: { fontSize: 15, fontWeight: "700", color: "#fff" },
});
