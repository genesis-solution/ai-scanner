import React, { Fragment, useState } from "react";
import { View, Button, StyleSheet } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedTextInput } from "@/components/ThemedTextInput";
import { useTranslation } from "react-i18next";
import { Stack } from "expo-router";
import { useThemeColor } from "@/hooks/useThemeColor";

export default function ContactScreen() {
  const { t } = useTranslation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      paddingTop: 96,
      backgroundColor: useThemeColor({}, "background"),
    },
    label: {
      fontSize: 16,
      marginBottom: 8,
    },
    input: {
      borderWidth: 1,
      borderColor: "#ccc",
      padding: 8,
      marginBottom: 16,
      borderRadius: 4,
    },
    textArea: {
      height: 100,
    },
  });

  const handleSend = () => {
    // Handle form submission
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Message:", message);
  };

  return (
    <Fragment>
      <Stack.Screen
        options={{ title: t("contact.title"), headerTransparent: true }}
      />

      <View style={styles.container}>
        <ThemedText style={styles.label}>{t("contact.yourName")}</ThemedText>
        <ThemedTextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder={t("contact.enterYourName")}
        />

        <ThemedText style={styles.label}>{t("contact.yourEmail")}</ThemedText>
        <ThemedTextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder={t("contact.enterYourEmail")}
          keyboardType="email-address"
        />

        <ThemedText style={styles.label}>{t("contact.yourMessage")}</ThemedText>
        <ThemedTextInput
          style={[styles.input, styles.textArea]}
          value={message}
          onChangeText={setMessage}
          placeholder={t("contact.enterYourMessage")}
          multiline
        />

        <Button
          title={t("contact.send")}
          color={useThemeColor({}, "button")}
          onPress={handleSend}
        />
      </View>
    </Fragment>
  );
}
