import { COMPONENTS_ID, COMPONENTS_NAME } from './constants';

const getComponentId = (componentName) => COMPONENTS_ID[componentName];

const getComponentName = (componentId) => COMPONENTS_NAME[componentId];

const getComponentBackgroundPosition = (componentId) => {
  const offsetRemX = -0.1;
  const offsetRemY = -0.1;
  const backgroundWidthRem = 16;
  const componentWidth = 2;
  const componentHeight = 2;
  const componentBackgroundPositionRemX = (componentId * componentWidth);
  const componentBackgroundPositionRemY = Math.floor(componentBackgroundPositionRemX / backgroundWidthRem) * componentHeight;
  return `${(-(componentBackgroundPositionRemX % backgroundWidthRem) + offsetRemX)}rem ${-(componentBackgroundPositionRemY) + offsetRemY}rem`;
}

export {
  getComponentId,
  getComponentName,
  getComponentBackgroundPosition
};
