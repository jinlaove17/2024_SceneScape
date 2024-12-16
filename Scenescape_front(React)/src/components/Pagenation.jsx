const Pagenation = ({ curPage, totalItemCount, pageSize, navSize }) => {
  return (
    <ul className="flex justify-center items-center gap-0.5 cursor-pointer text-sm">
      <li
        className="flex items-center justify-center px-2 h-7 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700"
        // @click="onChangePage(1)"
      >
        처음
      </li>

      <li
        className="flex items-center justify-center px-2 h-7 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
        // @click="onChangePage(startPage === 1 ? 1 : startPage - 1)"
      >
        이전
      </li>
      <li
        // v-for="page in range(startPage, endPage)"
        // :key="page"
        className="flex items-center justify-center px-2 h-7 leading-tight border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
        // :className="page == props.pageInfo.page ? 'bg-main-200' : 'bg-white'"
        // @click="onChangePage(page)"
      >
        1
      </li>
      <li
        className="flex items-center justify-center px-2 h-7 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
        // @click="onChangePage(endRange ? totalPage : endPage + 1)"
      >
        다음
      </li>
      <li
        className="flex items-center justify-center px-2 h-7 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700"
        // @click="onChangePage(totalPage)"
      >
        끝
      </li>
    </ul>
  );
};

export default Pagenation;
