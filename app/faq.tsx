import React, { Fragment } from "react";
import { View, StyleSheet } from "react-native";
import ThemedAccordion from "@/components/ThemedAccordion";
import { Stack } from "expo-router";
import { useTranslation } from "react-i18next";
import { useThemeColor } from "@/hooks/useThemeColor";

export default function FAQScreen() {
  const { t } = useTranslation();

  const faqData = [
    {
      id: 0,
      title: t("q0"),
      content: t("a0"),
    },
    {
      id: 1,
      title: t("q1"),
      content: t("a1"),
    },
    // Add more FAQs as needed
  ];

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      paddingTop: 96,
      backgroundColor: useThemeColor({}, "background"),
    },
  });

  return (
    <Fragment>
      <Stack.Screen
        options={{ title: t("faq.title"), headerTransparent: true }}
      />
      <View style={styles.container}>
        <ThemedAccordion data={faqData} />
      </View>
    </Fragment>
  );
}
