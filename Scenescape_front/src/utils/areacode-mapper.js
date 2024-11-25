const mapper = new Map();
mapper.set(12, "관광지");
mapper.set(14, "문화시설");
mapper.set(15, "축제공연행사");
mapper.set(25, "여행코스");
mapper.set(28, "레포츠");
mapper.set(32, "숙박");
mapper.set(38, "쇼핑");
mapper.set(39, "음식점");

const areaCodeToName = (areaCode) => {
  return mapper.get(areaCode);
};

export default { areaCodeToName };
