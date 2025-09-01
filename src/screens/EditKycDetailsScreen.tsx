import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
  Modal,
  Pressable,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ImageCropPicker from 'react-native-image-crop-picker';

type PickerType = 'front' | 'back' | null;

const EditKycDetailsScreen: React.FC<{ navigation?: any }> = ({ navigation }) => {
  const [frontImg, setFrontImg] = useState<string | null>(null);
  const [backImg, setBackImg] = useState<string | null>(null);
  const [pickerVisible, setPickerVisible] = useState(false);
  const [pickerFor, setPickerFor] = useState<PickerType>(null);

  const handleCamera = async () => {
    setPickerVisible(false);
    setTimeout(async () => {
      try {
        const image = await ImageCropPicker.openCamera({
          width: 500,
          height: 500,
          cropping: true,
          mediaType: 'photo',
        });
        if (image && image.path) {
          if (pickerFor === 'front') setFrontImg(image.path);
          if (pickerFor === 'back') setBackImg(image.path);
        }
      } catch (err) { }
    }, 400);
  };

  const handleGallery = async () => {
    setPickerVisible(false);
    setTimeout(async () => {
      try {
        const image = await ImageCropPicker.openPicker({
          width: 500,
          height: 500,
          cropping: true,
          mediaType: 'photo',
        });
        if (image && image.path) {
          if (pickerFor === 'front') setFrontImg(image.path);
          if (pickerFor === 'back') setBackImg(image.path);
        }
      } catch (err) { }
    }, 400);
  };

  const showPicker = (type: PickerType) => {
    setPickerFor(type);
    setPickerVisible(true);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 32 }}>
        <View style={styles.headerRow}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
            // activeOpacity={0.7}
          >
            <MaterialIcons name="arrow-back" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Edit KYC Details</Text>
        </View>

        <Text style={styles.photoLabel}>PAN Details</Text>
        <TouchableOpacity
          style={styles.imageUploadCard}
          onPress={() => showPicker('front')}
          activeOpacity={0.85}
        >
          <View style={styles.uploadContent}>
            <MaterialIcons name="photo" size={46} color="#000" />
            <Text style={styles.uploadText}>Upload PAN Card</Text>
          </View>
        </TouchableOpacity>
        {frontImg && (
          <Image source={{ uri: frontImg }} style={styles.uploadedImgBelow} />
        )}

        <Text style={styles.photoLabel}>GST Details</Text>
        <TouchableOpacity
          style={styles.imageUploadCard}
          onPress={() => showPicker('back')}
        //   activeOpacity={0.85}
        >
          <View style={styles.uploadContent}>
            <MaterialIcons name="photo" size={46} color="#000" />
            <Text style={styles.uploadText}>Upload GST Details</Text>
          </View>
        </TouchableOpacity>
        {backImg && (
          <View style={styles.imageUploadCard}>
            <Image source={{ uri: backImg }} style={styles.uploadedImgBelow} />
          </View>
        )}
      </ScrollView>

      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.button} activeOpacity={0.8}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      </View>

      <Modal
        visible={pickerVisible}
        transparent
        animationType="fade"
      >
        <View style={styles.overlay}>
          <View style={styles.actionSheet}>
            <TouchableOpacity style={styles.actionBtn} onPress={handleCamera}>
              <MaterialIcons name="photo-camera" size={24} color="#222" />
              <Text style={styles.actionSheetText}>Open Camera</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionBtn} onPress={handleGallery}>
              <MaterialIcons name="photo-library" size={24} color="#222" />
              <Text style={styles.actionSheetText}>Choose from Gallery</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.actionBtn,
                { borderTopWidth: 1, borderColor: '#eee' },
              ]}
              onPress={() => setPickerVisible(false)}
            >
              <Text style={[styles.actionSheetText, { color: '#E53935' }]}>
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    // paddingVertical: 22,
    marginBottom: 5,
    marginTop: 39
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
    marginLeft:12
  },
  headerTitle: {
    flex: 1,
    fontSize: 20,
    fontWeight: '500',
    color: '#232323',
    textAlign: 'center',
    // marginRight: 36,
  },
  photoLabel: {
    marginLeft: 22,
    marginBottom: 9,
    fontSize: 14.2,
    color: '#232323',
    fontWeight: '500',
  },
  imageUploadCard: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 11,
    borderWidth: 1,
    borderColor: '#DEDEDE',
    backgroundColor: '#F9F9F9',
    marginHorizontal: 12,
    marginBottom: 10,
    height: 130,
    width: '90%',
    alignSelf: 'center',
    overflow: 'hidden',
  },
  uploadContent: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
  },
  uploadText: {
    color: '#000',
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
    marginTop: 5,
  },
  uploadedImgBelow: {
    width: "100%",
    height: "100%",
    resizeMode: 'cover',
    alignSelf: 'center',
    // marginBottom: 12,
    borderRadius: 12,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  bottomBar: {
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
    fontWeight: '500',
    textAlign: 'center',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(20,20,20,0.16)',
    justifyContent: 'flex-end',
  },
  actionSheet: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 16,
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 18,
    justifyContent: 'center',
  },
  actionSheetText: {
    fontSize: 16,
    color: '#232323',
    marginLeft: 13,
    fontWeight: '600',
  },
});

export default EditKycDetailsScreen;
