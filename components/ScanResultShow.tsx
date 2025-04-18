import { Fragment } from "react";
import LottieView from "lottie-react-native";
import { StyleSheet, View, ScrollView, StyleProp, ViewStyle, TextStyle } from "react-native";
import ManualInput from "./ManualInput";
import { ThemedText } from "./ThemedText";
import { useSelector } from "react-redux";

type IScreenResultProps = {
  scanResult: string;
  manualInput?: boolean;
  productInfo?: string;
};

const ScanResultShow = ({ scanResult, manualInput, productInfo }: IScreenResultProps) => {
  // Get keywords from Redux store
  const keywords = useSelector((state: any) => state.scan.keywords);

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
      <View style={styles.infoContainer}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}
          showsVerticalScrollIndicator={true}
        >
          <ThemedText style={styles.infoText}>
            {productInfo || (scanResult === "green" ? "This product is safe!" : 
              scanResult === "red" ? "This product contains keywords you're avoiding!" :
              scanResult === "unknown" ? "Unknown product. Try scanning again or enter manually." :
              "Error parsing the scan. Try scanning again or enter manually.")}
          </ThemedText>
        </ScrollView>
      </View>
      
      <View style={styles.keywordsContainer}>
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={true}
        >
          <ThemedText style={styles.keywordHeader}>
            Keywords Loaded: {keywords.length}
          </ThemedText>
          
          {keywords.map((keyword: any, index: number) => (
            <ThemedText key={index}>
              {keyword.name}
            </ThemedText>
          ))}
          
          {keywords.length === 0 && (
            <ThemedText>No keywords configured</ThemedText>
          )}
        </ScrollView>
      </View>
      
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
