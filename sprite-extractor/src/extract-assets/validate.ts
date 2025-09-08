interface SourceImage {
  width: number;
  height: number;
  x: number;
  y: number;
  selection: ArrayBuffer;
  data: ArrayBuffer;
}

interface SourcePalette {
  r: number;
  g: number;
  b: number;
  a: number;
}

interface SourceData {
  type: string;
  fullWidth: number;
  fullHeight: number;
  palette: SourcePalette[];
  groups: Record<string, string[]>;
  images: Record<string, SourceImage>;
}

function validateSourceData(data: unknown): data is SourceData {
  return (
    typeof data === 'object' &&
    data !== null &&
    typeof (data as SourceData).type === 'string' &&
    typeof (data as SourceData).fullWidth === 'number' &&
    typeof (data as SourceData).fullHeight === 'number' &&
    Array.isArray((data as SourceData).palette)
  );
}

export type { SourceData, SourceImage };
export { validateSourceData };
