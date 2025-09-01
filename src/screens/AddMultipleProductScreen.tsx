import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  ScrollView,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const AddMultipleProductScreen: React.FC = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      {/* Scrollable Content */}
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton}>
            <MaterialIcons name="arrow-back" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Add Product</Text>
        </View>

        {/* Subheader */}
        <Text style={styles.subHeader}>Upload CSV or Google Sheet</Text>

        {/* Upload Box */}
        <View style={styles.uploadBox}>
          <MaterialIcons name="description" size={40} color="#666" />
          <Text style={styles.uploadText}>Upload File (CSV or Google Sheet)</Text>
        </View>
      </ScrollView>

      {/* Fixed Bottom Add Button */}
      <View style={styles.bottomButtonContainer}>
        <TouchableOpacity style={styles.addButton} onPress={openModal}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>

      {/* Bottom Sheet Modal */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalText}>
              This product is already in the list. Do you want to replace it?
            </Text>
            <View style={styles.modalButtonRow}>
              {/* Cancel Button */}
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={closeModal}
              >
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
              {/* Yes Button */}
              <TouchableOpacity
                style={[styles.modalButton, styles.yesButton]}
                onPress={() => {
                  closeModal();
                  // Add replacement logic here if needed
                }}
              >
                <Text style={styles.yesText}>Yes</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', marginTop: 30 },
  scrollContent: { padding: 16, paddingBottom: 100 },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  backButton: {
    height: 40,
    width: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  headerTitle: { fontSize: 18, fontWeight: '600', marginLeft: 16, color: '#222' },
  subHeader: { fontSize: 16, color: '#555', marginBottom: 8, marginTop: 12 },
  uploadBox: {
    borderWidth: 1,
    borderColor: '#bbb',
    borderRadius: 14,
    backgroundColor: '#f8f8f8',
    padding: 32,
    alignItems: 'center',
    marginBottom: 20,
  },
  uploadText: { marginTop: 8, fontSize: 16, color: '#444', fontWeight: '500' },

  bottomButtonContainer: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
  },
  addButton: {
    backgroundColor: '#FFC107',
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: { fontSize: 16, fontWeight: '600', color: '#222' },

  // Bottom Sheet Modal styles
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end', // Bottom of screen
    backgroundColor: 'rgba(15, 14, 14, 0.1)',
  },
  modalContainer: {
    backgroundColor: '#fff',
    padding: 24,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    alignItems: 'center',
    width: '100%',
    minHeight: 180,
  },
  modalText: { fontSize: 16, color: '#222', marginBottom: 24, textAlign: 'center' },
  modalButtonRow: { flexDirection: 'row', width: '100%', justifyContent: 'space-between' },
  modalButton: {
    flex: 1,
    height: 48,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 6,
    borderWidth: 1,
  },
  cancelButton: { borderColor: '#FF3B3B', backgroundColor: '#fff' },
  yesButton: { borderColor: '#FFC107', backgroundColor: '#FFC107' },
  cancelText: { color: '#FF3B3B', fontWeight: '700', fontSize: 16 },
  yesText: { color: '#222', fontWeight: '700', fontSize: 16 },
});

export default AddMultipleProductScreen;
