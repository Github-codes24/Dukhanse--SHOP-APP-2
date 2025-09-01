import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  FlatList,
  Image,
  ScrollView,
  TextInput,
  Modal,
  Keyboard,
  Animated,
  Dimensions,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import { useNavigation,NavigationProp } from '@react-navigation/native';
// --- Types and sample order data ---
type OrderItem = {
  name: string;
  price: number;
  qty: number;
  size: string;
  image: string;
};

type Order = {
  id: string;
  amount: number;
  customerName: string;
  address: string;
  items: OrderItem[];
  orderType: string;
  mobile: string;
  orderDate: string;
  transactionID: string;
  paymentMethod: string;
  gateway: string;
  receivedAmount: number;
  paymentDate: string;
};

type StatusType = "initial" | "accepted" | "packed";

const order: Order = {
  id: "#ODN00000123",
  amount: 1750,
  customerName: "Gourab Mandal",
  address: "451B Washington Ave. Manchester, Kentucky 39495",
  items: [
    {
      name: "Aashirvaad Chakki Atta",
      size: "10 kg",
      qty: 1,
      price: 450,
      image: "https://i.imgur.com/9G1XG6W.png",
    },
    {
      name: "Happilo Cashew Nuts",
      size: "200 g",
      qty: 1,
      price: 300,
      image: "https://i.imgur.com/uKT9xlF.png",
    },
    {
      name: "India Gate Basmati Rice",
      size: "10 kg",
      qty: 1,
      price: 1000,
      image: "https://i.imgur.com/ITbDz4e.png",
    },
  ],
  orderType: "Self Pickup",
  mobile: "+91-9876543210",
  orderDate: "May 25, 2025 - 10:00AM",
  transactionID: "BPBBPS986457JPX864554",
  paymentMethod: "PhonePe UPI",
  gateway: "BILLDESK",
  receivedAmount: 1750,
  paymentDate: "May 25, 2025",
};

const OTP_LENGTH = 4;

