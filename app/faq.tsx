import React from "react";
import { View, StyleSheet } from "react-native";
import { AccordionList } from "react-native-accordion-list-view";
import { ThemedText } from "@/components/ThemedText";

const faqData = [
  {
    title: "What is this app?",
    content: "This app is a demo for managing settings in a React Native app.",
  },
  {
    title: "How do I change the language?",
    content:
      "You can change the language in the settings under the General section.",
  },
  // Add more FAQs as needed
];

export default function FAQScreen() {
  return (
    <View style={styles.container}>
      <AccordionList
        data={faqData}
        customTitle={(item) => (
          <ThemedText style={styles.title}>{item.title}</ThemedText>
        )}
        customBody={(item) => (
          <ThemedText style={styles.content}>{item.content}</ThemedText>
        )}
        animationDuration={400}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  content: {
    fontSize: 16,
    marginBottom: 16,
  },
});
