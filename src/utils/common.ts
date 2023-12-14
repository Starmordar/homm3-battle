export function randomValueOf<T extends {}>(object: Record<string, any>): T {
  const keys = Object.keys(object);

  const random = Math.floor(Math.random() * keys.length);
  const randomKey = keys[random];

  return { name: randomKey, ...object[randomKey] };
}

export function updateCursorStyle(toRemove: string, toAdd: string) {
  const root = document.getElementById('root')!;

  root.classList.remove(toRemove);
  root.classList.add(toAdd);
}
