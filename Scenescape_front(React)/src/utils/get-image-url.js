const getImageUrl = (fileName) => {
  return new URL(`/src/assets/images/${fileName}`, import.meta.url).href;
};

export default getImageUrl;
