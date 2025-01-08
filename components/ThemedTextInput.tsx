import React from "react";
import { StyleSheet, TextInput, type TextInputProps } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";

export type ThemedTextInputProps = TextInputProps & {
  lightColor?: string;
  darkColor?: string;
};

export function ThemedTextInput({
  style,
  lightColor,
  darkColor,
  ...rest
}: ThemedTextInputProps) {
  const color = useThemeColor({}, "text");
  const backgroundColor = useThemeColor({}, "background");

  return (
    <TextInput
      style={[
        { color, backgroundColor, borderColor: color },
        styles.textInput,
        style,
      ]}
      placeholderTextColor={color}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  textInput: {
    height: 40,
    borderWidth: 1,
    padding: 10,
    borderRadius: 4,
    // Add any additional default styles for the text input here
  },
});
