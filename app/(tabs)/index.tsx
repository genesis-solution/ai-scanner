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
      paddingTop: 96,
      paddingHorizontal: 12,
      marginHorizontal: 12,
      flexDirection: "row",
      alignItems: "center",
      alignSelf: "center",
    },
    barcodeContainer: {
      flex: 1,
      flexDirection: "column",
      justifyContent: "space-between",
      alignItems: "center",
      gap: 0,
      marginTop: -20,
      paddingTop: 0,
      paddingBottom: 12,
    },
    scanBtnContainer: {
      height: 160,
      width: "100%",
      paddingTop: 24,
      paddingHorizontal: 48,
      justifyContent: "center",
      alignItems: "center",
    },
    manualInputContainer: {
      flexDirection: "column",
      justifyContent: "center",
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
    <SafeAreaView style={styles.container}>
      <View style={styles.titleContainer}>
        <ThemedText
          type="subtitle"
          style={{
            letterSpacing: 2,
          }}
        >
          {t("foodBugScanner")}
        </ThemedText>
      </View>
      <View style={styles.barcodeContainer}>
        <LottieView
          source={require("@/assets/animations/barcode.json")}
          autoPlay
          style={styles.animation}
        />
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
