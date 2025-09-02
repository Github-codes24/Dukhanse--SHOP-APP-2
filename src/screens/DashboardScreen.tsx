import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

type RootStackParamList = {
  NotificationScreen: undefined;
  // add other screen names here if needed
};

const DashboardScreen: React.FC = () => {

    const user = useSelector((state: RootState) => state.user);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.storeName}>{user.ownerName}</Text>
          <Text style={styles.address}>📍 457 Washington Ave.</Text>
        </View>
        <TouchableOpacity
          style={{ height: 26, width: 26, marginRight: 12 }}
          onPress={() => navigation.navigate("NotificationScreen")}
        >
          <MaterialIcons name="notifications-none" size={26} color="#333" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.row}>
          <View style={styles.card}>
            <Text style={styles.cardValue}>₹ 1,485.00</Text>
            <Text style={styles.cardLabel}>Sales Today</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardValue}>₹ 39,745.00</Text>
            <Text style={styles.cardLabel}>This Month</Text>
          </View>
        </View>

        <View style={styles.fullCard}>
          <Text style={styles.cardValue}>₹ 485.00</Text>
          <Text style={styles.cardLabel}>Today's Average Order Value</Text>
        </View>

        <View style={styles.fullCard}>
          <View style={styles.rowBetween}>
            <Text style={styles.cardLabel}>Yearly Revenue</Text>
            <Text style={styles.cardLabel}>2024 ▼</Text>
          </View>
          <Text style={styles.revenue}>₹ 10,82,000</Text>
          <View style={styles.graphBox}>
            <Text style={{ color: "#999" }}>📊 Dummy Graph</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Daily Order Report</Text>
        <View style={styles.row}>
          <View style={styles.reportBox}>
            <Text style={styles.reportNumber}>09</Text>
            <Text>Order Received</Text>
          </View>
          <View style={styles.reportBox}>
            <Text style={styles.reportNumber}>08</Text>
            <Text>Order Accepted</Text>
          </View>
          <View style={styles.reportBox}>
            <Text style={styles.reportNumber}>01</Text>
            <Text>Order Cancelled</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 16 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
    marginTop: 29,
  },
  storeName: { fontSize: 16, fontWeight: "600", color: "#000" },
  address: { fontSize: 12, color: "#666" },
  row: { flexDirection: "row", justifyContent: "space-between", marginBottom: 16 },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  card: {
    flex: 1,
    backgroundColor: "#ffe5e5",
    padding: 16,
    borderRadius: 12,
    marginHorizontal: 4,
    alignItems: "center",
  },
  fullCard: {
    backgroundColor: "#f9f9f9",
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  cardValue: { fontSize: 18, fontWeight: "700", color: "#d9534f" },
  cardLabel: { fontSize: 14, color: "#555", marginTop: 4 },
  revenue: { fontSize: 18, fontWeight: "700", color: "#333", marginBottom: 12 },
  graphBox: {
    height: 120,
    backgroundColor: "#f1f1f1",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  sectionTitle: { fontSize: 16, fontWeight: "600", marginBottom: 8, marginTop: 8 },
  reportBox: {
    flex: 1,
    backgroundColor: "#f1faff",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginHorizontal: 4,
  },
  reportNumber: { fontSize: 20, fontWeight: "700", color: "#007bff" },
});
