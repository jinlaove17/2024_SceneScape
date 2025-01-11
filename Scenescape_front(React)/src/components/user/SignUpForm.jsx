import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { registerUser } from "../../api/user";

import UserForm from "./UserForm";

const SignUpForm = () => {
  const [input, setInput] = useState({
    id: "",
    password: "",
    passwordCheck: "",
    email: "",
  });

  const [error, setError] = useState({
    id: "",
    password: "",
    passwordCheck: "",
    email: "",
  });

  const mutation = useMutation({
    mutationFn: registerUser,

    onSuccess: (data) => {
      console.log(data);
    },

    onError: (error) => {
      console.error(error.response.data.errorMsg);
    },
  });

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
    {
      type: "password",
      name: "passwordCheck",
      label: "비밀번호 확인",
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
      text: "가입하기",
    },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;

    // 폼 데이터 업데이트
    setInput((prev) => ({ ...prev, [name]: value }));

    // 유효성 검사 수행
    let errorMessage = "";

    if (value) {
      switch (name) {
        case "id":
          if (value.length < 2 || value.length > 12) {
            errorMessage = "아이디는 2자 이상 12자 이하여야 합니다.";
          }
          break;
        case "password":
          if (value.length < 8 || value.length > 16) {
            errorMessage = "비밀번호는 8자 이상 16자 이하여야 합니다.";
          } else if (input.passwordCheck && value !== input.passwordCheck) {
            errorMessage = "비밀번호가 일치하지 않습니다.";
            setError((prev) => ({
              ...prev,
              [name]: "",
              passwordCheck: errorMessage,
            }));
            return;
          } else if (value === input.passwordCheck) {
            setError((prev) => ({
              ...prev,
              [name]: "",
              passwordCheck: "",
            }));
            return;
          }
          break;
        case "passwordCheck":
          if (value !== input.password) {
            errorMessage = "비밀번호가 일치하지 않습니다.";
          }
          break;
      }
    }

    // 유효성 검사 결과에 따라 에러 메시지 업데이트
    setError((prev) => ({
      ...prev,
      [name]: errorMessage || "", // 에러가 없으면 빈 문자열로 초기화
    }));
  };

  const handleSubmit = (formData) => {
    // console.log("회원가입 데이터:", formData);
    mutation.mutate({
      id: formData.id,
      pwd: formData.password,
      email: formData.email,
    });
  };

  return (
    <UserForm
      title={"회원가입"}
      fieldList={fields}
      errorList={error}
      buttonList={buttons}
      onChange={handleChange}
      onSubmit={handleSubmit}
    />
  );
};

export default SignUpForm;
