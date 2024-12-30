import { ImageBackground, SafeAreaView, StyleSheet, View } from "react-native";
import { CameraView, Camera } from "expo-camera";

import { ThemedText } from "@/components/ThemedText";
import LottieView from "lottie-react-native";
import { useEffect, useState, Fragment } from "react";
import {
  useGetParseBarcodeMutation,
  useGetKeywordsMutation,
} from "@/store/services/api";
import scanLogger from "@/utils/scanLogger";
import { useThemeColor } from "@/hooks/useThemeColor";
import BigButton from "@/components/BigButton";
import { IKeyword } from "@/constants/types";

const BEGIN = "begin";
const SCANNING = "scanning";
const PARSING = "parsing";
const CHECKING_KEYWORDS = "asking";
const FINAL = "final";

export default function HomeScreen() {
  const [hasPermission, setHasPermission] = useState<null | boolean>(null);
  const [status, setStatus] = useState<string>("begin");
  const [code, setCode] = useState<string>("");
  const [scanResult, setScanResult] = useState<string>("");
  const [keywords, setKeywords] = useState<IKeyword[]>([]);
  const [productInfo, setProductInfo] = useState<any>({});
  const [splashTimeout, setSplashTimeout] = useState(false);
  const [getParseBarcode] = useGetParseBarcodeMutation();
  const [getKeywords, { isLoading: isGettingKeywords }] =
    useGetKeywordsMutation();
  const borderColor = useThemeColor({}, "text");

  useEffect(() => {
    const getCameraPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    };

    setTimeout(() => {
      setSplashTimeout(true);
    }, 2500);

    getCameraPermissions();
  }, []);

  useEffect(() => {
    const getAllKeywords = async () => {
      try {
        const allKeywords = await getKeywords({}).unwrap();
        setKeywords(allKeywords);
        scanLogger.log(`keywords: `, allKeywords);
      } catch (error) {
        scanLogger.error(
          `Getting All Keywords Error: ${
            (error as Error).message || "An unexpected error"
          }`
        );
      }
    };

    getAllKeywords();
  }, [getKeywords]);

  const handleBarcodeScanned = async ({
    type,
    data,
  }: {
    type: string;
    data: string;
  }) => {
    try {
      setStatus(PARSING);
      // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
      const parsedContent = await getParseBarcode(data).unwrap();
      scanLogger.log(`Parsed Content Status: `, parsedContent.status);
      if (parsedContent?.status) {
        setCode(parsedContent?.code);
        setProductInfo(parsedContent?.product);
        handleCheckKeywords();
      } else {
        setScanResult("");
        setStatus(FINAL);
      }
    } catch (error) {
      scanLogger.error(
        `Parsing Barcode Error: ${
          (error as Error).message || "An unexpected error"
        }`
      );
    }
  };

  const handleCheckKeywords = async () => {
    try {
      setStatus(CHECKING_KEYWORDS);
      if (
        keywords.some((keyword) => {
          if (JSON.stringify(productInfo).includes(keyword.name)) {
            scanLogger.log(`This product includes ${keyword.name}`);
            return true;
          }
          return false;
        })
      ) {
        setScanResult("red");
      } else setScanResult("green");
      setStatus(FINAL);
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
      gap: 48,
    },
    cameraContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
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
  });

  const ScanResultComponent = () => {
    return (
      <Fragment>
        <ThemedText type="subtitle">{code}</ThemedText>
        {scanResult === "green" && (
          <LottieView
            source={require("@/assets/animations/green-tick.json")}
            autoPlay
            style={styles.animation}
          />
        )}
        {scanResult === "red" && (
          <LottieView
            source={require("@/assets/animations/red-cross.json")}
            autoPlay
            style={styles.animation}
          />
        )}
        {scanResult === "" && (
          <LottieView
            source={require("@/assets/animations/no-data.json")}
            autoPlay
            style={styles.animation}
          />
        )}
      </Fragment>
    );
  };

  const LoadingComponent = () => {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "white",
        }}
      >
        <LottieView
          source={require("@/assets/animations/loading.json")}
          autoPlay
          style={styles.animation}
        />
      </SafeAreaView>
    );
  };

  return !splashTimeout || isGettingKeywords ? (
    <LoadingComponent />
  ) : (
    <ImageBackground source={image} resizeMode="cover" style={styles.image}>
      <SafeAreaView style={styles.container}>
        <Fragment>
          <View style={styles.titleContainer}>
            <ThemedText type="title">Scan a Barcode</ThemedText>
          </View>
          <View style={styles.barcodeContainer}>
            {status === BEGIN && (
              <LottieView
                source={require("@/assets/animations/barcode.json")}
                autoPlay
                style={styles.animation}
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
            {status === FINAL && <ScanResultComponent />}
          </View>
          <View style={styles.scanBtnContainer}>
            {status === BEGIN && (
              <BigButton
                title="Tap to Scan"
                onPress={() => {
                  setStatus(SCANNING);
                }}
              />
            )}
            {status === PARSING && (
              <BigButton
                title="Parsing the Barcode..."
                onPress={() => {}}
                disabled
              />
            )}
            {status === CHECKING_KEYWORDS && (
              <BigButton
                title="Chekcing Keywords..."
                onPress={() => {}}
                disabled
              />
            )}
            {status === FINAL && (
              <BigButton
                title="Scan Again"
                onPress={() => {
                  setScanResult("");
                  setStatus(SCANNING);
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
                    data: "5413548283128",
                  });
                }}
              />
            )}
          </View>
        </Fragment>
      </SafeAreaView>
    </ImageBackground>
  );
}
