import { Button, Image, StyleSheet } from "react-native";

import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { ScanNow } from "@/components/ScanNow";
import LottieView from "lottie-react-native";

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/partial-react-logo.png")}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.container}>
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">Scan Now!</ThemedText>
          <ScanNow />
        </ThemedView>
        <ThemedView>
          <LottieView
            source={require("@/assets/animations/scanner.json")}
            autoPlay
            loop
            style={styles.animation}
          />
        </ThemedView>
        <ThemedView style={styles.scanBtnContainer}>
          <Button
            title="Scan"
            // onPress={() => {
            //   setScanned(false);
            //   setShowScanner(false);
            // }}
          />
        </ThemedView>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  titleContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  scanBtnContainer: {
    flex: 1,
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
});
