import React, { useState } from "react";
import Container from "../Container";
import Title from "../form/Title";
import Input from "../form/Input";
import SubmitBtn from "../form/SubmitBtn";
import Footer from "../Footer";
import { useNotification } from "../../hooks";
import { changePassword } from "../../api/auth";
import { useLocation } from "react-router-dom";

export default function ConfirmPassword() {
  const [firstInput, setFirstInput] = useState("");
  const [secondInput, setSecondInput] = useState("");
  const { updateNotification } = useNotification();
  const passwordRegex = /^.{8,20}$/;
  const validatePassword = ({ firstInput, secondInput }) => {
    if (!passwordRegex.test(firstInput)) {
      return {
        ok: false,
        error: "In New Password, password should be 8-20 characters long!",
      };
    }
    if (!passwordRegex.test(secondInput)) {
      return {
        ok: false,
        error: "In Confirm Password, password should be 8-20 characters long!",
      };
    }
    return { ok: true };
  };

  const handleChangeFirst = (e) => {
    setFirstInput(e.target.value);
  };

  const handleChangeSecond = (e) => {
    setSecondInput(e.target.value);
  };

  //getting the userId as we need to send it to backend
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const userID = searchParams.get("id");
  const token = searchParams.get("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    //checking if both the fields are filled
    if (!firstInput || !secondInput) {
      return updateNotification("error", "All fields are required");
    }
    //validations
    const { ok, error } = validatePassword(firstInput, secondInput);
    if (!ok) {
      return updateNotification("error", error);
    }

    //comparison
    if (firstInput !== secondInput) {
      return updateNotification("error", "Passwords do not match!");
    }
    //if all good, tell backend to update DB and tell user SUCCESSFULL
    const response = await changePassword({
      newPassword: firstInput,
      token,
      userID,
    });
    console.log("response", response);
    if (response.error) {
      return updateNotification("error", response.error);
    }
    updateNotification("success", response.message);
  };

  return (
    <div className="bg-[#1e1e1e] inset-0 fixed z-[-10] flex justify-center items-center">
      <Container className="">
        <form
          className="bg-primary flex flex-col p-8 rounded-xl"
          onSubmit={handleSubmit}
        >
          <Title>Password Reset</Title>
          <Input
            name="newPassword"
            label="New Password"
            placeholder="8-20 characters long"
            onChange={handleChangeFirst}
          />
          <Input
            name="confirmPassword"
            label="Confirm Password"
            placeholder="Enter above password"
            onChange={handleChangeSecond}
          />
          <SubmitBtn value="Proceed" path="/auth/log-in" />
        </form>
      </Container>
      <Footer />
    </div>
  );
}
