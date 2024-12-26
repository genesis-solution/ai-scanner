import {
  Button,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  View,
} from "react-native";
import { CameraView, Camera } from "expo-camera";

import { ThemedText } from "@/components/ThemedText";
import LottieView from "lottie-react-native";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  usePostAskAIMutation,
  usePostParseBarcodeMutation,
} from "@/store/services/api";
import scanLogger from "@/utils/scanLogger";
import { setContent } from "@/store/slices/scanSlice";
import { useThemeColor } from "@/hooks/useThemeColor";
import BigButton from "@/components/BigButton";

const BEGIN = "begin";
const SCANNING = "scanning";
const PARSING = "parsing";
const READYTOASK = "readyToAsk";
const ASKINGAI = "asking";
const FINAL = "final";

export default function HomeScreen() {
  const [hasPermission, setHasPermission] = useState<null | boolean>(null);
  const [status, setStatus] = useState<string>("begin");
  const [code, setCode] = useState<string>("");
  const [postParseBarcode] = usePostParseBarcodeMutation();
  const [postAskAI] = usePostAskAIMutation();
  const dispatch = useDispatch();
  const borderColor = useThemeColor({}, "text");

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
      setCode(data);
      // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
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

  // const image = require("@/assets/images/scan-bg.png");
  const image = require("@/assets/images/yellow_bg.jpg");

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

  return (
    <ImageBackground source={image} resizeMode="cover" style={styles.image}>
      <SafeAreaView style={styles.container}>
        <View style={styles.titleContainer}>
          <ThemedText type="title">Scan a Barcode</ThemedText>
        </View>
        <View style={styles.barcodeContainer}>
          {status === BEGIN || status === SCANNING || status === PARSING ? (
            <LottieView
              source={require("@/assets/animations/barcode.json")}
              autoPlay
              loop
              style={styles.animation}
            />
          ) : (
            <ThemedText type="subtitle" style={{ textAlign: "center" }}>
              {code}
            </ThemedText>
          )}
        </View>
        <View style={styles.cameraContainer}>
          {status === BEGIN && (
            <BigButton
              title="Tap to Scan"
              onPress={() => {
                setStatus(SCANNING);
              }}
            />
          )}
          {status === SCANNING && (
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
              style={styles.animation}
            />
          )}
          {status === PARSING && (
            <BigButton
              title="Parsing the Barcode..."
              onPress={() => {}}
              disabled
            />
          )}
          {status === READYTOASK && (
            <BigButton
              title="Tap to Ask AI"
              onPress={() => {
                handleAskAI();
              }}
            />
          )}
          {status === ASKINGAI && (
            <BigButton title="Asking AI..." onPress={() => {}} disabled />
          )}
          {status === FINAL && <ThemedText>Here's the result</ThemedText>}
          {status === FINAL && (
            <Button
              title="Scan Again"
              onPress={() => {
                setStatus(BEGIN);
              }}
            />
          )}
          {/* Dev Purpose Only */}
          {status === SCANNING && (
            <BigButton
              title="Dev - Skip scanning"
              onPress={() => {
                handleBarcodeScanned({
                  type: "barcode",
                  data: "Here's the parsed barcode content. It comes from the website.",
                });
              }}
            />
          )}
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}
