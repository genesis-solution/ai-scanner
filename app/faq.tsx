import React, { useEffect } from "react";
import { View, StyleSheet, Platform, UIManager } from "react-native";
import { AccordionList } from "react-native-accordion-list-view";
import { ThemedText } from "@/components/ThemedText";

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
  useEffect(() => {
    if (Platform.OS === "android") {
      if (UIManager.setLayoutAnimationEnabledExperimental) {
        UIManager.setLayoutAnimationEnabledExperimental(true);
      }
    }
  }, []);

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
        expandMultiple={true}
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
