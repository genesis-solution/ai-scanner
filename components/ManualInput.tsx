import { Button, StyleSheet, TextInput, View } from "react-native";
import { ThemedText } from "./ThemedText";
import { useState } from "react";
import { isBlankOrNull } from "@/utils/string";
import { showAlert } from "@/utils/scanAlert";
import { router } from "expo-router";
import { useTranslation } from "react-i18next";

export default function ManualInput() {
  const [manualInput, setManualInput] = useState<string>("");
  const { t } = useTranslation();

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
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
    },
  });

  return (
    <View>
      <ThemedText type="subtitle" style={{ textAlign: "center" }}>
        {t("orInputManually")}
      </ThemedText>
      <View style={styles.inputContainer}>
        <TextInput
          value={manualInput}
          onChangeText={setManualInput}
          style={styles.manualInput}
          placeholder={t("enterCode")}
        />
        <Button
          title={t("submit")}
          onPress={() => {
            if (isBlankOrNull(manualInput)) {
              showAlert(t("invalidCode"), "error");
              return;
            }
            router.push(`/result?type=manual&data=${manualInput}`);
          }}
        />
      </View>
    </View>
  );
}
