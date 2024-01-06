import type { TextureOverrides } from './types';

export const heroOverrides: TextureOverrides = {
  width: 170,
  height: 190,

  top: -40,
  left: -45,
  right: (width: number) => width - 125,
};
