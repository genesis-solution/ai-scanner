import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Platform,
  UIManager,
  TouchableOpacity,
} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedIcon } from "./ThemedIcon";
import { useThemeColor } from "@/hooks/useThemeColor";

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const ThemedAccordion = ({ data }: { data: any }) => {
  const [expandedSections, setExpandedSections] = useState<string[]>([]);
  const accordionTitleColor = useThemeColor({}, "accordionTitle");
  const accordionContentColor = useThemeColor({}, "accordionContent");

  const styles = StyleSheet.create({
    section: {
      marginBottom: 16,
    },
    titleContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      padding: 12,
      backgroundColor: accordionTitleColor,
      borderRadius: 8,
    },
    title: {
      fontSize: 18,
      fontWeight: "bold",
    },
    contentContainer: {
      padding: 12,
      backgroundColor: accordionContentColor,
      borderRadius: 8,
    },
    content: {
      fontSize: 16,
    },
  });

  const toggleSection = (id: string) => {
    setExpandedSections((prev: string[]) =>
      prev.includes(id)
        ? prev.filter((sectionId) => sectionId !== id)
        : [...prev, id]
    );
  };

  return (
    <View>
      {data.map((item: any) => (
        <View key={item.id} style={styles.section}>
          <TouchableOpacity
            style={styles.titleContainer}
            onPress={() => toggleSection(item.id)}
          >
            <ThemedText style={styles.title}>{item.title}</ThemedText>
            <ThemedIcon
              name={
                expandedSections.includes(item.id)
                  ? "expand-less"
                  : "expand-more"
              }
              size={24}
            />
          </TouchableOpacity>
          {expandedSections.includes(item.id) && (
            <View style={styles.contentContainer}>
              <ThemedText style={styles.content}>{item.content}</ThemedText>
            </View>
          )}
        </View>
      ))}
    </View>
  );
};

export default ThemedAccordion;
