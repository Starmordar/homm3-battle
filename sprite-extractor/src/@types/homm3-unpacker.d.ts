declare module 'homm3-unpacker' {
  export function unpackLOD(
    buffer: Buffer,
    handlers: {
      def: (buffer: Buffer, filename: string) => void;
    },
  ): void;

  export function unpackDEF(
    buffer: Buffer,
    options?: { format?: 'bitmap' | 'raw'; padding?: boolean },
  ): unknown;
}
