import React from "react";
import { View, StyleSheet, Button } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { setLanguage, setTheme } from "@/store/slices/settingsSlice";
import { Picker } from "@react-native-picker/picker";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { useTranslation } from "react-i18next";
import { ThemedText } from "@/components/ThemedText";
import { ThemedPicker } from "@/components/ThemedPicker";
import { ItemValue } from "@react-native-picker/picker/typings/Picker";

export default function SettingsScreen() {
  const { language, theme } = useSelector((state: any) => state.settings);
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();

  const changeLanguage = (value: ItemValue, index: number) => {
    i18n.changeLanguage(value as string);
    dispatch(setLanguage(value));
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
      headerImage={
        <IconSymbol
          size={310}
          color="#808080"
          name="gearshape.fill"
          style={styles.headerImage}
        />
      }
    >
      <ThemedText style={styles.title}>{t("settings")}</ThemedText>

      {/* Language Selection */}
      <View style={styles.settingRow}>
        <ThemedText style={styles.label}>{t("language")}</ThemedText>
        <ThemedPicker
          selectedValue={language}
          style={styles.picker}
          onValueChange={changeLanguage}
          mode="dropdown"
          lightColor="#000" // Example light color
          darkColor="#fff" // Example dark color
        >
          <Picker.Item label={t("english")} value="en" />
          <Picker.Item label={t("german")} value="de" />
        </ThemedPicker>
      </View>

      {/* Theme Selection */}
      <View style={styles.settingRow}>
        <ThemedText style={styles.label}>{t("theme")}</ThemedText>
        <ThemedPicker
          selectedValue={theme}
          style={styles.picker}
          onValueChange={(value) => dispatch(setTheme(value))}
          mode="dropdown"
          lightColor="#000" // Example light color
          darkColor="#fff" // Example dark color
        >
          <Picker.Item label={t("dark")} value="dark" />
          <Picker.Item label={t("light")} value="light" />
        </ThemedPicker>
      </View>

      {/* Privacy Policy */}
      <View style={styles.settingRow}>
        <ThemedText style={styles.label}>{t("privacyPolicy")}</ThemedText>
        <Button
          title={t("view")}
          onPress={() => console.log("Navigate to privacy policy")}
        />
      </View>

      {/* App Version */}
      <View style={styles.settingRow}>
        <ThemedText style={styles.label}>{t("version")}</ThemedText>
        <ThemedText>1.0.0</ThemedText>
      </View>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  settingRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    flex: 1,
  },
  picker: {
    flex: 2,
    height: 50,
  },
});
