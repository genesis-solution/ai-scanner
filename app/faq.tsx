import React, { Fragment } from "react";
import { View, StyleSheet } from "react-native";
import ThemedAccordion from "@/components/ThemedAccordion";
import { Stack } from "expo-router";
import { useTranslation } from "react-i18next";

const faqData = [
  {
    id: 0,
    title: "What is this app?",
    content: "This app is a demo for managing settings in a React Native app.",
  },
  {
    id: 1,
    title: "How do I change the language?",
    content:
      "You can change the language in the settings under the General section.",
  },
  // Add more FAQs as needed
];

export default function FAQScreen() {
  const { t } = useTranslation();

  return (
    <Fragment>
      <Stack.Screen options={{ title: t("faq.title") }} />
      <View style={styles.container}>
        <ThemedAccordion data={faqData} />
      </View>
    </Fragment>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
});
