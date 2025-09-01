import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native"; 
const policies = [
  { id: "terms", title: "Terms of Use", route: "TermsAndConditionsScreen" },
  { id: "privacy", title: "Privacy Policy",route:"PrivacyPolicyScreen" },
  { id: "refund", title: "Refund & Cancellation Policy",route:"RefundAndCancellationScreen" },
];

const PolicyScreen: React.FC = () => {
   const navigation = useNavigation<any>();


  const renderItem = ({ item }: { item: typeof policies[0] }) => (
    <TouchableOpacity
      style={styles.policyCard}
        onPress={() => navigation.navigate(item.route)} 
       activeOpacity={0.7}
    >
      <Text style={styles.policyText}>{item.title}</Text>
      <MaterialIcons name="chevron-right" size={26} color="#222" />
    </TouchableOpacity>
  );

  return (
    <View style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
         <TouchableOpacity
               onPress={() => navigation.goBack()}
               style={styles.backButton}
              //  activeOpacity={0.7}
             >
               <MaterialIcons name="arrow-back" size={24} color="#333" />
             </TouchableOpacity>
        <Text style={styles.headerTitle}>Policies</Text>
      </View>
      {/* Centered List */}
      <View style={styles.centerView}>
        <FlatList
          data={policies}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[styles.listContent,{marginTop:18}]}
        />
      </View>
    </View>
  );
};

export default PolicyScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop:50
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
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  backBtn: {
    paddingRight: 10,
    paddingVertical: 4,
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "600",
    color: "#222",
    marginLeft: -35, // visually center with back arrow
  },
  centerView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "stretch", // stretch makes cards full width minus padding
    paddingHorizontal: 16,
  },
  listContent: {
    // No top/bottom padding needed, centerView handles vertical centering
  },
  policyCard: {
    backgroundColor: "#FAFAFA",
    borderRadius: 9,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 12,
    shadowColor: "#000",
    shadowOpacity: 0.03,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    borderWidth: 1,
    borderColor: "#F1F1F1",
    justifyContent: "space-between",
  },
  policyText: {
    fontSize: 15,
    color: "#222",
    fontWeight: "500",
    flex: 1,
  },
});
