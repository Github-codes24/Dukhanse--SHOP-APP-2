import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    FlatList,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

type ComplaintItem = {
    title: string;
    description: string;
    date: string;
    status: 'Ongoing' | 'Solved';
};

const complaints: ComplaintItem[] = [
    {
        title: 'Payment Related Issues',
        description:
            'Lorem ipsum dolor sit amet consectetur. Facilisis faucibus eget in maecenas id duis. Tempor leo porttitor aliquet mattis.',
        date: 'Mon, 25 Nov, 2024 at 09:33 PM',
        status: 'Ongoing',
    },
    {
        title: 'Payment Related Issues',
        description:
            'Lorem ipsum dolor sit amet consectetur. Aliquam aliquam senectus quam tellus mauris convallis proin. Interdum scelerisque fringilla facilisis semper amet.',
        date: 'Mon, 25 Nov, 2024 at 09:33 PM',
        status: 'Solved',
    },
];

const FeedbackComplaintsScreen: React.FC<{ navigation?: any }> = ({ navigation }) => (
    <View style={styles.container}>
        <View style={styles.headerRow}>
            <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={styles.backButton}
                // activeOpacity={0.7}
            >
                <MaterialIcons name="arrow-back" size={24} color="#333" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Feedback & Complaints</Text>
        </View>

        <FlatList
            data={complaints}
            keyExtractor={(_, i) => i.toString()}
            renderItem={({ item }) => (
                <View style={styles.complaintCard}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text style={styles.cardTitle}>{item.title}</Text>
                        <Text
                            style={[
                                styles.statusText,
                                item.status === 'Ongoing' ? styles.ongoing : styles.solved
                            ]}
                        >
                            {item.status}
                        </Text>
                    </View>
                    <Text style={styles.cardDesc}>{item.description}</Text>
                    <Text style={styles.cardDate}>{item.date}</Text>
                </View>
            )}
            contentContainerStyle={styles.listContainer}
        />

        <View style={styles.bottomBar}>
            <TouchableOpacity style={styles.button} activeOpacity={1} onPress={()=>navigation.navigate("RaiseComplaintScreen")} >
                <Text style={styles.buttonText}>Raise Complaint or Send Feedback</Text>
            </TouchableOpacity>
        </View>
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        // margin:8,
        marginTop:16
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
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 26,
        paddingBottom: 16,
        backgroundColor: '#fff',
    },
    headerTitle: {
        flex: 1,
        fontSize: 22,
        fontWeight: '600',
        color: '#232323',
        textAlign: 'center',
        // marginLeft: 8,
    },
    listContainer: {
        paddingBottom: 100,
        paddingHorizontal: 14,
    },
    complaintCard: {
        backgroundColor: '#Fff',
        borderRadius: 14,
        paddingVertical:8,
        paddingHorizontal: 12,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#EEE',
        elevation: 1,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: '500',
        color: '#222',
        marginBottom: 3,
    },
    statusText: {
        fontSize: 13,
        fontWeight: '400',
        marginBottom: 7,
    },
    ongoing: {
        color: '#FFD700',
    },
    solved: {
        color: '#29bf12',
    },
    cardDesc: {
        fontSize: 15.2,
        color: '#888',
        marginBottom: 7,
        lineHeight: 22,
    },
    cardDate: {
        fontSize: 14,
        color: '#A1A1A1',
        marginBottom: 6,
    },
    bottomBar: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: '#fff',
        padding: 18,
        borderTopWidth: 0.5,
        borderColor: '#EEE'
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
        fontSize: 15.5,
        fontWeight: '600',
        textAlign: 'center',
    },
});

export default FeedbackComplaintsScreen;
