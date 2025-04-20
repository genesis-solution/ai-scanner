import { useLayoutEffect, useRef, useState } from "react";
import { SafeAreaView, StyleSheet, View, ActivityIndicator } from "react-native";
import { router, usePathname } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import CameraScanner from "@/components/CameraScanner";
import scanLogger from "@/utils/scanLogger";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useTranslation } from "react-i18next";
import useCameraPermission from "@/hooks/useCameraPermission";
import { CameraView } from "expo-camera";
import { showAlert } from "@/utils/scanAlert";

export default function OCRScreen() {
  const { hasPermission, checkCameraPermission } = useCameraPermission();
  const { t } = useTranslation();
  const backgroundColor = useThemeColor({}, "background");
  const pathname = usePathname();
  const cameraRef = useRef<CameraView | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

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
        setIsProcessing(true);
        
        // Optimize photo options for OCR compatibility across devices
        const options = { 
          quality: 0.85, // Higher quality for better OCR
          base64: true,  // Always request base64
          exif: false,   // No need for EXIF data
          skipProcessing: true, // Skip unnecessary processing
          shutterSound: false 
        };
        
        scanLogger.log("Taking picture for OCR processing...");
        const photo = await cameraRef.current.takePictureAsync(options);
        
        if (!photo || !photo.uri) {
          scanLogger.error("Failed to capture photo: No image data returned");
          showAlert(t("Failed to capture image. Please try again."), "error");
          setIsProcessing(false);
          return;
        }
        
        scanLogger.log(`Photo captured successfully. Size: ${photo.width}x${photo.height}`);
        
        setIsProcessing(false);

        // Navigate with URI and include dimensions for debugging
        router.push(`/result?type=ocr&data=${encodeURIComponent(photo.uri)}&width=${photo.width}&height=${photo.height}`);
      }
    } catch (error) {
      scanLogger.error(`OCR Camera Error: ${(error as Error).message || JSON.stringify(error)}`);
      showAlert(t("Error capturing image. Please try again."), "error");
      setIsProcessing(false);
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
    processingOverlay: {
      ...StyleSheet.absoluteFillObject,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0,0,0,0.5)',
      zIndex: 10
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
        
        {isProcessing && (
          <View style={styles.processingOverlay}>
            <ActivityIndicator size="large" color="#FFFFFF" />
            <ThemedText style={{color: '#FFFFFF', marginTop: 10}}>
              {t("Processing image...")}
            </ThemedText>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}
