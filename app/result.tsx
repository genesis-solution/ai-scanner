import { useEffect, useState, Fragment, useCallback } from "react";
import {
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  useColorScheme,
  View,
  TouchableOpacity,
} from "react-native";
import { useSelector } from "react-redux";
import { router, Stack, useLocalSearchParams } from "expo-router";
import LottieView from "lottie-react-native";
import { ThemedText } from "@/components/ThemedText";
import BigButton from "@/components/BigButton";
import ScanResultShow from "@/components/ScanResultShow";
import { useGetParseBarcodeMutation } from "@/store/services/api";
import scanLogger from "@/utils/scanLogger";
import { useThemeColor } from "@/hooks/useThemeColor";
import { IKeyword } from "@/constants/types";
import { useTranslation } from "react-i18next";
import { FontAwesome } from "@expo/vector-icons";
import { ThemedIcon } from "@/components/ThemedIcon";

const PARSING = "parsing";
const CHECKING_KEYWORDS = "checkingKeywords";
const FINAL = "final";

export default function ScanScreen() {
  const [status, setStatus] = useState<string>(PARSING);
  const [scanResult, setScanResult] = useState<string>("unknown");
  const [productInfo, setProductInfo] = useState<any>({});
  const [getParseBarcode] = useGetParseBarcodeMutation();
  const borderColor = useThemeColor({}, "text");
  const { t } = useTranslation();

  const keywords: IKeyword[] = useSelector((state: any) => state.scan.keywords);
  const { type, data } = useLocalSearchParams();
  const colorScheme = useColorScheme(); // Get the current theme

  useEffect(() => {
    if (!type || !data) {
      scanLogger.warn(
        `Navigated to result screen with wrong type and data: ${type} - ${data}`
      );
      router.back();
    }
    scanLogger.log(`Navigated to result screen: ${type} - ${data}`);
  }, []);

  const handleCheckKeywords = useCallback(() => {
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
  }, []);

  useEffect(() => {
    const parseCode = async () => {
      try {
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
    parseCode();
  }, []);

  // Select the background image based on the theme
  const image =
    colorScheme === "dark"
      ? require("@/assets/images/dark-bg.jpg")
      : require("@/assets/images/light-bg.jpg");

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
      width: "100%",
      flexDirection: "row",
      alignItems: "center",
      paddingBottom: 8,
      borderColor: borderColor,
      borderBottomWidth: 2,
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
          headerLeft: () => (
            <View style={styles.titleContainer}>
              <TouchableOpacity onPress={() => router.back()}>
                <ThemedIcon name="arrow-left" size={18} type="fontawesome" />
              </TouchableOpacity>
              <ThemedText style={{ marginLeft: 16 }} type="title">
                {t("foodBugScanner")}
              </ThemedText>
            </View>
          ),
          headerTitle: "",
        }}
      />
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <SafeAreaView style={styles.container}>
          <View style={styles.resultContainer}>
            {status === PARSING && (
              <LottieView
                source={require("@/assets/animations/parsing.json")}
                autoPlay
                style={styles.animation}
              />
            )}
            {status === FINAL && <ScanResultShow scanResult={scanResult} />}
          </View>
          <View style={styles.scanBtnContainer}>
            {status === FINAL && (
              <BigButton
                title={t("scanAgain")}
                onPress={() => {
                  router.replace("/(tabs)/scan");
                }}
                icon={<FontAwesome name="repeat" size={48} color="white" />}
              />
            )}
          </View>
        </SafeAreaView>
      </ImageBackground>
    </Fragment>
  );
}
