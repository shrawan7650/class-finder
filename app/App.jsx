import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Index from "."; // Import your components correctly
import RoomScreen from "./RoomScreen";
import UploadScreen from "./uploadScreen";
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Index"
        screenOptions={{
          headerShadowVisible: true,
          headerStyle: {
            backgroundColor: "#f4511e",
          },
          headerTitleStyle: {
            color: "#fff",
          },
          headerBackTitleStyle: {
            color: "#fff",
          },
          headerTintColor: "#fff",
          headerTitleAlign: "center",
        }}
      >
        <Stack.Screen name="Index" component={Index} />
        <Stack.Screen
          name="RoomScreen"
          component={RoomScreen}
          options={{
            title: "Room Details",
            headerStyle: {
              backgroundColor: "#f4511e",
            },
            headerTitleStyle: {
              color: "#fff",
            },
            headerBackTitleStyle: {
              color: "#fff",
            },
            headerTintColor: "#fff",
            headerTitleAlign: "center",
          }}
        />
        {/* <Stack.Screen 
          name="UploadScreen" 
          component={UploadScreen} 
          // options={{
          //   title: 'Room Details',
          //   headerStyle: {
          //     backgroundColor: '#f4511e',
          //   },
          //   headerTitleStyle: {
          //     color: '#fff',
          //   },
          //   headerBackTitleStyle: {
          //     color: '#fff',
          //   },
          //   headerTintColor: '#fff',
          //   headerTitleAlign: 'center',
          // }}  
        /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
