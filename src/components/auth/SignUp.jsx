import React, { useEffect, useState } from "react";
import Container from "../Container";
import Title from "../form/Title";
import Input from "../form/Input";
import SubmitBtn from "../form/SubmitBtn";
import BottomLink from "../form/BottomLink";
import Footer from "../Footer";
import { createUser } from "../../api/auth";
import { useNavigate } from "react-router-dom";
import { useAuth, useNotification } from "../../hooks";

const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^.{8,20}$/;

const validateUserInfo = ({ username, email, password }) => {
  if (!usernameRegex.test(username)) {
    return { ok: false, error: "Invalid Username!" };
  }
  if (!emailRegex.test(email)) {
    return { ok: false, error: "Invalid Email ID!" };
  }
  if (!passwordRegex.test(password)) {
    return { ok: false, error: "Password should be 8-20 characters long!" };
  }
  return { ok: true };
};

export default function SignUp() {
  
  const [userInfo, setUserInfo] = useState({
    username: "",
    email: "",
    password: "",
  });

  const { updateNotification } = useNotification(); //to use the notification context

  const navigate = useNavigate(); //used to navigate to other path when a form will be submitted

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const { ok, error } = validateUserInfo(userInfo);

    if (!ok) {
      return updateNotification("error", error); //'error' is the type which has to passed as a string. error is the error we get from validateUserInfo
    }

    const response = await createUser(userInfo);
    if (response.error) return updateNotification("error", response.error);
    navigate("/auth/email-verification", {
      state: { user: response.user },
      replace: true,
    });
  };

  const { authInfo } = useAuth();

  return (
    <div className="bg-[#1e1e1e] inset-0 fixed z-[-10] flex justify-center items-center">
      <Container className="">
        <form className="bg-primary flex flex-col p-8 rounded-xl">
          <Title>Sign Up</Title>
          <Input
            value={userInfo.name}
            name="username"
            label="Username"
            placeholder="abhichavan14"
            onChange={handleChange}
          />
          <Input
            name="email"
            label="Email"
            value={userInfo.email}
            placeholder="examplemail@gmail.com"
            onChange={handleChange}
          />
          <Input
            name="password"
            label="Password"
            value={userInfo.password}
            placeholder="8-20 characters long"
            type="password"
            onChange={handleChange}
          />
          <SubmitBtn value="Proceed" onclick={handleClick} />
          <BottomLink goTo="/auth/log-in">Already have an account?</BottomLink>
        </form>
      </Container>
      <Footer />
    </div>
  );
}
