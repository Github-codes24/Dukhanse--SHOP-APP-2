import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  FlatList,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";

const TRANSACTIONS = [
  {
    date: "May 25, 2025",
    orderId: "#ODN00123",
    amount: "+ ₹1500",
  },
  {
    date: "May 25, 2025",
    orderId: "#ODN00123",
    amount: "+ ₹1500",
  },
  {
    date: "May 25, 2025",
    orderId: "#ODN00123",
    amount: "+ ₹1500",
  },
  {
    date: "May 25, 2025",
    orderId: "#ODN00123",
    amount: "+ ₹1500",
  },
  {
    date: "May 25, 2025",
    orderId: "#ODN00123",
    amount: "+ ₹1500",
  },
];

const TransactionsScreen: React.FC = () => {
  const navigation = useNavigation();

  const renderItem = ({ item }: { item: typeof TRANSACTIONS[0] }) => (
    <View style={styles.row}>
      <MaterialIcons name="event" size={20} color="#f55" style={{ marginRight: 9 }} />
      <Text style={styles.dateText}>{item.date}</Text>
      <Text style={styles.orderId}>{item.orderId}</Text>
      <View style={{ flex: 1, alignItems: "flex-end" }}>
        <Text style={styles.amountText}>{item.amount}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
          activeOpacity={0.7}
        >
          <MaterialIcons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Transactions</Text>
      </View>
      <FlatList
        data={TRANSACTIONS}
        renderItem={renderItem}
        keyExtractor={(_, idx) => idx.toString()}
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingHorizontal: 0, backgroundColor: "#fff" }}
        ItemSeparatorComponent={() => (
          <View style={{ height: 1, backgroundColor: "#F1F1F1", marginLeft: 35 }} />
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default TransactionsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: 30
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    backgroundColor: "#fff",
    paddingTop: 14,
    paddingBottom: 10,
    borderBottomWidth: 1.3,
    borderBottomColor: "#eee",
  },
  backButton: {
    height: 40,
    width: 40,
    borderRadius: 20, // circle
    borderWidth: 1,
    borderColor: "#000",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff", // optional
  },
  headerText: {
    flex: 1,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "600",
    color: "#232323",
    marginRight: 34,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 17,
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: "#fff",
  },
  dateText: {
    fontSize: 15,
    color: "#222",
    minWidth: 110,
    fontWeight: "400",
  },
  orderId: {
    fontSize: 14,
    color: "#444",
    marginLeft: 8,
    fontWeight: "400",
    minWidth: 92,
  },
  amountText: {
    fontSize: 15,
    color: "#10AC44",
    fontWeight: "500",
    marginLeft: 7,
  },
});
