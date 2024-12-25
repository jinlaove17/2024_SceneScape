const UserForm = ({
  title,
  fieldList,
  errorList,
  buttonList,
  onChange,
  onSubmit,
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = Object.fromEntries(new FormData(e.target).entries());
    onSubmit(formData);
  };

  return (
    <div className="mt-12">
      <div className="text-3xl text-center mb-3">{title}</div>

      <form
        className="w-[24rem] mx-auto border-2 rounded-lg p-8"
        onSubmit={handleSubmit}
      >
        {fieldList.map(({ type, name, label }) => (
          <div
            className="relative w-full mb-5"
            key={name}
          >
            <input
              className="block pt-2 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-main-300 peer"
              type={type}
              id={name}
              name={name}
              placeholder=""
              required
              autoComplete="off"
              onChange={onChange}
            />
            <label
              className="peer-focus:font-medium absolute text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-main-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-5"
              htmlFor={name}
            >
              {label}
            </label>
            {errorList[name] && (
              <p className="text-sm text-red-400">{errorList[name]}</p>
            )}
          </div>
        ))}

        <div className="text-end">
          {buttonList.map(({ type, text, onClick }) => (
            <button
              className="w-24 ml-3 mt-3 py-2 text-sm font-medium text-white bg-main-300 rounded-md hover:bg-main-400"
              key={text}
              type={type}
              onClick={onClick}
            >
              {text}
            </button>
          ))}
        </div>
      </form>
    </div>
  );
};

export default UserForm;
