import * as path from "path";
import { PythonShell } from "python-shell";

const pythonDir = path.join(__dirname, "..", "..", "python", ".pyenv");
console.log("pythonDir:", pythonDir);

const pythonFilename = path.join(pythonDir, "helloworld.py");

PythonShell.run(pythonFilename).then((messages) => {
  console.log("finished");
});
