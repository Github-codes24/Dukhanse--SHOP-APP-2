import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    StyleSheet,
    Image,
    SafeAreaView,
    ScrollView,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ImagePicker from 'react-native-image-crop-picker';

const AddProductScreen = () => {
    const [frontImage, setFrontImage] = useState<string | null>(null);
    const [backImage, setBackImage] = useState<string | null>(null);
    const [barcode, setBarcode] = useState<string>('');
    const [units, setUnits] = useState<string>('');

    const pickImage = async (side: 'front' | 'back') => {
        try {
            const img = await ImagePicker.openPicker({
                width: 400,
                height: 400,
                cropping: true,
            });
            if (side === 'front') setFrontImage(img.path);
            else setBackImage(img.path);
        } catch (e) { }
    };

    return (
        <View style={styles.container}>
            <ScrollView
              contentContainerStyle={{ paddingBottom: 120 }}
              showsVerticalScrollIndicator={false}
            >
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity
                        // onPress={() => navigation.goBack()}
                        style={styles.backButton}
                        activeOpacity={0.7}
                    >
                        <MaterialIcons name="arrow-back" size={24} color="#333" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Add Product</Text>
                </View>

                {/* Product Photo (Front Side) */}
                <View style={styles.uploadBox}>
                    <TouchableOpacity onPress={() => pickImage('front')}>
                        {frontImage ? (
                            <Image source={{ uri: frontImage }} style={styles.imageIcon} />
                        ) : (
                            <MaterialIcons name="photo-camera" size={40} color="#000" style={styles.imageIcon} alignSelf={"center"}/>
                        )}
                        <Text style={styles.uploadText}>Upload Product Photo (Front Side)</Text>
                    </TouchableOpacity>
                </View>

                {/* Product Photo (Back Side) */}
                <View style={styles.uploadBox}>
                    <TouchableOpacity onPress={() => pickImage('back')}>
                        {backImage ? (
                            <Image source={{ uri: backImage }} style={styles.imageIcon} />
                        ) : (
                            <MaterialIcons name="photo-camera" size={40} color="#000" style={styles.imageIcon} alignSelf={"center"}/>
                        )}
                        <Text style={styles.uploadText}>Upload Product Photo (Back Side)</Text>
                    </TouchableOpacity>
                </View>

                {/* Scan Product Barcode */}
                <View style={styles.uploadBox}>
                    <TouchableOpacity>
                        <MaterialIcons name="barcode-scan" size={40} color="#000" style={styles.imageIcon} alignSelf={"center"}/>
                        <Text style={styles.uploadText}>
                            {barcode ? `Barcode: ${barcode}` : 'Scan Product Barcode'}
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* No. Of Units Available */}
                <TextInput
                    style={styles.input}
                    placeholder="Enter No. Of Units"
                    keyboardType="numeric"
                    value={units}
                    onChangeText={setUnits}
                />
            </ScrollView>

            {/* Fixed Bottom Buttons */}
            <View style={styles.buttonRow}>
                <TouchableOpacity style={styles.previewButton}>
                    <Text style={styles.previewText}>Preview</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.addButton}>
                    <Text style={styles.addText}>Add</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};


const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff', marginTop: 38 },
    header: { flexDirection: 'row', alignItems: 'center', marginBottom: 16, paddingHorizontal: 20,marginTop: 18 },
    backButton: {
        height: 40,
        width: 40,
        borderRadius: 20, // circle
        borderWidth: 1,
        borderColor: "#000",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
    },
    headerTitle: { fontSize: 17, fontWeight: "600", marginLeft: 18 },
    uploadBox: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 12,
        alignItems: 'center',
        padding: 24,
        marginBottom: 12,
        marginHorizontal: 20,
    },
    imageIcon: { marginBottom: 8, borderRadius: 8, width: 80, height: 60 },
    uploadText: { fontSize: 16, color: '#444', textAlign: 'center' },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        marginHorizontal: 20,
        marginBottom: 16,
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderTopWidth: 1,
        borderTopColor: '#eee',
        backgroundColor: '#fff',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
    },
    previewButton: {
        flex: 1,
        backgroundColor: '#fff',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#DE9C71',
        marginRight: 8,
        padding: 12,
        alignItems: 'center',
    },
    addButton: {
        flex: 1,
        backgroundColor: '#FEB617',
        borderRadius: 8,
        marginLeft: 8,
        padding: 12,
        alignItems: 'center',
    },
    previewText: { color: '#DE9C71', fontWeight: '600' },
    addText: { color: '#fff', fontWeight: '600' },
});

export default AddProductScreen;
