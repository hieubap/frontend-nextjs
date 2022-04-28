import React from "react";
import LoginForm from "./Login";
const styling = {
  backgroundImage:
    "url(https://dongten.net/wp-content/uploads/2021/09/hinh-anh-bao-ve-moi-truong-dep-nhat.jpg)",
  backgroundSize: "cover",
  backgroundPosition: "center",
};
export default function LoginLayout() {
  return (
    <div
      className="h-screen relative before:bg-gray-500 before:w-full before:h-full before:absolute before:opacity-50"
      style={styling}
    >
      <LoginForm />
    </div>
  );
}
