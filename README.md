# Heroes Might and Magic III Arena
## Sprite Extractor

This tool extracts sprite images and animation config files from a Heroes of Might and Magic III `.lod` file.

### Usage

**Obtain the original game .lod file**

The file is usually named `H3Sprites.lod`. Rename it to `sprites.lod` and place it in the `input/` directory at the root of this project.

**Run the extraction**
```sh
   npm install
   npm run extract
```

- Extracted sprite images will be in `output/assets/`
- Animation config files will be in `output/config/`
