const Pagenation = ({
  className,
  curPage,
  totalItemCount,
  pageSize,
  navSize,
}) => {
  return (
    <ul
      className={`flex justify-center items-center gap-2 cursor-pointer ${className}`}
    >
      <li
        className="flex items-center justify-center px-2 py-1 text-gray-500 hover:bg-gray-100 hover:text-gray-700 rounded-full"
        // @click="onChangePage(1)"
      >
        처음
      </li>

      <li
        className="flex items-center justify-center px-2 py-1 text-gray-500 hover:bg-gray-100 hover:text-gray-700 rounded-full"
        // @click="onChangePage(startPage === 1 ? 1 : startPage - 1)"
      >
        이전
      </li>
      <li
        // v-for="page in range(startPage, endPage)"
        // :key="page"
        className="flex items-center justify-center px-2 py-1 text-gray-500 hover:bg-gray-100 hover:text-gray-700 rounded-full"
        // :className="page == props.pageInfo.page ? 'bg-main-200' : ''"
        // @click="onChangePage(page)"
      >
        1
      </li>
      <li
        className="flex items-center justify-center px-2 py-1 text-gray-500 hover:bg-gray-100 hover:text-gray-700 rounded-full"
        // @click="onChangePage(endRange ? totalPage : endPage + 1)"
      >
        다음
      </li>
      <li
        className="flex items-center justify-center px-2 py-1 text-gray-500 hover:bg-gray-100 hover:text-gray-700 rounded-full"
        // @click="onChangePage(totalPage)"
      >
        끝
      </li>
    </ul>
  );
};

export default Pagenation;
