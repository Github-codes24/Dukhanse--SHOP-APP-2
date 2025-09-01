import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation,NavigationProp } from '@react-navigation/native';

type ReferralItem = {
    name: string;
    date: string;
    amount: number;
};

type ReferralScreenProps = {
    navigation: {
        goBack: () => void;
    };
};

const referralData: ReferralItem[] = [
    { name: 'Courtney Henry', date: 'May 25, 2025', amount: 100 },
    { name: 'Eleanor Pena', date: 'May 25, 2025', amount: 100 },
    { name: 'Devon Lane', date: 'May 25, 2025', amount: 100 },
    { name: 'Theresa Webb', date: 'May 25, 2025', amount: 100 },
    { name: 'Darrell Steward', date: 'May 25, 2025', amount: 100 },
];

const ReferralScreen: React.FC<ReferralScreenProps> = ({ }) => {
    const navigation =useNavigation()
    const renderItem = ({ item }: { item: ReferralItem }) => (
        <View style={styles.itemRow}>
            <Icon name="calendar-today" size={20} color="#EA522A" />
            <Text style={styles.date}>{item.date}</Text>
            <Text style={styles.name}>{item.name}</Text>
            <View style={styles.coinRow}>
                <Icon name="monetization-on" size={18} color="#ffd700" />
                <Text style={styles.amount}>+ ₹{item.amount}</Text>
            </View>
        </View>
    );
    return (
        <View style={styles.container}>
            <View style={styles.headerRow}>
                <TouchableOpacity
                     onPress={() => navigation.goBack()}
                    style={styles.backButton}
                    activeOpacity={0.7}
                >
                    <Icon name="arrow-back" size={24} color="#333" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Referral Earn</Text>
            </View>
            <FlatList
                data={referralData}
                keyExtractor={(_, index) => index.toString()}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        // paddingHorizontal: 16,
        // marginTop: 40,
        padding:12,
        marginTop:28
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
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    headerTitle: {
        flex: 1,
        fontSize: 20,
        fontWeight: '600',
        textAlign: 'center',
    },
    itemRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 0.5,
        borderColor: '#ededed',
    },
    date: {
        marginLeft: 8,
        color: '#444',
        width: 110,
         fontSize:14,
        fontWeight:"400"
    },
    name: {
        marginLeft: 8,
        flex: 1,
        color: '#444',
        fontSize:14,
        fontWeight:"400"
    },
    coinRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    amount: {
        marginLeft: 4,
        color: '#16C636',
        fontWeight: '400',
        fontSize: 12
    },
});

export default ReferralScreen;