const OrderDetailsScreen: React.FC = ({ navigation }: any) => {
  const [status, setStatus] = useState<StatusType>("initial");
  const [otpVisible, setOtpVisible] = useState(false);
  const [otpDigits, setOtpDigits] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const inputsRef = useRef<Array<TextInput | null>>([]);
  const sheetAnim = useRef(new Animated.Value(0)).current;
  // Responsive bottom sheet height (e.g. 35% of screen height)
  const deviceHeight = Dimensions.get("window").height;
  const sheetHeight = Math.round(deviceHeight * 0.37);

  function getHeaderColor(): string {
    if (status === "initial") return "#FFF9ED";
    if (status === "accepted") return "#616161";
    if (status === "packed") return "#0054A6";
    return "#FFF9ED";
  }

  function getOrderStatus(): string | null {
    if (status === "initial") return null;
    if (status === "accepted") return "Processing";
    if (status === "packed") return "Packed";
    return null;
  }

  const openOtpSheet = () => {
    setOtpVisible(true);
    Animated.timing(sheetAnim, {
      toValue: 1,
      duration: 250,
      useNativeDriver: false,
    }).start();
  };

  const closeOtpSheet = () => {
    Animated.timing(sheetAnim, {
      toValue: 0,
      duration: 180,
      useNativeDriver: false,
    }).start(() => {
      setOtpVisible(false);
      Keyboard.dismiss();
    });
  };

  const handleOtpChange = (index: number, value: string) => {
    if (/^[0-9]{0,1}$/.test(value)) {
      let digits = [...otpDigits];
      digits[index] = value;
      setOtpDigits(digits);
      if (value && index < OTP_LENGTH - 1) {
        inputsRef.current[index + 1]?.focus();
      }
      if (!value && index > 0) {
        inputsRef.current[index - 1]?.focus();
      }
    }
  };

  const handleOtpKeyPress = (index: number, event: any) => {
    if (event.nativeEvent.key === "Backspace" && otpDigits[index] === "" && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const bottom = sheetAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-sheetHeight, 0],
  });

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
                 // onPress={() => navigation.goBack()}
                 style={styles.backButton}
                 activeOpacity={0.7}
               >
                 <MaterialIcons name="arrow-back" size={24} color="#333" />
               </TouchableOpacity>
          <Text style={styles.headerTitle}>Order Details</Text>
        </View>
        <View style={[styles.headers, { backgroundColor: getHeaderColor() }]}>
          <Text style={styles.orderId}>{order.id}</Text>
          <Text style={styles.amount}>₹ {order.amount}</Text>
        </View>
        <FlatList
          data={order.items}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => (
            <View style={styles.productRow}>
              <View style={styles.imageBox}>
                <Image source={{ uri: item.image }} style={styles.productImage} />
              </View>
              <View style={styles.infoContainer}>
                <Text style={styles.productName}>{item.name}</Text>
                <Text style={styles.productDetails}>
                  {item.size} / Qty: {item.qty}
                </Text>
                <Text style={styles.productPrice}>₹ {item.price}</Text>
              </View>
            </View>
          )}
          showsVerticalScrollIndicator={false}
          style={{ marginBottom: 8 }}
        />
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Customer Details</Text>
          <Text style={styles.detailLabel}>
            Order Date: <Text style={styles.detailValue}>{order.orderDate}</Text>
          </Text>
          <Text style={styles.detailLabel}>
            Customer Name: <Text style={styles.detailValue}>{order.customerName}</Text>
          </Text>
          <Text style={styles.detailLabel}>
            Mobile Number: <Text style={[styles.detailValue, styles.callText]}>{order.mobile}</Text>
          </Text>
          <View style={{ flexDirection: "row", alignItems: "center", marginVertical: 4 }}>
            <Text style={[styles.detailLabel, { flex: 1 }]}>Address:</Text>
            <Text
              style={[styles.detailValue, { flex: 2, textAlign: "right" }]}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {order.address}
            </Text>
          </View>
          {status === "initial" ? (
            <Text style={styles.detailLabel}>
              Order Type: <Text style={styles.detailValue}>{order.orderType}</Text>
            </Text>
          ) : (
            <Text style={styles.detailLabel}>
              Order Status:{" "}
              <Text style={[
                styles.detailValue,
                status === "packed" ? styles.statusPacked : styles.statusProcessing,
              ]}>
                {getOrderStatus()}
              </Text>
            </Text>
          )}
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Payment Details</Text>
          <Text style={styles.detailLabel}>
            Transaction ID: <Text style={styles.detailValue}>{order.transactionID}</Text>
          </Text>
          <Text style={styles.detailLabel}>
            Date: <Text style={styles.detailValue}>{order.paymentDate}</Text>
          </Text>
          <Text style={styles.detailLabel}>
            Payment Gateway: <Text style={styles.detailValue}>{order.gateway}</Text>
          </Text>
          <Text style={styles.detailLabel}>
            Payment Method: <Text style={styles.detailValue}>{order.paymentMethod}</Text>
          </Text>
          <Text style={styles.detailLabel}>
            Received Amount: <Text style={styles.detailValue}>₹{order.receivedAmount}</Text>
          </Text>
        </View>
        <View style={styles.buttonRow}>
          {status === "initial" && (
            <>
              <TouchableOpacity style={styles.cancelBtn}>
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.acceptBtn}
                onPress={() => setStatus("accepted")}
              >
                <Text style={styles.acceptText}>Accept</Text>
              </TouchableOpacity>
            </>
          )}
          {status === "accepted" && (
            <TouchableOpacity
              style={styles.packBtn}
              onPress={() => setStatus("packed")}
            >
              <Text style={styles.packText}>Mark as Packed</Text>
            </TouchableOpacity>
          )}
          {status === "packed" && (
            <TouchableOpacity style={styles.pickupBtn} onPress={openOtpSheet}>
              <Text style={styles.pickupText}>Ready for Pick-up</Text>
            </TouchableOpacity>
          )}
        </View>
        {status === "initial" && (
          <Text style={styles.disclaimerText}>
            Seller cannot go back after choosing to accept.
          </Text>
        )}
      </ScrollView>

      {/* OTP "Bottom Sheet" Modal */}
      <Modal
        visible={otpVisible}
        transparent
        animationType="none"
        onRequestClose={closeOtpSheet}
      >
        <View style={styles.modalOverlay}>
          <Animated.View style={[
            styles.bottomSheetContent,
            { bottom: bottom, height: sheetHeight }
          ]}>
            <View style={styles.otpContainer}>
              <Text style={styles.otpOverlayHeading}>VERIFY OTP OVERLAY</Text>
              <Text style={styles.otpTitle}>
                Verify last two digit of OTP from the customer to complete this order.
              </Text>
              <View style={styles.otpInputsRow}>
                {otpDigits.map((digit, idx) => (
                  <TextInput
                    key={idx}
                    ref={ref => (inputsRef.current[idx] = ref)}
                    style={styles.otpInput}
                    value={digit}
                    onChangeText={v => handleOtpChange(idx, v)}
                    keyboardType="number-pad"
                    maxLength={1}
                    returnKeyType="next"
                    onKeyPress={e => handleOtpKeyPress(idx, e)}
                    blurOnSubmit={false}
                    autoFocus={idx === 0}
                  />
                ))}
              </View>
              <View style={styles.otpBtnRow}>
                <TouchableOpacity
                  style={styles.otpCancelBtn}
                  onPress={closeOtpSheet}
                >
                  <Text style={styles.cancelText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.otpCompleteBtn}
                  onPress={() => {
                    // handle OTP logic here
                    closeOtpSheet();
                  }}
                >
                  <Text style={styles.otpCompleteText}>Complete Order</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Animated.View>
        </View>
      </Modal>
    </View>
  );
};

