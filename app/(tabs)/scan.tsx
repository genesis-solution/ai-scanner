import { useEffect, useLayoutEffect, useState } from "react";
import { Alert, Linking, SafeAreaView, StyleSheet, View } from "react-native";
import { Camera } from "expo-camera";
import { router, usePathname } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import CameraScanner from "@/components/CameraScanner";
import ManualInput from "@/components/ManualInput";
import scanLogger from "@/utils/scanLogger";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useTranslation } from "react-i18next";

export default function ScanScreen() {
  const [hasPermission, setHasPermission] = useState<null | boolean>(null);
  const borderColor = useThemeColor({}, "text");
  const { t } = useTranslation();
  const backgroundColor = useThemeColor({}, "background");
  const pathname = usePathname();

  useLayoutEffect(() => {
    console.log(pathname);
    if (pathname !== "/scan") return;
    const checkCameraPermission = async () => {
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

    checkCameraPermission();
  }, [pathname]);

  const handleBarcodeScanned = async ({
    type,
    data,
  }: {
    type: string;
    data: string;
  }) => {
    try {
      router.push(`/result?type=${type}&data=${data}`);
    } catch (error) {
      scanLogger.error(
        `Barcode Scan Error: ${
          (error as Error).message || "An unexpected error"
        }`
      );
    }
  };

  if (hasPermission === null) {
    return <ThemedText>{t("requestingCameraPermission")}</ThemedText>;
  }
  if (hasPermission === false) {
    return <ThemedText>{t("noCameraAccess")}</ThemedText>;
  }

  const styles = StyleSheet.create({
    image: {
      flex: 1,
      justifyContent: "center",
    },
    container: {
      flex: 1,
      flexDirection: "column",
      justifyContent: "space-between",
      gap: 16,
      paddingHorizontal: 8,
      backgroundColor: backgroundColor,
    },
    titleContainer: {
      paddingTop: 64,
      paddingHorizontal: 12,
      paddingBottom: 6,
      marginHorizontal: 12,
      flexDirection: "row",
      alignItems: "center",
      borderColor: borderColor,
      borderBottomWidth: 2,
    },
    barcodeContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      gap: 12,
    },
    cameraContainer: {
      position: "absolute",
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
    },
    scanBtnContainer: {
      justifyContent: "center",
      alignItems: "center",
      height: 128,
      marginBottom: 8,
    },
    reactLogo: {
      height: 178,
      width: 290,
      bottom: 0,
      left: 0,
      position: "absolute",
    },
    animation: {
      width: 300,
      height: 300,
      alignSelf: "center",
    },
    splashIcon: {
      width: 200,
      height: 200,
      alignSelf: "center",
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleContainer}>
        <ThemedText type="title">{t("foodBugScanner")}</ThemedText>
      </View>
      <View style={styles.barcodeContainer}>
        <View style={styles.cameraContainer}>
          <CameraScanner handleBarcodeScanned={handleBarcodeScanned} />
        </View>
      </View>
      <View style={styles.scanBtnContainer}>
        <ManualInput />
      </View>
    </SafeAreaView>
  );
}
