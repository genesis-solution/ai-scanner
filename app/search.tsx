import React, { useState, Fragment, useEffect } from "react";
import { StyleSheet, View, TouchableOpacity, Share } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useSelector } from "react-redux";
import { Stack } from "expo-router";
import LottieView from "lottie-react-native";
import ScanResultShow from "@/components/ScanResultShow";
import { useGetParseBarcodeMutation } from "@/store/services/api";
import scanLogger from "@/utils/scanLogger";
import { useThemeColor } from "@/hooks/useThemeColor";
import { IKeyword } from "@/constants/types";
import { useTranslation } from "react-i18next";
import { AntDesign, FontAwesome, Entypo } from "@expo/vector-icons";
import { ThemedTextInputIcon } from "@/components/ThemedTextInputIcon";
import { showAlert } from "@/utils/scanAlert";

const PARSING = "parsing";
const CHECKING_KEYWORDS = "checkingKeywords";
const FINAL = "final";

export default function SearchScreen() {
  const [manualInput, setManualInput] = useState<string>("");
  const [status, setStatus] = useState<string | null>(null);
  const [scanResult, setScanResult] = useState<string>("unknown");
  const [productInfo, setProductInfo] = useState<string>("");
  const [productName, setProductName] = useState<string>("");
  const [barcodeType, setBarcodeType] = useState<string>("EAN");
  const [getParseBarcode] = useGetParseBarcodeMutation();
  const { t } = useTranslation();

  const keywords: IKeyword[] = useSelector((state: any) => state.scan.keywords);
  const backgroundColor = useThemeColor({}, "background");
  const textColor = useThemeColor({}, "text");

  const onShare = async () => {
    try {
      if (status !== FINAL) return;
      
      let message = `Food Bug Scanner Result\n`;
      if (productName) {
        message += `Product: ${productName}\n`;
      }
      if (manualInput) {
        message += `${barcodeType}: ${manualInput}\n`;
      }
      message += `Result: ${scanResult === 'green' ? 'No bugs found' : scanResult === 'red' ? 'Bugs found' : 'Unknown product'}\n`;
      message += `Source: Open Food Facts`;

      const result = await Share.share({
        message: message,
      });
    } catch (error: any) {
      scanLogger.error(`Share error: ${error.message}`);
      showAlert(error.message, "error");
    }
  };

  const handleCheckKeywords = (productInfoData: any) => {
    setStatus(CHECKING_KEYWORDS);
    
    if (typeof productInfoData === 'object') {
      try {
        // For barcode product info
        if (productInfoData.product_name) {
          setProductName(productInfoData.product_name);
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
      if (!manualInput || manualInput.trim().length === 0) {
        showAlert("Please enter a valid barcode", "error");
        return;
      }
      
      setStatus(PARSING);
      
      // Set barcode type based on length
      const code = manualInput.trim();
      if (code.length === 13) {
        setBarcodeType('EAN-13');
      } else if (code.length === 8) {
        setBarcodeType('EAN-8');
      } else if (code.length === 12) {
        setBarcodeType('UPC-A');
      } else if (code.length === 14) {
        setBarcodeType('ITF-14');
      } else {
        setBarcodeType('Barcode');
      }
      
      const parsedContent = await getParseBarcode(manualInput).unwrap();
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

  // useEffect(() => {
  //   if (productInfo.length) {
  //   }
  // }, [productInfo]);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: "column",
      justifyContent: "center",
      paddingHorizontal: 8,
      paddingTop: 54,
      backgroundColor: backgroundColor,
    },
    searchBarContainer: {
      height: 72,
      flexDirection: "row",
      justifyContent: "center",
    },
    manualInput: {
      flex: 1,
      margin: 12,
      paddingVertical: 10,
      paddingHorizontal: 10,
    },
    resultContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    animation: {
      width: 200,
      height: 200,
      alignSelf: "center",
    },
    headerRightContainer: {
      marginRight: 16,
    },
    shareButton: {
      padding: 8,
    },
  });

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.container}>
      <Fragment>
        <Stack.Screen
          options={{
            headerShown: true,
            headerTransparent: true,
            headerTitle: t("search"),
            headerRight: () => (
              <View style={styles.headerRightContainer}>
                <TouchableOpacity onPress={onShare} style={styles.shareButton}>
                  <Entypo name="share" size={24} color={textColor} />
                </TouchableOpacity>
              </View>
            ),
          }}
        />
        <View style={styles.container}>
          <View style={styles.searchBarContainer}>
            <ThemedTextInputIcon
              value={manualInput}
              onChangeText={setManualInput}
              style={styles.manualInput}
              placeholder={t("enterCode")}
              lightColor="#000" // Example light color
              darkColor="#fff" // Example dark color
              icon={<FontAwesome name="search" size={24} color="black" />}
              submit={manualInput.length !== 0}
              submitIcon={
                <AntDesign name="arrowright" size={24} color="black" />
              }
              onSubmit={parseCode}
            />
          </View>
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
                scanResult={scanResult} 
                manualInput={false} 
                productInfo={productInfo}
                productName={productName}
                barcodeType={barcodeType}
                barcodeData={manualInput}
              />
            )}
          </View>
        </View>
      </Fragment>
    </KeyboardAwareScrollView>
  );
}
