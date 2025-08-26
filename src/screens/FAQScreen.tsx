import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

export default function FAQScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { issue } = route.params as { issue: string };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 20 }}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>FAQ</Text>
      </View>

      {/* Issue Title */}
      <Text style={styles.issueTitle}>{issue}</Text>

      {/* Dummy FAQ Content */}
      <Text style={styles.issueContent}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vitae
        sapien euismod, cursus libero nec, consequat erat. Donec blandit sem nec
        turpis tristique, a feugiat nulla aliquet. Integer vel justo ut purus
        vulputate vehicula. Suspendisse potenti. Sed volutpat dolor sed lectus
        finibus, id aliquet ligula posuere. Vivamus euismod metus a felis
        vehicula, eget luctus justo mattis. Donec suscipit, ipsum in cursus
        euismod, est dui varius purus, et gravida tellus augue sit amet risus.
      </Text>

      {/* Complaint Button */}
      <TouchableOpacity style={styles.complaintButton}>
        <Text style={styles.complaintButtonText}>
          Not Solved? Raise a Complaint
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", paddingHorizontal: 16 },
  header: { flexDirection: "row", alignItems: "center", paddingVertical: 12 },
  headerTitle: { fontSize: 18, fontWeight: "600", marginLeft: 12, color: "#000" },
  issueTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginTop: 16,
    marginBottom: 10,
    color: "red",
  },
  issueContent: {
    fontSize: 14,
    color: "#333",
    lineHeight: 20,
    marginBottom: 20,
  },
  complaintButton: {
    backgroundColor: "#FFB300",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  complaintButtonText: {
    color: "#000",
    fontWeight: "600",
    fontSize: 15,
  },
});
