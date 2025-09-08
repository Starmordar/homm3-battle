import fs from 'node:fs';
import path from 'node:path';

function clearOutput(outputPath: string) {
  if (!fs.existsSync(outputPath)) return;

  for (const entry of fs.readdirSync(outputPath)) {
    const entryPath = path.join(outputPath, entry);
    const stat = fs.statSync(entryPath);

    if (stat.isDirectory()) fs.rmdirSync(entryPath, { recursive: true });
    else fs.unlinkSync(entryPath);
  }
}

export { clearOutput };
