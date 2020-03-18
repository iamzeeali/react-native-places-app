import React, { useState, useCallback } from "react";
import {
  StyleSheet,
  ScrollView,
  Button,
  Text,
  TextInput,
  View
} from "react-native";
import { useDispatch } from "react-redux";
import * as placesActions from "../store/places-action";
import Colors from "../constants/Colors";
import ImgPicker from "../components/ImgPicker";
import LocationPicker from "../components/LocationPicker";

const NewPlaceScreen = props => {
  const [title, setTitle] = useState("");
  const [selectedImage, setSelectedImage] = useState();
  const [selectedLocation, setSelectedLocation] = useState();

  const dispatch = useDispatch();

  const titleChangeHandler = text => {
    setTitle(text);
  };

  const imageTakenHandler = imagePath => {
    setSelectedImage(imagePath);
  };

  const savePlaceHandler = () => {
    console.log(title);
    dispatch(placesActions.addPlace(title, selectedImage, selectedLocation));
    props.navigation.goBack();
  };

  const locationPickedHandler = useCallback(
    location => {
      setSelectedLocation(location);
    },
    [setSelectedLocation]
  );

  return (
    <ScrollView>
      <View style={styles.form}>
        <Text style={styles.label}>Title </Text>
        <TextInput
          style={styles.textInput}
          onChangeText={text => titleChangeHandler(text)}
          value={title}
        />
        <ImgPicker onImageTaken={imageTakenHandler} />
        <LocationPicker
          navigation={props.navigation}
          route={props.route}
          onLocationPicked={locationPickedHandler}
        />
        <Button
          title="Save Place"
          color={Colors.primary}
          onPress={e => savePlaceHandler(e)}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  form: {
    margin: 30
  },
  label: {
    fontSize: 18,
    marginBottom: 15
  },
  textInput: {
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    marginBottom: 15,
    paddingVertical: 4,
    paddingHorizontal: 2
  }
});

export default NewPlaceScreen;
