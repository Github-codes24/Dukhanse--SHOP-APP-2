import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
 
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation,NavigationProp } from '@react-navigation/native';


type RootStackParamList = {
  OrderRelatedScreen: undefined; 
  AccountRelatedScreen:undefined;
  PaymentRelatedScreen:undefined;
  FeedbackComplaintsScreen:undefined;
  SafetyRelatedScreen:undefined;
};
const HelpSupportScreen: React.FC<{ navigation?: any }> = ({  }) => {
 const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.headerRow}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation?.goBack()}>
          <MaterialIcons name="arrow-back" size={24} color="#222" />
        </TouchableOpacity>
        <Text style={styles.screenTitle}>Help & Support</Text>
      </View>

      {/* Greeting Card */}
      <View style={styles.helpCard}>
        <Text style={styles.helpCardTitle}>Hey,</Text>
        <View style={styles.helpRow}>
          <Text style={styles.helpCardDesc}>How Can we Help You ?</Text>
          <View style={styles.helpIconCircle}>
            <MaterialIcons name="help-outline" size={32} color="#E9571F" />
          </View>
        </View>
      </View>

      {/* Search Input */}
      <View style={styles.searchBox}>
        <MaterialIcons name="search" size={22} color="#888" />
        <TextInput
          placeholder="Search"
          placeholderTextColor="#888"
          style={styles.searchInput}
        />
      </View>

      {/* Categories Title */}
      <Text style={styles.categoryTitle}>Categories</Text>

      {/* Categories (No map or FlatList) */}
      <View style={styles.categoriesList}>
        <TouchableOpacity style={styles.categoryCard} onPress={()=>navigation.navigate("OrderRelatedScreen")}>
          <Text style={styles.categoryText}>Order Related</Text>
          <MaterialIcons name="chevron-right" size={24} color="#888" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.categoryCard} onPress={()=>navigation.navigate("AccountRelatedScreen")}>
          <Text style={styles.categoryText}>Account & Profile</Text>
          <MaterialIcons name="chevron-right" size={24} color="#888" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.categoryCard} onPress={()=>navigation.navigate("PaymentRelatedScreen")}>
          <Text style={styles.categoryText}>Payment, Gullak & Rewards</Text>
          <MaterialIcons name="chevron-right" size={24} color="#888" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.categoryCard} onPress={()=>navigation.navigate("FeedbackComplaintsScreen")}>
          <Text style={styles.categoryText}>Feedback & Complaints</Text>
          <MaterialIcons name="chevron-right" size={24} color="#888" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.categoryCard} onPress={()=>navigation.navigate("SafetyRelatedScreen")}>
          <Text style={styles.categoryText}>Safety</Text>
          <MaterialIcons name="chevron-right" size={24} color="#888" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingHorizontal: 14,marginTop:0 },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 8,
  },
  backButton: {
    height: 38,
    width: 38,
    borderRadius: 19,
    borderWidth: 1,
    borderColor: '#d4d4d4',
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
  helpCard: {
    backgroundColor: '#FFC107',
    borderRadius: 12,
    padding: 18,
    marginVertical: 8,
  },
  helpCardTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#222',
    marginBottom: 4,
  },
  helpRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  helpCardDesc: {
    fontSize: 16,
    fontWeight: '500',
    color: '#222',
  },
  helpIconCircle: {
  //   marginLeft: 8,
  //   // height: 38,
  //   // width: 38,
  //   borderRadius: 19,
  //   backgroundColor: '#fff4e0',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   borderWidth: 1,
  //   borderColor: '#FFD580',
   },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e6e6e6',
    backgroundColor: '#fafafa',
    borderRadius: 9,
    paddingVertical: 6,
    paddingHorizontal: 10,
    marginTop: 15,
    marginBottom: 16,
  },
  searchInput: {
    marginLeft: 9,
    fontSize: 16,
    color: '#333',
    flex: 1,
    padding: 0,
  },
  categoryTitle: {
    fontSize: 15,
    fontWeight: '500',
    color: '#222',
    marginBottom: 8,
  },
  categoriesList: {
    marginBottom: 18,
  },
  categoryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    paddingVertical:10,
    paddingHorizontal: 18,
    marginBottom: 10,
    shadowColor: "#bbb",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.11,
    shadowRadius: 3,
    elevation: 2,
    justifyContent: 'space-between',
  },
  categoryText: {
    fontSize: 14,
    color: '#222',
    fontWeight: '400',
  },
  

});

export default HelpSupportScreen;
