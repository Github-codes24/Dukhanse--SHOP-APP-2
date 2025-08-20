import { View, Text, StyleSheet } from 'react-native';
import React, { useEffect } from 'react';

const Splashscreen = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('SignIn')
    }, 3000);

    return () => clearTimeout(timer); 
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={{ color: 'red', fontSize: 32, fontWeight: '600' }}>
        Dukanसे
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'orange',
  },
});

export default Splashscreen;
