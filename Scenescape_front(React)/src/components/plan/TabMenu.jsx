import "./TabMenu.css";

const TabMenu = ({ contentList, tabIndex, onChangeTabMenu }) => {
  return (
    <div className="TabMenu flex flex-col items-center w-16 h-full bg-white z-20">
      {contentList.map((item, index) => {
        return (
          <button
            className={`w-16 h-16 flex flex-col justify-center items-center ${
              index === tabIndex
                ? "bg-main-400 fill-white text-white"
                : "bg-white fill-gray-500 text-gray-500 hover:fill-main-400 hover:text-main-400"
            }`}
            key={index}
            onClick={() => onChangeTabMenu(index)}
          >
            {item.img}
            <p className="text-xs">{item.text}</p>
          </button>
        );
      })}
    </div>
  );
};

export default TabMenu;
