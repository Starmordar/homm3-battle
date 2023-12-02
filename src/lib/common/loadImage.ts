export function loadImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    console.log(img);

    img.onload = () => {
      console.log('resolve');
      resolve(img);
    };

    img.onerror = reject;
    img.src = url;
  });
}
