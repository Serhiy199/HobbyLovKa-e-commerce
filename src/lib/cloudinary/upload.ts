import { createHash } from "node:crypto";

const DEFAULT_UPLOAD_FOLDER = "products";

type CloudinaryConfig = {
  apiKey: string;
  apiSecret: string;
  cloudName: string;
  folder: string;
};

function getCloudinaryConfig(): CloudinaryConfig {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME?.trim();
  const apiKey = process.env.CLOUDINARY_API_KEY?.trim();
  const apiSecret = process.env.CLOUDINARY_API_SECRET?.trim();
  const folder =
    process.env.CLOUDINARY_UPLOAD_FOLDER?.trim() || DEFAULT_UPLOAD_FOLDER;

  if (!cloudName || !apiKey || !apiSecret) {
    throw new Error("CLOUDINARY_CONFIG_MISSING");
  }

  return {
    apiKey,
    apiSecret,
    cloudName,
    folder,
  };
}

function createUploadSignature(input: {
  apiSecret: string;
  folder: string;
  timestamp: number;
}) {
  const serialized = `folder=${input.folder}&timestamp=${input.timestamp}${input.apiSecret}`;

  return createHash("sha1").update(serialized).digest("hex");
}

export function getCloudinaryUploadConstraints() {
  return {
    allowedMimeTypes: new Set([
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/webp",
    ]),
    maxFileSizeBytes: 5 * 1024 * 1024,
    maxFilesPerRequest: 11,
  };
}

export async function uploadProductImageToCloudinary(file: File) {
  const config = getCloudinaryConfig();
  const timestamp = Math.floor(Date.now() / 1000);
  const signature = createUploadSignature({
    apiSecret: config.apiSecret,
    folder: config.folder,
    timestamp,
  });

  const formData = new FormData();
  formData.append("file", file);
  formData.append("api_key", config.apiKey);
  formData.append("timestamp", timestamp.toString());
  formData.append("signature", signature);
  formData.append("folder", config.folder);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${config.cloudName}/image/upload`,
    {
      body: formData,
      method: "POST",
    },
  );

  if (!response.ok) {
    const payload = (await response.json().catch(() => null)) as
      | {
          error?: {
            message?: string;
          };
        }
      | null;

    throw new Error(
      payload?.error?.message || "Cloudinary image upload failed.",
    );
  }

  const payload = (await response.json()) as {
    public_id: string;
    secure_url: string;
  };

  return {
    publicId: payload.public_id,
    url: payload.secure_url,
  };
}
