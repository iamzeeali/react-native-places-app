import React from "react";
import { Image, StyleSheet, TouchableOpacity } from "react-native";
import ENV from "../env";

const MapPreview = props => {
  let imagePreviewUrl;
  if (props.location) {
    imagePreviewUrl = `https://api.mapbox.com/v4/mapbox.emerald/pin-m-a+e3240f(${props.location.lng},${props.location.lat})/${props.location.lng},${props.location.lat},13/400x300@2x.png?access_token=${ENV.mapboxKey}
    `;
  }
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={{ ...styles.mapPreview, ...props.style }}
    >
      {props.location ? (
        <Image style={styles.mapImage} source={{ uri: imagePreviewUrl }} />
      ) : (
        props.children
      )}
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  mapPreview: {
    justifyContent: "center",
    alignItems: "center"
  },
  mapImage: {
    width: "100%",
    height: "100%"
  }
});

export default MapPreview;
