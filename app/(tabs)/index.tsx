import { Button, Image, StyleSheet } from "react-native";
import { CameraView, Camera } from "expo-camera";

import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import LottieView from "lottie-react-native";
import { useEffect, useState } from "react";

export default function HomeScreen() {
  const [hasPermission, setHasPermission] = useState<null | boolean>(null);
  const [scanned, setScanned] = useState(false);
  const [firstScan, setFirstScan] = useState(true);

  useEffect(() => {
    const getCameraPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getCameraPermissions();
  }, []);

  const handleBarcodeScanned = ({ type, data }: { type: any; data: any }) => {
    setScanned(true);
    setFirstScan(true);
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  if (hasPermission === null) {
    return <ThemedText>Requesting for camera permission</ThemedText>;
  }
  if (hasPermission === false) {
    return <ThemedText>No access to camera</ThemedText>;
  }

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/partial-react-logo.png")}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.container}>
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">Scan Now!</ThemedText>
        </ThemedView>
        <ThemedView style={styles.cameraContainer}>
          {scanned ? (
            <LottieView
              source={require("@/assets/animations/scanner.json")}
              autoPlay
              loop
              style={styles.animation}
            />
          ) : (
            <CameraView
              onBarcodeScanned={scanned ? undefined : handleBarcodeScanned}
              barcodeScannerSettings={{
                barcodeTypes: ["qr", "pdf417"],
              }}
              style={styles.animation}
            />
          )}
        </ThemedView>
        <ThemedView style={styles.scanBtnContainer}>
          {firstScan ? undefined : (
            <Button
              title="Tap to Scan Again"
              onPress={() => {
                setScanned(false);
              }}
            />
          )}
        </ThemedView>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    gap: 16,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  cameraContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  scanBtnContainer: {
    height: 100,
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
});
