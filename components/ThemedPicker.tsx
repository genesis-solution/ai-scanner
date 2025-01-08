import React from "react";
import { Picker, type PickerProps } from "@react-native-picker/picker";
import { useThemeColor } from "@/hooks/useThemeColor";
import { StyleSheet } from "react-native";

export type ThemedPickerProps = PickerProps & {
  lightColor?: string;
  darkColor?: string;
};

export function ThemedPicker({
  style,
  lightColor,
  darkColor,
  ...rest
}: ThemedPickerProps) {
  const color = useThemeColor({}, "text");

  return <Picker style={[{ color }, styles.picker, style]} {...rest} />;
}

const styles = StyleSheet.create({
  picker: {},
});
