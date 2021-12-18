import imageCompression from "browser-image-compression";

export const ImageUtil = {
  // 画像ファイルを取得
  async getCompressImageFileAsync(file: any) {
    const options = {
      maxSizeMB: 1, // 最大ファイルサイズ
//      maxWidthOrHeight: 800 // max-width
      maxWidthOrHeight: 1024 // max-width
    };
    try {
      return await imageCompression(file, options);
    } catch (error) {
      console.error("getCompressImageFileAsync is error", error);
      throw error;
    }
  },
  // dataurlを取得
  async getDataUrlFromFile(file: any) {
    try {
      return await imageCompression.getDataUrlFromFile(file);
    } catch (error) {
      console.error("getDataUrlFromFile is error", error);
      throw error;
    }
  }
};
