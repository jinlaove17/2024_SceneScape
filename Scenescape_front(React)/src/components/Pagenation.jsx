const Pagenation = ({
  className,
  curPage,
  totalItemCount,
  pageSize,
  navSize,
  onChangePage,
}) => {
  const endPage = parseInt((totalItemCount - 1) / pageSize) + 1;
  const isInEndRange = parseInt((endPage - 1) / navSize) * navSize + 1;
  const curRangeStartPage = parseInt((curPage - 1) / navSize) * navSize + 1;
  const curRangeEndPage =
    curRangeStartPage + navSize - 1 > endPage
      ? endPage
      : curRangeStartPage + navSize - 1;

  const renderPageButtons = () => {
    return Array.from(
      { length: curRangeEndPage - curRangeStartPage + 1 },
      (_, index) => {
        console.log(curRangeStartPage + index);
        return (
          <li
            key={index}
            className={`flex items-center justify-center px-2 py-1 text-gray-500 hover:bg-gray-100 hover:text-gray-700 rounded-full ${curRangeStartPage + index === curPage && "text-main-400 hover:text-main-400"}`}
            onClick={() =>
              onChangePage({
                target: {
                  name: "page",
                  value: curRangeStartPage + index,
                },
              })
            }
          >
            {curRangeStartPage + index}
          </li>
        );
      }
    );
  };

  return (
    <ul
      className={`flex justify-center items-center gap-2 cursor-pointer ${className}`}
    >
      <li
        className="flex items-center justify-center px-2 py-1 text-gray-500 hover:bg-gray-100 hover:text-gray-700 rounded-full"
        onClick={() =>
          onChangePage({
            target: {
              name: "page",
              value: 1,
            },
          })
        }
      >
        처음
      </li>

      <li
        className="flex items-center justify-center px-2 py-1 text-gray-500 hover:bg-gray-100 hover:text-gray-700 rounded-full"
        onClick={() =>
          onChangePage({
            target: {
              name: "page",
              value: curRangeStartPage === 1 ? 1 : curRangeStartPage - 1,
            },
          })
        }
      >
        이전
      </li>

      {renderPageButtons()}

      <li
        className="flex items-center justify-center px-2 py-1 text-gray-500 hover:bg-gray-100 hover:text-gray-700 rounded-full"
        onClick={() =>
          onChangePage({
            target: {
              name: "page",
              value: isInEndRange ? endPage : curRangeEndPage + 1,
            },
          })
        }
      >
        다음
      </li>
      <li
        className="flex items-center justify-center px-2 py-1 text-gray-500 hover:bg-gray-100 hover:text-gray-700 rounded-full"
        onClick={() =>
          onChangePage({
            target: {
              name: "page",
              value: endPage,
            },
          })
        }
      >
        끝
      </li>
    </ul>
  );
};

export default Pagenation;
