import { Platform } from "react-native";
import * as FileSystem from "expo-file-system";
import * as ImageManipulator from "expo-image-manipulator";
import { Image } from "react-native";
import scanLogger from "./scanLogger";
const MAX_FILE_SIZE = 1 * 1024 * 1024; // 1 MB in bytes

const HTTP_HOST =
  Platform.OS === "android"
    ? "http://172.28.80.1:8000" // Android emulator → PC localhost
    : "http://localhost:8000"; // iOS simulator & web1

/**
 * Utility functions for handling images in React Native
 */

/**
 * Get image details like size and format
 * @param uri - URI of the image to inspect
 */
export async function getImageInfo(uri: string) {
  try {
    // Get file info
    const fileInfo = await FileSystem.getInfoAsync(uri);

    if (!fileInfo.exists) {
      throw new Error(`Image file does not exist: ${uri}`);
    }

    return {
      exists: fileInfo.exists,
      size: fileInfo.size,
      uri: fileInfo.uri,
      isDirectory: fileInfo.isDirectory,
    };
  } catch (error) {
    scanLogger.error(`Failed to get image info: ${(error as Error).message}`);
    throw error;
  }
}

/**
 * Fix image file extension if needed
 * @param uri - Image URI that might need fixing
 */
export async function ensureImageExtension(uri: string): Promise<string> {
  // If the URI already has a valid image extension, return it
  if (/\.(jpg|jpeg|png|gif|bmp|webp)$/i.test(uri)) {
    return uri;
  }

  try {
    // Generate a new filename with .jpg extension
    const timestamp = new Date().getTime();
    const newUri = `${FileSystem.cacheDirectory}temp_image_${timestamp}.jpg`;

    // Copy the file with the new extension
    await FileSystem.copyAsync({
      from: uri,
      to: newUri,
    });

    scanLogger.log(`Image extension fixed: ${uri} → ${newUri}`);
    return newUri;
  } catch (error) {
    scanLogger.error(
      `Failed to fix image extension: ${(error as Error).message}`
    );
    return uri; // Return original on error
  }
}

/**
 * Convert image to base64 with error handling
 * @param uri - Image URI to convert
 */
export async function imageToBase64(uri: string): Promise<string> {
  try {
    // replace the uri with the one from the server if local loading image
    // In development, override URI to load a static test image
    // console.log("imageToBase64", uri, __DEV__);
    // Karmin
    // Schellack Lack
    // E120
    // 1000010904 No
    // 1000010909 No
    // 1000010903 No
    // 1000010906 No
    // 1000010905 No
    if (__DEV__) {
      const devUri = `${HTTP_HOST}/1000010905.jpg`;
      uri = devUri;
    }
    // console.log("uri", uri);
    // If URI is an HTTP URL, download it first to cache
    if (/^https?:\/\//.test(uri)) {
      const filename = uri.substring(uri.lastIndexOf("/") + 1);
      const localUri = `${FileSystem.cacheDirectory}${filename}`;
      try {
        await FileSystem.downloadAsync(uri, localUri);
        scanLogger.log(`Downloaded remote image to: ${localUri}`);
        uri = localUri;
      } catch (err) {
        throw new Error(`Failed to download image: ${(err as Error).message}`);
      }
    }
    // 1) Make sure we have a proper extension
    const fixedUri = await ensureImageExtension(uri);

    // 2) Get the on-disk file size
    const info = await FileSystem.getInfoAsync(fixedUri);

    if (!info.exists || info.isDirectory) {
      throw new Error(`Invalid file for conversion: ${fixedUri}`);
    }

    const size = info.size;
    // console.log("size", size);
    // console.log("size", MAX_FILE_SIZE);
    // If already under the limit, just read & return
    if (size <= MAX_FILE_SIZE) {
      const base64 = await FileSystem.readAsStringAsync(fixedUri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      return `data:image/jpeg;base64,${base64}`;
    }

    // 3) Get the original image dimensions
    const [origWidth, origHeight] = await new Promise<[number, number]>(
      (res, rej) => {
        Image.getSize(fixedUri, (w, h) => res([w, h]), rej);
      }
    );

    // 4) Compute a scale factor so newSize ≈ 1 MB
    const scale = Math.sqrt(MAX_FILE_SIZE / size);
    const newWidth = Math.floor(origWidth * scale);
    const newHeight = Math.floor(origHeight * scale);

    // 5) Resize & compress to JPEG, and return the base64 directly
    const manipResult = await ImageManipulator.manipulateAsync(
      fixedUri,
      [{ resize: { width: newWidth, height: newHeight } }],
      {
        compress: 0.8, // tweak this if you need smaller or higher quality
        format: ImageManipulator.SaveFormat.JPEG,
        base64: true,
      }
    );

    if (!manipResult.base64) {
      throw new Error("ImageManipulator did not return base64 data");
    }
    return `data:image/jpeg;base64,${manipResult.base64}`;
  } catch (error) {
    scanLogger.error(
      `Failed to convert image to base64: ${(error as Error).message}`
    );
    throw error;
  }
}
