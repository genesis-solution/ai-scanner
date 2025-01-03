import { View, StyleSheet } from "react-native";
import { ToastConfig, ToastConfigParams } from "react-native-toast-message";

import { ThemedText } from "@/components/ThemedText";
import { appConfig } from "./config";

const scanToast = ({ props }: ToastConfigParams<any>) => (
  <View
    style={[
      styles.toastWrap,
      {
        borderColor:
          props.type === "error" ? appConfig.colorRed : appConfig.colorGreen,
      },
    ]}
  >
    <ThemedText
      style={{
        color:
          props.type === "error" ? appConfig.colorRed : appConfig.colorGreen,
      }}
    >
      {props.type === "error" ? "❗" : "✔"}
      {`  `}
      {appConfig.appName}
    </ThemedText>
    <ThemedText style={styles.text}>{props.msg}</ThemedText>
  </View>
);

export const toastConfig: ToastConfig = {
  scanToast,
};

const styles = StyleSheet.create({
  toastWrap: {
    height: "auto",
    width: "90%",
    borderWidth: 2,
    borderStyle: "solid",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "rgba(250, 250, 250, .9)",
  },
  text: {
    color: "black",
    paddingTop: 5,
    fontSize: 16,
  },
});
