import formidable from "formidable";

import fs from "fs";

const uploadDir = "uploads";
fs.mkdirSync(uploadDir, { recursive: true });

export const form = formidable({
  uploadDir,
  keepExtensions: true,
  maxFiles: 1,
  maxFileSize: 1024 ** 2 * 200, // the default limit is 1KB * 200
  filter: (part) => part.mimetype?.startsWith("image/") || false,
});
