import React, { useEffect, useState, Fragment } from "react";
import { SafeAreaView, StyleSheet, View, Image } from "react-native";
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
import { getImageInfo, imageToBase64 } from "@/utils/imageUtils";
import { ThemedText } from "@/components/ThemedText";
import { appConfig } from "@/configs/config";

const PARSING = "parsing";
const CHECKING_KEYWORDS = "checkingKeywords";
const FINAL = "final";

export default function ResultScreen() {
  const [status, setStatus] = useState<string>(PARSING);
  const [scanResult, setScanResult] = useState<string>("unknown");
  const [productInfo, setProductInfo] = useState<string>("");
  const [imageSize, setImageSize] = useState<number>(0);
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
      if (typeof productInfoData === "object") {
        try {
          // For barcode product info
          if (productInfoData.product_name) {
            setProductInfo(
              `Product: ${productInfoData.product_name}\n${
                productInfoData.ingredients_text || ""
              }`
            );
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
        JSON.stringify(productInfoData)
          .toLowerCase()
          .includes(keyword.name.toLowerCase())
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

            setImageSize(imgInfo.size);

            if (imgInfo.size < 1000) {
              throw new Error("Image file too small or corrupted");
            }

            if (imgInfo.size > 1000000) {
              throw new Error("Image file too large");
            }

            // Create form data for OCR API
            const formData = new FormData();
            formData.append("apikey", "K83477011988957");

            // Instead of converting to base64, create a file object for direct upload
            const uriParts = (data as string).split(".");
            const fileType = uriParts[uriParts.length - 1];

            // Create file object for FormData
            const fileToUpload = {
              uri: data as string,
              name: `image.${fileType}`,
              type: `image/${fileType}`,
            };

            // Append file instead of base64Image
            // @ts-ignore - React Native's FormData implementation accepts file objects
            formData.append("file", fileToUpload);
            formData.append("OCREngine", "2"); // More advanced OCR engine
            formData.append("scale", "true"); // Enable scaling for better results
            formData.append("detectOrientation", "true");
            formData.append("isTable", "false");

            // Log request and set timeout
            scanLogger.log("Sending OCR request with file upload...");
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
              throw new Error("No response from OCR service");
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
                showAlert("OCR returned empty text", "error");
                setScanResult("unknown");
                setStatus(FINAL);
                return;
              }

              scanLogger.log(`OCR extracted text: ${allParsedText}`);
              setProductInfo(allParsedText);
              handleCheckKeywords(allParsedText);
            } else {
              scanLogger.log("OCR returned no parsed results");
              showAlert("OCR returned no parsed results", "error");
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
              `OCR Error: ${
                (error as Error).message || "Failed to process image"
              }`,
              "error"
            );
            setScanResult("parse-error");
            setStatus(FINAL);
          }
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
    capturedImageContainer: {
      width: "90%",
      height: 200,
      borderRadius: 8,
      overflow: "hidden",
      marginBottom: 16,
      borderWidth: 1,
      borderColor: "#ccc",
      position: "relative",
    },
    capturedImage: {
      width: "100%",
      height: "100%",
    },
    imageLabel: {
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: "rgba(0,0,0,0.5)",
      padding: 8,
    },
    imageLabelText: {
      color: "#FFFFFF",
      textAlign: "center",
    },
    imageSizeText: {
      color: "#000000",
      textAlign: "center",
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
            <>
              <LottieView
                source={require("@/assets/animations/parsing.json")}
                autoPlay
                style={styles.animation}
              />
            </>
          )}
          {status === FINAL && (
            <>
              {appConfig.isEmulatorMode && type === "ocr" && data && (
                <View style={styles.capturedImageContainer}>
                  <Image
                    source={{ uri: data as string }}
                    style={styles.capturedImage}
                    resizeMode="contain"
                  />
                </View>
              )}
              {appConfig.isEmulatorMode && type === "ocr" && (
                <ThemedText style={styles.imageSizeText}>
                  {`Image size: ${imageSize} bytes`}
                </ThemedText>
              )}
              <ScanResultShow
                manualInput={type !== "ocr"}
                scanResult={scanResult}
                productInfo={productInfo}
              />
            </>
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
