import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  StatusBar,
  requireNativeComponent,
} from "react-native";
import React from "react";
import { useState, useEffect } from "react";
import { auth } from "../firebaseConfig";
import { useNavigation } from "@react-navigation/native";

import {
  Camera,
  useCameraDevice,
  useCameraPermission,
  useFrameProcessor,
} from "react-native-vision-camera";
import {
  loadTensorflowModel,
  useTensorflowModel,
} from "react-native-fast-tflite";

const HomeScreen = () => {
  const navigation = useNavigation();

  const handleLogOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("Login");
      })
      .catch((error) => alert(error.message));
  };

  const { hasPermission } = useCameraPermission();
  const microphonePermission = Camera.getMicrophonePermissionStatus();
  const redirectToPermissions =
    !hasPermission || microphonePermission === "not-determined";

  const device = useCameraDevice("back");

  // Redirect to the Permissions screen if camera or microphone permissions are not granted
  useEffect(() => {
    console.log("redirectToPermissions: ", redirectToPermissions);
    if (redirectToPermissions) {
      navigation.replace("Permissions");
    }
  }, [redirectToPermissions]);

  const modelPath = require("../assets/yolo11n-pose_float32.tflite");

  const sensitivity = 0.8;
  const frameProcessor = useFrameProcessor((frame) => {
    "worklet";
    //console.log(`Frame: ${frame.width}x${frame.height} (${frame.pixelFormat})`);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 3, borderRadius: 10, overflow: "hidden" }}>
        <Camera
          style={{ flex: 1 }}
          device={device}
          isActive
          frameProcessor={frameProcessor}
        />
      </View>
      <View style={{ flex: 1 }}></View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS == "android" ? StatusBar.currentHeight : 0,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: "transparent",
    flexDirection: "row",
    margin: 20,
    justifyContent: "center",
    alignItems: "flex-end",
  },
  button: {
    flex: 0.1,
    alignSelf: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 5,
  },
  text: {
    fontSize: 18,
    color: "black",
  },
});
