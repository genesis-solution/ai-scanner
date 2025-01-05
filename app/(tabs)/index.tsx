import { ImageBackground, SafeAreaView, StyleSheet, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import LottieView from "lottie-react-native";
import { useThemeColor } from "@/hooks/useThemeColor";
import BigButton from "@/components/BigButton";
import { router } from "expo-router";
import ManualInput from "@/components/ManualInput";
import { useTranslation } from "react-i18next";
import { useColorScheme } from "@/hooks/useColorScheme"; // Import your custom hook or use React Native's useColorScheme

export default function HomeScreen() {
  const { t } = useTranslation();
  const borderColor = useThemeColor({}, "text");
  const colorScheme = useColorScheme(); // Get the current theme

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
      paddingVertical: 24,
    },
    scanBtnContainer: {
      height: 120,
      width: "100%",
      paddingBottom: 48,
      paddingHorizontal: 48,
      justifyContent: "center",
      alignItems: "center",
    },
    manualInputContainer: {
      flexDirection: "column",
      justifyContent: "flex-start",
      alignItems: "center",
      height: 160,
      paddingTop: 12,
      paddingBottom: 12,
    },
    animation: {
      flex: 1,
      width: 300,
      height: 300,
      alignSelf: "center",
    },
  });

  return (
    <ImageBackground source={image} resizeMode="cover" style={styles.image}>
      <SafeAreaView style={styles.container}>
        <View style={styles.titleContainer}>
          <ThemedText type="title">{t("foodBugScanner")}</ThemedText>
        </View>
        <View style={styles.barcodeContainer}>
          <LottieView
            source={require("@/assets/animations/barcode.json")}
            autoPlay
            style={styles.animation}
          />
          <View style={styles.scanBtnContainer}>
            <BigButton
              title={t("tapToScan")}
              onPress={() => {
                router.replace("/scan");
              }}
            />
          </View>
        </View>
        <View style={styles.manualInputContainer}>
          <ManualInput />
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}
