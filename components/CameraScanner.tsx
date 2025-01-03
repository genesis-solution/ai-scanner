import { useState } from "react";
import { CameraView, FlashMode, FocusMode } from "expo-camera";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import scanLogger from "@/utils/scanLogger";
import { showAlert } from "@/utils/scanAlert";

type ICameraScannerProps = {
  handleBarcodeScanned: ({
    type,
    data,
  }: {
    type: string;
    data: string;
  }) => void;
};

export default function CameraScanner({
  handleBarcodeScanned,
}: ICameraScannerProps) {
  const [autoFocus, setAutoFocus] = useState<FocusMode>("off");
  const [flashMode, setFlashMode] = useState<FlashMode>("off");

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    cameraViewWrap: {
      flex: 1,
      position: "relative",
    },
    panelTop: {
      position: "absolute",
      top: 0,
      height: 50,
      left: 0,
      right: 0,
      backgroundColor: "rgba(0, 0, 0, 0.4)",
      flexDirection: "row",
      justifyContent: "flex-end",
      alignItems: "center",
      gap: 20,
      paddingHorizontal: 20,
      paddingVertical: 10,
      zIndex: 5,
    },
    buttonFocus: {
      alignItems: "center",
    },
    focusImage: {
      width: 30,
      height: 30,
    },
    buttonFlash: {
      alignItems: "center",
    },
    flashImage: {
      width: 30,
      height: 30,
    },
    cameraView: {
      position: "absolute",
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 1,
    },
  });

  const toggleAutoFocus = () => {
    try {
      let newFocus: FocusMode = autoFocus === "on" ? "off" : "on";
      setAutoFocus(newFocus);
      showAlert(`Auto Focus: ${newFocus.toUpperCase()}`, "success");
    } catch (error) {
      scanLogger.log(
        "toggleAutoFocus error:",
        (error as Error).message || "An unexpected error"
      );
    }
  };

  const toggleFlash = () => {
    try {
      let newMode: FlashMode = "off";
      if (flashMode === "off") {
        newMode = "on";
      } else if (flashMode === "on") {
        newMode = "auto";
      }
      setFlashMode(newMode);
      showAlert(`Flash Mode: ${newMode.toUpperCase()}`, "success");
    } catch (error) {
      scanLogger.log(
        "toggleFlash error:",
        (error as Error).message || "An unexpected error"
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.cameraViewWrap}>
        <View style={styles.panelTop}>
          <TouchableOpacity
            style={styles.buttonFocus}
            onPress={toggleAutoFocus}
          >
            {autoFocus === "on" ? (
              <Image
                style={styles.focusImage}
                source={require("@/assets/images/shutter-icon-a.png")}
              />
            ) : (
              <Image
                style={styles.focusImage}
                source={require("@/assets/images/shutter-icon-w.png")}
              />
            )}
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonFlash} onPress={toggleFlash}>
            {flashMode === "on" ? (
              <Image
                style={styles.flashImage}
                source={require("@/assets/images/flash-on-icon.png")}
              />
            ) : flashMode === "auto" ? (
              <Image
                style={styles.flashImage}
                source={require("@/assets/images/flash-auto-icon.png")}
              />
            ) : (
              <Image
                style={styles.flashImage}
                source={require("@/assets/images/flash-off-icon.png")}
              />
            )}
          </TouchableOpacity>
        </View>

        <CameraView
          onBarcodeScanned={handleBarcodeScanned}
          barcodeScannerSettings={{
            barcodeTypes: [
              "ean13",
              "ean8",
              "upc_e",
              "code39",
              "code93",
              "itf14",
              "code128",
              "upc_a",
            ],
          }}
          facing="back"
          autofocus={autoFocus}
          flash={flashMode}
          style={styles.cameraView}
        />
      </View>
    </View>
  );
}
