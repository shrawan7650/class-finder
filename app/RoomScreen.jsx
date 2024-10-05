import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { useRoute } from "@react-navigation/native";

const vacantRooms = [
  {
    block: "B3",

    schedule: [
      {
        day: "Monday",
        vacantTimes: [
          "9:30AM-10:20AM",
          "11:10AM-12:00PM",
          "1:50PM-2:40PM",
          "2:40PM-3:30PM",
          "3:30PM-4:20PM",
        ],
        roomNo: "109",
      },
      {
        day: "Tuesday",
        vacantTimes: [
          "9:30AM-10:20AM",
          "10:20AM-11:10AM",
          "11:10AM-12:00PM",
          "1:30PM-2:20PM",
          "2:20PM-3:10PM",
          "3:10PM-4:00PM",
        ],
        roomNo: "109",
      },
      {
        day: "Wednesday",
        vacantTimes: [
          "9:30AM-10:20AM",
          "11:30AM-12:20PM",
          "1:30PM-2:20PM",
          "3:30PM-4:20PM",
        ],
        roomNo: "109",
      },
      {
        day: "Thursday",
        vacantTimes: ["9:30AM-10:20AM", "2:30PM-3:20PM", "3:20PM-4:10PM"],
      },
      {
        day: "Friday",
        vacantTimes: [
          "9:30AM-10:20AM",
          "11:30AM-12:20PM",
          "2:30PM-3:20PM",
          "3:20PM-4:10PM",
        ],
        roomNo: "109",
      },
    ],
  },
  {
    block: "B3",
    schedule: [
      {
        day: "Monday",
        vacantTimes: ["9:30AM-10:20AM", "1:30PM-2:20PM", "3:30PM-4:20PM"],
        roomNo: "108",
      },
      {
        day: "Tuesday",
        vacantTimes: ["11:30AM-12:20PM", "2:30PM-3:20PM"],
        roomNo: "108",
      },
      {
        day: "Wednesday",
        vacantTimes: ["9:30AM-10:20AM", "11:30AM-12:20PM", "3:30PM-4:20PM"],
        roomNo: "108",
      },
      {
        day: "Thursday",
        vacantTimes: ["10:30AM-11:20AM", "1:30PM-2:20PM"],
        roomNo: "108",
      },
      {
        day: "Friday",
        vacantTimes: [
          "9:30AM-10:20AM",
          "10:20AM-11:10AM",
          "11:10AM-12:00PM",
          "1:30PM-2:20PM",
          "2:20PM-3:10PM",
          "3:10PM-4:00PM",
        ],
        roomNo: "108",
      },
    ],
  },
  {
    block: "B3",
    schedule: [
      {
        day: "Monday",
        vacantTimes: ["11:30AM-12:20PM", "2:30PM-3:20PM", "3:20PM-4:10PM"],
        roomNo: "107",
      },
      {
        day: "Tuesday",
        vacantTimes: ["9:30AM-10:20AM", "3:30PM-4:20PM"],
        roomNo: "107",
      },
      {
        day: "Wednesday",
        vacantTimes: ["9:30AM-10:20AM", "10:20AM-11:10AM", "2:30PM-3:20PM"],
        roomNo: "107",
      },
      {
        day: "Thursday",
        vacantTimes: ["10:30AM-11:20AM", "3:30PM-4:20PM"],
        roomNo: "107",
      },
      {
        day: "Friday",
        vacantTimes: ["10:30AM-11:20AM", "1:30PM-2:20PM"],
        roomNo: "107",
      },
    ],
  },

  {
    block: "B4",
    schedule: [
      {
        day: "Monday",
        vacantTimes: ["9:30AM-10:20AM", "11:30AM-12:20PM", "2:30PM-3:20PM"],
        roomNo: "106",
      },
      {
        day: "Tuesday",
        vacantTimes: ["9:30AM-10:20AM", "3:30PM-4:20PM"],
        roomNo: "106",
      },
      {
        day: "Wednesday",
        vacantTimes: ["9:30AM-10:20AM", "10:20AM-11:10AM", "2:30PM-3:20PM"],
        roomNo: "106",
      },
      {
        day: "Thursday",
        vacantTimes: ["9:30AM-10:20AM", "10:20AM-11:10AM", "2:30PM-3:20PM"],
        roomNo: "106",
      },
      {
        day: "Friday",
        vacantTimes: ["10:30AM-11:20AM", "1:30PM-2:20PM"],
        roomNo: "106",
      },
    ],
  },
];

export default function RoomScreen() {
  const route = useRoute(); // Use the hook to get route
  const { day, block } = route.params || {};
console.log("day",day);
console.log("block",block)

  // Filter rooms by block and day
  const filteredRooms = vacantRooms
    .filter((room) => room.block === block) // Filter by block
    .flatMap(
      (room) =>
        room.schedule
          .filter((schedule) => schedule.day === day) // Filter by day
          .map((schedule) => ({
            roomNo: schedule.roomNo,
            vacantTimes: schedule.vacantTimes,
          })) // Map to room details
    );

    return (
      <View style={styles.container}>
        <Text style={styles.title}>Room Details</Text>
        <Text style={styles.infoText}>Block: {block || "N/A"}</Text>
        <Text style={styles.infoText}>Day: {day || "N/A"}</Text>
  
        {filteredRooms.length > 0 ? (
          <FlatList
            data={filteredRooms}
            keyExtractor={(item, index) => `${item.roomNo}-${index}`}
            renderItem={({ item }) => (
              <View style={styles.roomCard}>
                <Text style={styles.roomTitle}>Room No: {item.roomNo}</Text>
                <Text style={styles.vacantTimesTitle}>Vacant Times:</Text>
                {item.vacantTimes.map((time, index) => (
                  <Text key={index} style={styles.timeText}>
                    {time}
                  </Text>
                ))}
              </View>
            )}
          />
        ) : (
          <Text style={styles.noRoomsText}>
            No vacant rooms found for the selected block and day.
          </Text>
        )}
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: "#f8f9fa",
    },
    title: {
      fontSize: 26,
      fontWeight: "bold",
      marginBottom: 15,
      color: "#333",
    },
    infoText: {
      fontSize: 16,
      color: "#666",
      marginBottom: 5,
    },
    roomCard: {
      marginBottom: 15,
      padding: 15,
      backgroundColor: "#ffffff",
      borderColor: "#e0e0e0",
      borderWidth: 1,
      borderRadius: 8,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    roomTitle: {
      fontSize: 20,
      fontWeight: "bold",
      color: "#007bff",
      marginBottom: 5,
    },
    vacantTimesTitle: {
      fontSize: 16,
      fontWeight: "600",
      marginTop: 5,
      color: "#444",
    },
    timeText: {
      fontSize: 14,
      color: "#555",
      marginVertical: 2,
    },
    noRoomsText: {
      fontSize: 16,
      color: "red",
      marginTop: 20,
      textAlign: "center",
    },
  });
  