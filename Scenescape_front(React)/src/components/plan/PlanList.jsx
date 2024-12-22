import {
  useOutletContext,
  useSearchParams,
  useNavigate,
} from "react-router-dom";

import PlanItem from "./PlanItem";

const PlanList = () => {
  const { planList, onDeletePlan } = useOutletContext();
  const [searchParams] = useSearchParams();
  const nav = useNavigate();

  const onClickCreatePlanButton = () => {
    // 기존 QueryString을 가져와 새로운 경로로 이동하더라도 QueryString을 유지
    const queryString = searchParams.toString();
    nav(`new?${queryString}`);
  };

  return (
    <div className="flex flex-col w-full h-full gap-3 py-3">
      <div className="flex justify-between items-center px-5">
        <div>
          <h1 className="text-2xl">나의 여행 계획</h1>
          <p className="text-gray-400">회원님이 주인공인 멋진 계획들이네요!</p>
        </div>

        <button
          className="flex flex-col items-center group"
          type="button"
          onClick={onClickCreatePlanButton}
        >
          <svg
            className="w-9 h-9 fill-main-300 group-hover:fill-main-400"
            viewBox="0 0 512 512"
          >
            <path d="M512 416c0 35.3-28.7 64-64 64L64 480c-35.3 0-64-28.7-64-64L0 96C0 60.7 28.7 32 64 32l128 0c20.1 0 39.1 9.5 51.2 25.6l19.2 25.6c6 8.1 15.5 12.8 25.6 12.8l160 0c35.3 0 64 28.7 64 64l0 256zM232 376c0 13.3 10.7 24 24 24s24-10.7 24-24l0-64 64 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-64 0 0-64c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 64-64 0c-13.3 0-24 10.7-24 24s10.7 24 24 24l64 0 0 64z" />
          </svg>
          <p className="text-sm text-main-400 group-hover:text-main-500">
            새 계획 추가
          </p>
        </button>
      </div>

      {!planList || planList.length === 0 ? (
        <div className="flex justify-center items-center flex-1 text-gray-300">
          등록된 계획이 없습니다.
        </div>
      ) : (
        <div>
          {planList.map((item, index) => {
            return (
              <PlanItem
                key={item.id}
                {...item}
                title={`${index + 1}. ${item.title}`}
                onDeletePlan={onDeletePlan}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default PlanList;
