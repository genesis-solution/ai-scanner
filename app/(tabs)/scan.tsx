import { ImageBackground, SafeAreaView, StyleSheet, View } from "react-native";
import { Camera } from "expo-camera";

import { ThemedText } from "@/components/ThemedText";
import LottieView from "lottie-react-native";
import { useEffect, useState, Fragment } from "react";
import { useGetParseBarcodeMutation } from "@/store/services/api";
import scanLogger from "@/utils/scanLogger";
import { useThemeColor } from "@/hooks/useThemeColor";
import BigButton from "@/components/BigButton";
import { IKeyword } from "@/constants/types";
import CameraScanner from "@/components/CameraScanner";
import ScanResultShow from "@/components/ScanResultShow";
import { useSelector } from "react-redux";
import ManualInput from "@/components/ManualInput";

const SCANNING = "scanning";
const PARSING = "parsing";
const CHECKING_KEYWORDS = "asking";
const FINAL = "final";

export default function ScanScreen() {
  const [hasPermission, setHasPermission] = useState<null | boolean>(null);
  const [status, setStatus] = useState<string>(SCANNING);
  const [code, setCode] = useState<string>("");
  const [scanResult, setScanResult] = useState<string>("unknown");
  const [productInfo, setProductInfo] = useState<any>({});
  const [getParseBarcode] = useGetParseBarcodeMutation();
  const borderColor = useThemeColor({}, "text");

  const keywords: IKeyword[] = useSelector((state: any) => state.scan.keywords);

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
      setCode(`${type}-${data}`);
      // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
      const parsedContent = await getParseBarcode(data).unwrap();
      scanLogger.log(`Parsed Content Status: `, parsedContent.status);
      if (parsedContent?.status) {
        setProductInfo(parsedContent?.product);
        handleCheckKeywords();
      } else {
        setScanResult("unknown");
        setStatus(FINAL);
      }
    } catch (error) {
      scanLogger.error(
        `Parsing Barcode Error: ${
          (error as Error).message || "An unexpected error"
        }`
      );
      setScanResult("parse-error");
      setStatus(FINAL);
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
    <ImageBackground source={image} resizeMode="cover" style={styles.image}>
      <SafeAreaView style={styles.container}>
        <Fragment>
          <View style={styles.titleContainer}>
            <ThemedText type="title">Food Bug Scanner</ThemedText>
          </View>
          <View style={styles.barcodeContainer}>
            {status === SCANNING && (
              <View style={styles.cameraContainer}>
                <CameraScanner handleBarcodeScanned={handleBarcodeScanned} />
              </View>
            )}
            {status === PARSING && (
              <LottieView
                source={require("@/assets/animations/parsing.json")}
                autoPlay
                style={styles.animation}
              />
            )}
            {status === FINAL && (
              <ScanResultShow
                handleBarcodeScanned={handleBarcodeScanned}
                scanResult={scanResult}
                code={code}
              />
            )}
          </View>
          <View style={styles.scanBtnContainer}>
            {status === SCANNING && <ManualInput />}
            {status === PARSING && (
              <BigButton title="Parsing..." onPress={() => {}} disabled />
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
                  setScanResult("unknown");
                  setStatus(SCANNING);
                }}
              />
            )}
            {/* Dev Purpose Only */}
            {/* {status === SCANNING && (
              <BigButton
                title="Dev - Skip scanning"
                onPress={() => {
                  handleBarcodeScanned({
                    type: "barcode",
                    data: "5413548283128",
                  });
                }}
              />
            )} */}
          </View>
        </Fragment>
      </SafeAreaView>
    </ImageBackground>
  );
}