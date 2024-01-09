function getImageRect(defData) {
  const images = Object.values(defData.images);

  let top = Infinity;
  let left = Infinity;
  let bottom = 0;
  let right = 0;

  const imageNames = Object.keys(images);
  for (const name of imageNames) {
    const image = images[name];

    if (image.y < top) top = image.y;
    if (image.y + image.height > bottom) bottom = image.y + image.height;
    if (image.x < left) left = image.x;
    if (image.x + image.width > right) right = image.x + image.width;
  }

  return {
    x: left,
    y: top,
    width: right - left,
    height: bottom - top,
  };
}

module.exports = { getImageRect };
