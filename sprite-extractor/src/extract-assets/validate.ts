import z from 'zod';

const SourcePaletteSchema = z.object({
  r: z.number(),
  g: z.number(),
  b: z.number(),
  a: z.number(),
});

const SourceImageSchema = z.object({
  width: z.number(),
  height: z.number(),
  x: z.number(),
  y: z.number(),
  selection: z.instanceof(ArrayBuffer).optional(),
  data: z.instanceof(ArrayBuffer),
});

const SourceDataSchema = z.object({
  type: z.string(),
  fullWidth: z.number(),
  fullHeight: z.number(),
  palette: z.array(SourcePaletteSchema),
  groups: z.record(z.string(), z.array(z.string())),
  images: z.record(z.string(), SourceImageSchema),
});

type SourceData = z.infer<typeof SourceDataSchema>;
type ImageData = z.infer<typeof SourceImageSchema>;

function isSourceDataValid(data: unknown, filename: string): data is SourceData {
  const parseResult = SourceDataSchema.safeParse(data);

  if (!parseResult.success) {
    console.warn(`[WARNING]: Source data format is invalid for ${filename}`, parseResult.error);
  }

  return parseResult.success;
}

export type { SourceData, ImageData };
export { isSourceDataValid };
