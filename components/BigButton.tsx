import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ReactNode } from "react";
import { useThemeColor } from "@/hooks/useThemeColor";

const BigButton = ({
  onPress,
  title,
  disabled,
  icon,
}: {
  onPress: () => void;
  title: string;
  disabled?: boolean;
  icon?: ReactNode; // Accepts a ReactNode for the icon
}) => {
  const styles = StyleSheet.create({
    appButtonContainer: {
      elevation: 8,
      backgroundColor: useThemeColor({}, "button"),
      width: "75%",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
      borderRadius: 10,
      paddingVertical: 10,
      paddingHorizontal: 12,
    },
    appButtonText: {
      flex: 1,
      textAlign: "center",
      fontSize: 24,
      color: useThemeColor({}, "buttonText"),
      fontWeight: "bold",
      textTransform: "uppercase",
    },
    appButtonDisabled: {
      backgroundColor: "#000",
    },
    iconContainer: {},
  });

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.appButtonContainer, disabled && styles.appButtonDisabled]}
      disabled={disabled}
    >
      <View style={styles.iconContainer}>{icon}</View>
      <Text style={styles.appButtonText}>{title}</Text>
    </TouchableOpacity>
  );
};

export default BigButton;
