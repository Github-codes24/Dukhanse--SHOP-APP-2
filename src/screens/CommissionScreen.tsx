import React from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
    FlatList,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
// import { useNavigation } from "@react-navigation/native";

const COMMISSIONS = [
    {
        date: "May 25, 2025",
        label: "Commission Paid",
        amount: "- ₹100",
    },
    {
        date: "May 25, 2025",
        label: "Commission Paid",
        amount: "- ₹100",
    },
    {
        date: "May 25, 2025",
        label: "Commission Paid",
        amount: "- ₹100",
    },
    {
        date: "May 25, 2025",
        label: "Commission Paid",
        amount: "- ₹100",
    },
    {
        date: "May 25, 2025",
        label: "Commission Paid",
        amount: "- ₹100",
    },
];

const CommissionScreen: React.FC = () => {
    // const navigation = useNavigation();

    const renderItem = ({ item }: { item: typeof COMMISSIONS[0] }) => (
        <View style={styles.row}>
            <MaterialIcons name="event" size={22} color="#E54C1E" style={{ marginRight: 9 }} />
            <Text style={styles.dateText}>{item.date}</Text>
            <Text style={styles.labelText}>{item.label}</Text>
            <View style={{ flex: 1, alignItems: "flex-end" }}>
                <Text style={styles.amountText}>{item.amount}</Text>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>

                <TouchableOpacity
                    // onPress={() => navigation.goBack()}
                    style={styles.backButton}
                    activeOpacity={0.7}
                >
                    <MaterialIcons name="arrow-back" size={24} color="#333" />
                </TouchableOpacity>

                <Text style={styles.headerText}>Commission</Text>
            </View>
            <FlatList
                data={COMMISSIONS}
                renderItem={renderItem}
                keyExtractor={(_, idx) => idx.toString()}
                style={{ flex: 1 }}
                contentContainerStyle={{ backgroundColor: "#fff" }}
                ItemSeparatorComponent={() => (
                    <View style={{ height: 1, backgroundColor: "#F1F1F1", marginLeft: 35 }} />
                )}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
};

export default CommissionScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        margin: 8,
        marginTop: 26
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
    header: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 8,
        backgroundColor: "#fff",
        paddingTop: 14,
        paddingBottom: 10,
        borderBottomWidth: 1.3,
        borderBottomColor: "#eee",
    },
    backBtn: {
        paddingRight: 8,
        paddingVertical: 1,
    },
    headerText: {
        flex: 1,
        textAlign: "center",
        fontSize: 20,
        fontWeight: "600",
        color: "#232323",
        marginRight: 34, // to balance back arrow
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 17,
        paddingLeft: 15,
        paddingRight: 15,
        backgroundColor: "#fff",
    },
    dateText: {
        fontSize: 15,
        color: "#222",
        minWidth: 110,
        fontWeight: "400",
        marginRight: 4,
    },
    labelText: {
        fontSize: 15,
        color: "#444",
        marginLeft: 2,
        fontWeight: "500",
        minWidth: 108,
    },
    amountText: {
        fontSize: 16,
        color: "#E53935",
        fontWeight: "600",
        marginLeft: 7,
    },
});
