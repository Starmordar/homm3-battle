declare module 'homm3-unpacker' {
  export function unpackLOD(
    buffer: Buffer,
    handlers: {
      def: (buffer: Buffer, filename: string) => void;
    },
  ): void;

  export function unpackDEF<T extends object>(
    buffer: Buffer,
    options?: { format?: 'bitmap' | 'raw'; padding?: boolean },
  ): T;
}
