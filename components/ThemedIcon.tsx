import React from "react";
import { useThemeColor } from "@/hooks/useThemeColor";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";

export type ThemedIconProps = {
  name: any;
  size?: number;
  lightColor?: string;
  darkColor?: string;
  type?: string;
};

export function ThemedIcon({
  name,
  size = 24,
  lightColor,
  darkColor,
  type,
}: ThemedIconProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");

  if (type === "fontawesome") {
    return <FontAwesome name={name} size={size} color={color} />;
  }
  return <MaterialIcons name={name} size={size} color={color} />;
}
