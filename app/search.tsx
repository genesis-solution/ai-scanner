import { useState, Fragment, useEffect } from "react";
import { StyleSheet, View } from "react-native";
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
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { ThemedTextInputIcon } from "@/components/ThemedTextInputIcon";

const PARSING = "parsing";
const CHECKING_KEYWORDS = "checkingKeywords";
const FINAL = "final";

export default function SearchScreen() {
  const [manualInput, setManualInput] = useState<string>("");

  const [status, setStatus] = useState<string | null>(null);
  const [scanResult, setScanResult] = useState<string>("unknown");
  const [getParseBarcode] = useGetParseBarcodeMutation();
  const { t } = useTranslation();

  const keywords: IKeyword[] = useSelector((state: any) => state.scan.keywords);
  const backgroundColor = useThemeColor({}, "background");

  const handleCheckKeywords = (productInfo: any) => {
    setStatus(CHECKING_KEYWORDS);
    const hasKeyword = keywords.some((keyword) =>
      JSON.stringify(productInfo).includes(keyword.name)
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
      setStatus(PARSING);
      const parsedContent = await getParseBarcode(manualInput).unwrap();
      scanLogger.log(`Parsed Content Status: `, parsedContent.status);
      if (parsedContent?.status) {
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
  });

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.container}>
      <Fragment>
        <Stack.Screen
          options={{
            headerShown: true,
            headerTransparent: true,
            headerTitle: t("search"),
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
              <ScanResultShow scanResult={scanResult} manualInput={false} />
            )}
          </View>
        </View>
      </Fragment>
    </KeyboardAwareScrollView>
  );
}
