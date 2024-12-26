import {
  Button,
  Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  View,
} from "react-native";
import { CameraView, Camera } from "expo-camera";

import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import LottieView from "lottie-react-native";
import { useEffect, useState } from "react";
import {
  usePostAskAIMutation,
  usePostParseBarcodeMutation,
} from "@/store/services/api";
import scanLogger from "@/utils/scanLogger";
import { setContent } from "@/store/slices/scanSlice";
import { useDispatch } from "react-redux";

const BEGIN = "begin";
const SCANNING = "scanning";
const PARSING = "parsing";
const READYTOASK = "readyToAsk";
const ASKINGAI = "asking";
const FINAL = "final";

export default function HomeScreen() {
  const [hasPermission, setHasPermission] = useState<null | boolean>(null);
  const [status, setStatus] = useState<string>("begin");
  const [postParseBarcode, { isLoading: isParsing }] =
    usePostParseBarcodeMutation();
  const [postAskAI, { isLoading: isAskingAI }] = usePostAskAIMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    const getCameraPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getCameraPermissions();
  }, []);

  const handleBarcodeScanned = async ({
    type,
    data,
  }: {
    type: string;
    data: string;
  }) => {
    try {
      setStatus(PARSING);
      alert(`Bar code with type ${type} and data ${data} has been scanned!`);
      const parsedContent = await postParseBarcode({
        type,
        data,
      });
      setStatus(READYTOASK);
      dispatch(setContent(parsedContent));
    } catch (error) {
      scanLogger.error(
        `Parsing Barcode Error: ${
          (error as Error).message || "An unexpected error"
        }`
      );
    }
  };

  const handleAskAI = async () => {
    try {
      setStatus(ASKINGAI);
      const result = await postAskAI({
        // Prompt will come here
      });
      setStatus(FINAL);
      return result;
    } catch (error) {
      scanLogger.error(
        `Asking AI Error: ${(error as Error).message || "An Unexpected Error"}`
      );
    }
  };

  if (hasPermission === null) {
    return <ThemedText>Requesting for camera permission</ThemedText>;
  }
  if (hasPermission === false) {
    return <ThemedText>No access to camera</ThemedText>;
  }

  const image = require("@/assets/images/scan-bg.png");

  return (
    <ImageBackground source={image} resizeMode="cover" style={styles.image}>
      <SafeAreaView style={styles.container}>
        <View style={styles.titleContainer}>
          <ThemedText type="title">Scan Now!</ThemedText>
        </View>
        <View style={styles.cameraContainer}>
          {status === BEGIN && (
            <LottieView
              source={require("@/assets/animations/scanner.json")}
              autoPlay
              loop
              style={styles.animation}
            />
          )}
          {status === SCANNING && (
            <CameraView
              onBarcodeScanned={handleBarcodeScanned}
              barcodeScannerSettings={{
                barcodeTypes: ["qr", "pdf417"],
              }}
              style={styles.animation}
            />
          )}
          {status === PARSING && <ThemedText>Parsing Barcode</ThemedText>}
          {status === READYTOASK && <ThemedText>Ask AI</ThemedText>}
          {status === ASKINGAI && <ThemedText>Asking AI</ThemedText>}
          {status === FINAL && <ThemedText>Here's the result</ThemedText>}
        </View>
        <View style={styles.scanBtnContainer}>
          {status === BEGIN && (
            <Button
              title="Tap to Scan"
              onPress={() => {
                setStatus(SCANNING);
              }}
            />
          )}
          {status === SCANNING && (
            <Button
              title="Scanning the Barcode..."
              onPress={() => {}}
              disabled
            />
          )}
          {status === PARSING && (
            <Button
              title="Parsing the Barcode..."
              onPress={() => {}}
              disabled
            />
          )}
          {status === READYTOASK && (
            <Button
              title="Tap to Ask AI"
              onPress={() => {
                handleAskAI();
              }}
            />
          )}
          {status === ASKINGAI && (
            <Button title="Asking AI..." onPress={() => {}} disabled />
          )}
          {status === FINAL && (
            <Button
              title="Tap to Ask Agin"
              onPress={() => {
                setStatus(BEGIN);
              }}
            />
          )}

          {/* Dev Purpose Only */}
          {status === SCANNING && (
            <Button
              title="Dev - Skip scanning"
              onPress={() => {
                handleBarcodeScanned({ type: "QR", data: "Lorem Loreal...." });
              }}
            />
          )}
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
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
  },
  titleContainer: {
    paddingTop: 64,
    flexDirection: "row",
    alignItems: "center",
  },
  cameraContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  scanBtnContainer: {
    height: 64,
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
