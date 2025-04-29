import React, { useEffect, useState, Fragment } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
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
import { FontAwesome, Entypo, AntDesign } from "@expo/vector-icons";
import { showAlert } from "@/utils/scanAlert";
import { getImageInfo, imageToBase64 } from "@/utils/imageUtils";
import { ThemedText } from "@/components/ThemedText";
import { Share } from "react-native";
import { onShare } from "./(tabs)/_layout";

const PARSING = "parsing";
const CHECKING_KEYWORDS = "checkingKeywords";
const FINAL = "final";

export default function ResultScreen() {
  const [status, setStatus] = useState<string>(PARSING);
  const [scanResult, setScanResult] = useState<string>("unknown");
  const [productInfo, setProductInfo] = useState<string>("");
  const [productName, setProductName] = useState<string>("");
  const [barcodeType, setBarcodeType] = useState<string>("EAN");
  const [barcodeData, setBarcodeData] = useState<string>("");
  const [getParseBarcode] = useGetParseBarcodeMutation();
  const { t } = useTranslation();

  const keywords: IKeyword[] = useSelector((state: any) => state.scan.keywords);
  const { type, data, barcodeType: barcodeTypeParam } = useLocalSearchParams();
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

    // Set barcode type from URL params if available
    if (barcodeTypeParam) {
      setBarcodeType(barcodeTypeParam as string);
    }
  });

  useEffect(() => {
    const handleCheckKeywords = (productInfoData: any) => {
      setStatus(CHECKING_KEYWORDS);
      let infoText = "";
      // Extract product info text for display
      if (typeof productInfoData === "object") {
        try {
          // For barcode product info
          // For barcode product info
          if (productInfoData.product_name) {
            setProductName(productInfoData.product_name);
          } else {
            setProductName(t("product"));
          }
          infoText = `Product: ${productInfoData.product_name}\n${
            productInfoData.ingredients_text || ""
          }`;

          // Set barcode data
          if (type === "barcode" && data) {
            setBarcodeData(data as string);
            // Try to determine barcode type based on length
            const code = data as string;
            if (code.length === 13) {
              setBarcodeType("EAN-13");
            } else if (code.length === 8) {
              setBarcodeType("EAN-8");
            } else if (code.length === 12) {
              setBarcodeType("UPC-A");
            } else if (code.length === 14) {
              setBarcodeType("ITF-14");
            }
          }
        } catch (e) {
          infoText = String(productInfoData);
        }
      } else {
        infoText = String(productInfoData);
      }

      setProductInfo(infoText);
      const hasKeyword = keywords.some((keyword) =>
        infoText.toLowerCase().includes(keyword.name.toLowerCase())
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
          try {
            scanLogger.log(`Processing OCR image from URI: ${data}`);

            // Check image file first
            const imgInfo = await getImageInfo(data as string);
            scanLogger.log(
              `Image exists: ${imgInfo.exists}, Size: ${imgInfo.size} bytes`
            );

            if (imgInfo.size < 1000) {
              throw new Error(t("imageFileTooSmall"));
            }

            if (imgInfo.size > 1000000) {
              throw new Error(t("imageFileTooLarge"));
            }

            // Create form data for OCR API
            const formData = new FormData();
            formData.append("apikey", "K83477011988957");

            // Convert image directly to base64 using our utility
            const base64data = await imageToBase64(data as string);
            scanLogger.log("Image converted to base64 successfully");

            // Configure the OCR request with optimal settings
            formData.append("base64Image", base64data);
            formData.append("OCREngine", "2"); // More advanced OCR engine
            formData.append("scale", "true"); // Enable scaling for better results
            formData.append("detectOrientation", "true");
            formData.append("isTable", "false");
            formData.append("filetype", "jpg"); // Explicitly tell the API the file type

            // Log request and set timeout
            scanLogger.log("Sending OCR request to API...");
            const ocrStartTime = Date.now();

            const ocrResult = await postOCR(formData)
              .unwrap()
              .catch((error) => {
                scanLogger.error(
                  `OCR API Error: ${
                    (error as Error).message ||
                    error.error ||
                    JSON.stringify(error)
                  }`
                );
                throw new Error(
                  `OCR Service Error: ${
                    (error as Error).message || error.error || "Unknown error"
                  }`
                );
              });

            const processingTime = Date.now() - ocrStartTime;
            scanLogger.log(`OCR API response received in ${processingTime}ms`);

            if (!ocrResult) {
              throw new Error(t("noResponseFromOCRService"));
            }

            scanLogger.log(
              "OCR result:",
              JSON.stringify(ocrResult).substring(0, 500) + "..."
            );

            if (ocrResult?.ParsedResults?.length) {
              const allParsedText = ocrResult.ParsedResults.map(
                (result: any) => result.ParsedText
              ).join(" ");

              if (!allParsedText || allParsedText.trim().length === 0) {
                scanLogger.log("OCR returned empty text");
                showAlert(t("ocrReturnedEmptyText"), "error");
                setScanResult("unknown");
                setStatus(FINAL);
                return;
              }

              scanLogger.log(
                `OCR extracted text: ${allParsedText.substring(0, 100)}...`
              );
              setProductInfo(allParsedText.substring(0, 300));
              handleCheckKeywords(allParsedText);
            } else {
              scanLogger.log("OCR returned no parsed results");
              showAlert(t("ocrReturnedNoParsedResults"), "error");
              setScanResult("unknown");
              setStatus(FINAL);
            }
          } catch (error) {
            scanLogger.error(
              `OCR Processing Error: ${
                (error as Error).message || JSON.stringify(error)
              }`
            );
            showAlert(
              `${t("ocrError")}: ${
                (error as Error).message || t("failedToProcessImage")
              }`,
              "error"
            );
            setScanResult("parse-error");
            setStatus(FINAL);
          }
        } else {
          // Set barcode data immediately
          if (data) {
            setBarcodeData(data as string);
            // Try to determine barcode type based on length
            const code = data as string;
            if (code.length === 13) {
              setBarcodeType("EAN-13");
            } else if (code.length === 8) {
              setBarcodeType("EAN-8");
            } else if (code.length === 12) {
              setBarcodeType("UPC-A");
            } else if (code.length === 14) {
              setBarcodeType("ITF-14");
            }
          }

          const parsedContent = await getParseBarcode(data).unwrap();
          scanLogger.log(`Parsed Content Status: `, parsedContent.status);
          if (parsedContent?.status) {
            if (parsedContent?.product?.product_name) {
              setProductName(parsedContent.product.product_name);
            }
            handleCheckKeywords(parsedContent?.product);
          } else {
            setScanResult("unknown");
            setStatus(FINAL);
          }
        }
      } catch (error) {
        scanLogger.error(
          `Parsing Error: ${(error as Error).message || t("unexpectedError")}`
        );
        showAlert(
          `${t("parsingError")}: ${
            (error as Error).message || t("unexpectedError")
          }`,
          "error"
        );
        setScanResult("parse-error");
        setStatus(FINAL);
      }
    };
    parseCode();
  }, [data, getParseBarcode, keywords, postOCR, type, t]);

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
    headerRightContainer: {
      marginRight: 16,
    },
    shareButton: {
      padding: 8,
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
    sourceContainer: {
      marginTop: 16,
      alignSelf: "center",
    },
    sourceText: {
      fontSize: 14,
      fontWeight: "semibold",
      textAlign: "center",
      letterSpacing: 1.5,
    },
    headerLeftContainer: {
      marginLeft: 0,
    },
    backButton: {
      padding: 8,
    },
  });

  // Get the text color for the header icons
  const textColor = useThemeColor({}, "text");

  return (
    <Fragment>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTransparent: true,
          headerTitle: "",
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
              productName={productName}
              barcodeType={barcodeType}
              barcodeData={barcodeData}
            />
          )}
        </View>
        <View style={styles.scanBtnContainer}>
          {status === FINAL && (
            <>
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
              {/* Source Information */}
              <View style={styles.sourceContainer}>
                <ThemedText style={styles.sourceText}>
                  {t("source")}: {t("openFoodFacts")}
                </ThemedText>
              </View>
            </>
          )}
        </View>
      </SafeAreaView>
    </Fragment>
  );
}
