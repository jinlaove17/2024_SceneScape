import { useRef, useEffect } from "react";

const { kakao } = window;

const KakaoMap = () => {
  const container = useRef(null); // 지도 컨테이너 접근

  useEffect(() => {
    const position = new kakao.maps.LatLng(37.501286, 127.0396029);
    const options = {
      center: position,
      level: 2,
    };
    const map = new kakao.maps.Map(container.current, options);
  }, []);

  return (
    <div
      className="flex-1 h-full"
      ref={container}
    ></div>
  );
};

export default KakaoMap;
