import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

export default function MyWalletScreen({ navigation }: any) {
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Wallet</Text>
      </View>

      {/* Balance Cards */}
      <View style={styles.cardsContainer}>
        <View style={[styles.card, { backgroundColor: "#FFE5E5" }]}>
          <Text style={styles.cardValue}>₹ 25,796.00</Text>
          <Text style={styles.cardLabel}>Balance</Text>
        </View>
        <View style={[styles.card, { backgroundColor: "#E6F2FF" }]}>
          <Text style={styles.cardValue}>₹ 1,796.00</Text>
          <Text style={styles.cardLabel}>Commission</Text>
        </View>
      </View>

      <View style={styles.cardsContainer}>
        <View style={[styles.card, { backgroundColor: "#E9F9EF" }]}>
          <Text style={styles.cardValue}>₹ 5,796.00</Text>
          <Text style={styles.cardLabel}>Upcoming Payment</Text>
        </View>
        <View style={[styles.card, { backgroundColor: "#FFF7E6" }]}>
          <Text style={styles.cardValue}>₹ 1,796.00</Text>
          <Text style={styles.cardLabel}>Referral</Text>
        </View>
      </View>

      {/* Upcoming Payouts */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Upcoming Payouts</Text>
        {[
          { date: "May 25, 2025", amount: "₹ 5,790.00" },
          { date: "June 25, 2025", amount: "₹ 5,790.00" },
          { date: "July 25, 2025", amount: "₹ 5,790.00" },
        ].map((item, idx) => (
          <View key={idx} style={styles.listRow}>
            <View style={styles.rowLeft}>
              <MaterialIcons name="event" size={20} color="#f55" />
              <Text style={styles.rowText}>{item.date}</Text>
            </View>
            <Text style={styles.rowAmount}>{item.amount}</Text>
          </View>
        ))}
      </View>

      {/* Last 5 Transactions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Last 5 Transactions</Text>
        {[
          { date: "May 25, 2025", id: "#ODN00123", amount: "₹ 1290.00", status: "Pending" },
          { date: "May 25, 2025", id: "#ODN00123", amount: "₹ 1290.00", status: "Paid" },
          { date: "May 25, 2025", id: "#ODN00123", amount: "₹ 1290.00", status: "Paid" },
          { date: "May 25, 2025", id: "#ODN00123", amount: "₹ 1290.00", status: "Failed" },
          { date: "May 25, 2025", id: "#ODN00123", amount: "₹ 1290.00", status: "Paid" },
        ].map((item, idx) => (
          <View key={idx} style={styles.listRow}>
            <Text style={styles.rowTextSmall}>{item.date}</Text>
            <Text style={styles.rowTextSmall}>{item.id}</Text>
            <Text style={styles.rowAmount}>{item.amount}</Text>
            <Text
              style={[
                styles.status,
                item.status === "Paid"
                  ? { color: "green" }
                  : item.status === "Pending"
                  ? { color: "#f5a623" }
                  : { color: "red" },
              ]}
            >
              {item.status}
            </Text>
          </View>
        ))}
      </View>

      {/* Last 5 Referral */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Last 5 Referral</Text>
        <View style={styles.listRow}>
          <Text style={styles.rowTextSmall}>Courtney Henry</Text>
          <Text style={styles.referralBonus}>Referral Bonus ₹100 Credited</Text>
        </View>
      </View>
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

  cardsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 16,
    marginTop: 16,
  },
  card: {
    flex: 1,
    padding: 16,
    borderRadius: 10,
    marginHorizontal: 5,
  },
  cardValue: { fontSize: 18, fontWeight: "700", marginBottom: 6 },
  cardLabel: { fontSize: 13, fontWeight: "500", color: "#555" },

  section: {
    marginTop: 20,
    marginHorizontal: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: "#eee",
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "700",
    marginBottom: 10,
  },

  listRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: 0.5,
    borderBottomColor: "#eee",
  },
  rowLeft: { flexDirection: "row", alignItems: "center" },
  rowText: { marginLeft: 8, fontSize: 14, color: "#444" },
  rowTextSmall: { fontSize: 13, color: "#555" },
  rowAmount: { fontWeight: "600", fontSize: 14 },

  status: { fontSize: 13, fontWeight: "600" },
  referralBonus: { fontSize: 13, color: "green", fontWeight: "600" },
});
