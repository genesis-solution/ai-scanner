import { useState, Fragment } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useSelector } from "react-redux";
import { router, Stack } from "expo-router";
import LottieView from "lottie-react-native";
import { ThemedText } from "@/components/ThemedText";
import ScanResultShow from "@/components/ScanResultShow";
import { useGetParseBarcodeMutation } from "@/store/services/api";
import scanLogger from "@/utils/scanLogger";
import { useThemeColor } from "@/hooks/useThemeColor";
import { IKeyword } from "@/constants/types";
import { useTranslation } from "react-i18next";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { ThemedIcon } from "@/components/ThemedIcon";
import { ThemedTextInputIcon } from "@/components/ThemedTextInputIcon";

const PARSING = "parsing";
const CHECKING_KEYWORDS = "checkingKeywords";
const FINAL = "final";

export default function SearchScreen() {
  const [manualInput, setManualInput] = useState<string>("");

  const [status, setStatus] = useState<string | null>(null);
  const [scanResult, setScanResult] = useState<string>("unknown");
  const [productInfo, setProductInfo] = useState<any>({});
  const [getParseBarcode] = useGetParseBarcodeMutation();
  const borderColor = useThemeColor({}, "text");
  const { t } = useTranslation();

  const keywords: IKeyword[] = useSelector((state: any) => state.scan.keywords);
  const backgroundColor = useThemeColor({}, "background");

  const handleCheckKeywords = () => {
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

  const styles = StyleSheet.create({
    image: {
      flex: 1,
      justifyContent: "center",
    },
    container: {
      flex: 1,
      flexDirection: "column",
      justifyContent: "center",
      paddingHorizontal: 8,
      paddingTop: 96,
      backgroundColor: backgroundColor,
    },
    titleContainer: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      paddingTop: 8,
      paddingBottom: 8,
    },
    searchBarContainer: {
      height: 72,
      flexDirection: "row",
      justifyContent: "center",
      // width: "100%",
    },
    manualInput: {
      flex: 1,
      margin: 12,
      // width: "100%",
      paddingVertical: 10,
      paddingHorizontal: 10,
    },
    resultContainer: {
      marginBottom: 168,
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
          headerLeft: () => (
            <View style={styles.titleContainer}>
              <TouchableOpacity onPress={() => router.back()}>
                <ThemedIcon name="arrow-left" size={18} type="fontawesome" />
              </TouchableOpacity>
              <ThemedText
                type="subtitle"
                style={{
                  flex: 1,
                  letterSpacing: 2,
                  marginLeft: 16,
                  alignSelf: "center",
                }}
              >
                {t("search")}
              </ThemedText>
            </View>
          ),
          headerTitle: "",
        }}
      />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <SafeAreaView style={styles.container}>
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
        </SafeAreaView>
      </KeyboardAvoidingView>
    </Fragment>
  );
}
