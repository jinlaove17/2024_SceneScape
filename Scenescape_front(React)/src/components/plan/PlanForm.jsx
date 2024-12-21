import { useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import AttractionItem from "./AttractionItem";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

let nxtId = 4;

const PlanForm = () => {
  const { planList, onCreatePlan, onUpdatePlan, onDeletePlan } =
    useOutletContext();
  const { id } = useParams();
  // url에 id가 있다면, planList에서 해당 plan을 찾아 초기화
  const [plan, setPlan] = useState(() => {
    if (id) {
      return planList.find((item) => item.id === parseInt(id));
    }

    return {
      id: nxtId++,
      title: "",
      overview: "",
      sceneCount: 0,
      startDate: "",
      endDate: "",
      attractionList: [],
    };
  });

  const convertDate = (date) => {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  };

  const onAttractionItemDragEnd = ({ source, destination }) => {
    if (!destination || source.index === destination.index) {
      return;
    }

    const newAttractionList = [...plan.attractionList];
    const [item] = newAttractionList.splice(source.index, 1); // splice 함수의 반환 값은 삭제한 원소들이 포함된 배열임
    newAttractionList.splice(destination.index, 0, item); // 두 번째 매개변수를 0으로 하고, 세번째 매개변수에 추가할 객체를 넣으면 중간에 삽입됨
    setPlan({ ...plan, attractionList: newAttractionList });
  };

  return (
    <div className="flex flex-col w-full h-full gap-3 py-3">
      <div className="px-5">
        <h1 className="text-2xl">나의 여행 계획</h1>
        <p className="text-gray-400">회원님이 주인공인 멋진 계획이네요!</p>
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
              value={plan.title}
              onChange={(e) => setPlan({ ...plan, title: e.target.value })}
            />

            {/* <button> 태그를 사용하면, focus가 일어나서 group에 속한 요소들의 스타일이 바뀌므로, <div> 태그를 사용하여 focus가 일어나지 않도록 구현  */}
            <div
              className="w-12 py-2 text-sm text-center text-white bg-main-300 rounded-lg hover:bg-main-400 cursor-pointer"
              onClick={() => {
                if (id) {
                  onUpdatePlan({
                    ...plan,
                    startDate: convertDate(plan.startDate),
                    endDate: convertDate(plan.endDate),
                  });
                } else {
                  onCreatePlan({
                    ...plan,
                    startDate: convertDate(plan.startDate),
                    endDate: convertDate(plan.endDate),
                  });
                }
              }}
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
              selected={plan.startDate}
              onChange={(date) => setPlan({ ...plan, startDate: date })}
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
              selected={plan.endDate}
              onChange={(date) => setPlan({ ...plan, endDate: date })}
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
            onChange={(e) => setPlan({ ...plan, overview: e.target.value })}
          ></textarea>
        </div>
      </div>

      {plan.attractionList.length === 0 ? (
        <div className="flex justify-center items-center flex-1 text-gray-300">
          추가된 장소가 없습니다.
        </div>
      ) : (
        <DragDropContext onDragEnd={onAttractionItemDragEnd}>
          <Droppable
            droppableId="droppable"
            direction="vertical"
          >
            {(provided) => {
              return (
                <div
                  className="flex-1 overflow-y-auto"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {plan.attractionList.map((item, index) => {
                    return (
                      <Draggable // 드래그 영역
                        draggableId={`${item.id}`}
                        index={index}
                        key={item.id}
                        disableInteractiveElementBlocking // ❗️상호작용 가능한 요소에서의 드래그를 차단하지 않도록 함
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
                              dragHandleProps={provided.dragHandleProps}
                              draggableProps={provided.draggableProps}
                            />
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
      )}
    </div>
  );
};

export default PlanForm;
