import { createWorker } from "tesseract.js";
import path from "path";

export async function ocrTesseractEngTChi(imgPath: string) {
  const worker = await createWorker({
    logger: (m) => console.log(m),
  });
  await worker.loadLanguage("eng+chi_tra");
  await worker.initialize("eng+chi_tra");
  const {
    data: { text },
  } = await worker.recognize(imgPath);
  console.log(text);
  await worker.terminate();
}

(async function runOcrTesseractEngTChi() {
  const rootDir = path.resolve(__dirname, "..");
  const imgPath = path.join(rootDir, "uploads", "SM202305_4.jpg");

  await ocrTesseractEngTChi(imgPath);
})();
