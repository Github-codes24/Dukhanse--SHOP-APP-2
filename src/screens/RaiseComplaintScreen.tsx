import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  FlatList,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const ISSUE_TYPES = [
  'Payment Related Issues',
  'Technical Issues',
  'Service Delay',
  'Other',
];

const RaiseComplaintScreen: React.FC<{ navigation?: any }> = ({ navigation }) => {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [description, setDescription] = useState('');

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation && navigation.goBack()}
          activeOpacity={0.7}
        >
          <MaterialIcons name="arrow-back" size={24} color="#232323" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Raise Complaints</Text>
      </View>

      {/* Dropdown */}
      <View style={styles.dropdownWrapper}>
        <TouchableOpacity
          style={styles.dropdownToggle}
          onPress={() => setDropdownVisible(!dropdownVisible)}
          activeOpacity={0.8}
        >
          <Text style={selectedType ? styles.selectedText : styles.placeholderText}>
            {selectedType ?? 'Select Issue Type'}
          </Text>
          <MaterialIcons name="arrow-drop-down" size={26} color="#232323" />
        </TouchableOpacity>
        {dropdownVisible && (
          <View style={styles.dropdownListContainer}>
            <FlatList
              data={ISSUE_TYPES}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.dropdownItem}
                  onPress={() => {
                    setSelectedType(item);
                    setDropdownVisible(false);
                  }}
                >
                  <Text style={styles.dropdownItemText}>{item}</Text>
                </TouchableOpacity>
              )}
              keyExtractor={(_, i) => i.toString()}
            />
          </View>
        )}
      </View>
      {/* Multiline Description */}
      <View style={styles.inputBox}>
        <TextInput
          style={styles.textarea}
          value={description}
          onChangeText={setDescription}
          placeholder="Describe you issue in detail"
          placeholderTextColor="#A1A1A1"
          multiline
          numberOfLines={4}
        />
      </View>
      {/* Upload Section */}
      <View style={styles.uploadBox}>
        <MaterialIcons name="file-upload" size={22} color="#444" />
        <View style={{ marginLeft: 7 }}>
          <Text style={styles.uploadTitle}>Upload Image</Text>
          <Text style={styles.uploadSize}>(limit less than 50mb)</Text>
        </View>
      </View>
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.button} activeOpacity={0.8}>
          <Text style={styles.buttonText}>Raise Complaint</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // margin:8,
    marginTop: 18
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 26,
    paddingBottom: 16,
    backgroundColor: '#fff',
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
    marginLeft: 14
  },
  headerTitle: {
    flex: 1,
    fontSize: 20,
    fontWeight: '600',
    color: '#232323',
    textAlign: 'center',
    // marginRight: 36,
  },
  dropdownWrapper: {
    marginTop: 12,
    marginHorizontal: 16,
    //    position:"absolute",
    //  zIndex: 50,
  },
  dropdownToggle: {
    backgroundColor: '#fff',
    borderRadius: 7,
    borderWidth: 1,
    borderColor: '#DEDEDE',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 14,
    justifyContent: 'space-between',
  },
  selectedText: {
    color: '#232323',
    fontSize: 15,
    flex: 1,
  },
  placeholderText: {
    color: '#A1A1A1',
    fontSize: 15,
    flex: 1,
  },
  dropdownListContainer: {
    position: 'absolute',
    top: 56, // Height of dropdownToggle + margin
    left: 0, right: 0,
    backgroundColor: '#fff',
    borderRadius: 9,
    elevation: 6,
    minWidth: '100%',
    maxHeight: 180,
    borderWidth: 1,
    borderColor: '#DEDEDE',
    shadowColor: '#888',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.13,
    shadowRadius: 6,
  },
  dropdownItem: {
    paddingVertical: 15,
    paddingHorizontal: 22,
    borderBottomWidth: 0.5,
    borderColor: '#EFEFEF',
  },
  dropdownItemText: {
    color: '#232323',
    fontSize: 15,
  },
  inputBox: {
    marginTop: 14,
    marginHorizontal: 16,
  },
  textarea: {
    backgroundColor: '#fff',
    borderRadius: 7,
    borderWidth: 1,
    borderColor: '#DEDEDE',
    padding: 16,
    fontSize: 15,
    color: '#232323',
    minHeight: 90,
    textAlignVertical: 'top',
    shadowColor: '#EEE',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 2,
  },
  uploadBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 18,
    marginVertical: 22,
  },
  uploadTitle: {
    fontSize: 16,
    color: '#232323',
    fontWeight: '400',
    marginBottom: 2,
  },
  uploadSize: {
    fontSize: 14,
    color: '#A1A1A1',
    fontWeight: '400',
  },
  bottomBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#fff',
    padding: 18,
    borderTopWidth: 0.5,
    borderColor: '#EEE',
  },
  button: {
    backgroundColor: '#FFD700',
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    color: '#232323',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default RaiseComplaintScreen;
