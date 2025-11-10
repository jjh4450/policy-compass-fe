/**
 * Checks if a file is an image based on its MIME type
 * @param file The file to check
 * @returns true if the file is an image, false otherwise
 */
export const isImageFile = (file: File): boolean => {
  return file.type.startsWith("image/");
};

/**
 * Formats file size to a human-readable string
 * @param bytes The file size in bytes
 * @returns The formatted file size string
 */
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};

export const validateFile = (
  file: File,
  fileType: string,
  maxFileSize?: number | undefined,
): string | null => {
  if (fileType === "image" && !file.type.startsWith("image/"))
    return "이미지 파일만 업로드 가능합니다.";

  if (fileType === "document") {
    const documentTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "application/vnd.ms-powerpoint",
      "application/vnd.openxmlformats-officedocument.presentationml.presentation",
      "text/plain",
    ];
    if (!documentTypes.includes(file.type))
      return "문서 파일만 업로드 가능합니다.";
  }

  if (maxFileSize && file.size > maxFileSize) {
    const sizeMB = maxFileSize / (1024 * 1024);
    return `파일 크기가 제한(${sizeMB.toFixed(2)}MB)을 초과합니다.`;
  }

  return null;
};
