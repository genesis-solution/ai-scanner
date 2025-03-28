/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */

import { useCustomTheme } from "./useCustomTheme";
import { themes } from "@/configs/themeConfig";

export function useThemeColor(
  props: {
    white?: string;
    lightGrayishBlue?: string;
    lightBlue?: string;
    pastelGreen?: string;
    softBlue?: string;
    warmAmber?: string;
  },
  colorName: keyof typeof themes.white
) {
  const { theme } = useCustomTheme();
  const themeColors = themes[theme] || themes.white;

  return props[theme] || themeColors[colorName];
}
