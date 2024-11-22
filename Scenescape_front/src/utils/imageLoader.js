const getImageUrl = (fileName) => {
  return new URL(`/src/assets/img/${fileName}`, import.meta.url).href;
};

export default { getImageUrl };
