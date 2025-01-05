import { Button, StyleSheet, View } from "react-native";
import { ThemedText } from "./ThemedText";
import { ThemedTextInput } from "./ThemedTextInput"; // Import the new component
import { useState } from "react";
import { isBlankOrNull } from "@/utils/string";
import { showAlert } from "@/utils/scanAlert";
import { router, usePathname } from "expo-router";
import { useTranslation } from "react-i18next";

export default function ManualInput() {
  const [manualInput, setManualInput] = useState<string>("");
  const { t } = useTranslation();
  const pathname = usePathname();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      gap: 16,
      paddingHorizontal: 8,
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
      margin: 12,
    },
  });

  return (
    <View>
      <ThemedText type="subtitle" style={{ textAlign: "center" }}>
        {t("orInputManually")}
      </ThemedText>
      <View style={styles.inputContainer}>
        <ThemedTextInput
          value={manualInput}
          onChangeText={setManualInput}
          style={styles.manualInput}
          placeholder={t("enterCode")}
          lightColor="#000" // Example light color
          darkColor="#fff" // Example dark color
        />
        <Button
          title={t("submit")}
          onPress={() => {
            if (isBlankOrNull(manualInput)) {
              showAlert(t("invalidCode"), "error");
              return;
            }

            // Check if the current route is not /result before navigating
            if (pathname !== "/result") {
              router.push(`/result?type=manual&data=${manualInput}`);
            } else {
              router.replace(`/result?type=manual&data=${manualInput}`);
            }
          }}
        />
      </View>
    </View>
  );
}