export default OrderDetailsScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 16 },
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
  headerTitle: { fontSize: 18, fontWeight: "700", marginLeft: 12 },
  headers: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderRadius: 8,
    marginBottom: 4,
  },
  orderId: { fontWeight: "600", fontSize: 15, color: "#000" },
  amount: { fontWeight: "600", fontSize: 15, color: "#000" },
  productRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingVertical: 10,
    borderRadius: 12,
    marginBottom: 2,
    borderColor: "#f5f5ef",
    borderBottomWidth: 1,
    minHeight: 62,
  },
  imageBox: {
    borderWidth: 1,
    borderColor: "#eee",
    padding: 6,
    borderRadius: 8,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 4
  },
  productImage: {
    width: 48,
    height: 48,
    borderRadius: 6,
    resizeMode: "cover",
    backgroundColor: "#f6f6f6",
  },
  infoContainer: {
    flex: 1,
    justifyContent: "center",
    marginLeft: 12
  },
  productName: {
    fontWeight: "500",
    fontSize: 12,
    color: "#222",
    marginBottom: 2,
  },
  productDetails: {
    fontSize: 13,
    color: "#888",
    marginBottom: 1,
  },
  productPrice: {
    fontWeight: "600",
    fontSize: 12,
    color: "#000",
    marginTop: 2,
  },
  section: { marginTop: 16, marginBottom: 8 },
  sectionHeader: {
    fontWeight: "600",
    fontSize: 14,
    color: "#000",
    marginBottom: 4,
  },
  detailLabel: { fontSize: 12, color: "#8A8A8A", marginVertical: 4 },
  detailValue: { fontSize: 12, color: "#333", fontWeight: "400" },
  callText: { color: "#333", fontWeight: "400", fontSize: 12, },
  statusProcessing: { color: "#9E9E9E", fontWeight: "bold" },
  statusPacked: { color: "#0054A6", fontWeight: "bold" },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 24,
  },
  cancelBtn: {
    flex: 0.5,
    borderWidth: 1,
    borderColor: "#E53935",
    borderRadius: 8,
    padding: 10,
    marginRight: 12,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  cancelText: { color: "#E53935", fontWeight: "bold", fontSize: 15 },
  acceptBtn: {
    flex: 0.5,
    backgroundColor: "#FFD700",
    borderRadius: 8,
    padding: 10,
    alignItems: "center",
  },
  acceptText: { color: "#fff", fontWeight: "bold", fontSize: 15 },
  packBtn: {
    flex: 1,
    backgroundColor: "#FFD700",
    borderRadius: 8,
    padding: 13,
    alignItems: "center",
  },
  packText: { color: "#fff", fontWeight: "bold", fontSize: 15 },
  pickupBtn: {
    flex: 1,
    backgroundColor: "#FFD700",
    borderRadius: 8,
    padding: 13,
    alignItems: "center",
  },
  pickupText: { color: "#fff", fontWeight: "bold", fontSize: 15 },
  disclaimerText: {
    textAlign: "center",
    color: "#757575",
    marginTop: 12,
    fontSize: 12,
    fontWeight: "800"
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.20)",
    justifyContent: "flex-end",
  },
  bottomSheetContent: {
    position: "absolute",
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    // borderWidth:1,
    // borderColor: "#2196F3",
    alignItems: "center",
    paddingTop: 24,
    elevation: 30,
  },
  otpContainer: {
    width: "100%",
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: 18,
  },
  otpOverlayHeading: {
    fontSize: 17,
    color: "#2196F3",
    fontWeight: "bold",
    letterSpacing: 1,
    marginBottom: 10,
  },
  otpTitle: {
    fontSize: 15,
    color: "#222",
    fontWeight: "500",
    textAlign: "center",
    marginBottom: 23,
    marginTop: 0,
    lineHeight: 22,
  },
  otpInputsRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 26,
    marginTop: 6,
  },
  otpInput: {
    width: 44,
    height: 44,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#DDD",
    marginHorizontal: 6,
    fontSize: 22,
    textAlign: "center",
    backgroundColor: "#F8F8F8"
  },
  otpBtnRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: '100%',
    marginTop: 18,
    marginBottom: 4,
  },
  otpCancelBtn: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#E53935",
    borderRadius: 8,
    paddingVertical: 13,
    alignItems: "center",
    backgroundColor: "#fff",
    marginRight: 13,
  },
  otpCompleteBtn: {
    flex: 1,
    backgroundColor: "#FFD700",
    borderRadius: 8,
    paddingVertical: 13,
    alignItems: "center"
  },
  otpCompleteText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15
  },
});
