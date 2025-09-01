import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

type Notification = {
  id: string;
  title: string;
  items: string[];
  time: string;
  status: "new" | "read";
};

const notifications: Notification[] = [
  {
    id: "1",
    title: "Order Received",
    items: ["Basmati Rice 5kg", "Whole Wheat Aata 5kg"],
    time: "Now",
    status: "new",
  },
  {
    id: "2",
    title: "Order Received",
    items: ["Basmati Rice 5kg", "Whole Wheat Aata 5kg"],
    time: "30 minutes ago",
    status: "read",
  },
  {
    id: "3",
    title: "Order Cancelled",
    items: ["Basmati Rice 5kg", "Whole Wheat Aata 5kg"],
    time: "1 hour ago",
    status: "read",
  },
  {
    id: "4",
    title: "Order Received",
    items: ["Basmati Rice 5kg", "Whole Wheat Aata 5kg"],
    time: "6 hours ago",
    status: "read",
  },
];

export default function NotificationScreen({ navigation }: any) {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const renderItem = ({ item }: { item: Notification }) => (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => setSelectedId(item.id)} 
    >
      <View
        style={[
          styles.card,
          selectedId === item.id && { backgroundColor: "#FFF8E1" }, 
        ]}
      >
        <Text style={styles.title}>{item.title}</Text>
        {item.items.map((it, index) => (
          <Text key={index} style={styles.item}>
            {index + 1}. {it}
          </Text>
        ))}

        <View style={styles.footer}>
          <Text style={styles.time}>{item.time}</Text>
          <TouchableOpacity>
            <Text style={styles.details}>View Details</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
                onPress={() => navigation.goBack()}
               style={styles.backButton}
               activeOpacity={0.7}
             >
               <MaterialIcons name="arrow-back" size={24} color="#333" />
             </TouchableOpacity>
        <Text style={styles.headerTitle}>Notification</Text>
      </View>

      {/* Notification List */}
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        extraData={selectedId} 
        
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 12,
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
    marginBottom: 26,
    marginTop:28
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginLeft: 12,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    borderWidth: 0.5,
    borderColor: "#ddd",
    elevation: 4,
    
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  item: {
    fontSize: 14,
    color: "#333",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  time: {
    fontSize: 12,
    color: "#999",
  },
  details: {
    fontSize: 14,
    color: "red",
    fontWeight: "500",
  },
});
