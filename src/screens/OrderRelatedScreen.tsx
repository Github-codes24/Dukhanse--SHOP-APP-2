import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    SafeAreaView,
    TextInput,
    FlatList,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from "@react-navigation/native";

type QuestionItem = {
    question: string;
    answer: string;
};

const FAQ_DATA: QuestionItem[] = [
    {
        question: 'How will I know when a new order is placed?',
        answer: 'You will receive a notification in the app as soon as a new order is placed.',
    },
    {
        question: 'Can I accept or reject an order?',
        answer: 'Yes, you can accept or reject orders from the order details screen.',
    },
    {
        question: 'Who handles the delivery?',
        answer: 'Delivery is managed by our delivery partners and you will be notified of pickup.',
    },
    {
        question: 'What if my order is delayed or not delivered?',
        answer: 'You can contact support from the help section or track your order status in real-time.',
    },
];

const OrderRelatedScreen: React.FC<{ navigation?: any }> = ({  }) => {
     const navigation = useNavigation()
    const [search, setSearch] = useState('');
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

    const filteredData = FAQ_DATA.filter(item =>
        item.question.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <View style={styles.safeArea}>
            <View style={styles.headerRow}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={styles.backButton}
                    activeOpacity={0.7}
                >
                    <MaterialIcons name="arrow-back" size={24} color="#333" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Order Related</Text>
            </View>

            <View style={styles.searchContainer}>
                <MaterialIcons name="search" size={22} color="#7B7B7B" style={styles.searchIcon} />
                <TextInput
                    placeholder="Search for your questions..."
                    placeholderTextColor="#A1A1A1"
                    value={search}
                    onChangeText={setSearch}
                    style={styles.searchInput}
                />
            </View>

            <FlatList
                data={filteredData}
                keyExtractor={(_, i) => i.toString()}
                renderItem={({ item, index }) => (
                    <View style={styles.questionBox}>
                        <TouchableOpacity
                            style={styles.questionRow}
                            onPress={() => setExpandedIndex(expandedIndex === index ? null : index)}
                            activeOpacity={0.7}
                        >
                            <Text style={styles.questionText}>{item.question}</Text>
                            <MaterialIcons
                                name={expandedIndex === index ? 'expand-less' : 'expand-more'}
                                size={20}
                                color="#232323"
                            />
                        </TouchableOpacity>
                        {expandedIndex === index && (
                            <View style={styles.answerBox}>
                                <Text style={styles.answerText}>{item.answer}</Text>
                            </View>
                        )}
                    </View>
                )}
                contentContainerStyle={styles.listContainer}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#fff',
        marginTop: 28,
        margin:0
    },
    backButton: {
        height: 40,
        width: 40,
        borderRadius: 20, // circle
        borderWidth: 1,
        borderColor: "#000",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff", 
        marginLeft:16
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 22,
        paddingBottom: 15,
        borderBottomWidth: 0.5,
        borderColor: '#D3D3D3',
        backgroundColor: '#fff',
    },
    backBtn: {
        marginLeft: 6,
        padding: 8,
        borderRadius: 20,
    },
    headerTitle: {
        flex: 1,
        fontSize: 20,
        fontWeight: '600',
        color: '#232323',
        textAlign: 'center',
        marginRight: 36,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 7,
        borderWidth: 1,
        borderColor: '#DEDEDE',
        marginHorizontal: 16,
        marginTop: 22,
        backgroundColor: '#fff',
        paddingHorizontal: 10,
    },
    searchIcon: {
        marginRight: 7,
    },
    searchInput: {
        flex: 1,
        fontSize: 15,
        color: '#232323',
        paddingVertical: 9,
        paddingRight: 8,
    },
    listContainer: {
        paddingHorizontal: 0,
        marginTop: 16,
    },
    questionBox: {
        marginHorizontal: 16,
        marginBottom: 12,
    },
    questionRow: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F6F6F6',
        borderRadius: 7,
        paddingVertical: 12,
         paddingHorizontal: 12,
        justifyContent: 'space-between',
    },
    questionText: {
        fontSize: 15,
        flex: 1,
        color: '#232323',
    },
    answerBox: {
        backgroundColor: '#EFEFEF',
        borderRadius: 7,
        marginTop: 7,
        padding: 12,
    },
    answerText: {
        color: '#444',
        fontSize: 14,
    },
});

export default OrderRelatedScreen;
