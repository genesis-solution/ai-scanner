import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { setLanguage, setTheme } from "@/store/slices/settingsSlice";
import { Picker } from "@react-native-picker/picker";
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
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: "column",
      justifyContent: "space-between",
      alignItems: "center",
      paddingTop: 64,
      backgroundColor: useThemeColor({}, "background"),
    },
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
      width: "100%",
      marginBottom: 12,
      padding: 8,
    },
    sectionTitle: {
      fontSize: 14,
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
    <View style={styles.container}>
      <ThemedText type="subtitle" style={{ letterSpacing: 2 }}>
        {t("settings")}
      </ThemedText>
      {/* General Section */}
      <View style={styles.section}>
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
            <Picker.Item label={t("spanish")} value="es" />
            <Picker.Item label={t("french")} value="fr" />
            <Picker.Item label={t("chinese")} value="zh" />
            <Picker.Item label={t("arabic")} value="ar" />
            <Picker.Item label={t("hindi")} value="hi" />
            <Picker.Item label={t("portuguese")} value="pt" />
            <Picker.Item label={t("russian")} value="ru" />
            <Picker.Item label={t("japanese")} value="ja" />
            <Picker.Item label={t("italian")} value="it" />
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
            <Picker.Item label={t("white")} value="white" />
            <Picker.Item
              label={t("lightGrayishBlue")}
              value="lightGrayishBlue"
            />
            <Picker.Item label={t("lightBlue")} value="lightBlue" />
            <Picker.Item label={t("pastelGreen")} value="pastelGreen" />
            <Picker.Item label={t("softBlue")} value="softBlue" />
          </ThemedPicker>
        </View>
      </View>

      {/* Contact Section */}
      <View style={styles.section}>
        <ThemedText style={styles.sectionTitle}>
          {t("contact.title")}
        </ThemedText>

        {renderOptionRow("contact-mail", t("contact.title"), () => {
          router.push("/contact");
        })}

        {renderOptionRow("telegram", t("telegram"), () => {
          Linking.openURL("https://t.me/FoodBugScanner");
        })}
      </View>

      {/* App Section */}
      <View style={styles.section}>
        <ThemedText style={styles.sectionTitle}>{t("app")}</ThemedText>

        {renderOptionRow("question-answer", t("faq.title"), () => {
          router.push("/faq");
        })}

        {renderOptionRow("lock-outline", t("privacyPolicy"), () => {
          router.push("/privacy");
        })}

        {renderOptionRow("info", `${t("version")}: 2.0.0`, () => {})}
      </View>
    </View>
  );
}
