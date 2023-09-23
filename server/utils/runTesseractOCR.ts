import { createWorker } from "tesseract.js";

export async function tesseractOCR(imgPath: string) {
  const worker = await createWorker({
    logger: (m) => console.log(m),
  });

  await worker.loadLanguage("chi_tra+eng");
  await worker.initialize("chi_tra+eng");
  const {
    data: { text },
  } = await worker.recognize(imgPath);
  //   console.log("tesseractOCR: ", text);
  await worker.terminate();
  return text;
}
