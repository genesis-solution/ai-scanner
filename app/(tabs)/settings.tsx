import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { setLanguage, setTheme } from "@/store/slices/settingsSlice";
import { Picker } from "@react-native-picker/picker";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { useTranslation } from "react-i18next";

export default function SettingsScreen() {
  const { language, theme } = useSelector((state: any) => state.settings);
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();

  const changeLanguage = (value: string) => {
    i18n.changeLanguage(value);
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
      <Text style={styles.title}>{t("settings")}</Text>

      {/* Language Selection */}
      <View style={styles.settingRow}>
        <Text style={styles.label}>{t("language")}</Text>
        <Picker
          selectedValue={language}
          style={styles.picker}
          onValueChange={changeLanguage}
          mode="dropdown"
        >
          <Picker.Item label={t("english")} value="en" />
          <Picker.Item label={t("german")} value="de" />
        </Picker>
      </View>

      {/* Theme Selection */}
      <View style={styles.settingRow}>
        <Text style={styles.label}>{t("theme")}</Text>
        <Picker
          selectedValue={theme}
          style={styles.picker}
          onValueChange={(value) => dispatch(setTheme(value))}
          mode="dropdown"
        >
          <Picker.Item label={t("dark")} value="dark" />
          <Picker.Item label={t("light")} value="light" />
        </Picker>
      </View>

      {/* Privacy Policy */}
      <View style={styles.settingRow}>
        <Text style={styles.label}>{t("privacyPolicy")}</Text>
        <Button
          title={t("view")}
          onPress={() => console.log("Navigate to privacy policy")}
        />
      </View>

      {/* App Version */}
      <View style={styles.settingRow}>
        <Text style={styles.label}>{t("version")}</Text>
        <Text>1.0.0</Text>
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
