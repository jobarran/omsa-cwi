import imageCompression from 'browser-image-compression';


export const compressImage = async (file: File): Promise<File> => {
    const options = {
      maxSizeMB: 1, // Maximum size in MB
      maxWidthOrHeight: 1024, // Resize to this maximum dimension
      useWebWorker: true,
    };

    try {
      return await imageCompression(file, options);
    } catch (error) {
      console.error("Error compressing image:", error);
      throw error;
    }
  };