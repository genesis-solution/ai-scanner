import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

const GDPRConsentDialog = ({
  visible,
  onConsent,
  onManageOptions,
}: {
  visible: boolean;
  onConsent: () => void;
  onManageOptions: () => void;
}) => {
  const [showMore, setShowMore] = useState(false);

  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.dialog}>
          <View style={styles.header}>
            <Image
              source={require("@/assets/images/icon.png")}
              style={styles.logo}
            />
          </View>
          <Text style={styles.heading}>
            Food Bug Scanner asks for your consent to use your personal data to:
          </Text>
          <ScrollView style={styles.content}>
            <View style={styles.bulletContainer}>
              <View style={styles.bulletIcon}>
                <Ionicons name="person" size={20} color="#7fc7f5" />
              </View>
              <Text style={styles.bulletPoint}>
                Personalized advertising and content, advertising and content
                measurement, audience research, and services development.
              </Text>
            </View>
            <View style={styles.bulletContainer}>
              <View style={styles.bulletIcon}>
                <MaterialIcons name="devices" size={20} color="#7fc7f5" />
              </View>
              <Text style={styles.bulletPoint}>
                Store and/or access information on a device.
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => setShowMore(!showMore)}
              style={styles.learnMore}
            >
              <Text style={styles.learnMoreText}>Learn more</Text>
              <Ionicons
                name={showMore ? "chevron-up" : "chevron-down"}
                size={12}
                color="#3b3f42"
              />
            </TouchableOpacity>
            {showMore && (
              <Text style={styles.moreInfo}>
                We use your data to provide and improve our services. We share
                this information with our partners for personalized ads and
                content.
              </Text>
            )}
          </ScrollView>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.consentButton} onPress={onConsent}>
              <Text style={styles.consentButtonText}>Consent</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.manageButton}
              onPress={onManageOptions}
            >
              <Text style={styles.manageButtonText}>Manage Options</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  dialog: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  header: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  logo: {
    width: 72,
    height: 72,
  },
  appName: {
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 10,
  },
  heading: {
    fontSize: 20,
    textAlign: "center",
    marginBottom: 10,
  },
  content: {
    width: "100%",
    marginBottom: 10,
  },
  bulletContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  bulletIcon: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: 32,
    height: 32,
    backgroundColor: "#c9eaff",
    borderRadius: 32,
    marginHorizontal: 15,
  },
  bulletPoint: {
    fontSize: 12,
    flex: 1,
  },
  learnMore: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  learnMoreText: {
    fontSize: 12,
    color: "#3b3f42",
    marginRight: 5,
  },
  moreInfo: {
    fontSize: 14,
    color: "gray",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  consentButton: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginRight: 5,
    alignItems: "center",
  },
  consentButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  manageButton: {
    backgroundColor: "gray",
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginLeft: 5,
    alignItems: "center",
  },
  manageButtonText: {
    color: "black",
    fontWeight: "bold",
  },
});

export default GDPRConsentDialog;
