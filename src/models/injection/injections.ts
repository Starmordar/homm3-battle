import SpriteRegistry from '../sprites/SpriteRegistry';

export enum Injectables {
  Textures = 'Textures',
}

export const InjectablesMapping = [{ key: Injectables.Textures, value: SpriteRegistry }];
