// utils/uploadFiles.ts
import { createReadStream, ReadStream } from "fs";
import streamifier from "streamifier";
import { uploadStreamToCloudinary, UploadedFile } from "./upload-cloudinary";
import cloudinary from "../lib/cloudinary";
import { UploadApiResponse } from "cloudinary";

export async function uploadFilesToCloudinary(
  files: Express.Multer.File | Express.Multer.File[],
  folder: string
): Promise<(UploadedFile | null)[] | (UploadedFile | null)> {
  const fileArray = Array.isArray(files) ? files : [files];

  // Upload each file with stream
  const uploads = await Promise.all(
    fileArray.map(async (file) => {
      if (!file) return null;

      const { mimetype } = file;
      console.log(file);

      const resourceType = mimetype.startsWith("video") ? "video" : "image";

      // Stream the buffer directly to Cloudinary
      return uploadStreamToCloudinary(
        streamifier.createReadStream(file.buffer),
        folder,
        resourceType
      );
    })
  );

  const cleanUploads = uploads.filter(Boolean);

  console.log(cleanUploads);

  return Array.isArray(files)
    ? cleanUploads
    : cleanUploads
    ? cleanUploads?.[0]
    : null;
}
