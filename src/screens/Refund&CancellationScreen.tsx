import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";

const RefundAndCancellationScreen: React.FC = () => {
  const navigation = useNavigation();

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
        <Text style={styles.headerTitle}>Refund & Cancellation</Text>
      </View>

      {/* Content */}
      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
        <Text style={styles.highlightedLink}>DukaanSe</Text>
        <Text style={styles.effectiveDate}>Effective Date: 1st January, 2025</Text>
        <Text style={styles.text}>
          At Dukanse, we value your trust and strive to provide you with the best shopping experience. This Refund & Cancellation Policy outlines the terms under which cancellations, returns, and refunds are processed for orders placed through our app.
        </Text>

        <View style={styles.cardBg}>
          <Text style={styles.sectionTitle}>1. Order Cancellation</Text>
          <View style={styles.bulletContainer}>
            <Text style={styles.bulletText}>
              {`\u2022`} Customers can cancel their order before it is packed/dispatched by contacting our customer support or through the app’s cancellation option.
            </Text>
            <Text style={styles.bulletText}>
              {`\u2022`} Once the order has been packed or dispatched, cancellation requests will not be accepted.
            </Text>
            <Text style={styles.bulletText}>
              {`\u2022`} In case of prepaid orders, the cancellation refund will be initiated within 5-7 business days to the original payment method.
            </Text>
          </View>

          <Text style={styles.sectionTitle}>2. Return & Replacement</Text>
          <Text style={styles.text}>
            We accept returns only under the following conditions:
          </Text>
          <View style={styles.bulletContainer}>
            <Text style={styles.bulletText}>{`\u2022`} You receive a damaged, defective, or wrong product.</Text>
            <Text style={styles.bulletText}>{`\u2022`} The product has expired at the time of delivery.</Text>
            <Text style={styles.bulletText}>{`\u2022`} Items must be returned in their original packaging and condition.</Text>
          </View>
          <Text style={[styles.text, { marginVertical: 2, fontWeight: "600" }]}>
            Non-returnable items include:
          </Text>
          <View style={styles.bulletContainer}>
            <Text style={styles.bulletText}>{`\u2022`} Fresh fruits, vegetables, dairy products, and other perishable goods.</Text>
            <Text style={styles.bulletText}>{`\u2022`} Personal care, hygiene, and grocery items that are opened or used.</Text>
          </View>
          <Text style={styles.text}>
            If eligible, customers can request a return within 24 hours of delivery through the app or customer support.
          </Text>

          <Text style={styles.sectionTitle}>3. Refund Policy</Text>
          <View style={styles.bulletContainer}>
            <Text style={styles.bulletText}>{`\u2022`} Refunds are processed only after verification of the returned item(s).</Text>
            <Text style={styles.bulletText}>{`\u2022`} For prepaid orders, refunds will be credited to the original payment method within 5-7 business days.</Text>
            <Text style={styles.bulletText}>{`\u2022`} For Cash on Delivery (COD) orders, refunds will be issued as store credit or bank transfer after confirmation.</Text>
            <Text style={styles.bulletText}>{`\u2022`} In case of partial returns, the refund will be processed for the returned item(s) only.</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default RefundAndCancellationScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", marginTop: 40 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
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
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#222",
    flex: 1,
    textAlign: "center",
    marginRight: 34, // visually center with back btn
  },
  scroll: { flex: 1, backgroundColor: "#fff" },
  scrollContent: { padding: 18, paddingBottom: 40 },
  highlightedLink: {
    color: "#FFD700",
    fontWeight: "600",
    fontSize: 14,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#FFD700",
    width: "18%"
  },
  effectiveDate: {
    fontWeight: "400",
    color: "#444",
    marginBottom: 10,
    lineHeight: 21,
  },
  text: {
    color: "#222",
    fontSize: 14,
    marginBottom: 10,
    lineHeight: 21,

  },
  sectionTitle: {
    fontWeight: "400",
    color: "#222",
    fontSize: 14,
    marginTop: 14,
    marginBottom: 5,
  },
  bulletSection: {
    color: "#222",
    fontSize: 14,
    marginLeft: 4,
    marginBottom: 6,
    lineHeight: 21,
    fontWeight: "400",
  },
  normalText: {
    fontWeight: "400",
    color: "#222",
  },
  bulletContainer: {
    marginBottom: 9,
    marginLeft: 4,
  },
  bulletText: {
    color: "#222",
    fontSize: 14,
    lineHeight: 21,
    marginLeft: 14,
    marginBottom: 7,
  },
});
