import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";

import { setColorScheme, useColorScheme } from "@/hooks/useColorScheme";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import Toast from "react-native-toast-message";
import { toastConfig } from "@/configs/toastConfig";
import { useKeywords } from "@/hooks/useKeywords";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

function App() {
  const colorScheme = useColorScheme();
  const [fontLoaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });
  const [keywordsLoaded] = useKeywords();

  useEffect(() => {
    setColorScheme("light");
  }, []);

  useEffect(() => {
    if (fontLoaded && keywordsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontLoaded, keywordsLoaded]);

  if (!fontLoaded || !keywordsLoaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="result" />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
      <Toast config={toastConfig} />
    </ThemeProvider>
  );
}

export default function RootLayout() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}
