import React from "react";
import { useThemeColor } from "@/hooks/useThemeColor";
import { MaterialIcons } from "@expo/vector-icons";

export type ThemedIconProps = {
  name: any;
  size?: number;
  lightColor?: string;
  darkColor?: string;
};

export function ThemedIcon({
  name,
  size = 24,
  lightColor,
  darkColor,
}: ThemedIconProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");

  return <MaterialIcons name={name} size={size} color={color} />;
}
