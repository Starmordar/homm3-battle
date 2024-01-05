import type { TextureOverrides } from './types';

export const heroOverrides: TextureOverrides = {
  width: 150,
  height: 180,

  top: -30,
  left: -15,
  right: (width: number) => width - 130,
};
