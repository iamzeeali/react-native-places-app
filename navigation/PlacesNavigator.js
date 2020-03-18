import * as React from "react";
import { Platform, Text, StyleSheet, TouchableOpacity } from "react-native";
import Colors from "../constants/Colors";
import { NavigationContainer, DrawerActions } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator, DrawerItem } from "@react-navigation/drawer";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../components/HeaderButton";
import { Ionicons } from "@expo/vector-icons";
import { navigationRef } from "../RootNavigation";
import * as RootNavigation from "../RootNavigation";
// Screens
import MapScreen from "../screens/MapScreen";
import NewPlaceScreen from "../screens/NewPlaceScreen";
import PlaceDetailScreen from "../screens/PlaceDetailScreen";
import PlacesListScreen from "../screens/PlacesListScreen";

const RootStack = createStackNavigator();
const RootStackScreen = () => (
  <RootStack.Navigator>
    <RootStack.Screen
      name="Places"
      component={PlacesListScreen}
      options={{
        title: "All Places",
        headerStyle: {
          backgroundColor: Platform.OS === "android" ? Colors.primary : ""
        },
        headerTintColor: Platform.OS === "android" ? "#ffffff" : Colors.primary,
        headerRight: () => (
          <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item
              title="cart"
              iconName={Platform.OS === "android" ? "md-add" : "ios-add"}
              onPress={() => RootNavigation.navigate("NewPlace")}
            />
          </HeaderButtons>
        )
      }}
    />
    <RootStack.Screen
      name="NewPlace"
      component={NewPlaceScreen}
      options={{
        title: "Add Places",
        headerStyle: {
          backgroundColor: Platform.OS === "android" ? Colors.primary : ""
        },
        headerTintColor: Platform.OS === "android" ? "#ffffff" : Colors.primary
      }}
    />
    <RootStack.Screen
      name="PlaceDetail"
      component={PlaceDetailScreen}
      options={({ route }) => ({
        title: route.params && route.params.placeTitle,
        headerStyle: {
          backgroundColor: Platform.OS === "android" ? Colors.primary : ""
        },
        headerTintColor: Platform.OS === "android" ? "#ffffff" : Colors.primary
      })}
    />
    <RootStack.Screen
      name="map"
      component={MapScreen}
      options={({ route }) => ({
        title: "Map",
        headerStyle: {
          backgroundColor: Platform.OS === "android" ? Colors.primary : ""
        },
        headerTintColor: Platform.OS === "android" ? "#ffffff" : Colors.primary,
        headerRight: () =>
          route.params && route.params.readOnly ? null : (
            <TouchableOpacity
              style={styles.headerButton}
              onPress={() => {
                route.params.saveLocation();
              }}
            >
              <Text style={styles.headerButtonText}>Save</Text>
            </TouchableOpacity>
          )
      })}
    />
  </RootStack.Navigator>
);

const styles = StyleSheet.create({
  headerButton: {
    marginHorizontal: 20
  },
  headerButtonText: {
    fontSize: 16,
    color: Platform.OS === "android" ? "white" : Colors.primary
  }
});

export default () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <RootStackScreen />
    </NavigationContainer>
  );
};
