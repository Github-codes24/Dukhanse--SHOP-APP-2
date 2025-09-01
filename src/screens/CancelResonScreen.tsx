import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    SafeAreaView,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Pressable,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const CANCEL_REASONS = [
    "Lorem ipsum dolor sit amet consectetur. Duis.",
    "Lorem ipsum dolor sit amet consectetur.",
    "Lorem ipsum dolor sit amet consectetur.",
    "Other",
];

const CancelReasonScreen: React.FC = () => {
    const [selectedReason, setSelectedReason] = useState<number>(0); // index in CANCEL_REASONS
    const [otherReason, setOtherReason] = useState<string>("");
    const [tncAccepted, setTncAccepted] = useState<boolean>(false);

    // Determine if submit should be enabled
    const isOtherSelected = CANCEL_REASONS[selectedReason] === "Other";
    const canSubmit =
        tncAccepted &&
        ((isOtherSelected && otherReason.trim().length > 0) ||
            (!isOtherSelected && selectedReason !== null));

    return (
        <View style={{ flex: 1, backgroundColor: "#fff" }}>
            <ScrollView
                style={{ flex: 1, backgroundColor: "#fff" }}
                contentContainerStyle={{ flexGrow: 1 }}
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
                    <Text style={styles.headerTitle}>Choose Language</Text>
                </View>

                {/* Main Content */}
                <View style={{ paddingHorizontal: 14, flex: 1 }}>
                    <Text style={styles.subtitle}>
                        Please select the reason for cancellation:
                    </Text>

                    {/* Reason Radio Buttons */}
                    <View>
                        {CANCEL_REASONS.map((reason, idx) => (
                            <Pressable
                                key={idx}
                                onPress={() => setSelectedReason(idx)}
                                style={styles.reasonItem}
                            >
                                <View style={styles.radioCircle}>
                                    {selectedReason === idx && <View style={styles.radioSelected} />}
                                </View>
                                <Text style={styles.reasonText}>{reason}</Text>
                            </Pressable>
                        ))}
                    </View>

                    {/* "If Other" Area */}
                    <View style={{ marginTop: 6 }}>
                        <Text style={[styles.othLabel,{marginBottom:8}]}>If Other</Text>
                        <TextInput
                            style={[
                                styles.textArea,
                                { backgroundColor: isOtherSelected ? "#fff" : "#F3F3F7" },
                            ]}
                            placeholder="Please write a reason"
                            value={otherReason}
                            onChangeText={setOtherReason}
                            editable={isOtherSelected}
                            multiline
                            numberOfLines={3}
                            placeholderTextColor="#BDBDBD"
                        />
                    </View>

                    {/* T&C Checkbox */}
                    <TouchableOpacity
                        style={styles.tncRow}
                        onPress={() => setTncAccepted(!tncAccepted)}
                        activeOpacity={0.7}
                    >
                        <View style={styles.checkboxBase}>
                            {tncAccepted && (
                                <MaterialIcons name="check-box" size={22} color="#05AA48" />
                            )}
                            {!tncAccepted && (
                                <MaterialIcons name="check-box-outline-blank" size={22} color="#c5c5c5" />
                            )}
                        </View>
                        <Text style={styles.tncText}>
                            <Text style={{ color: "#2196F3", textDecorationLine: "underline" }}>
                                Accept Cancellation T&C
                            </Text>
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* Submit Button */}
                <View style={{ padding: 16, backgroundColor: "#fff" }}>
                    <TouchableOpacity
                        style={[
                            styles.submitBtn,
                            { opacity: canSubmit ? 1 : 0.5 },
                        ]}
                        disabled={!canSubmit}
                        onPress={() => {
                            // Do submit
                        }}
                    >
                        <Text style={styles.submitText}>Submit</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
};

export default CancelReasonScreen;

const styles = StyleSheet.create({
    subtitle: {
        fontSize: 15,
        fontWeight: "600",
        marginBottom: 16,
        marginTop:9,
        color: "#222",
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
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },
    headerTitle: { fontSize: 18, fontWeight: "700", marginLeft: 12 },

    reasonItem: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 9,
    },
    radioCircle: {
        height: 20, width: 20, borderRadius: 10,
        borderWidth: 2, borderColor: "#9E9E9E",
        alignItems: "center", justifyContent: "center",
        marginRight: 12,
    },
    radioSelected: {
        width: 10, height: 10, borderRadius: 5, backgroundColor: "#EE3A23",
    },
    reasonText: {
        fontSize: 14.2,
        color: "#333",
        flexShrink: 1
    },
    othLabel: {
        fontSize: 12.5, color: "#000", marginBottom: 2, marginTop: 7,
    },
    textArea: {
        borderWidth: 1.1, borderColor: "#DEDEDE", borderRadius: 7,
        fontSize: 14,
        minHeight: 88,
        textAlignVertical: "top",
        padding: 9,
        marginBottom: 7,
        color: "#222"
    },
    tncRow: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 5,
        marginBottom: 15,
    },
    checkboxBase: {
        width: 22, height: 22,
        marginRight: 7,
        justifyContent: "center", alignItems: "center",
    },
    tncText: { fontSize: 14.7, color: "#333" },
    submitBtn: {
        height: 48,
        backgroundColor: "#FFD700",
        borderRadius: 9,
        alignItems: "center",
        justifyContent: "center",
        width: "100%"
    },
    submitText: {
        fontWeight: "bold", fontSize: 17, color: "#222"
    },
});
