import scanLogger from "@/utils/scanLogger";
import { Camera } from "expo-camera";
import { router } from "expo-router";
import { useState, useRef } from "react";
import { Alert, Linking } from "react-native";

export default function useCameraPermission() {
  const [hasPermission, setHasPermission] = useState<null | boolean>(null);
  const isRequestingPermission = useRef(false);

  const checkCameraPermission = async () => {
    // Prevent multiple simultaneous permission requests
    if (isRequestingPermission.current) {
      scanLogger.log(
        "Permission check already in progress, skipping duplicate request"
      );
      return;
    }

    try {
      isRequestingPermission.current = true;

      const { status, canAskAgain, granted } =
        await Camera.getCameraPermissionsAsync();
      scanLogger.log(`camera permission: ${status} ${canAskAgain} ${granted}`);
      setHasPermission(granted);

      if (status === "granted") {
        // Permission granted, proceed with scanning
        scanLogger.log("Camera permission granted.");
      } else if (
        status === "undetermined" ||
        (status === "denied" && canAskAgain)
      ) {
        // Permission denied, but can re-prompt
        setHasPermission(null);
        const { status: newStatus, granted: newGranted } =
          await Camera.requestCameraPermissionsAsync();
        setHasPermission(newGranted);
        if (newStatus !== "granted") {
          showPermissionDeniedAlert();
        }
      } else {
        // Permission permanently denied or canAskAgain is false
        showSettingsAlert();
      }
    } finally {
      // Reset flag when permission check is done
      isRequestingPermission.current = false;
    }
  };

  const showPermissionDeniedAlert = () => {
    Alert.alert(
      "Camera Permission Required",
      "Please grant camera permission to use this feature.",
      [
        {
          text: "OK",
          onPress: () => router.push("/"),
        },
      ]
    );
  };

  const showSettingsAlert = () => {
    Alert.alert(
      "Permission Denied",
      "Camera permission has been permanently denied. To enable it, go to your device settings.",
      [
        {
          text: "Cancel",
          style: "cancel",
          onPress: () => router.push("/"),
        },
        {
          text: "Go to Settings",
          onPress: () => {
            Linking.openSettings(); // Open app settings
            router.push("/");
          },
        },
      ]
    );
  };

  return {
    hasPermission,
    checkCameraPermission,
  };
}
