import React from "react";
import {
  StyleProp,
  StyleSheet,
  TextInput,
  View,
  ViewStyle,
  type TextInputProps,
} from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";

export type ThemedTextInputProps = TextInputProps & {
  style?: StyleProp<ViewStyle>;
  lightColor?: string;
  darkColor?: string;
  icon?: React.ReactNode;
};

export function ThemedTextInputIcon({
  style,
  lightColor,
  darkColor,
  icon,
  ...rest
}: ThemedTextInputProps) {
  const color = useThemeColor({}, "text");
  const backgroundColor = useThemeColor({}, "background");

  return (
    <View style={[styles.container, style]}>
      {icon && <View style={styles.iconContainer}>{icon}</View>}
      <TextInput
        style={[{ color, backgroundColor }, styles.textInput]}
        placeholderTextColor={color}
        {...rest}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 4,
    padding: 5,
  },
  iconContainer: {
    marginRight: 8,
  },
  textInput: {
    flex: 1,
    borderWidth: 0,
    padding: 0,
    // borderColor: 
  },
});
