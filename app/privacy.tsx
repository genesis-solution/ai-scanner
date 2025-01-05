import { Stack } from "expo-router";
import React, { Fragment } from "react";
import { useTranslation } from "react-i18next";
import { View, Text, ScrollView, StyleSheet } from "react-native";

export default function PrivacyPolicyScreen() {
  const { t } = useTranslation();

  return (
    <Fragment>
      <Stack.Screen
        options={{
          title: t("privacyPolicy"),
        }}
      />
      <View style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <Text style={styles.text}>
            {/* Replace this with your actual privacy policy text */}
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </Text>
        </ScrollView>
      </View>
    </Fragment>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 16,
  },
  scrollView: {
    flex: 1,
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
  },
});
