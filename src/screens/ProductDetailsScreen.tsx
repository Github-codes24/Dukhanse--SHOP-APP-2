import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Switch,
  ScrollView,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { SafeAreaView } from 'react-native-safe-area-context';
// Replace with your actual image path
const flour = require("../assets/images/flour.png");

const detailsData = [
  { label: 'Pack Of:', value: '1' },
  { label: 'Brand:', value: 'Aashirvaad' },
  { label: 'Type:', value: 'Whole-Wheat Flour' },
  { label: 'Net Weight:', value: '1 kg' },
  { label: 'Maximum Shelf Life:', value: '90 Days' },
  { label: 'Nutrient Content:', value: 'NA' },
  { label: 'Product Description:', value: 'Lorem ipsum dolor sit amet consectetur. Mollis habitant interdum ac nulla molestie sit elementum...' },
];

const ProductDetailsScreen: React.FC<{ navigation?: any }> = ({ navigation }) => {
  const [active, setActive] = useState(true);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.headerRow}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation?.goBack()}>
            <MaterialIcons name="arrow-back" size={22} color="#222" />
          </TouchableOpacity>
          <Text style={styles.screenTitle}>Product Details</Text>
        </View>

        {/* Product Image */}
        <View style={styles.imageBox}>
          <Image source={flour} style={styles.productImg} resizeMode="contain" />
        </View>
        <Text style={styles.productName}>Aashirvaad Chakki Atta</Text>

        <View style={styles.priceRow}>
          <View style={styles.priceBox}>
            <Text style={styles.priceLabel}>Price: </Text>
            <Text style={styles.priceValue}>₹ 45</Text>
          </View>
          <TouchableOpacity>
            <Text style={styles.priceLink}>Change Price & Units</Text>
          </TouchableOpacity>
          <Switch
            style={{ marginLeft: 12 }}
            trackColor={{ false: "#d7d7d7", true: "#b6f0c2" }}
            thumbColor={active ? "#38B34A" : "#d7d7d7"}
            ios_backgroundColor="#d7d7d7"
            value={active}
            onValueChange={setActive}
          />
        </View>

        {/* Section Title */}
        <Text style={styles.detailsTitle}>Product Details</Text>
        {/* Product Details */}
        <View style={styles.detailsBox}>
          {detailsData.map((item, idx) => (
            <View key={idx} style={styles.detailRow}>
              <Text style={styles.detailLabel}>{item.label}</Text>
              <Text style={styles.detailValue}>{item.value}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
      {/* Fixed Bottom Buttons */}
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.deleteButton}>
          <Text style={styles.deleteText}>Delete</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.editButton} onPress={()=>navigation.navigate("EditProductScreen")}>
          <Text style={styles.editText}>Edit</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff',marginTop:4 },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 12,
    paddingHorizontal: 14,
  },
  backButton: {
    height: 38,
    width: 38,
    borderRadius: 19,
    borderWidth: 1,
    borderColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginRight: 12,
  },
  screenTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#222',
    textAlign: 'left',
  },
  imageBox: {
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#f1f1f1',
    backgroundColor: '#fafafa',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 22,
    marginBottom: 8,
    paddingVertical: 16,
    marginTop: 8,
  },
  productImg: {
    width: 130,
    height: 130,
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  productName: {
    fontWeight: '700',
    fontSize: 16,
    color: '#222',
    textAlign: 'left',
    paddingHorizontal: 22,
    marginVertical: 8,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 22,
    marginBottom: 8,
  },
  priceBox: {
    flexDirection: 'row',
    backgroundColor: '#FFC107',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
    alignItems: 'center',
    marginRight: 14,
  },
  priceLabel: { color: '#222', fontWeight: '600', fontSize: 13 },
  priceValue: { color: '#E9571F', fontWeight: '700', fontSize: 13 },
  priceLink: {
    color: '#E9571F',
    fontSize: 13,
    fontWeight: '500',
    marginLeft: 10,
    marginRight: 10,
    textDecorationLine: 'underline',
  },
  detailsTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#222',
    marginTop: 8,
    paddingHorizontal: 22,
    marginBottom: 4,
  },
  detailsBox: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginHorizontal: 22,
    paddingVertical: 12,
    paddingHorizontal: 4,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#f2f2f2',
  },
  detailRow: {
    flexDirection: 'row',
    paddingHorizontal: 8,
    marginVertical: 2,
    alignItems: 'flex-start',
  },
  detailLabel: {
    fontWeight: '600',
    fontSize: 13,
    color: '#778',
    minWidth: 135,
  },
  detailValue: {
    color: '#333',
    fontSize: 13,
    flexShrink: 1,
    flexWrap: 'wrap',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    left: 22,
    right: 22,
    bottom: 18,
  },
  deleteButton: {
    flex: 1,
    borderWidth: 1.5,
    borderColor: '#FF3B3B',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
    height: 44,
  },
  deleteText: {
    color: '#FF3B3B',
    fontWeight: '600',
    fontSize: 16,
  },
  editButton: {
    flex: 1,
    backgroundColor: '#FFC107',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    height: 44,
  },
  editText: {
    color: '#222',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ProductDetailsScreen;
