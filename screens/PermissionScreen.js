import {
  View,
  Text,
  StyleSheet,
  Switch,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState } from "react";
import * as ExpoMediaLibrary from "expo-media-library";
import { Ionicons } from "@expo/vector-icons";
import {
  Camera,
  CameraPermissionStatus,
  useFrameProcessor,
} from "react-native-vision-camera";
import { useNavigation } from "@react-navigation/native";

const ICON_SIZE = 26;

const PermissionScreen = () => {
  const navigation = useNavigation();

  const [cameraPermissionStatus, setCameraPermissionStatus] =
    useState("not-determined");
  const [microphonePermissionStatus, setMicrophonePermissionStatus] =
    useState("not-determined");

  const [mediaLibraryPermission, requestMediaLibraryPermission] =
    ExpoMediaLibrary.usePermissions();

  const requestMicrophonePermission = async () => {
    const permissions = await Camera.requestMicrophonePermission();
    setMicrophonePermissionStatus(permissions);
  };

  const requestCameraPermission = async () => {
    const permission = await Camera.requestCameraPermission();
    setCameraPermissionStatus(permission);
  };

  const handleContinue = () => {
    if (
      cameraPermissionStatus === "granted" &&
      microphonePermissionStatus === "granted" &&
      mediaLibraryPermission?.granted
    ) {
      // Navigate to the next screen
      navigation.replace("Home");
    } else {
      Alert.alert("Please go to settings and enable all permissions");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Sports Performance AI needs access to a few permissions in order to work
        properly.
      </Text>
      <View style={styles.spacer} />
      <View style={styles.row}>
        <Ionicons
          name="lock-closed-outline"
          color={"orange"}
          size={ICON_SIZE}
        />
        <Text style={styles.footnote}>Required</Text>
      </View>

      <View style={styles.spacer} />

      <View style={StyleSheet.compose(styles.row, styles.permissionContainer)}>
        <Ionicons name="camera-outline" color={"gray"} size={ICON_SIZE} />
        <View style={styles.permissionContainer}>
          <Text styles={styles.subtitle}>Camera</Text>
          <Text styles={styles.permissionText}>
            Used for recording workout sessions
          </Text>
        </View>
        <Switch
          trackColor={{ true: "orange" }}
          value={cameraPermissionStatus === "granted"}
          onChange={requestCameraPermission}
        ></Switch>
      </View>

      <View style={styles.spacer} />

      <View style={StyleSheet.compose(styles.row, styles.permissionContainer)}>
        <Ionicons name="mic-circle-outline" color={"gray"} size={ICON_SIZE} />
        <View style={styles.permissionContainer}>
          <Text styles={styles.subtitle}>Microphone</Text>
          <Text styles={styles.permissionText}>Used for recording video.</Text>
        </View>
        <Switch
          trackColor={{ true: "orange" }}
          value={cameraPermissionStatus === "granted"}
          onChange={requestMicrophonePermission}
        ></Switch>
      </View>

      <View style={styles.spacer} />

      <View style={StyleSheet.compose(styles.row, styles.permissionContainer)}>
        <Ionicons name="library-outline" color={"gray"} size={ICON_SIZE} />
        <View style={styles.permissionContainer}>
          <Text styles={styles.subtitle}>Library</Text>
          <Text styles={styles.permissionText}>
            Used for saving, viewing and more.
          </Text>
        </View>
        <Switch
          trackColor={{ true: "orange" }}
          value={cameraPermissionStatus === "granted"}
          onChange={async () => await requestMediaLibraryPermission()}
        ></Switch>
      </View>

      <View style={styles.spacer} />
      <View style={styles.spacer} />
      <View style={styles.spacer} />

      <TouchableOpacity
        style={StyleSheet.compose(styles.row, styles.continueButton)}
        onPress={handleContinue}
      >
        <Ionicons
          name="arrow-forward-outline"
          size={ICON_SIZE}
          color={"blue"}
        />
      </TouchableOpacity>
    </View>
  );
};

export default PermissionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  subtitle: {
    textAlign: "center",
    fontWeight: "bold",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  footnote: {
    fontSize: 12,
    fontWeight: "bold",
    letterSpacing: 2,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  spacer: {
    marginVertical: 8,
  },
  permissionContainer: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    justifyContent: "space-between",
  },
  permissionText: {
    marginLeft: 10,
    flexShrink: 1,
  },
  continueButton: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 50,
    alignSelf: "center",
    borderWidth: 2,
  },
});
