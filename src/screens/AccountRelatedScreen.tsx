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

type QuestionItem = {
    question: string;
    answer: string;
};

const FAQ_DATA: QuestionItem[] = [
    {
        question: 'What documents are required for verification?',
        answer: 'You need to submit your business PAN, GST certificate, and other supporting documents as per requirements.',
    },
    {
        question: 'How can I update my shop details?',
        answer: 'Go to profile settings and select "Update Shop Details". Follow the on-screen instructions.',
    },
    {
        question: 'Can I change my email ID or phone number?',
        answer: 'Yes. Under "Account Settings", choose the field to change and follow the process to verify your new details.',
    },
    {
        question: 'I forgot my password. What should I do?',
        answer: 'Tap "Forgot Password" on the login screen and follow the instructions sent to your registered email/phone.',
    },
];

const AccountRelatedScreen: React.FC<{ navigation?: any }> = ({ navigation }) => {
    const [search, setSearch] = useState('');
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

    // Filter questions by search string
    const filteredData = FAQ_DATA.filter(item =>
        item.question.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <View style={styles.container}>
            <View style={styles.headerRow}>
                <TouchableOpacity
                    onPress={() => navigation && navigation.goBack()}
                    style={styles.backButton}
                    activeOpacity={0.7}
                >
                    <MaterialIcons name="arrow-back" size={24} color="#333" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Account & Profile</Text>
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
    container: {
        flex: 1,
        backgroundColor: '#fff',
        marginTop: 24,
        // margin:8
    },
    backButton: {
        height: 40,
        width: 40,
        borderRadius: 20,
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
        paddingBottom: 14,
        borderBottomWidth: 0.5,
        borderColor: '#E5E5E5',
        backgroundColor: '#fff',
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
        borderRadius: 8,
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

export default AccountRelatedScreen;
