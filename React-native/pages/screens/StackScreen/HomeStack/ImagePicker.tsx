import React, { useState } from "react";
import { Button, Image, StyleSheet, Text, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { API_URL } from "@env";
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { IRootState } from "../../../../store/store";


export default function ImagePickerExample({ props, navigation }: any) {
  const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const userId = useSelector((state: IRootState) => state.auth.userId);
  console.log("ImagePicker userId: ", userId);

  const openImagePickerAsync = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    const pickerResult: any = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });

    if (pickerResult.canceled === true) {
      return;
    }

    setSelectedImage(pickerResult.uri);

    const formData = new FormData();
    // @ts-ignore
    formData.append("image", {
      uri: pickerResult.uri,
      name: "photo.jpg",
      type: "image/jpeg",

    });

    if (userId !== null && userId !== undefined) {
      formData.append('userId', userId.toString());
    }

    console.log(formData);


    try {
      setIsLoading(true)
      const url = API_URL + "/summaryImage"
      const response = await fetch(url, {
        method: "POST",
        body: formData,
      });

      const result = await response.json()
      navigation.navigate('Summaries', { response: result, imagesUri: pickerResult.uri });

      console.log("Image uploaded successfully:", result);

      setIsLoading(false)
    } catch (error) {
      console.error("Error uploading image:", error);
      setIsLoading(false)

    }
  };


  return (
    <View style={styles.container}>
      {isLoading && <>
        <Image
          source={require('../../../../assets/loadingScreen.gif')}
          style={styles.gif}
        />
      </>}
      {/* {selectedImage && <Image source={{ uri: selectedImage }} style={styles.image} />} */}
      {!isLoading &&
        <Button title="Pick an image from camera roll" onPress={() => openImagePickerAsync()} />
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  gif: {
    width: 500,
    height: 500,
  },
});
