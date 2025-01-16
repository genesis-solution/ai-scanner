import { Fragment } from "react";
import LottieView from "lottie-react-native";
import { StyleSheet } from "react-native";
import ManualInput from "./ManualInput";

type IScreenResultProps = {
  scanResult: string;
  manualInput?: boolean;
};

const ScanResultShow = ({ scanResult, manualInput }: IScreenResultProps) => {
  const styles = StyleSheet.create({
    animation: {
      width: 200,
      height: 200,
      alignSelf: "center",
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
      {manualInput &&
        (scanResult === "unknown" || scanResult === "parse-error") && (
          <ManualInput />
        )}
    </Fragment>
  );
};

export default ScanResultShow;
