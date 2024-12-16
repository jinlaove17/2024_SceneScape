import { useState, useRef, useMemo } from "react";

const SearchDropdown = ({ title, selected, itemList, onSelectItem }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef(null);

  const onFocus = () => {
    setIsOpen(true);
  };

  const onBlur = (e) => {
    // relatedTarget이 containerRef 내부의 요소인지 확인
    if (!dropdownRef.current.contains(e.relatedTarget)) {
      // 포커스가 외부로 나가면 드롭다운 닫기
      setIsOpen(false);
    }
  };

  const onChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // 배열을 필터링하여 렌더링
  const filteredItemList = useMemo(() => {
    return itemList.filter((item) =>
      item.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]); // searchTerm이 변경될 때만 재계산

  return (
    <div
      ref={dropdownRef}
      className="flex items-center justify-center w-full mx-auto"
      onFocus={onFocus}
      onBlur={onBlur}
    >
      <div className="relative w-full">
        <div className="group">
          <p className="block text-sm text-gray-500 group-focus-within:text-main-400">
            {title}
          </p>

          <button className="flex justify-between items-center w-full min-h-9 px-4 bg-white border border-gray-300 rounded-md focus:outline-none focus:border-main-300">
            <p>{selected}</p>
            <svg
              className="w-5 h-5 ml-2"
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M6.293 9.293a1 1 0 011.414 0L10 11.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>

        {isOpen && (
          <div className="absolute flex flex-col w-full h-48 z-20 p-3 rounded-md shadow-md bg-white overflow-y-scroll">
            <input
              className="w-full px-4 py-1 mb-2 text-gray-800 border border-gray-300 rounded-md bg-white focus:outline-none focus:border-main-300"
              type="text"
              placeholder="검색어 입력..."
              autoComplete="off"
              onChange={onChange}
            />

            {filteredItemList.map((item, index) => (
              <div
                key={index}
                className="px-4 py-1 text-gray-700 hover:bg-gray-100 active:bg-main-100 cursor-pointer rounded-md"
                onMouseDown={() => onSelectItem(item)}
              >
                {item}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchDropdown;
