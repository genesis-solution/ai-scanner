import { Tabs } from "expo-router";
import React from "react";
import {
  Platform,
  Share,
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from "react-native";
import { useTranslation } from "react-i18next";

import { HapticTab } from "@/components/HapticTab";
import { IconSymbol } from "@/components/ui/IconSymbol";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { useThemeColor } from "@/hooks/useThemeColor";
import InlineAd from "@/components/InlineAd";
import { Entypo } from "@expo/vector-icons";
import { showAlert } from "@/utils/scanAlert";

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

  const shareText =
    "Please tell your friends about our app.\nGoogle Play Store: https://play.google.com/store/apps/details?id=ch.simplevisor.app\nAppStore: https://apps.apple.com/us/app/simplevisor/id1510740672";

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: shareText,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
          showAlert(
            `Successfully shared via ${result.activityType}`,
            "success"
          );
        } else {
          // shared
          // showAlert(`Successfully shared`, "success");
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error: any) {
      showAlert(error.message, "error");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.tabContainer}>
        <Tabs
          screenOptions={{
            tabBarActiveTintColor: useThemeColor({}, "text"),
            headerShown: false,
            tabBarButton: HapticTab,
            tabBarBackground: TabBarBackground,
            tabBarActiveBackgroundColor: useThemeColor({}, "background"),
            tabBarInactiveBackgroundColor: useThemeColor({}, "background"),
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
            name="ocr"
            options={{
              title: t("OCR"),
              tabBarIcon: ({ color }) => (
                <Entypo name="camera" size={28} color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="share"
            options={{
              title: t("share"),
              tabBarIcon: ({ color }) => (
                <Entypo name="share" size={28} color={color} />
              ),
              tabBarButton: (props) => (
                <TouchableOpacity
                  {...(props as TouchableOpacityProps)}
                  onPress={onShare}
                />
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
