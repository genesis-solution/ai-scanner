import React, { useLayoutEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useLocalSearchParams, usePathname } from "expo-router";
import OCRScreen from "@/components/screens/ocr";
import ScanScreen from "@/components/screens/scan";
import useCameraPermission from "@/hooks/useCameraPermission";
import { ThemedText } from "@/components/ThemedText";
import { useTranslation } from "react-i18next";

const UnifiedScreen = () => {
  const pathname = usePathname();
  const { mode } = useLocalSearchParams();
  const { t } = useTranslation();
  const { hasPermission, checkCameraPermission } = useCameraPermission();

  useLayoutEffect(() => {
    if (pathname !== "/unified") return;
    checkCameraPermission();
  }, [pathname, checkCameraPermission]);

  if (hasPermission === null) {
    return <ThemedText>{t("requestingCameraPermission")}</ThemedText>;
  }
  if (hasPermission === false) {
    return <ThemedText>{t("noCameraAccess")}</ThemedText>;
  }

  return (
    <View style={styles.container}>
      {mode === "scan" ? <ScanScreen /> : <OCRScreen />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default UnifiedScreen;
