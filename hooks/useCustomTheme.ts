import { useState, useEffect } from "react";
import { Appearance } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { setTheme as setThemeAction } from "@/store/slices/settingsSlice";
import { themes } from "@/configs/themeConfig";
import { RootState } from "@/store/store";

export type ThemeName = keyof typeof themes;

export function useCustomTheme() {
  const dispatch = useDispatch();
  const currentTheme = useSelector((state: RootState) => state.settings.theme);
  const [theme, setTheme] = useState<ThemeName>(currentTheme);

  useEffect(() => {
    const colorScheme = Appearance.getColorScheme();
    setTheme(colorScheme === "dark" ? "white" : currentTheme); // Default to "white" theme if dark mode
  }, [currentTheme]);

  const setCustomTheme = (themeName: ThemeName) => {
    setTheme(themeName);
    dispatch(setThemeAction(themeName));
  };

  return { theme, setCustomTheme };
}