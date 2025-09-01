import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { useNavigation,NavigationProp } from '@react-navigation/native';

// Updated orders to include status details for 'Accepted'
type Order = {
  id: string;
  amount: number;
  customerName: string;
  address: string;
  itemsOrdered: string;
  orderType: string;
  tabStatus: "New" | "Accepted" | "Cancelled";
  orderStatus?: string; // For accepted and cancelled tab
};

type RootStackParamList = {
  OrderDetailsScreen: undefined; // or your params here
  // add other screens if any
};

const ordersData: Order[] = [
  // New Orders
  {
    id: "#ODN00000123",
    amount: 1750,
    customerName: "Gourab Mandal",
    address: "451B Washington Ave. Manchester",
    itemsOrdered: "Basmati Rice – 10 kg, Aashirvaad Ch...",
    orderType: "Self Pickup",
    tabStatus: "New",
  },
  {
    id: "#ODN00000124",
    amount: 340,
    customerName: "Pritha Roy",
    address: "451B Washington Ave. Manchester",
    itemsOrdered: "Basmati Rice – 10 kg, Aashirvaad Ch...",
    orderType: "Home Delivery",
    tabStatus: "New",
  },
  {
    id: "#ODN00000125",
    amount: 260,
    customerName: "Kaushik Rakshit",
    address: "451B Washington Ave. Manchester",
    itemsOrdered: "Basmati Rice – 10 kg, Aashirvaad Ch...",
    orderType: "Self Pickup",
    tabStatus: "New",
  },

    {
    id: "#ODN00000125",
    amount: 260,
    customerName: "Kaushik Rakshit",
    address: "451B Washington Ave. Manchester",
    itemsOrdered: "Basmati Rice – 10 kg, Aashirvaad Ch...",
    orderType: "Self Pickup",
    tabStatus: "New",
  },

  // Accepted Orders
  {
    id: "#ODN00000123",
    amount: 1750,
    customerName: "Gourab Mandal",
    address: "451B Washington Ave. Manchester",
    itemsOrdered: "Basmati Rice – 10 kg, Aashirvaad Ch...",
    orderType: "Self Pickup",
    tabStatus: "Accepted",
    orderStatus: "Processing",
  },
  {
    id: "#ODN00000124",
    amount: 340,
    customerName: "Pritha Roy",
    address: "451B Washington Ave. Manchester",
    itemsOrdered: "Basmati Rice – 10 kg, Aashirvaad Ch...",
    orderType: "Home Delivery",
    tabStatus: "Accepted",
    orderStatus: "Packed",
  },
  {
    id: "#ODN00000125",
    amount: 260,
    customerName: "Kaushik Rakshit",
    address: "451B Washington Ave. Manchester",
    itemsOrdered: "Basmati Rice – 10 kg, Aashirvaad Ch...",
    orderType: "Self Pickup",
    tabStatus: "Accepted",
    orderStatus: "Picked Up by Customer/Delivered",
  },

  // Cancelled Orders
  {
    id: "#ODN00000126",
    amount: 1285,
    customerName: "Rita Saha",
    address: "451B Washington Ave. Manchester",
    itemsOrdered: "Basmati Rice – 10 kg, Aashirvaad Ch...",
    orderType: "Home Delivery",
    tabStatus: "Cancelled",
    orderStatus: "Cancelled",
  },
];

const OrdersScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [selectedTab, setSelectedTab] = useState<
    "New" | "Accepted" | "Cancelled"
  >("New");

  const filteredOrders = ordersData.filter(
    (order) => order.tabStatus === selectedTab
  );

  

  const renderOrderCard = ({ item }: { item: Order }) => (
  <TouchableOpacity style={styles.card} onPress={()=>navigation.navigate("OrderDetailsScreen")}>
    {/* Order Header */}
    <View style={styles.cardHeader}>
      <Text style={styles.orderId}>{item.id}</Text>
      <Text style={styles.amount}>₹ {item.amount.toFixed(2)}</Text>
    </View>
    {/* Order Details */}
    <View style={styles.cardBody}>
      <Text style={styles.label}>
        Customer Name:        <Text style={styles.value}>{item.customerName}</Text>
      </Text>
      <Text style={styles.label}>
        Address:                       <Text style={styles.value}>{item.address}</Text>
      </Text>
      <Text style={styles.label}>
        Items Ordered:            <Text style={styles.value}>{item.itemsOrdered}</Text>
      </Text>
      {/* Only show Order Type in "New" tab */}
      {selectedTab === "New" && (
        <Text style={styles.label}>
          Order Type:                  <Text style={styles.value}>{item.orderType}</Text>
        </Text>
      )}
      {/* Show Order Status only in "Accepted" or "Cancelled" tab */}
      {(selectedTab === "Accepted" || selectedTab === "Cancelled") && (
        <Text style={styles.label}>
          Order Status:{" "}              <Text
            style={[
              styles.value,
              selectedTab === "Accepted"
                ? styles.acceptedStatus
                : styles.cancelledStatus,
            ]}
          >
            {item.orderStatus}
          </Text>
        </Text>
      )}
    </View>
  </TouchableOpacity>
);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Orders</Text>
      {/* Custom Tabs */}
      <View style={styles.tabContainer}>
        {["New", "Accepted", "Cancelled"].map((tab, index) => (
          <TouchableOpacity
            key={tab}
            style={[
              styles.tabButton,
              selectedTab === tab && styles.activeTab,
              index === 0 && styles.leftTab,
              index === 2 && styles.rightTab,
            ]}
            onPress={() => setSelectedTab(tab as any)}
          >
            <Text
              style={[
                styles.tabText,
                selectedTab === tab && styles.activeTabText,
              ]}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      {/* Orders List */}
      <FlatList
        data={filteredOrders}
        keyExtractor={(item) => item.id + item.tabStatus}
        renderItem={renderOrderCard}
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default OrdersScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 16 },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 12,
    marginVertical: 28,
  },
  tabContainer: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#E53935",
    borderRadius: 8,
    overflow: "hidden",
    marginBottom: 16,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  activeTab: {
    backgroundColor: "#FFD700",
  },
  leftTab: {
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  rightTab: {
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
  tabText: { fontSize: 13, color: "#E53935", fontWeight: "400" },
  activeTabText: { color: "#fff", fontWeight: "600" },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#eee",
    marginBottom: 12,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  cardHeader: {
    backgroundColor: "#FFF9ED",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 12,
  },
  cardBody: {
    padding: 12,
  },
  orderId: { fontWeight: "bold", fontSize: 14, color: "#000" },
  amount: { fontWeight: "bold", fontSize: 14, color: "#000" },
  label: { fontSize: 12, color: "#999", marginVertical: 4 },
  value: { fontSize: 12, color: "#333", fontWeight: "400", marginLeft: 12 },
  acceptedStatus: { color: "green", fontWeight: "400",fontSize: 12, },
  cancelledStatus: { color: "#E53935", fontWeight: "400",fontSize: 12,  },
});
