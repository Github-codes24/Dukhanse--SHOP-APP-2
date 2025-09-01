import React, { useState } from "react";
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
const PAYMENTS = [
  {
    date: "May 25, 2025",
    amount: "₹ 5,790.00",
  },
  {
    date: "June 25, 2025",
    amount: "₹ 5,790.00",
  },
  {
    date: "July 25, 2025",
    amount: "₹ 5,790.00",
  },
];

const UpcomingPaymentsScreen: React.FC = () => {
  const navigation = useNavigation()
  const [selected, setSelected] = useState(0); // default highlight first box

  const renderItem = ({ item, index }: { item: typeof PAYMENTS[0]; index: number }) => (
    <TouchableOpacity
      style={[
        styles.rowCard,
        selected === index ? styles.highlightCard : styles.greyCard,
      ]}
      onPress={() => setSelected(index)}
      activeOpacity={0.8}
    >
      <MaterialIcons name="event" size={22} color="#E54C1E" style={{ marginRight: 12 }} />
      <Text style={styles.dateText}>{item.date}</Text>
      <View style={{ flex: 1, alignItems: "flex-end" }}>
        <Text style={styles.amountText}>{item.amount}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.full}>
      <View style={styles.outline}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
            activeOpacity={1}
          >
            <MaterialIcons name="arrow-back" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.headerText}>Upcoming Payments</Text>
        </View>
        <FlatList
          data={PAYMENTS}
          renderItem={renderItem}
          keyExtractor={(_, idx) => idx.toString()}
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingTop: 12, backgroundColor: "#fff" }}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

export default UpcomingPaymentsScreen;

const styles = StyleSheet.create({
  full: { flex: 1, backgroundColor: "#fff" },
  outline: {
    flex: 1,
    // backgroundColor: "#fff",
    // borderColor: "#0094ff",
    // borderWidth: 2,
    margin: 8,
    marginTop: 26
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
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    backgroundColor: "#fff",
    paddingTop: 14,
    paddingBottom: 8,
    borderBottomWidth: 1.3,
    borderBottomColor: "#eee",
  },
  backBtn: {
    paddingRight: 8,
    paddingVertical: 1,
  },
  headerText: {
    flex: 1,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "500",
    color: "#232323",
    marginRight: 34,
  },
  rowCard: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 16,
    marginBottom: 13,
    paddingVertical: 15,
    paddingHorizontal: 14,
    borderRadius: 10,
    backgroundColor: "#fff",
  },
  highlightCard: {
    backgroundColor: "#FFF8E4",
  },
  greyCard: {
    backgroundColor: "#F5F5F5",
  },
  dateText: {
    fontSize: 16,
    color: "#222",
    fontWeight: "500",
  },
  amountText: {
    fontSize: 16,
    color: "#222",
    fontWeight: "500",
  },
});
