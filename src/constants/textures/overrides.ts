import type { TextureOverrides } from './types';

export const heroOverrides: TextureOverrides = {
  width: 160,
  height: 190,

  top: -30,
  left: -30,
  right: (width: number) => width - 130,
};
