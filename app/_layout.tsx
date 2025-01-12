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
import { requestTrackingPermissionsAsync } from "expo-tracking-transparency";
import "react-native-reanimated";

import { setColorScheme, useColorScheme } from "@/hooks/useColorScheme";
import { Provider, useSelector } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "@/store/store";
import Toast from "react-native-toast-message";
import { toastConfig } from "@/configs/toastConfig";
import { useKeywords } from "@/hooks/useKeywords";
import "@/i18n";
import { useTranslation } from "react-i18next";
import MobileAds from "react-native-google-mobile-ads";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

function App() {
  const colorScheme = useColorScheme();
  const [fontLoaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });
  const [keywordsLoaded] = useKeywords();
  const { i18n } = useTranslation();
  const { language, theme } = useSelector((state: any) => state.settings);

  useEffect(() => {
    if (language) {
      i18n.changeLanguage(language);
    }
  }, [language, i18n]);

  useEffect(() => {
    setColorScheme(theme);
  }, [theme]);

  useEffect(() => {
    if (fontLoaded && keywordsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontLoaded, keywordsLoaded]);

  // Initialize Google Mobile Ads SDK
  useEffect(() => {
    (async () => {
      // Google AdMob will show any messages here that you just set up on the AdMob Privacy & Messaging page
      const { status: trackingStatus } =
        await requestTrackingPermissionsAsync();
      if (trackingStatus !== "granted") {
        // Do something here such as turn off Sentry tracking, store in context/redux to allow for personalized ads, etc.
      }

      // Initialize the ads
      await MobileAds().initialize();
    })();
  }, []);

  if (!fontLoaded || !keywordsLoaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="result" />
        <Stack.Screen name="search" />
        <Stack.Screen name="privacy" />
        <Stack.Screen name="contact" />
        <Stack.Screen name="faq" />
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
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  );
}
