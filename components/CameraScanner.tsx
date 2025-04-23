import { useEffect, useState } from "react";
import { CameraType, CameraView, FlashMode } from "expo-camera";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import scanLogger from "@/utils/scanLogger";
import { showAlert } from "@/utils/scanAlert";

type ICameraScannerProps = {
  handleBarcodeScanned?: ({
    type,
    data,
  }: {
    type: string;
    data: string;
  }) => void;
  type?: "barcode" | "ocr";
  handleOCRScanned?: () => void;
  cameraRef?: React.RefObject<CameraView>;
};

export default function CameraScanner({
  type = "barcode",
  handleOCRScanned,
  handleBarcodeScanned,
  cameraRef,
}: ICameraScannerProps) {
  const [flashMode, setFlashMode] = useState<FlashMode>("off");
  const [facingMode, setFacingMode] = useState<CameraType>("back");
  const [isInitialized, setIsInitialized] = useState(false);

  // Setup and cleanup effect
  useEffect(() => {
    // Initialize camera when component mounts
    const timer = setInterval(() => {
      setIsInitialized(true);
    }, 1000);
    scanLogger.log(`Initializing ${type} camera...`);

    // Clean up when component unmounts
    return () => {
      scanLogger.log(`Cleaning up ${type} camera resources...`);

      // Reset any camera state if needed
      setIsInitialized(false);
      clearInterval(timer);
    };
  }, [type]);

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
    panelBottom: {
      position: "absolute",
      bottom: 0,
      height: 100,
      left: 0,
      right: 0,
      backgroundColor: "rgba(0, 0, 0, 0.4)",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      gap: 20,
      paddingHorizontal: 20,
      paddingVertical: 10,
      zIndex: 5,
    },
    buttonShoot: {
      alignItems: "center",
    },
    shootImage: {
      width: 80,
      height: 80,
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
    buttonFacing: {
      alignItems: "center",
    },
    facingImage: {
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

  if (!isInitialized) {
    return null;
  }

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

  const toggleFacing = () => {
    try {
      let newMode: CameraType = facingMode === "back" ? "front" : "back";
      setFacingMode(newMode);
    } catch (error) {
      scanLogger.log(
        "toggleFacing error:",
        (error as Error).message || "An unexpected error"
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.cameraViewWrap}>
        <View style={styles.panelTop}>
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
          <TouchableOpacity style={styles.buttonFacing} onPress={toggleFacing}>
            <Image
              style={styles.facingImage}
              source={require("@/assets/images/camera-switch-front-back.png")}
            />
          </TouchableOpacity>
        </View>

        {type === "ocr" && (
          <View style={styles.panelBottom}>
            <TouchableOpacity
              style={styles.buttonShoot}
              onPress={handleOCRScanned}
            >
              <Image
                style={styles.shootImage}
                source={require("../assets/images/trigger-icon.png")}
              />
            </TouchableOpacity>
          </View>
        )}

        <CameraView
          ref={cameraRef}
          onBarcodeScanned={
            type === "barcode" ? handleBarcodeScanned : undefined
          }
          barcodeScannerSettings={
            type === "barcode"
              ? {
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
                }
              : undefined
          }
          facing={facingMode}
          autofocus="on"
          flash={flashMode}
          style={styles.cameraView}
        />
      </View>
    </View>
  );
}
