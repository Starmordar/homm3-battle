const { appendFileSync } = require('./file');
const { CONFIG_DIR } = require('./path');

function groupToTemplate(data, groups, name) {
  const frameTemplates = [];

  groups.forEach((groupName, index) => {
    const imageCount = (data.groups[groupName.replace('_active', '')] ?? []).length;
    frameTemplates.push(frameTemplate(groupName, imageCount, index));
  });

  const template = spriteTemplate(name, frameTemplates);
  appendFileSync(`${CONFIG_DIR}/config.txt`, template);
}

function frameTemplate(name, x, y) {
  return `[MONSTER_SPRITES['${name}']]: { y: ${y}, x: ${
    x === null ? 'null' : `[${frameSteps(x)}]`
  } },`;
}

function frameSteps(frame) {
  let frames = [];
  frame--;

  while (frame >= 0) {
    frames.push(frame);
    frame--;
  }
  return frames.reverse();
}

function spriteTemplate(name, frames) {
  return `[TEXTURES['${name}']]: {${frames.join('')}},`;
}

module.exports = { groupToTemplate };
