import { useLayoutEffect } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { router, usePathname } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import CameraScanner from "@/components/CameraScanner";
import ManualInput from "@/components/ManualInput";
import scanLogger from "@/utils/scanLogger";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useTranslation } from "react-i18next";
import useCameraPermission from "@/hooks/useCameraPermission";

export default function ScanScreen() {
  const { hasPermission, checkCameraPermission } = useCameraPermission();
  const { t } = useTranslation();
  const backgroundColor = useThemeColor({}, "background");
  const pathname = usePathname();

  useLayoutEffect(() => {
    console.log(pathname);
    if (pathname !== "/scan") return;
    checkCameraPermission();
  }, [pathname, checkCameraPermission]);

  const handleBarcodeScanned = async ({
    type,
    data,
  }: {
    type: string;
    data: string;
  }) => {
    try {
      router.replace(`/result?type=${type}&data=${data}`);
    } catch (error) {
      scanLogger.error(
        `Barcode Scan Error: ${
          (error as Error).message || "An unexpected error"
        }`
      );
    }
  };

  if (hasPermission === null) {
    return <ThemedText>{t("requestingCameraPermission")}</ThemedText>;
  }
  if (hasPermission === false) {
    return <ThemedText>{t("noCameraAccess")}</ThemedText>;
  }

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
      paddingTop: 64,
      paddingHorizontal: 12,
      paddingBottom: 6,
      marginHorizontal: 12,
      flexDirection: "row",
      alignItems: "center",
      alignSelf: "center",
    },
    barcodeContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      gap: 12,
    },
    cameraContainer: {
      position: "absolute",
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
    },
    scanBtnContainer: {
      justifyContent: "center",
      alignItems: "center",
      height: 128,
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
        <View style={styles.cameraContainer}>
          <CameraScanner handleBarcodeScanned={handleBarcodeScanned} />
        </View>
      </View>
      <View style={styles.scanBtnContainer}>
        <ManualInput />
      </View>
    </SafeAreaView>
  );
}
