import { useEffect } from "react";

import {
  useOutletContext,
  useParams,
  useSearchParams,
  useNavigate,
} from "react-router-dom";

import DatePicker from "react-datepicker";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import "react-datepicker/dist/react-datepicker.css";

import AttractionItem from "./AttractionItem";

let nextPlanId = 4;

const PlanForm = () => {
  const { planList, curPlan, setCurPlan, onCreatePlan, onUpdatePlan } =
    useOutletContext();
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const nav = useNavigate();

  useEffect(() => {
    if (id) {
      setCurPlan(planList.find((item) => parseInt(item.id) === parseInt(id)));
    } else {
      setCurPlan({
        id: nextPlanId++,
        title: "",
        overview: "",
        sceneCount: 0,
        startDate: new Date(),
        endDate: new Date(),
        attractionList: [],
      });
    }
  }, [id]);

  if (!curPlan) {
    return <div>로딩 중입니다.</div>;
  }

  const onClickBackButton = () => {
    // 기존 QueryString을 가져와 새로운 경로로 이동하더라도 QueryString을 유지
    const queryString = searchParams.toString();
    nav(`/plan?${queryString}`);
  };

  const onDragEndAttractionItem = ({ source, destination }) => {
    if (!destination || source.index === destination.index) {
      return;
    }

    const newAttractionList = [...curPlan.attractionList];
    const [item] = newAttractionList.splice(source.index, 1); // splice 함수의 반환 값은 삭제한 원소들이 포함된 배열임
    newAttractionList.splice(destination.index, 0, item); // 두 번째 매개변수를 0으로 하고, 세번째 매개변수에 추가할 객체를 넣으면 중간에 삽입됨
    setCurPlan({ ...curPlan, attractionList: newAttractionList });
  };

  const onClickDeleteAttractionButton = (item) => {
    setCurPlan({
      ...curPlan,
      attractionList: curPlan.attractionList.filter((plan) => plan !== item),
    });
  };

  return (
    <div className="flex flex-col w-full h-full gap-3 py-3">
      <div className="flex items-center px-2 gap-3">
        <button
          type="button"
          onClick={onClickBackButton}
        >
          <svg
            className="w-5 h-5 fill-main-300"
            viewBox="0 0 448 512"
          >
            <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
          </svg>
        </button>

        <div>
          <h1 className="text-2xl">나의 여행 계획</h1>
          <p className="text-gray-400">계획을 좀 더 상세히 작성해보세요!</p>
        </div>
      </div>

      <div className="w-full flex flex-col gap-2 px-4">
        <div className="group">
          <p className="block text-sm text-gray-500 group-focus-within:text-main-400">
            제목
          </p>
          <div className="flex gap-2">
            <input
              className="block flex-1 px-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:border-main-300"
              type="text"
              placeholder="이 계획의 제목을 입력하세요..."
              value={curPlan.title}
              onChange={(e) =>
                setCurPlan({ ...curPlan, title: e.target.value })
              }
            />

            {/* <button> 태그를 사용하면, focus가 일어나서 group에 속한 요소들의 스타일이 바뀌므로, <div> 태그를 사용하여 focus가 일어나지 않도록 구현  */}
            <div
              className="w-12 py-2 text-sm text-center text-white bg-main-300 rounded-lg hover:bg-main-400 cursor-pointer"
              onClick={() => (id ? onUpdatePlan() : onCreatePlan())}
            >
              {id ? "수정" : "생성"}
            </div>
          </div>
        </div>

        <div className="flex justify-between">
          <div className="relative group">
            <p className="block text-sm text-gray-500 group-focus-within:text-main-400">
              시작일
            </p>
            <DatePicker
              className="py-1 px-2 text-center border border-gray-300 outline-none focus:border-main-300 rounded-md"
              selected={curPlan.startDate}
              onChange={(date) => setCurPlan({ ...curPlan, startDate: date })}
            />
            <svg
              className="absolute top-7 left-3 w-4 h-4 fill-gray-400 group-focus-within:fill-main-300"
              viewBox="0 0 448 512"
            >
              <path d="M152 24c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 40L64 64C28.7 64 0 92.7 0 128l0 16 0 48L0 448c0 35.3 28.7 64 64 64l320 0c35.3 0 64-28.7 64-64l0-256 0-48 0-16c0-35.3-28.7-64-64-64l-40 0 0-40c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 40L152 64l0-40zM48 192l352 0 0 256c0 8.8-7.2 16-16 16L64 464c-8.8 0-16-7.2-16-16l0-256z" />
            </svg>
          </div>
          <div className="relative group">
            <p className="block text-sm text-gray-500 group-focus-within:text-main-400">
              종료일
            </p>
            <DatePicker
              className="py-1 px-2 text-center border border-gray-300 outline-none focus:border-main-300 rounded-md"
              selected={curPlan.endDate}
              onChange={(date) => setCurPlan({ ...curPlan, endDate: date })}
            />
            <svg
              className="absolute top-7 left-3 w-4 h-4 fill-gray-400 group-focus-within:fill-main-300"
              viewBox="0 0 448 512"
            >
              <path d="M152 24c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 40L64 64C28.7 64 0 92.7 0 128l0 16 0 48L0 448c0 35.3 28.7 64 64 64l320 0c35.3 0 64-28.7 64-64l0-256 0-48 0-16c0-35.3-28.7-64-64-64l-40 0 0-40c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 40L152 64l0-40zM48 192l352 0 0 256c0 8.8-7.2 16-16 16L64 464c-8.8 0-16-7.2-16-16l0-256z" />
            </svg>
          </div>
        </div>

        <div className="group">
          <p className="block text-sm text-gray-500 group-focus-within:text-main-400">
            설명
          </p>
          <textarea
            className="block p-2.5 w-full bg-white rounded-lg border border-gray-300 focus:outline-none focus:border-main-300 resize-none"
            rows="3"
            placeholder="이 계획에 대한 설명과 지금의 감정을 남겨보세요..."
            value={curPlan.overview}
            onChange={(e) =>
              setCurPlan({ ...curPlan, overview: e.target.value })
            }
          ></textarea>
        </div>
      </div>

      {curPlan.attractionList.length === 0 ? (
        <div className="flex justify-center items-center flex-1 text-gray-300">
          추가된 씬이 없습니다.
        </div>
      ) : (
        <>
          <p className="px-4 text-sm text-main-400 text-end">
            총 {curPlan.attractionList.length}개의 씬
          </p>
          <DragDropContext onDragEnd={onDragEndAttractionItem}>
            <Droppable
              droppableId="droppable"
              direction="vertical"
            >
              {(provided) => {
                return (
                  <div
                    className="overflow-y-auto"
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    {curPlan.attractionList.map((item, index) => {
                      return (
                        <Draggable // 드래그 영역
                          draggableId={`${item.timestamp}`}
                          index={index}
                          key={item.timestamp}
                          disableInteractiveElementBlocking // 상호작용 가능한 요소에서의 드래그를 차단하지 않도록 함
                        >
                          {(provided, snapshot) => {
                            if (snapshot.isDragging) {
                              // 정확한 원인은 모르겠으나, 라이브러리 자체에 offset이 들어가기 때문에, 하드코딩으로 적절히 위치를 맞춰주었다.
                              provided.draggableProps.style.left = undefined;
                              provided.draggableProps.style.top =
                                provided.draggableProps.style.top - 100;
                            }

                            return (
                              <AttractionItem
                                {...item}
                                innerRef={provided.innerRef}
                                isDragging={snapshot.isDragging}
                                dragPoint={
                                  <button
                                    className="w-5 h-5 fill-gray-400 self-center"
                                    type="button"
                                    {...provided.dragHandleProps}
                                  >
                                    <svg viewBox="0 0 448 512">
                                      <path d="M0 88C0 74.7 10.7 64 24 64l400 0c13.3 0 24 10.7 24 24s-10.7 24-24 24L24 112C10.7 112 0 101.3 0 88zM0 248c0-13.3 10.7-24 24-24l400 0c13.3 0 24 10.7 24 24s-10.7 24-24 24L24 272c-13.3 0-24-10.7-24-24zM448 408c0 13.3-10.7 24-24 24L24 432c-13.3 0-24-10.7-24-24s10.7-24 24-24l400 0c13.3 0 24 10.7 24 24z" />
                                    </svg>
                                  </button>
                                }
                                draggableProps={provided.draggableProps}
                              >
                                <div className="flex flex-col items-center gap-3">
                                  <button
                                    className="flex justify-center items-center w-5 h-5 fill-gray-300 hover:scale-110"
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      onClickDeleteAttractionButton(item);
                                    }}
                                  >
                                    <svg
                                      className="w-full h-full"
                                      viewBox="0 0 448 512"
                                    >
                                      <path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0L284.2 0c12.1 0 23.2 6.8 28.6 17.7L320 32l96 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 96C14.3 96 0 81.7 0 64S14.3 32 32 32l96 0 7.2-14.3zM32 128l384 0 0 320c0 35.3-28.7 64-64 64L96 512c-35.3 0-64-28.7-64-64l0-320zm96 64c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16z" />
                                    </svg>
                                  </button>
                                </div>
                              </AttractionItem>
                            );
                          }}
                        </Draggable>
                      );
                    })}
                    {provided.placeholder}
                  </div>
                );
              }}
            </Droppable>
          </DragDropContext>
        </>
      )}
    </div>
  );
};

export default PlanForm;
