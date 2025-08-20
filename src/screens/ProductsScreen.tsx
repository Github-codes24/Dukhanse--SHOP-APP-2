import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  Switch,
} from "react-native";

const productsData = [
  { id: "1", name: "Ashirwad Atta", price: "₹250", units: "5kg" },
  { id: "2", name: "Basmati Rice", price: "₹120", units: "500gm" },
  { id: "3", name: "Fortune Oil", price: "₹180", units: "1L" },
  { id: "4", name: "Tata Salt", price: "₹25", units: "1kg" },
  { id: "5", name: "Sugar", price: "₹45", units: "1kg" },
  { id: "6", name: "Detergent Powder", price: "₹90", units: "1kg" },
  { id: "7", name: "Tea Powder", price: "₹150", units: "500gm" },
];

export default function ProductScreen() {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState(productsData);

  const toggleSwitch = (id) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, enabled: !p.enabled } : p
      )
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Products</Text>

      <View style={styles.searchRow}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search products..."
          value={search}
          onChangeText={setSearch}
        />
        <TouchableOpacity style={styles.addBtn}>
          <Text style={styles.addBtnText}>+ Add</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={products.filter((p) =>
          p.name.toLowerCase().includes(search.toLowerCase())
        )}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.imgPlaceholder}>
              <Text style={{ color: "#888", fontSize: 12 }}>N/A</Text>
            </View>

            <View style={{ flex: 1 }}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.sub}>
                Price: {item.price} • Units: {item.units}
              </Text>
            </View>

            <Switch
              value={item.enabled ?? true}
              onValueChange={() => toggleSwitch(item.id)}
            />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f9f9f9", paddingTop: 50 },
  header: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 20,
    textAlign: "center",
  },
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 16,
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 14,
    height: 44,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    marginRight: 10,
  },
  addBtn: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#27ae60",
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 8,
  },
  addBtnText: { color: "#27ae60", fontWeight: "700" },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginBottom: 12,
    padding: 14,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  imgPlaceholder: {
    width: 50,
    height: 50,
    borderRadius: 8,
    backgroundColor: "#eee",
    marginRight: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  name: { fontSize: 16, fontWeight: "600", color: "#333" },
  sub: { fontSize: 14, color: "#777", marginTop: 2 },
});
