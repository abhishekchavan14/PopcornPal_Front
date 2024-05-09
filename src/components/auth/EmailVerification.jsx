import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Container from "../Container";
import Title from "../form/Title";
import SubmitBtn from "../form/SubmitBtn";
import Footer from "../Footer";
import { verifyUserEmail } from "../../api/auth";
import { useNotification } from "../../hooks";
import BottomLink from "../form/BottomLink";

export default function EmailVerification() {
  const [otp, setOtp] = useState(""); //initializing an empty otp array
  const inputRef = useRef(null);

  const { state } = useLocation(); //we get the data which we passed from signup page using useNavigate hook and state
  const user = state?.user; //storing that data in user
  
  const navigate = useNavigate();

  const {updateNotification} = useNotification()

  //if anyone directly visits /email-verification route without entering user details then he will be sent to /not-found (which in turns goes to '/*')
  useEffect(() => {
    if (!user) navigate("/not-found");
  }, [user]);

  //To put the cursor in the input field as the page loads
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  //put the value in input field in the otp state
  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //for validating the OTP
    const OTPRegex = /^\d{6}$/;
    if (!OTPRegex.test(otp)) return updateNotification('error',"Invalid OTP !");

    //if valid - submit OTP
    const response = await verifyUserEmail({ userID: user.id, OTP: otp });
    if(response.error) return updateNotification('error',response.error)
    updateNotification('success',response.message, "/auth/log-in")
    // navigate('/auth/log-in')
  };

  return (
    <div className="bg-[#1e1e1e] inset-0 fixed z-[-10] flex justify-center items-center">
      <Container className="">
        <form
          onSubmit={handleSubmit}
          className="bg-primary flex flex-col p-8 rounded-xl"
        >
          <Title>Email Verification</Title>
          <p className="text-white text-sm text-center">
            OTP has been sent to your mail!
          </p>
          <input
            ref={inputRef}
            type="number"
            className="bg-transparent border rounded text-white h-10 w-[70%] text-center mt-6 mb-10  self-center outline-none focus:border-primary-red duration-1000"
            onChange={handleOtpChange}
          />

          <SubmitBtn value="Verify OTP" />
          <BottomLink goTo="/auth/resend-otp">Resend OTP</BottomLink>
        </form>
      </Container>
      <Footer />
    </div>
  );
}
