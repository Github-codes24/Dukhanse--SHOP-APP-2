import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";

const orders = [
  { id: "10001", amount: "₹750", date: "20 Aug 2025", status: "New" },
  { id: "10002", amount: "₹1200", date: "19 Aug 2025", status: "Accepted" },
  { id: "10003", amount: "₹560", date: "18 Aug 2025", status: "Canceled" },
  { id: "10004", amount: "₹999", date: "17 Aug 2025", status: "New" },
];

const tabs = ["New", "Accepted", "Canceled"];

export default function OrderScreen() {
  const [activeTab, setActiveTab] = useState("New");


  const filteredOrders = orders.filter((o) => o.status === activeTab);

  return (
    <View style={styles.container}>
   
      <Text style={styles.header}>📦 My Orders</Text>

   
      <View style={styles.tabRow}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab}
            onPress={() => setActiveTab(tab)}
            style={[styles.tab, activeTab === tab && styles.activeTab]}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === tab && styles.activeTabText,
              ]}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

  
      <FlatList
        data={filteredOrders}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.row}>
              <Text style={styles.orderId}># {item.id}</Text>
              <Text style={styles.amount}>{item.amount}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.date}>{item.date}</Text>
              <View style={styles.btnRow}>
                {activeTab === "New" && (
                  <>
                    <TouchableOpacity style={[styles.btn, styles.accept]}>
                      <Text style={styles.btnText}>Accept</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.btn, styles.cancel]}>
                      <Text style={styles.btnText}>Cancel</Text>
                    </TouchableOpacity>
                  </>
                )}
                {activeTab !== "New" && (
                  <TouchableOpacity style={[styles.btn, styles.view]}>
                    <Text style={styles.btnText}>View</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f9f9f9", paddingTop: 40 },
  header: {
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 10,
  },


  tabRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10,
    backgroundColor: "#eee",
    borderRadius: 8,
    marginHorizontal: 16,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    alignItems: "center",
    borderRadius: 6,
  },
  tabText: { fontSize: 14, fontWeight: "500", color: "#555" },
  activeTab: { backgroundColor: "#fff" },
  activeTabText: { color: "#000", fontWeight: "700" },

  card: {
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginTop: 12,
    padding: 14,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  row: { flexDirection: "row", justifyContent: "space-between", marginBottom: 6 },
  orderId: { fontSize: 16, fontWeight: "600", color: "#333" },
  amount: { fontSize: 16, fontWeight: "700", color: "#27ae60" },
  date: { fontSize: 13, color: "#777" },


  btnRow: { flexDirection: "row" },
  btn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    marginLeft: 6,
  },
  btnText: { color: "#fff", fontWeight: "600", fontSize: 13 },
  accept: { backgroundColor: "#27ae60" },
  cancel: { backgroundColor: "#e74c3c" },
  view: { backgroundColor: "#3498db" },
});
