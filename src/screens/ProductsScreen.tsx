import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  Switch,
  SafeAreaView,
  FlatList,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

// Local image import
const flour = require('../assets/images/flour.png');

interface Product {
  id: string;
  name: string;
  desc: string;
  price: string;
  units: string;
  image: any; // require() for local, string for remote
  active: boolean;
}

const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Aashirvaad Chakki Atta',
    desc: '1 kg / 549 Units',
    price: '₹ 45',
    units: 'Change Price & Units',
    image: flour,
    active: true,
  },
  {
    id: '2',
    name: 'Aashirvaad Chakki Atta',
    desc: '5 kg / 549 Units',
    price: '₹ 225',
    units: 'Change Price & Units',
    image: flour,
    active: true,
  },
  {
    id: '3',
    name: 'Aashirvaad Chakki Atta',
    desc: '10 kg / 549 Units',
    price: '₹ 450',
    units: 'Change Price & Units',
    image: flour,
    active: false,
  },
  {
    id: '4',
    name: 'Happilo Cashew Nuts',
    desc: '100 g / 549 Units',
    price: '₹ 150',
    units: 'Change Price & Units',
    image: flour,
    active: true,
  },
  {
    id: '5',
    name: 'Happilo Cashew Nuts',
    desc: '200 g / 549 Units',
    price: '₹ 300',
    units: 'Change Price & Units',
    image: flour,
    active: true,
  },
  {
    id: '6',
    name: 'India Gate Basmati Rice',
    desc: '1 kg / 549 Units',
    price: '₹ 100',
    units: 'Change Price & Units',
    image: flour,
    active: true,
  },
  {
    id: '7',
    name: 'India Gate Basmati Rice',
    desc: '5 kg / 549 Units',
    price: '₹ 500',
    units: 'Change Price & Units',
    image: 'https://m.media-amazon.com/images/I/813EPsA10vL._SX679_.jpg',
    active: true,
  },
  {
    id: '8',
    name: 'India Gate Basmati Rice',
    desc: '',
    price: '',
    units: '',
    image: 'https://m.media-amazon.com/images/I/813EPsA10vL._SX679_.jpg',
    active: true,
  },
];

const ProductScreen: React.FC<{ navigation?: any }> = ({ navigation }) => {
  const [search, setSearch] = useState('');
  const [data, setData] = useState<Product[]>(PRODUCTS);

  const toggleSwitch = (id: string) => {
    setData((prevData) =>
      prevData.map((item) =>
        item.id === id ? { ...item, active: !item.active } : item
      )
    );
  };

  // Helper for correct image source
  const getImageSource = (img: any) => {
    if (typeof img === 'string') return { uri: img };
    else return img;
  };

  // Filtered products for search
  const filteredProducts = data.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  // FlatList renderItem
  const renderProduct = ({ item }: { item: Product }) => (
    <View style={styles.card}>
      <Image source={getImageSource(item.image)} style={styles.cardImg} />
      <TouchableOpacity style={styles.cardInfo} onPress={()=>navigation.navigate("ProductDetailsScreen")}>
        <Text style={styles.cardTitle}>{item.name}</Text>
        <Text style={styles.cardDesc}>{item.desc}</Text>
        {item.price ? (
          <>
          <View style={{flexDirection:"row"}}>
            <Text style={styles.cardPrice}>{item.price}</Text>
            <TouchableOpacity style={{marginLeft:8}}>
              <Text style={styles.priceLink}>{item.units}</Text>
            </TouchableOpacity>
            </View>
          </>
        ) : null}
      </TouchableOpacity>
      <View style={styles.statusCol}>
        <Switch
          trackColor={{ false: "#d7d7d7", true: "#b6f0c2" }}
          thumbColor={item.active ? "#38B34A" : "#d7d7d7"}
          ios_backgroundColor="#d7d7d7"
          onValueChange={() => toggleSwitch(item.id)}
          value={item.active}
        />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.screenTitle}>Product</Text>
      </View>
      <View style={styles.searchRow}>
        <View style={styles.searchBox}>
          <MaterialIcons name="search" size={20} color="#888" />
          <TextInput
            placeholder="Search Product"
            placeholderTextColor="#888"
            style={styles.searchInput}
            value={search}
            onChangeText={setSearch}
          />
        </View>
        <TouchableOpacity style={styles.addButton} onPress={()=>navigation.navigate("AddProductScreen")}>
          <MaterialIcons name="add" size={20} color="#E9571F" />
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        style={styles.productList}
        data={filteredProducts}
        keyExtractor={item => item.id}
        renderItem={renderProduct}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom:12 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingTop: 12 },
  headerRow: { alignItems: 'center', marginBottom: 6 },
  screenTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#222',
    textAlign: 'center',
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    marginBottom: 14,
    marginTop:12
  },
  searchBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e6e6e6',
    backgroundColor: '#fafafa',
    borderRadius: 9,
    paddingVertical: 6,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    marginLeft: 9,
    fontSize: 16,
    color: '#333',
    padding: 0,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E9571F',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  addButtonText: {
    fontSize: 15,
    fontWeight: '500',
    marginLeft: 2,
    color: '#E9571F',
  },
  productList: {
    paddingHorizontal: 12,
    marginBottom: 24,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 1.5,
    shadowColor: '#bbb',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.10,
    shadowRadius: 3,
    marginBottom: 12,
    paddingVertical: 8,
    paddingHorizontal: 6,
  },
  cardImg: {
    width: 52,
    height: 52,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
    marginRight: 10,
  },
  cardInfo: { flex: 1 },
  cardTitle: { fontWeight: '700', color: '#222', fontSize: 15 },
  cardDesc: { fontSize: 13, color: '#969696', marginVertical: 2 },
  cardPrice: { fontSize: 15, color: '#222', fontWeight: '700', marginTop: 2 },
  priceLink: { color: '#E9571F', fontSize: 13, marginVertical: 2 },
  statusCol: {
    alignItems: 'center',
    marginLeft: 8,
  },
});

export default ProductScreen;
