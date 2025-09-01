import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Switch,
  Image,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";

export default function ProfileScreen() {
  const [enabled, setEnabled] = useState(true);
  const navigation = useNavigation();

  const menuOptions = [
    { id: "1", title: "My Shop", icon: "storefront", route: "MyShop" },
    { id: "2", title: "KYC Details", icon: "description", route:"KYCDetailsScreens" },
    { id: "3", title: "Bank Details", icon: "account-balance", route: "BankDetailsScreen" },
    { id: "4", title: "Gullak", icon: "savings", route: "MyWalletScreen"  },
    { id: "5", title: "Help & Support", icon: "help-outline", route: "HelpAndSupportScreen"  },
    { id: "6", title: "Policies", icon: "policy" ,route:"PolicyScreen"},
    { id: "7", title: "Sign Out", icon: "logout" },
  ];

  return (
    <View style={styles.container}>
      {/* Top Header */}
      <Text style={styles.headerTitle}>Profile</Text>

      {/* DP + Store Name */}
      <View style={styles.header}>
        <Image
          source={{ uri: "https://via.placeholder.com/150" }}
          style={styles.dp}
        />
        <Text style={styles.storeName}>Jagdish Grocery Store</Text>
      </View>

      {/* Ratings + Switch */}
      <View style={styles.ratingRow}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={styles.ratingText}>My Shop’s Ratings: </Text>
          <MaterialIcons name="star" size={18} color="#FFD700" />
          <MaterialIcons name="star" size={18} color="#FFD700" />
          <MaterialIcons name="star" size={18} color="#FFD700" />
          <MaterialIcons name="star" size={18} color="#FFD700" />
          <MaterialIcons name="star-half" size={18} color="#FFD700" />
        </View>

        <Switch
          value={enabled}
          onValueChange={() => setEnabled(!enabled)}
          trackColor={{ true: "#27ae60", false: "#ccc" }}
          thumbColor={"#fff"}
        />
      </View>

      {/* Refer Card */}
      {enabled && (
        <View style={styles.referCard}>
          <Text style={styles.referText}>
            Refer 40 people & get ₹1000 in your Gullak.
          </Text>
          <TouchableOpacity style={styles.referBtnContainer}>
            <Text style={styles.referBtn}>Refer Now →</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Menu Options */}
      <FlatList
        data={menuOptions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.optionRow}
            onPress={() => {
              if (item.route) {
                navigation.navigate(item.route);
              }
            }}
          >
            <MaterialIcons
              name={item.icon}
              size={22}
              color="#FEBC1D"
              style={{ marginRight: 14 }}
            />
            <Text style={styles.optionText}>{item.title}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f9f9f9" },

  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    color: "#222",
  },

  header: {
    alignItems: "center",
    marginTop: 20,
  },
  dp: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#eee",
    marginBottom: 10,
  },
  storeName: { fontSize: 18, fontWeight: "700", color: "#333" },

  ratingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 20,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  ratingText: { fontSize: 15, fontWeight: "500", color: "#444" },

  referCard: {
    margin: 16,
    padding: 16,
    backgroundColor: "#4a90e2",
    borderRadius: 12,
    justifyContent: "space-between",
  },
  referText: { fontSize: 14, color: "#fff", fontWeight: "500" },
  referBtnContainer: {
    alignSelf: "flex-start",
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
    marginTop: 8,
  },
  referBtn: { fontSize: 13, fontWeight: "700", color: "#4a90e2" },

  optionRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  optionText: { fontSize: 15, color: "#333", fontWeight: "500" },
});
