import { CameraView } from "expo-camera";
import { StyleSheet, View } from "react-native";

type ICameraScannerProps = {
  handleBarcodeScanned: ({
    type,
    data,
  }: {
    type: string;
    data: string;
  }) => void;
};

export default function CameraScanner({
  handleBarcodeScanned,
}: ICameraScannerProps) {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    cameraViewWrap: {
      flex: 1,
      position: "relative",
    },
    cameraView: {
      position: "absolute",
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
    },
  });
  return (
    <View style={styles.container}>
      <View style={styles.cameraViewWrap}>
        <CameraView
          onBarcodeScanned={handleBarcodeScanned}
          barcodeScannerSettings={{
            barcodeTypes: [
              "ean13",
              "ean8",
              "upc_e",
              "code39",
              "code93",
              "itf14",
              "code128",
              "upc_a",
            ],
          }}
          style={styles.cameraView}
        />
      </View>
    </View>
  );
}
