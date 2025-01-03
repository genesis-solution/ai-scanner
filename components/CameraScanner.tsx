import { useState } from "react";
import { CameraView } from "expo-camera";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { appConfig } from "@/configs/config";
import scanLogger from "@/utils/scanLogger";

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
  const [autoFocus, setAutoFocus] = useState("off");
  const [flashMode, setFlashMode] = useState("off");

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
      let newFocus = autoFocus === "on" ? "off" : "on";
      setAutoFocus(newFocus);
      //   showAlert(`Auto Focus: ${newFocus.toUpperCase()}`, "success");
    } catch (error) {
      scanLogger.log(
        "toggleAutoFocus error:",
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
          style={styles.cameraView}
        />
      </View>
    </View>
  );
}
