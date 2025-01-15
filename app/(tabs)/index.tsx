import { SafeAreaView, StyleSheet, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import LottieView from "lottie-react-native";
import { useThemeColor } from "@/hooks/useThemeColor";
import BigButton from "@/components/BigButton";
import { router } from "expo-router";
import ManualInput from "@/components/ManualInput";
import { useTranslation } from "react-i18next";
import { Ionicons } from "@expo/vector-icons";

export default function HomeScreen() {
  const { t } = useTranslation();

  const styles = StyleSheet.create({
    image: {
      flex: 1,
      justifyContent: "center",
    },
    container: {
      flex: 1,
      flexDirection: "column",
      justifyContent: "space-between",
      gap: 0,
      paddingHorizontal: 8,
      backgroundColor: useThemeColor({}, "background"),
    },
    titleContainer: {
      paddingTop: 64,
      paddingHorizontal: 12,
      marginHorizontal: 12,
      flexDirection: "row",
      alignItems: "center",
      alignSelf: "center",
      letterSpacing: 2,
    },
    barcodeContainer: {
      height: 160,
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      gap: 24,
      padding: 0,
    },
    scanBtnContainer: {
      height: 80,
      width: "60%",
      justifyContent: "center",
      alignItems: "center",
    },
    manualInputContainer: {
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      height: 160,
      paddingHorizontal: 24,
    },
    animation: {
      flex: 1,
      width: "100%",
      alignSelf: "center",
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <ThemedText type="subtitle" style={styles.titleContainer}>
        {t("foodBugScanner")}
      </ThemedText>
      <LottieView
        source={require("@/assets/animations/barcode.json")}
        autoPlay
        style={styles.animation}
      />
      <View style={styles.barcodeContainer}>
        <ThemedText type="defaultSemiBold" style={{ letterSpacing: 1.5 }}>
          {t("scanAFoodBarcode")}
        </ThemedText>
        <View style={styles.scanBtnContainer}>
          <BigButton
            title={t("tapToScan")}
            onPress={() => {
              router.replace("/scan");
            }}
            icon={<Ionicons name="scan" size={48} color="white" />}
          />
        </View>
      </View>
      <View style={styles.manualInputContainer}>
        <ManualInput />
      </View>
    </SafeAreaView>
  );
}
