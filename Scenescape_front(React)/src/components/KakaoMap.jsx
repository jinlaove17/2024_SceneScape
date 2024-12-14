import { useRef, useEffect } from "react";

const { kakao } = window;

const KakaoMap = () => {
  const container = useRef(null); // 지도 컨테이너 접근

  useEffect(() => {
    const position = new kakao.maps.LatLng(33.450701, 126.570667);
    const options = {
      center: position, // 지도의 중심 좌표
      level: 3, // 지도 확대 레벨
    };
    const map = new kakao.maps.Map(container.current, options);
  }, []);

  return (
    <div
      className="w-full flex-1"
      ref={container}
    ></div>
  );
};

export default KakaoMap;
