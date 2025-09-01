import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    ScrollView,
    FlatList
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

type Language = {
    code: string;
    name: string;
    label: string;
    icon: string; // can be replaced with SVG or image later
};

const languages: Language[] = [
    { code: 'en', name: 'English', label: 'English', icon: 'Aa' },
    { code: 'hi', name: 'हिंदी', label: 'Hindi', icon: 'हआ' },
    { code: 'mr', name: 'मराठी', label: 'Marathi', icon: 'म' },
];

export default function LanguageScreen({ navigation }: any) {

    const [selected, setSelected] = useState<string>('en');

    const renderItem = ({ item }: { item: Language }) => (
        <TouchableOpacity
            style={styles.languageItem}
            onPress={() => setSelected(item.code)}
            activeOpacity={1}
        >
            {/* Left Circle with Icon */}
            <View style={styles.iconCircle}>
                <Text style={styles.iconText}>{item.icon}</Text>
            </View>

            {/* Language Text */}
            <View style={{ flex: 1 }}>
                <Text style={styles.languageTitle}>{item.name}</Text>
                <Text style={styles.languageLabel}>{item.label}</Text>
            </View>

            {/* Right Radio Button */}
            <View style={styles.radioOuter}>
                {selected === item.code && <View style={styles.radioInner} />}
            </View>
        </TouchableOpacity>
    );
    return (
        <ScrollView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity
                    // onPress={() => navigation.goBack()}
                    style={styles.backButton}
                    activeOpacity={0.7}
                >
                    <MaterialIcons name="arrow-back" size={24} color="#333" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Choose Language</Text>
            </View>


            <FlatList
                data={languages}
                renderItem={renderItem}
                keyExtractor={(item) => item.code}
                contentContainerStyle={{ paddingVertical: 10 }}
            />

            {/* Continue Button */}
            <TouchableOpacity style={styles.continueButton}>
                <Text style={styles.continueText}>Continue</Text>
            </TouchableOpacity>

        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#fff", padding: 12, },


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
    header: {
        flexDirection: "row",
        alignItems: "center",
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },
    headerTitle: { fontSize: 18, fontWeight: "600", marginLeft: 12 },

    languageItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
    },
    iconCircle: {
        width: 40,
        height: 40,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#999',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    iconText: {
        fontSize: 16,
        fontWeight: '500',
    },
    languageTitle: {
        fontSize: 16,
        fontWeight: '600',
    },
    languageLabel: {
        fontSize: 13,
        color: '#555',
    },
    radioOuter: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 1.3,
        borderColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',

    },
    radioInner: {
        width: 13,
        height: 13,
        borderRadius: 6.5,
        backgroundColor: 'red',
    },
    continueButton: {
        width: '100%',
        backgroundColor: '#FFD700',
        borderRadius: 8,
        paddingVertical: 14,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 2,
    },
    continueText: {
        color: '#D32F2F',
        fontSize: 14,
        fontWeight: '600',
    },


});
