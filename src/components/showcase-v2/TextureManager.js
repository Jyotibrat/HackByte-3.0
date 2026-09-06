import * as THREE from "three";

const textureCache = new Map();
const loadCallbacks = new Map();
const loader = new THREE.TextureLoader();

const isTextureLoaded = (tex) => {
  const img = tex.image;
  return img instanceof HTMLImageElement && img.complete && img.naturalWidth > 0;
};

export const getTexture = (item, onLoad) => {
  const key = item.url;
  const existing = textureCache.get(key);

  if (existing) {
    if (onLoad) {
      if (isTextureLoaded(existing)) {
        onLoad(existing);
      } else {
        const callbacks = loadCallbacks.get(key);
        if (callbacks) callbacks.add(onLoad);
      }
    }
    return existing;
  }

  const callbacks = new Set();
  if (onLoad) callbacks.add(onLoad);
  loadCallbacks.set(key, callbacks);

  const texture = loader.load(
    key,
    (tex) => {
      tex.minFilter = THREE.LinearMipmapLinearFilter;
      tex.magFilter = THREE.LinearFilter;
      tex.generateMipmaps = true;
      tex.anisotropy = 4;
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.needsUpdate = true;

      const cbs = loadCallbacks.get(key);
      if (cbs) {
        cbs.forEach((cb) => {
          try {
            cb(tex);
          } catch (err) {
            console.error(`Callback failed: ${JSON.stringify(err)}`);
          }
        });
      }
      loadCallbacks.delete(key);
    },
    undefined,
    (err) => console.error("Texture load failed:", key, err)
  );

  textureCache.set(key, texture);
  return texture;
};
