import { useEffect, useState, Fragment } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";
import { router, Stack, useLocalSearchParams } from "expo-router";
import LottieView from "lottie-react-native";
import BigButton from "@/components/BigButton";
import ScanResultShow from "@/components/ScanResultShow";
import {
  useGetParseBarcodeMutation,
  usePostOCRMutation,
} from "@/store/services/api";
import scanLogger from "@/utils/scanLogger";
import { useThemeColor } from "@/hooks/useThemeColor";
import { IKeyword } from "@/constants/types";
import { useTranslation } from "react-i18next";
import { FontAwesome } from "@expo/vector-icons";
import { showAlert } from "@/utils/scanAlert";

const PARSING = "parsing";
const CHECKING_KEYWORDS = "checkingKeywords";
const FINAL = "final";

export default function ResultScreen() {
  const [status, setStatus] = useState<string>(PARSING);
  const [scanResult, setScanResult] = useState<string>("unknown");
  const [productInfo, setProductInfo] = useState<string>("");
  const [getParseBarcode] = useGetParseBarcodeMutation();
  const { t } = useTranslation();

  const keywords: IKeyword[] = useSelector((state: any) => state.scan.keywords);
  const { type, data } = useLocalSearchParams();
  const backgroundColor = useThemeColor({}, "background");

  const [postOCR] = usePostOCRMutation();

  useEffect(() => {
    if (!type || !data) {
      scanLogger.warn(
        `Navigated to result screen with wrong type and data: ${type} - ${data}`
      );
      router.back();
    }
    scanLogger.log(`Navigated to result screen: ${type} - ${data}`);
  });

  useEffect(() => {
    const handleCheckKeywords = (productInfoData: any) => {
      setStatus(CHECKING_KEYWORDS);
      // Extract product info text for display
      if (typeof productInfoData === 'object') {
        try {
          // For barcode product info
          if (productInfoData.product_name) {
            setProductInfo(`Product: ${productInfoData.product_name}\n${productInfoData.ingredients_text || ''}`);
          } else {
            setProductInfo(JSON.stringify(productInfoData).substring(0, 300));
          }
        } catch (e) {
          setProductInfo(String(productInfoData).substring(0, 300));
        }
      } else {
        setProductInfo(String(productInfoData).substring(0, 300));
      }
      
      const hasKeyword = keywords.some((keyword) =>
        JSON.stringify(productInfoData).toLowerCase().includes(keyword.name.toLowerCase())
      );

      if (hasKeyword) {
        scanLogger.log(`This product includes a keyword`);
        setScanResult("red");
      } else {
        setScanResult("green");
      }
      setStatus(FINAL);
    };

    const parseCode = async () => {
      try {
        if (type === "ocr") {
          const formData = new FormData();
          formData.append("apikey", "K83477011988957");

          const response = await fetch(data as string);
          const blob = await response.blob();
          const reader = new FileReader();
          reader.readAsDataURL(blob);
          reader.onloadend = () => {
            const base64data = reader.result;
            formData.append("base64Image", base64data as string);

            postOCR(formData)
              .unwrap()
              .then((result) => {
                scanLogger.log("OCR result:", result);
                if (result?.ParsedResults?.length) {
                  const allParsedText = result.ParsedResults.map(
                    (result: any) => result.ParsedText
                  ).join(" ");
                  setProductInfo(allParsedText.substring(0, 300));
                  handleCheckKeywords(allParsedText);
                } else {
                  setScanResult("unknown");
                  setStatus(FINAL);
                }
              })
              .catch((error) => {
                scanLogger.error(
                  `Error: `,
                  (error as Error).message ||
                    error.error ||
                    JSON.stringify(error)
                );
                throw new Error(
                  `Photo Upload Error: ${
                    (error as Error).message ||
                    error.error ||
                    JSON.stringify(error)
                  }`
                );
              });
          };
        } else {
          const parsedContent = await getParseBarcode(data).unwrap();
          scanLogger.log(`Parsed Content Status: `, parsedContent.status);
          if (parsedContent?.status) {
            handleCheckKeywords(parsedContent?.product);
          } else {
            setScanResult("unknown");
            setStatus(FINAL);
          }
        }
      } catch (error) {
        scanLogger.error(
          `Parsing Error: ${(error as Error).message || "An unexpected error"}`
        );
        showAlert(
          `Parsing Error: ${(error as Error).message || "An unexpected error"}`,
          "error"
        );
        setScanResult("parse-error");
        setStatus(FINAL);
      }
    };
    parseCode();
  }, [data, getParseBarcode, keywords, postOCR, type]);

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
      width: "100%",
      flexDirection: "row",
      alignItems: "center",
      paddingTop: 24,
      paddingBottom: 8,
      alignSelf: "center",
    },
    resultContainer: {
      marginTop: 100,
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      gap: 48,
    },
    scanBtnContainer: {
      justifyContent: "center",
      alignItems: "center",
      height: 128,
      paddingVertical: 24,
      paddingHorizontal: 8,
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
    <Fragment>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTransparent: true,
          headerTitle: t("foodBugScanner"),
        }}
      />
      <SafeAreaView style={styles.container}>
        <View style={styles.resultContainer}>
          {status === PARSING && (
            <LottieView
              source={require("@/assets/animations/parsing.json")}
              autoPlay
              style={styles.animation}
            />
          )}
          {status === FINAL && (
            <ScanResultShow
              manualInput={type !== "ocr"}
              scanResult={scanResult}
              productInfo={productInfo}
            />
          )}
        </View>
        <View style={styles.scanBtnContainer}>
          {status === FINAL && (
            <BigButton
              title={t(type === "ocr" ? "Take a Picture" : "scanAgain")}
              onPress={() => {
                if (type === "ocr") {
                  router.replace("/(tabs)/ocr");
                } else {
                  router.replace("/(tabs)/scan");
                }
              }}
              icon={<FontAwesome name="repeat" size={48} color="white" />}
            />
          )}
        </View>
      </SafeAreaView>
    </Fragment>
  );
}
