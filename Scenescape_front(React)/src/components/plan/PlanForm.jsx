import { useState } from "react";
import { useParams } from "react-router-dom";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import AttractionItem from "./AttractionItem";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

const PlanForm = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const { id } = useParams();
  const [attractionList, setAttractionList] = useState([
    {
      id: 1,
      title: "김밥천국",
      address: "서울특별시 중구 신당동",
      contentId: 39,
      sceneTitle: "이태원클라쓰",
      overview: "참치 김밥이 맛있는 신당동 맛집",
      img: "NoImage.png",
      likeCount: 238,
    },
    {
      id: 2,
      title: "홍콩반점",
      address: "서울특별시 중구 약수동",
      contentId: 39,
      sceneTitle: "나의 아저씨",
      overview: "34년 전통 중국집",
      img: "NoImage.png",
      likeCount: 523,
    },
    {
      id: 3,
      title: "KFC",
      address: "서울특별시 강남구 역삼동",
      contentId: 39,
      sceneTitle: "미생",
      overview: "빠삭한 튀김 옷이 일품인 치킨",
      img: "NoImage.png",
      likeCount: 152,
    },
    {
      id: 4,
      title: "해운대",
      address: "서울특별시 관악구",
      contentId: 39,
      sceneTitle: "해운대",
      overview: "영화 <해운대>에 나온 부산의 그 해변 맞습니다.",
      img: "NoImage.png",
      likeCount: 232,
    },
  ]);

  const onAttractionItemDragEnd = ({ source, destination }) => {
    if (!destination || source.index === destination.index) {
      return;
    }

    const newAttractionList = [...attractionList];
    const [item] = newAttractionList.splice(source.index, 1); // splice 함수의 반환 값은 삭제한 원소들이 포함된 배열임
    newAttractionList.splice(destination.index, 0, item); // 두 번째 매개변수를 0으로 하고, 세번째 매개변수에 추가할 객체를 넣으면 중간에 삽입됨
    setAttractionList(newAttractionList);
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
              // onChange={onChangeSearchTerm}
            />

            {/* <button> 태그를 사용하면, focus가 일어나서 group에 속한 요소들의 스타일이 바뀌므로, <div> 태그를 사용하여 focus가 일어나지 않도록 구현  */}
            <div
              className="w-12 py-2 text-sm text-center text-white bg-main-300 rounded-lg hover:bg-main-400 cursor-pointer"
              onClick={() => {}}
            >
              생성
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
              selected={startDate}
              onChange={(date) => setStartDate(date)}
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
              selected={endDate}
              onChange={(date) => setEndDate(date)}
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
            //   v-model.lazy="planParams.description"
          ></textarea>
        </div>
      </div>

      {!attractionList || attractionList.length === 0 ? (
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
                  {attractionList.map((item, index) => {
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
