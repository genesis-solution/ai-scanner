import { Fragment, useState } from "react";
import { ThemedText } from "./ThemedText";
import LottieView from "lottie-react-native";
import { Button, StyleSheet, TextInput, View } from "react-native";
import { isBlankOrNull } from "@/utils/string";
import { showAlert } from "@/utils/scanAlert";

const ScanResultShow = ({ handleBarcodeScanned, scanResult, code }: any) => {
  const [manualInput, setManualInput] = useState<string>("");
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: "column",
      justifyContent: "space-between",
      gap: 16,
      paddingHorizontal: 8,
    },
    animation: {
      width: 300,
      height: 300,
      alignSelf: "center",
    },
    inputContainer: {
      width: "100%",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      gap: 4,
      paddingHorizontal: 12,
    },
    manualInput: {
      flex: 1,
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
    },
  });

  return (
    <Fragment>
      {scanResult === "green" && (
        <LottieView
          source={require("@/assets/animations/green-tick.json")}
          autoPlay
          style={styles.animation}
        />
      )}
      {scanResult === "red" && (
        <LottieView
          source={require("@/assets/animations/red-cross.json")}
          autoPlay
          style={styles.animation}
        />
      )}
      {scanResult === "unknown" && (
        <LottieView
          source={require("@/assets/animations/unknown-product.json")}
          autoPlay
          style={styles.animation}
        />
      )}
      {scanResult === "parse-error" && (
        <LottieView
          source={require("@/assets/animations/parse-error.json")}
          autoPlay
          style={styles.animation}
        />
      )}
      {(scanResult === "unknown" || scanResult === "parse-error") && (
        <Fragment>
          <ThemedText type="subtitle">Input Manually</ThemedText>
          <View style={styles.inputContainer}>
            <TextInput
              value={manualInput}
              onChangeText={setManualInput}
              style={styles.manualInput}
            />
            <Button
              title="Submit"
              onPress={() => {
                if (isBlankOrNull(manualInput)) {
                  showAlert(`Not a valid code`, "error");
                  return;
                }
                handleBarcodeScanned({ type: "manual", data: manualInput });
              }}
            />
          </View>
        </Fragment>
      )}
    </Fragment>
  );
};

export default ScanResultShow;
