import React, { useEffect, useState } from "react";
import Container from "../Container";
import Title from "../form/Title";
import Input from "../form/Input";
import SubmitBtn from "../form/SubmitBtn";
import BottomLink from "../form/BottomLink";
import Footer from "../Footer";
import { useAuth, useNotification } from "../../hooks";
import { useNavigate } from "react-router-dom";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^.{8,20}$/;

const validateUserInfo = ({ email, password }) => {
  if (!emailRegex.test(email.trim())) {
    return { ok: false, error: "Invalid Email ID!" };
  }
  if (!passwordRegex.test(password)) {
    return { ok: false, error: "Password should be 8-20 characters long!" };
  }
  return { ok: true };
};
export default function LogIn() {
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });

  const { updateNotification } = useNotification(); //to use the notification context
  const { handleLogin, authInfo } = useAuth();
  const { isPending, isLoggedIn } = authInfo;
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      authInfo.profile?.role === "user"
        ? navigate("/review-movies")
        : navigate("/admin");
    }
  }, [isLoggedIn]);

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
    handleLogin(userInfo.email, userInfo.password);
  };
  const handleDemoLogin = async()=>{
    userInfo.email = "nobody141nobody@gmail.com";
    userInfo.password = "789456123";
    await handleLogin(userInfo.email, userInfo.password);
  }

  if (authInfo.error) updateNotification("error", authInfo.error);
  if (authInfo.error === "Please Verify your Email.")
    updateNotification("error", authInfo.error, "/auth/resend-otp");

  return (
    <div className="bg-[#1e1e1e] inset-0 fixed z-[-10] flex justify-center items-center">
      <Container className="">
        <form
          onSubmit={handleClick}
          className="bg-primary flex flex-col p-8 rounded-xl"
        >
          <div className="mb-10">
            <h1 className="text-center text-xl text-dark-subtle">Log In</h1>
            <h1 className="text-center text-lg text-dark-subtle">
              <span>OR </span>
              <span>
                <button className="text-primary-red underline" onClick={handleDemoLogin}>Use Demo Account?</button>
              </span>
            </h1>
          </div>
          <Input
            name="email"
            value={userInfo.email}
            onChange={handleChange}
            label="Email"
            placeholder="examplemail@gmail.com"
          />
          <Input
            name="password"
            value={userInfo.password}
            onChange={handleChange}
            label="Password"
            placeholder="8-20 characters long"
            type="password"
          />
          <SubmitBtn value="Proceed" busy={isPending} />
          <BottomLink goTo="/auth/reset-password">Forgot Password?</BottomLink>
        </form>
      </Container>
      <Footer />
    </div>
  );
}
