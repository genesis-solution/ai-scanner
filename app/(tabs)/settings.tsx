import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { setLanguage, setTheme } from "@/store/slices/settingsSlice";
import { Picker } from "@react-native-picker/picker";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { useTranslation } from "react-i18next";
import { ThemedText } from "@/components/ThemedText";
import { ThemedPicker } from "@/components/ThemedPicker";
import { ItemValue } from "@react-native-picker/picker/typings/Picker";
import { router } from "expo-router";
import * as Linking from "expo-linking";
import { ThemedIcon } from "@/components/ThemedIcon";
import { useThemeColor } from "@/hooks/useThemeColor";

export default function SettingsScreen() {
  const { language, theme } = useSelector((state: any) => state.settings);
  const borderColor = useThemeColor({}, "text");
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();

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
      marginBottom: 36,
    },
    section: {
      marginBottom: 24,
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: "bold",
      marginBottom: 8,
      textAlign: "center",
      // borderColor: borderColor,
      // borderBottomWidth: 1,
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
      flex: 1,
      height: 60,
    },
    optionRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      backgroundColor: "rgba(128, 128, 128, 0.1)",
      padding: 12,
      borderRadius: 8,
      marginBottom: 8,
    },
    optionText: {
      fontSize: 16,
    },
  });

  const changeLanguage = (value: ItemValue, index: number) => {
    i18n.changeLanguage(value as string);
    dispatch(setLanguage(value));
  };

  const renderOptionRow = (
    iconName: any,
    text: string,
    onPress: () => void
  ) => (
    <TouchableOpacity style={styles.optionRow} onPress={onPress}>
      <ThemedText style={styles.optionText}>{text}</ThemedText>
      <ThemedIcon name={iconName} />
    </TouchableOpacity>
  );

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
      {/* General Section */}
      <View style={[styles.section, { marginTop: 24 }]}>
        <ThemedText style={styles.sectionTitle}>{t("general")}</ThemedText>

        {/* Language Selection */}
        <View style={[styles.optionRow, { paddingVertical: 0 }]}>
          <ThemedText style={styles.label}>{t("language")}</ThemedText>
          <ThemedIcon name="language" />
          <ThemedPicker
            selectedValue={language}
            style={styles.picker}
            onValueChange={changeLanguage}
            mode="dropdown"
            lightColor="#000"
            darkColor="#fff"
          >
            <Picker.Item label={t("english")} value="en" />
            <Picker.Item label={t("german")} value="de" />
          </ThemedPicker>
        </View>

        {/* Theme Selection */}
        <View style={[styles.optionRow, { paddingVertical: 0 }]}>
          <ThemedText style={styles.label}>{t("theme")}</ThemedText>
          <ThemedIcon name="palette" />
          <ThemedPicker
            selectedValue={theme}
            style={styles.picker}
            onValueChange={(value) => dispatch(setTheme(value))}
            mode="dropdown"
            lightColor="#000"
            darkColor="#fff"
          >
            <Picker.Item label={t("dark")} value="dark" />
            <Picker.Item label={t("light")} value="light" />
          </ThemedPicker>
        </View>
      </View>

      {/* Contact Section */}
      <View style={styles.section}>
        <ThemedText style={styles.sectionTitle}>{t("contact")}</ThemedText>

        {renderOptionRow("contact-mail", t("contact"), () => {
          router.push("/contact");
        })}

        {renderOptionRow("telegram", t("telegram"), () => {
          Linking.openURL("https://t.me/your_telegram_channel");
        })}

        {renderOptionRow("language", t("website"), () => {
          Linking.openURL("https://yourwebsite.com");
        })}
      </View>

      {/* App Section */}
      <View style={styles.section}>
        <ThemedText style={styles.sectionTitle}>{t("app")}</ThemedText>

        {renderOptionRow("question-answer", t("faq"), () => {
          router.push("/faq");
        })}

        {renderOptionRow("lock-outline", t("privacyPolicy"), () => {
          router.push("/privacy");
        })}

        {renderOptionRow("info", `${t("version")}: 1.0.0`, () => {})}
      </View>
    </ParallaxScrollView>
  );
}
