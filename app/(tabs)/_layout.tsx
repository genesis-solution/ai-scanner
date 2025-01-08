import { Tabs } from "expo-router";
import React from "react";
import { Platform, StyleSheet, View } from "react-native";
import { useTranslation } from "react-i18next";

import { HapticTab } from "@/components/HapticTab";
import { IconSymbol } from "@/components/ui/IconSymbol";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { useThemeColor } from "@/hooks/useThemeColor";
import InlineAd from "@/components/InlineAd";

export default function TabLayout() {
  const { t } = useTranslation();
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: "column",
    },
    tabContainer: {
      flex: 1,
    },
    adContainer: {
      height: 60,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.tabContainer}>
        <Tabs
          screenOptions={{
            tabBarActiveTintColor: useThemeColor({}, "text"),
            headerShown: false,
            tabBarButton: HapticTab,
            tabBarBackground: TabBarBackground,
            tabBarStyle: Platform.select({
              ios: {
                // Use a transparent background on iOS to show the blur effect
                position: "absolute",
              },
              default: {},
            }),
          }}
        >
          <Tabs.Screen
            name="index"
            options={{
              title: t("home"),
              tabBarIcon: ({ color }) => (
                <IconSymbol size={28} name="house.fill" color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="scan"
            options={{
              title: t("scan"),
              tabBarIcon: ({ color }) => (
                <IconSymbol size={28} name="scanner.fill" color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="settings"
            options={{
              title: t("settings"),
              tabBarIcon: ({ color }) => (
                <IconSymbol size={28} name="gearshape.fill" color={color} />
              ),
            }}
          />
        </Tabs>
      </View>
      <View style={styles.adContainer}>
        <InlineAd />
      </View>
    </View>
  );
}
