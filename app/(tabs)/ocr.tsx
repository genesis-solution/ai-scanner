import { useLayoutEffect, useRef } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { router, usePathname } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import CameraScanner from "@/components/CameraScanner";
import scanLogger from "@/utils/scanLogger";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useTranslation } from "react-i18next";
import useCameraPermission from "@/hooks/useCameraPermission";
import { usePostOCRMutation } from "@/store/services/api";
import { CameraView, CameraViewRef } from "expo-camera";
import { showAlert } from "@/utils/scanAlert";

export default function OCRScreen() {
  const { hasPermission, checkCameraPermission } = useCameraPermission();
  const { t } = useTranslation();
  const backgroundColor = useThemeColor({}, "background");
  const pathname = usePathname();
  const cameraRef = useRef<CameraView | null>(null);
  const [postOCR] = usePostOCRMutation();

  useLayoutEffect(() => {
    console.log(pathname);

    if (pathname !== "/ocr") return;

    checkCameraPermission();
  }, [pathname, checkCameraPermission]);

  if (hasPermission === null) {
    return <ThemedText>{t("requestingCameraPermission")}</ThemedText>;
  }
  if (hasPermission === false) {
    return <ThemedText>{t("noCameraAccess")}</ThemedText>;
  }

  const handleOCRScanned = async () => {
    try {
      if (cameraRef.current) {
        const options = { quality: 0.5, base64: true };
        const photo = await cameraRef.current.takePictureAsync(options);
        scanLogger.log("Photo taken:", photo);
        if (!photo) return;

        const formData = new FormData();
        formData.append("apikey", "K83477011988957");

        const response = await fetch(photo.uri);
        const blob = await response.blob();
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = () => {
          const base64data = reader.result;
          formData.append("base64Image", base64data as string);
          // scanLogger.log("call api - post-OCR:", formData);

          postOCR(formData)
            .unwrap()
            .then((result) => {
              scanLogger.log("OCR result:", result);
            })
            .catch((error) => {
              scanLogger.error(
                `Error: `,
                (error as Error).message || error.error || JSON.stringify(error)
              );
              showAlert(
                `Photo Upload Error: ${
                  (error as Error).message ||
                  error.error ||
                  JSON.stringify(error)
                }`,
                "error"
              );
            });
        };
        // scanLogger.log("call api - post-OCR:", formData);

        // const result = await postOCR(formData).unwrap();
        // scanLogger.log("OCR result:", result);
      }
    } catch (error) {
      scanLogger.error(`Error: `, (error as Error).message || error);
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
      marginBottom: 8,
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
          <CameraScanner
            type="ocr"
            handleOCRScanned={handleOCRScanned}
            cameraRef={cameraRef}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
