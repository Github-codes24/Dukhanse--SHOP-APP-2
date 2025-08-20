import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const AboutScreen = () => {
    const navigation = useNavigation();
    const [about, setAbout] = useState('');
    const [name, setName] = useState('');
    const [shopName, setShopName] = useState('');
    const [city, setCity] = useState('');

    const handleContinue = () => {
        navigation.navigate('HomeScreen' as never);
    };

    const handleSkip = () => {
        navigation.navigate('Dashboard');
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {/* Skip Button */}
            <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
                <Text style={styles.skipText}>Skip</Text>
            </TouchableOpacity>

            {/* Heading */}
            <Text style={styles.header}>Tell us about yourself!</Text>

            {/* Input Fields */}
            <TextInput
                style={styles.inputFirst}
                placeholder="Tell us about yourself"
                placeholderTextColor="#888"
                value={about}
                onChangeText={setAbout}
                multiline
            />

            <TextInput
                style={styles.input}
                placeholder="Enter your name"
                placeholderTextColor="#888"
                value={name}
                onChangeText={setName}
            />

            <TextInput
                style={styles.input}
                placeholder="Enter your Shop’s name"
                placeholderTextColor="#888"
                value={shopName}
                onChangeText={setShopName}
            />

            <TextInput
                style={styles.input}
                placeholder="Enter your City"
                placeholderTextColor="#888"
                value={city}
                onChangeText={setCity}
            />

            {/* Terms & Conditions */}
            <Text style={styles.termsText}>
                <Text style={styles.checkBox}>☑ </Text>
                By continuing, you agree to{' '}
                <Text style={styles.link}>DukaanSe’s Terms & Conditions</Text> and{' '}
                <Text style={styles.link}>Privacy Policy</Text>.
            </Text>

            {/* Continue Button */}
            <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
                <Text style={styles.continueText}>Continue</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingTop: 40,
    },
    skipButton: {
        alignSelf: 'flex-end',
        marginBottom: 10,
    },
    skipText: {
        fontSize: 14,
        color: '#D32F2F',
        fontWeight: '600',
    },
    header: {
        fontSize: 24,
        fontWeight: '600',
        color: '#333',
        marginBottom: 20,
        textAlign: 'center',
    },
    inputFirst: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 6,
        padding: 16,
        fontSize: 14,
        color: '#000',
        marginBottom: 15,
        paddingBottom: 60,
        backgroundColor: '#fafafaff',
        textAlignVertical: 'top',
        paddingLeft: 10,
        marginTop: 20,
    },
    input: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 6,
        padding: 16,
        fontSize: 14,
        color: '#000',
        marginBottom: 15,
        backgroundColor: '#fafafaff',
        paddingLeft: 10,
    },
    termsText: {
        fontSize: 12,
        color: '#333',
        marginBottom: 20,
    },
    checkBox: {
        color: '#D32F2F',
        fontSize: 14,
    },
    link: {
        color: '#D32F2F',
        fontWeight: '600',
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

export default AboutScreen;
