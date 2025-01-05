import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ReactNode } from "react";

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

const styles = StyleSheet.create({
  appButtonContainer: {
    elevation: 8,
    backgroundColor: "#009688",
    height: "100%",
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  appButtonText: {
    fontSize: 24,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase",
  },
  appButtonDisabled: {
    backgroundColor: "#000",
  },
  iconContainer: {
    marginRight: 8, // Add some space between the icon and the text
  },
});

export default BigButton;
