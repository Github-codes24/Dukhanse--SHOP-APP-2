import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity
} from 'react-native';

const cancelledImg = require('../assets/images/cancellationImg.png'); // Update this path as needed

const OrderCancelledScreen: React.FC<{ navigation?: any }> = ({ navigation }) => (
  <SafeAreaView style={styles.container}>
    <Text style={styles.header}>Order Cancelled</Text>

    <View style={styles.content}>
      <View style={styles.imageBox}>
        <Image
          source={cancelledImg}
          style={styles.image}
          resizeMode="contain"
        />
      </View>

      <Text style={styles.cancelledMsg}>Order has been cancelled!</Text>
    </View>

    <View style={styles.bottomBar}>
      <TouchableOpacity
        style={styles.button}
        // onPress={() => navigation && navigation.navigate('Orders')}
        activeOpacity={0.8}
      >
        <Text style={styles.buttonText}>Back to Orders</Text>
      </TouchableOpacity>
    </View>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
  },
  header: {
    fontSize: 22,
    fontWeight: '600',
    color: '#232323',
    marginTop: 46,
    marginBottom: 18,
    textAlign: 'center',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageBox: {
    width: 348,
    height: 348,
    marginVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode:"contain"
  },
  cancelledMsg: {
    fontSize: 14,
    fontWeight: '500',
    color: '#E53935',
    // marginVertical:8,
    textAlign: 'center',
  },
  bottomBar: {
    backgroundColor: '#fff',
    padding: 18,
  },
  button: {
    backgroundColor: '#FFD700',
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    color: '#232323',
    fontSize: 15,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default OrderCancelledScreen;
