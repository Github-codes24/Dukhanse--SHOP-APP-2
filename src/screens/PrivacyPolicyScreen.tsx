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

const PrivacyPolicyScreen: React.FC = () => {
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
        <Text style={styles.headerTitle}>Privacy Policy</Text>
      </View>

      {/* Content */}
      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
        <Text style={styles.highlightedLink}>DukaanSe</Text>
        <Text style={styles.effectiveDate}>
          Effective Date: 1st January, 2025
        </Text>

        <Text style={styles.text}>
          {"[App Name] (“we”, “our”, or “us”) values your privacy. This Privacy Policy explains how we collect, use, and protect your personal data when you use our dating app (“the App”). By using our App, you agree to the collection and use of information in accordance with this policy."}
        </Text>

        {/* Section 1 */}
        <Text style={styles.sectionTitle}>1. Information We Collect</Text>
        <Text style={styles.text}>
          We collect the following types of personal information to provide and improve our services:
        </Text>
        <Text style={styles.bulletSection}>
          {"• Account Information:"}
          <Text style={styles.normalText}>
            {" When you register for an account, we collect personal details such as your name, email address, phone number, and other information you provide to create a profile."}
          </Text>
        </Text>
        <Text style={styles.bulletSection}>
          {"• Profile Information:"}
          <Text style={styles.normalText}>
            {" This may include information such as your age, gender, location, sexual orientation, interests, photos, and other content you share through the app."}
          </Text>
        </Text>
        <Text style={styles.bulletSection}>
          {"• Usage Data:"}
          <Text style={styles.normalText}>
            {" We collect information on how you use the app, including interaction with other users, app features, device information, and log data."}
          </Text>
        </Text>
        <Text style={styles.bulletSection}>
          {"• Location Data:"}
          <Text style={styles.normalText}>
            {" With your consent, we collect location information to show nearby matches and provide relevant services."}
          </Text>
        </Text>
        <Text style={styles.bulletSection}>
          {"• Payment Information:"}
          <Text style={styles.normalText}>
            {" If you make in-app purchases or subscribe to premium features, we may collect billing information such as credit card details or other payment methods."}
          </Text>
        </Text>

        {/* Section 2 */}
        <Text style={styles.sectionTitle}>2. How We Use Your Information</Text>
        <Text style={styles.text}>
          We use the collected information for various purposes, including:
        </Text>
        <Text style={styles.bulletSection}>
          {"• To provide and maintain the app, including features like user profiles, messaging, and match suggestions."}
        </Text>
        <Text style={styles.bulletSection}>
          {"• To improve the app by analyzing usage patterns and feedback."}
        </Text>
        <Text style={styles.bulletSection}>
          {"• To communicate with you, such as sending notifications, updates, or promotional content (if you opt in)."}
        </Text>
        <Text style={styles.bulletSection}>
          {"• To personalize your experience by showing you relevant matches and content based on your preferences and interactions."}
        </Text>
      </ScrollView>
    </View>
  );
};

export default PrivacyPolicyScreen;

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
  backBtn: {
    marginRight: 2,
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
});
