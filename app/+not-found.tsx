import { Link, Stack } from "expo-router";
import { StyleSheet } from "react-native";
import { useTranslation } from "react-i18next";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

export default function NotFoundScreen() {
  const { t } = useTranslation();

  return (
    <>
      <Stack.Screen options={{ title: t("oops") }} />
      <ThemedView style={styles.container}>
        <ThemedText type="title">{t("screenDoesNotExist")}</ThemedText>
        <Link href="/" style={styles.link}>
          <ThemedText type="link">{t("goToHomeScreen")}</ThemedText>
        </Link>
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});
