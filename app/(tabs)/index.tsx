import {
  Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  View,
} from "react-native";

import { ThemedText } from "@/components/ThemedText";
import LottieView from "lottie-react-native";
import { useEffect, useState, Fragment } from "react";
import { useGetKeywordsMutation } from "@/store/services/api";
import scanLogger from "@/utils/scanLogger";
import { useThemeColor } from "@/hooks/useThemeColor";
import BigButton from "@/components/BigButton";
import { IKeyword } from "@/constants/types";
import { router } from "expo-router";

export default function HomeScreen() {
  const [keywords, setKeywords] = useState<IKeyword[]>([]);
  const [splashTimeout, setSplashTimeout] = useState(false);
  const [getKeywords, { isLoading: isGettingKeywords }] =
    useGetKeywordsMutation();
  const borderColor = useThemeColor({}, "text");

  useEffect(() => {
    setTimeout(() => {
      setSplashTimeout(true);
    }, 2500);
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
    scanBtnContainer: {
      justifyContent: "center",
      alignItems: "center",
      height: 128,
      marginBottom: 8,
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
        <Image
          source={require("@/assets/images/icon.png")}
          style={styles.splashIcon}
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
            <ThemedText type="title">Food Bug Scanner</ThemedText>
          </View>
          <View style={styles.barcodeContainer}>
            <LottieView
              source={require("@/assets/animations/barcode.json")}
              autoPlay
              style={styles.animation}
            />
          </View>
          <View style={styles.scanBtnContainer}>
            <BigButton
              title="Tap to Scan"
              onPress={() => {
                router.replace("/scan");
              }}
            />
          </View>
        </Fragment>
      </SafeAreaView>
    </ImageBackground>
  );
}
