export function randomValueOf<T extends {}>(object: Record<string, any>): T {
  const keys = Object.keys(object);

  const random = Math.floor(Math.random() * keys.length);
  const randomKey = keys[random];

  return { name: randomKey, ...object[randomKey] };
}
