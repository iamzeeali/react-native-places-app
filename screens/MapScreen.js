import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet, Text, View } from "react-native";
import MapView, { Marker } from "react-native-maps";

const MapScreen = props => {
  const initialLocation = props.route.params
    ? props.route.params.initialLocation
    : null;
  const readOnly = props.route.params ? props.route.params.readOnly : false;

  const [selectedLocation, setSelectedLocation] = useState(initialLocation);
  const mapRegion = {
    latitude: initialLocation ? initialLocation.lat : 22.8409788,
    longitude: initialLocation ? initialLocation.lng : 86.2064931,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
  };

  const selectLocationaHandler = e => {
    if (readOnly) {
      return;
    }
    setSelectedLocation({
      lat: e.nativeEvent.coordinate.latitude,
      lng: e.nativeEvent.coordinate.longitude
    });
  };

  const savePickedLocationHandler = useCallback(() => {
    if (!selectedLocation) {
      return;
    }
    props.navigation.navigate("NewPlace", { pickedLocation: selectedLocation });
  }, [selectedLocation]);

  useEffect(() => {
    props.navigation.navigate("map", {
      saveLocation: savePickedLocationHandler
    });
  }, [savePickedLocationHandler]);

  let markerCoordinates;
  if (selectedLocation) {
    markerCoordinates = {
      latitude: 22.8409788,
      longitude: 86.2064931
    };
  }
  return (
    <MapView
      style={styles.map}
      region={mapRegion}
      onPress={selectLocationaHandler}
    >
      {markerCoordinates && (
        <Marker title="picked location" coordinate={markerCoordinates}></Marker>
      )}
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    flex: 1
  }
});

export default MapScreen;
