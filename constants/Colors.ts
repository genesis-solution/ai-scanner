/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = "#0a7ea4";
const tintColorDark = "#fff";

export const Colors = {
  light: {
    text: "#11181C",
    background: "#fff",
    tint: tintColorLight,
    icon: "#687076",
    tabIconDefault: "#687076",
    tabIconSelected: tintColorLight,
    picker: "#11181C",
    textInput: "#11181C",
    accordionTitle: "rgba(128, 128, 128, 0.4)",
    accordionContent: "rgba(128, 128, 128, 0.2)",
  },
  dark: {
    text: "#ECEDEE",
    background: "#151718",
    tint: tintColorDark,
    icon: "#9BA1A6",
    tabIconDefault: "#9BA1A6",
    tabIconSelected: tintColorDark,
    picker: "#ECEDEE",
    textInput: "#ECEDEE",
    accordionTitle: "rgba(128, 128, 128, 0.4)",
    accordionContent: "rgba(128, 128, 128, 0.2)",
  },
};
