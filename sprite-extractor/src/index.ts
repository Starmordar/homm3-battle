import { OUTPUT_ASSETS_PATH, OUTPUT_PATH, SPRITES_SOURCE_PATH } from './config';
import { clearOutput } from './pre-processes';
import { extractAssetsFromLod } from './extract-assets';
import { unlinkPng, minify } from './post-processes';

async function run() {
  clearOutput(OUTPUT_PATH);

  extractAssetsFromLod(SPRITES_SOURCE_PATH);

  await minify(OUTPUT_ASSETS_PATH);
  unlinkPng(OUTPUT_ASSETS_PATH);
}

run()
  .then(() => {
    console.log('Extraction completed');
  })
  .catch((err) => {
    console.error('Extraction failed :>> ', err);
  });
