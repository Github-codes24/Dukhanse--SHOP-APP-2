import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";


const KYCDetailsScreens: React.FC<{ navigation?: any }> = ({ navigation }) =>{
  return (
    <View style={styles.safeContainer}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <MaterialIcons name="arrow-back" size={26} color="#222" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>KYC Details</Text>
        {/* Spacer for header alignment */}
        <View style={{ width: 40 }} />
      </View>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* PAN Details */}
        <Text style={styles.sectionTitle}>PAN Details</Text>
        <View style={styles.panCardWrapper}>
          <Image
            source={require("../assets/images/PANCard.png")}
            style={styles.panImage}
            resizeMode="cover"
          />
        </View>

        {/* GST Details */}
        <Text style={styles.sectionTitle}>GST Details (Optional)</Text>
        <View style={styles.gstBorder}>
          <Image
            source={require("../assets/images/GSTCretificate.png")}
            style={styles.gstImage}
            resizeMode="cover"
          />
        </View>
      </ScrollView>

      {/* Bottom Button */}
      <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate("EditKycDetailsScreen")}>
        <Text style={styles.buttonText}>Edit KYC</Text>
      </TouchableOpacity>
    </View>
  );
};

export default KYCDetailsScreens;

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#e6e6e6",
    paddingVertical: 13,
    paddingHorizontal: 14,
    marginTop:38
  },
  backButton: {
    height: 38,
    width: 38,
    borderRadius: 19,
    borderWidth: 1,
    borderColor: "#000",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 19,
    fontWeight: "600",
    color: "#222",
    // marginLeft: -38,
   
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 100,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#222",
    marginBottom: 8,
    marginTop: 16,
  },
  panCardWrapper: {
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#e9f3ff",
    elevation: 2,
    shadowColor: "#dae1fd",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.16,
    shadowRadius: 4,
    marginBottom: 10,
  },
  panImage: {
    width: "100%",
    height: 220,
    borderRadius: 12,
  },
  gstBorder: {
    // borderWidth: 2,
    // borderColor: "#2e89ff",
    // borderRadius: 14,
    padding: 6,
    marginBottom: 24,
    backgroundColor: "#f7f9ff",
  },
  gstImage: {
    width: "100%",
    height: 240,
    borderRadius: 8,
  },
  button: {
    backgroundColor: "#F9B208", // yellow
    paddingVertical: 15,
    marginHorizontal: 16,
    borderRadius: 8,
    alignItems: "center",
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 24,
    marginBottom: 0,
    marginTop: 0,
    elevation: 2,
  },
  buttonText: {
    color: "#000",
    fontSize: 17,
    fontWeight: "700",
    letterSpacing: 0.2,
  },
});
