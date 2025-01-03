import Toast from "react-native-toast-message";

import scanLogger from "./scanLogger";

export const showAlert = (msg: string, type: string) => {
  try {
    Toast.show({
      type: "scanToast",
      props: {
        msg,
        type,
      },
    });
  } catch (error) {
    scanLogger.log(
      "showAlert error:",
      (error as Error).message || "An unexpected error"
    );
  }
};
