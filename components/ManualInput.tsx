import { StyleSheet, TouchableOpacity, View } from "react-native";
import { ThemedText } from "./ThemedText";
import { router } from "expo-router";
import { useTranslation } from "react-i18next";
import { FontAwesome } from "@expo/vector-icons";
import { ThemedTextInputIcon } from "./ThemedTextInputIcon";

export default function ManualInput() {
  const { t } = useTranslation();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      gap: 16,
      paddingHorizontal: 16,
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
      margin: 12,
      width: "100%",
      paddingVertical: 10,
      paddingHorizontal: 10,
    },
  });

  return (
    <View style={styles.container}>
      <ThemedText
        type="defaultSemiBold"
        style={{ textAlign: "center", letterSpacing: 1.5 }}
      >
        {t("orInputManually")}
      </ThemedText>
      <TouchableOpacity
        onPress={() => {
          router.push("/search");
        }}
      >
        <ThemedTextInputIcon
          style={styles.manualInput}
          placeholder={t("search")}
          icon={<FontAwesome name="search" size={32} color="black" />}
          onPress={() => {
            router.push("/search");
          }}
        />
      </TouchableOpacity>
    </View>
  );
}
