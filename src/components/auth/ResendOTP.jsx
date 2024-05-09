import React, { useState } from "react";
import Container from "../Container";
import Title from "../form/Title";
import Input from "../form/Input";
import SubmitBtn from "../form/SubmitBtn";
import Footer from "../Footer";
import { useNotification } from "../../hooks";
import { resendOTP } from "../../api/auth";
import { useNavigate } from "react-router-dom";

export default function ResendOTP() {
  const [input, setInput] = useState("");
  const { updateNotification } = useNotification();
  const navigate = useNavigate();
  const handleChange = (e) => {
    setInput(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await resendOTP({ email: input });
    if (response.error) updateNotification("error", response.error);

    navigate("/auth/email-verification", {
      state: { user: response.user },
      replace: true,
    });
  };
  return (
    <div className="bg-[#1e1e1e] inset-0 fixed z-[-10] flex justify-center items-center">
      <Container className="">
        <form
          className="bg-primary flex flex-col p-8 rounded-xl"
          onSubmit={handleSubmit}
        >
          <Title>Resend OTP</Title>
          <Input
            name="email"
            label="Email"
            placeholder="examplemail@gmail.com"
            onChange={handleChange}
          />
          <SubmitBtn value="Send OTP" />
        </form>
      </Container>
      <Footer />
    </div>
  );
}
