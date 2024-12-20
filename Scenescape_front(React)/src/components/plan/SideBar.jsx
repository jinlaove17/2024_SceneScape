import { useState } from "react";

const SideBar = ({ tabMenu, direction, children }) => {
  const [isOpen, setIsOpen] = useState(true);

  const positionClass =
    direction === "left"
      ? tabMenu
        ? `left-16 border-l-transparent ${isOpen ? "translate-x-0" : "-translate-x-full"}`
        : `left-0  border-l-transparent ${isOpen ? "translate-x-0" : "-translate-x-full"}`
      : tabMenu
        ? `right-16 border-r-transparent ${isOpen ? "translate-x-0" : "translate-x-full"}`
        : `right-0 border-r-transparent ${isOpen ? "translate-x-0" : "translate-x-full"}`;

  return (
    <>
      {tabMenu}

      <div
        className={`absolute w-96 h-full z-10 transition-transform duration-500 bg-white border border-gray-200 shadow-xl ${positionClass}`}
      >
        <button
          className={`absolute w-7 h-12 flex justify-center items-center top-1/2 bg-white border
            ${
              direction === "left"
                ? "right-0 transform translate-x-full -translate-y-1/2 rounded-r-lg border-l-transparent border-r-gray-200"
                : "left-0 transform -translate-x-full -translate-y-1/2 rounded-l-lg border-r-transparent border-l-gray-200"
            }`}
          type="button"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            direction === "left" ? (
              <svg
                className="w-5 h-5 fill-main-400"
                viewBox="0 0 256 512"
              >
                <path d="M9.4 278.6c-12.5-12.5-12.5-32.8 0-45.3l128-128c9.2-9.2 22.9-11.9 34.9-6.9s19.8 16.6 19.8 29.6l0 256c0 12.9-7.8 24.6-19.8 29.6s-25.7 2.2-34.9-6.9l-128-128z" />
              </svg>
            ) : (
              <svg
                className="w-5 h-5 fill-main-400"
                viewBox="0 0 256 512"
              >
                <path d="M246.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-9.2-9.2-22.9-11.9-34.9-6.9s-19.8 16.6-19.8 29.6l0 256c0 12.9 7.8 24.6 19.8 29.6s25.7 2.2 34.9-6.9l128-128z" />
              </svg>
            )
          ) : direction === "left" ? (
            <svg
              className="w-5 h-5 fill-main-400"
              viewBox="0 0 256 512"
            >
              <path d="M246.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-9.2-9.2-22.9-11.9-34.9-6.9s-19.8 16.6-19.8 29.6l0 256c0 12.9 7.8 24.6 19.8 29.6s25.7 2.2 34.9-6.9l128-128z" />
            </svg>
          ) : (
            <svg
              className="w-5 h-5 fill-main-400"
              viewBox="0 0 256 512"
            >
              <path d="M9.4 278.6c-12.5-12.5-12.5-32.8 0-45.3l128-128c9.2-9.2 22.9-11.9 34.9-6.9s19.8 16.6 19.8 29.6l0 256c0 12.9-7.8 24.6-19.8 29.6s-25.7 2.2-34.9-6.9l-128-128z" />
            </svg>
          )}
        </button>

        {children}
      </div>
    </>
  );
};

export default SideBar;
