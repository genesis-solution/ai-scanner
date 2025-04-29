import React, { Fragment } from "react";
import LottieView from "lottie-react-native";
import {
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
  Linking,
} from "react-native";
import ManualInput from "./ManualInput";
import { ThemedText } from "./ThemedText";
import { useSelector } from "react-redux";
import { appConfig } from "@/configs/config";
import { useTranslation } from "react-i18next";

type IScreenResultProps = {
  scanResult: string;
  manualInput?: boolean;
  productInfo?: string;
  barcodeType?: string;
  barcodeData?: string;
  productName?: string;
};

const ScanResultShow = ({
  scanResult,
  manualInput,
  productInfo,
  barcodeType = "EAN",
  barcodeData = "",
  productName = "",
}: IScreenResultProps) => {
  // Get keywords from Redux store
  const keywords = useSelector((state: any) => state.scan.keywords);
  const { t } = useTranslation();

  // Find matching keywords in the product info
  const matchingKeywords = keywords.filter(
    (keyword: any) =>
      productInfo &&
      productInfo.toLowerCase().includes(keyword.name.toLowerCase())
  );

  const openBarcodeLinkUnknown = () => {
    Linking.openURL(
      "https://support.openfoodfacts.org/help/en-gb/21-manage-my-products/6-how-to-add-products"
    );
  };

  const openBarcodeLinkKnown = () => {
    Linking.openURL("https://world.openfoodfacts.org/");
  };

  const styles = StyleSheet.create({
    mainContainer: {
      width: "100%",
      flex: 1,
      flexDirection: "column",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: 16,
    },
    headerContainer: {
      width: "100%",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
    productNameContainer: {
      width: "100%",
      alignItems: "center",
      marginBottom: 8,
    },
    productName: {
      fontSize: 20,
      fontWeight: "bold",
      textAlign: "center",
      letterSpacing: 2,
    },
    barcodeContainer: {
      width: "100%",
      alignItems: "center",
      marginBottom: 16,
    },
    barcodeText: {
      fontSize: 14,
      color: "#007bff",
      letterSpacing: 1.5,
    },
    animation: {
      width: 200,
      height: 200,
      alignSelf: "center",
    },
    resultContainer: {
      flex: 1,
      width: "100%",
      alignItems: "center",
      marginVertical: 8,
    },
    resultTitleContainer: {
      width: "100%",
      alignItems: "center",
      marginVertical: 8,
    },
    resultTitle: {
      fontSize: 18,
      fontWeight: "bold",
      letterSpacing: 1.5,
    },
    infoContainer: {
      width: "100%",
      padding: 10,
      marginBottom: 16,
      maxHeight: 200,
    },
    keywordsContainer: {
      width: "100%",
      padding: 10,
      marginBottom: 16,
      maxHeight: 200,
    },
    scrollView: {
      width: "100%",
    },
    infoText: {
      textAlign: "center",
    },
    keywordItem: {
      paddingVertical: 4,
      paddingHorizontal: 8,
      marginVertical: 2,
      backgroundColor: "#ffecec",
      borderRadius: 4,
    },
    keywordText: {
      color: "#d9534f",
    },
    sourceContainer: {
      width: "100%",
      alignItems: "center",
      marginTop: 8,
      paddingBottom: 16,
    },
    sourceText: {
      fontSize: 12,
      color: "#666",
    },
    manualInputContainer: {
      height: 100,
      width: "100%",
      alignItems: "center",
      marginTop: 8,
      paddingBottom: 16,
    },
  });

  return (
    <Fragment>
      <View style={styles.mainContainer}>
        <View style={styles.headerContainer}>
          {/* Product Name */}
          <View style={styles.productNameContainer}>
            <ThemedText style={styles.productName}>
              {scanResult === "unknown" ? t("product") : productName}
            </ThemedText>
          </View>

          {/* Barcode Information - Clickable */}
          {barcodeData && (
            <TouchableOpacity
              onPress={
                scanResult === "unknown"
                  ? openBarcodeLinkUnknown
                  : openBarcodeLinkKnown
              }
              style={styles.barcodeContainer}
            >
              <ThemedText style={styles.barcodeText}>
                {barcodeType}: {barcodeData}
              </ThemedText>
            </TouchableOpacity>
          )}
        </View>

        {/* Animation based on scan result */}
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
        {scanResult === "unknown" && (
          <LottieView
            source={require("@/assets/animations/unknown-product.json")}
            autoPlay
            style={styles.animation}
          />
        )}
        {scanResult === "parse-error" && (
          <LottieView
            source={require("@/assets/animations/parse-error.json")}
            autoPlay
            style={styles.animation}
          />
        )}

        <View style={styles.resultContainer}>
          {/* Result Title */}
          <View style={styles.resultTitleContainer}>
            <ThemedText style={styles.resultTitle}>
              {scanResult === "green"
                ? t("noInsectsFound")
                : scanResult === "red"
                ? t("bugsFound")
                : scanResult === "unknown"
                ? t("unknown")
                : t("error")}
            </ThemedText>
          </View>

          {/* Description or list of keywords based on scan result */}
          {scanResult === "green" && (
            <View style={styles.infoContainer}>
              <ScrollView style={styles.scrollView}>
                <ThemedText style={styles.infoText}>
                  {barcodeData ? t("safeProductDescription") : t("safeProductDescriptionOCR")}
                </ThemedText>
              </ScrollView>
            </View>
          )}

          {scanResult === "red" && matchingKeywords.length > 0 && (
            <View style={styles.keywordsContainer}>
              <ScrollView style={styles.scrollView}>
                {matchingKeywords.map((keyword: any, index: number) => (
                  <View key={index} style={styles.keywordItem}>
                    <ThemedText style={styles.keywordText}>
                      {keyword.name}
                    </ThemedText>
                  </View>
                ))}
              </ScrollView>
            </View>
          )}

          {scanResult === "unknown" && (
            <View style={styles.infoContainer}>
              <ScrollView style={styles.scrollView}>
                <ThemedText style={styles.infoText}>
                  {t("unknownProductDescription")}
                </ThemedText>
              </ScrollView>
            </View>
          )}

          {scanResult === "parse-error" && (
            <View style={styles.infoContainer}>
              <ScrollView style={styles.scrollView}>
                <ThemedText style={styles.infoText}>
                  {t("parseErrorDescription")}
                </ThemedText>
              </ScrollView>
            </View>
          )}
        </View>
      </View>

      {/* Debug Section - Only visible in emulator mode */}
      {appConfig.isEmulatorMode && (
        <View style={{ marginTop: 20 }}>
          <ThemedText style={{ fontSize: 12, color: "#999" }}>
            {t("debugInfoEmulatorOnly")}
          </ThemedText>
          <View
            style={{
              marginTop: 8,
              padding: 8,
              backgroundColor: "#f8f8f8",
              borderRadius: 4,
            }}
          >
            <ThemedText style={{ fontSize: 10 }}>
              {t("keywordsLoaded")}: {keywords.length}
            </ThemedText>
            <ScrollView style={{ maxHeight: 80 }}>
              {keywords.map((keyword: any, index: number) => (
                <ThemedText key={index} style={{ fontSize: 10 }}>
                  {keyword.name}
                </ThemedText>
              ))}
            </ScrollView>
          </View>
        </View>
      )}

      {/* Manual Input Option */}
      {manualInput &&
        (scanResult === "unknown" || scanResult === "parse-error") && (
          <View style={styles.manualInputContainer}>
            <ManualInput />
          </View>
        )}
    </Fragment>
  );
};

export default ScanResultShow;
