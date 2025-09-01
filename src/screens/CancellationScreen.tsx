import React from 'react';
import {
    View,
    Text,
    SafeAreaView,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const CancellationTNC: React.FC<{ navigation?: any }> = ({ navigation }) => (
    <View style={styles.safeArea}>
        <View style={styles.headerRow}>
            <TouchableOpacity
                // onPress={() => navigation.goBack()}
                style={styles.backButton}
                activeOpacity={0.7}
            >
                <MaterialIcons name="arrow-back" size={24} color="#333" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Cancellation T&C</Text>
        </View>

        <ScrollView
            contentContainerStyle={styles.contentContainer}
            showsVerticalScrollIndicator={false}
        >
            <Text style={styles.orgName}>DukaanSe</Text>
            <Text style={styles.date}>Effective Date: 1st January, 2025</Text>
            <Text style={styles.bodyText}>
                [App Name] (“we”, “our”, or “us”) values your privacy. This Privacy Policy explains how we collect, use, and protect your personal data when you use our dating app (“the App”). By using our App, you agree to the collection and use of information in accordance with this policy.
            </Text>
            <Text style={styles.sectionHeader}>1. Information We Collect</Text>
            <Text style={styles.bodyText}>
                We collect the following types of personal information to provide and improve our services:
            </Text>
            <View style={styles.list}>
                <Text style={styles.listPoint}>
                    • Account Information: When you register for an account, we collect personal details such as your name, email address, phone number, and other information you provide to create a profile.
                </Text>
                <Text style={styles.listPoint}>
                    • Profile Information: This may include information such as your age, gender, location, sexual orientation, interests, photos, and other content you share through the app.
                </Text>
                <Text style={styles.listPoint}>
                    • Usage Data: We collect information on how you use the app, including interaction with other users, app features, device information, and log data.
                </Text>
                <Text style={styles.listPoint}>
                    • Location Data: With your consent, we collect location information to show nearby matches and provide relevant services.
                </Text>
                <Text style={styles.listPoint}>
                    • Payment Information: If you make in-app purchases or subscribe to premium features, we may collect billing information such as credit card details or other payment methods.
                </Text>
            </View>
            <Text style={styles.sectionHeader}>2. How We Use Your Information</Text>
            <Text style={styles.bodyText}>
                We use the collected information for various purposes, including:
            </Text>
            <View style={styles.list}>
                <Text style={styles.listPoint}>
                    • To provide and maintain the app, including features like user profiles, messaging, and match suggestions.
                </Text>
                <Text style={styles.listPoint}>
                    • To improve the app by analyzing usage patterns and feedback.
                </Text>
                <Text style={styles.listPoint}>
                    • To communicate with you, such as sending notifications, updates, or promotional content (if you opt in).
                </Text>
                <Text style={styles.listPoint}>
                    • To personalize your experience by showing you relevant matches and content based on your preferences and location.
                </Text>
            </View>
            {/* Add more sections as needed */}
        </ScrollView>
    </View>
);

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#fff',
        padding:16,
        marginTop:12
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 22,
        paddingBottom: 16,
        backgroundColor: '#fff',
        borderBottomWidth: 0.5,
        borderColor: '#D3D3D3',
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
    headerTitle: {
        flex: 1,
        fontSize: 20,
        fontWeight: '600',
        color: '#232323',
        textAlign: 'center',
        marginRight: 36,
        
    },
    contentContainer: {
        // padding: 16,
        // backgroundColor: '#F9F9F9',
        // borderRadius: 15,
        margin:8,
    },
    orgName: {
        color: '#E53935',
        fontWeight: '600',
        fontSize: 15,
        marginBottom: 12,
    },
    date: {
        color: '#232323',
        fontSize: 14,
        marginBottom: 10,
    },
    bodyText: {
        fontSize: 15,
        color: '#444',
        lineHeight: 21,
        marginBottom: 10,
    },
    sectionHeader: {
        fontWeight: '400',
        fontSize: 16,
        color: '#222',
        marginBottom: 6,
        marginTop: 2,
    },
    list: {
        marginLeft: 4,
        marginBottom:6,
    },
    listPoint: {
        fontSize: 15,
        color: '#444',
        marginBottom: 6,
        lineHeight: 21,
    },
});

export default CancellationTNC;
