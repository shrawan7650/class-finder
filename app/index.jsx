import React, { useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";
import UploadScreen from "./uploadScreen";

export default function Index() {
  const [selectedType, setSelectedType] = useState("");
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedBlock, setSelectedBlock] = useState("");
  const navigation = useNavigation(); // Hook for navigation

  const handleFindButtonPress = () => {
    console.log("Find button clicked");
    // Navigate to the RoomScreen with the selected data
    navigation.navigate("RoomScreen", {
      // type: selectedType,
      day: selectedDay,
      // time: selectedTime,
      block: selectedBlock,
    });
  };

  return (
    <View style={styles.container}>
      {/* Picker for Day */}
      <Text>Select Day</Text>
      <Picker
        selectedValue={selectedDay}
        onValueChange={(itemValue) => setSelectedDay(itemValue)}
        style={styles.picker}
      >
        {weekDays.map((item, index) => (
          <Picker.Item key={index} label={item.day} value={item.day} />
        ))}
      </Picker>

      {/* Picker for University Block */}
      <Text>Select University Block</Text>
      <Picker
        selectedValue={selectedBlock}
        onValueChange={(itemValue) => setSelectedBlock(itemValue)}
        style={styles.picker}
      >
        {universityBlockNo.map((item, index) => (
          <Picker.Item key={index} label={item.blockNo} value={item.blockNo} />
        ))}
      </Picker>

      {/* Find Button */}
      <TouchableOpacity style={styles.button} onPress={handleFindButtonPress}>
        <Text style={styles.buttonText}>Find</Text>
      </TouchableOpacity>

      {/* <TouchableOpacity style={styles.button} 
      onPress={() => navigation.navigate("UploadScreen")}
      >
        <Text style={styles.buttonText}>Upload</Text>
      </TouchableOpacity> */}
      {/* <UploadScreen/> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  picker: {
    width: "100%",
    height: 50,
    marginVertical: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  button: {
    marginTop: 20,
    marginBottom: 50,
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#007BFF",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

const universityBlockNo = [
  { id: 1, blockNo: "Select Block" },
  { id: 2, blockNo: "B4" },
  { id: 3, blockNo: "B2" },
  { id: 4, blockNo: "B3" },
];

const weekDays = [
  { day: "select Day" },
  { day: "Monday" },
  { day: "Tuesday" },
  { day: "Wednesday" },
  { day: "Thursday" },
  { day: "Friday" },
  { day: "Saturday" },
  { day: "Sunday" },
];
