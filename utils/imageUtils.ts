import * as FileSystem from 'expo-file-system';
import scanLogger from './scanLogger';

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
      isDirectory: fileInfo.isDirectory
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
      to: newUri
    });
    
    scanLogger.log(`Image extension fixed: ${uri} → ${newUri}`);
    return newUri;
  } catch (error) {
    scanLogger.error(`Failed to fix image extension: ${(error as Error).message}`);
    return uri; // Return original on error
  }
}

/**
 * Convert image to base64 with error handling
 * @param uri - Image URI to convert
 */
export async function imageToBase64(uri: string): Promise<string> {
  try {
    // First ensure the image has proper extension
    const fixedUri = await ensureImageExtension(uri);
    
    // Read as base64
    const base64 = await FileSystem.readAsStringAsync(fixedUri, {
      encoding: FileSystem.EncodingType.Base64
    });
    
    return `data:image/jpeg;base64,${base64}`;
  } catch (error) {
    scanLogger.error(`Failed to convert image to base64: ${(error as Error).message}`);
    throw error;
  }
} 