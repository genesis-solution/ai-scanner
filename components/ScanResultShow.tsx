import { Fragment } from "react";
import LottieView from "lottie-react-native";
import { StyleSheet } from "react-native";
import ManualInput from "./ManualInput";

type IScreenResultProps = {
  scanResult: string;
  manualInput?: boolean;
  productInfo?: string;
};

const ScanResultShow = ({ scanResult, manualInput, productInfo }: IScreenResultProps) => {
  const styles = StyleSheet.create({
    animation: {
      width: 200,
      height: 200,
      alignSelf: "center",
    },
    infoContainer: {
      height: 100,
      width: '100%',
      padding: 10,
      marginBottom: 10,
      borderBottomWidth: 0.5,
      borderBottomColor: '#ccc',
    },
    keywordsContainer: {
      height: 100,
      width: '100%',
      padding: 10,
      marginBottom: 10,
    },
    scrollView: {
      flex: 1,
      width: '100%',
    },
    infoText: {
      textAlign: 'center',
    },
    keywordHeader: {
      fontWeight: 'bold',
      marginBottom: 5,
    }
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
