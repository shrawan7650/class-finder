import React, { useState } from 'react';
import { View, Button, Image, Text, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import axios from 'axios';
const UploadScreen = () => {
  const [imageUri, setImageUri] = useState(null);
  const [fileType, setFileType] = useState(null); // to store if it's image or pdf

  // Pick an image or PDF
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });
    console.log(result.assets[0].uri)

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
      const fileExtension = result.assets[0].split('.').pop();
      console.log("fileExtension",fileExtension)
      setFileType(fileExtension); // Set file type based on extension
    }
  };

  // Handle Upload to backend
  const handleUpload = async () => {
    if (imageUri) {
      // console.log("imageUri",imageUri)
      try {
        const base64File = await convertToBase64(imageUri);
        // console.log('Base64 file: ', base64File);
        // Sending file to backend
        const response = await uploadToBackend(base64File, fileType);
        console.log("response",response);
        // Alert.alert('Success', 'File uploaded successfully');
      } catch (error) {
        Alert.alert('Error', 'Failed to upload file');
        console.error('Upload error: ', error);
      }
    }
  };

  // Convert Image or PDF URI to Base64
  const convertToBase64 = async (uri) => {
    try {
      const base64 = await FileSystem.readAsStringAsync(uri, { encoding: FileSystem.EncodingType.Base64 });
      return base64;
    } catch (error) {
      console.error('Conversion to base64 failed: ', error);
    }
  };



  const uploadToBackend = async (base64File, fileType) => {
    const formData = new FormData();
    formData.append('file', `data:${fileType};base64,${base64File}`);
  
    try {
      const response = await axios.post('http://192.168.143.202:5000/api/schedule/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log("uploadToBackendResponse",response)
  
      if (response.status === 200) {
        console.log('File uploaded: ', response.data);
      } else {
        console.error('Upload failed: ', response.data.message);
      }
    } catch (error) {
      console.error('Error uploading to backend: ', error.message);
    }
  };
  

  return (
    <View>
      <Button title="Pick an image or PDF" onPress={pickImage} />
      {imageUri && (
        <>
          {fileType === 'pdf' ? (
            <Text>PDF selected: {imageUri}</Text>
          ) : (
            <Image source={{ uri: imageUri }} style={{ width: 200, height: 200 }} />
          )}
        </>
      )}
      <Button title="Upload and Process" onPress={handleUpload} disabled={!imageUri} />
    </View>
  );
};

export default UploadScreen;
