import { useNavigate } from "react-router-dom";

import UserForm from "./UserForm";

const LoginForm = () => {
  const nav = useNavigate();

  const fields = [
    {
      type: "text",
      name: "id",
      label: "아이디",
    },
    {
      type: "password",
      name: "password",
      label: "비밀번호",
    },
  ];

  const buttons = [
    {
      type: "button",
      text: "비밀번호 찾기",
      onClick: () => nav("find-password"),
    },
    {
      type: "submit",
      text: "로그인",
    },
  ];

  const handleSubmit = (formData) => {
    console.log("로그인 데이터:", formData);
  };

  return (
    <UserForm
      title={"로그인"}
      fieldList={fields}
      errorList={[]}
      buttonList={buttons}
      onSubmit={handleSubmit}
    />
  );
};

export default LoginForm;
