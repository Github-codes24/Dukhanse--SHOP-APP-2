import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

export default function HelpAndSupportScreen() {
  const navigation = useNavigation();
  const [query, setQuery] = useState("");

  const handleFaqPress = (issue: string) => {
    navigation.navigate("FAQScreen", { issue });
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 20 }}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Help & Support</Text>
      </View>

      {/* FAQ Links */}
      <View style={styles.faqSection}>
        <Text style={styles.faqTitle}>FAQ</Text>
        <TouchableOpacity onPress={() => handleFaqPress("Payment Related Issue")}>
          <Text style={styles.faqLink}>Payment Related Issues</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleFaqPress("Bank Related Issue")}>
          <Text style={styles.faqLink}>Bank Related Issues</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleFaqPress("Order Related Issue")}>
          <Text style={styles.faqLink}>Order Related Issues</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleFaqPress("Other Issue")}>
          <Text style={styles.faqLink}>Others Issues</Text>
        </TouchableOpacity>
      </View>

      {/* Query Box */}
      <View style={styles.querySection}>
        <View style={styles.queryHeader}>
          <Text style={styles.queryTitle}>Raise Your Query</Text>
          <TouchableOpacity onPress={() => navigation.navigate("TicketsScreen")}>
            <Text style={styles.viewAll}>VIEW ALL TICKETS</Text>
          </TouchableOpacity>
        </View>

        <TextInput
          style={styles.textInput}
          placeholder="Write your query here."
          placeholderTextColor="#888"
          value={query}
          onChangeText={setQuery}
          multiline
        />

        <TouchableOpacity style={styles.complaintButton}>
          <Text style={styles.complaintButtonText}>Raise a Complaint</Text>
        </TouchableOpacity>
      </View>

      {/* Call Us Section */}
      <View style={styles.callSection}>
        <Text style={styles.callTitle}>Need Further Assistance?</Text>
        <Text style={styles.callSubtitle}>We are here to help you!</Text>
        <TouchableOpacity style={styles.callButton}>
          <MaterialIcons name="call" size={20} color="#000" />
          <Text style={styles.callButtonText}> Call Us</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", paddingHorizontal: 16 },
  header: { flexDirection: "row", alignItems: "center", paddingVertical: 12 },
  headerTitle: { fontSize: 18, fontWeight: "600", marginLeft: 12, color: "#000" },
  faqSection: { marginTop: 10 },
  faqTitle: { fontSize: 16, fontWeight: "600", marginBottom: 8, color: "#000" },
  faqLink: { fontSize: 14, color: "#007BFF", marginBottom: 6 },
  querySection: { marginTop: 20 },
  queryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  queryTitle: { fontSize: 16, fontWeight: "600", color: "#000" },
  viewAll: { fontSize: 12, color: "red", fontWeight: "500" },
  textInput: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    minHeight: 100,
    padding: 10,
    fontSize: 14,
    textAlignVertical: "top",
    backgroundColor: "#fff",
  },
  complaintButton: {
    backgroundColor: "#FFB300",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 12,
  },
  complaintButtonText: { color: "#000", fontWeight: "600", fontSize: 15 },
  callSection: {
    marginTop: 24,
    alignItems: "center",
    padding: 16,
    borderWidth: 1,
    borderColor: "#eee",
    borderRadius: 10,
    backgroundColor: "#fff",
  },
  callTitle: { fontSize: 16, fontWeight: "600", color: "#000" },
  callSubtitle: { fontSize: 13, color: "#555", marginVertical: 6 },
  callButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFB300",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 10,
  },
  callButtonText: { fontSize: 15, fontWeight: "600", color: "#000" },
});
