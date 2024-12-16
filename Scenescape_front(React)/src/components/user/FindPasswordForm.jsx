import UserForm from "./UserForm";

const FindPasswordForm = () => {
  const fields = [
    {
      type: "text",
      name: "id",
      label: "아이디",
    },
    {
      type: "email",
      name: "email",
      label: "이메일",
    },
  ];

  const buttons = [
    {
      type: "submit",
      text: "찾기",
      onClick: () => console.log("비밀번호 찾기"),
    },
  ];

  const handleSubmit = (formData) => {
    console.log("로그인 데이터:", formData);
  };

  return (
    <UserForm
      title={"비밀번호 찾기"}
      fieldList={fields}
      errorList={[]}
      buttonList={buttons}
      onSubmit={handleSubmit}
    />
  );
};

export default FindPasswordForm;
