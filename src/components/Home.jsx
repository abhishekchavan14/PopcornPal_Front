import React, { useEffect } from "react";
import Footer from "./Footer";
import BackgroundVideo from "./images/Background_Video.mp4";
import BigLogo from "./images/Big_Logo_2.png";
import { useAuth } from "../hooks";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const { handleLogin, authInfo } = useAuth();
  const {isPending, isLoggedIn} = authInfo
  const navigate = useNavigate()

  useEffect(()=>{
    if(isLoggedIn){
      authInfo.profile?.role==="user"?
      navigate('/review-movies'):navigate('/admin')}
  },[isLoggedIn])
  return (
    <div>
      <div
        className="hidden xl:block fixed w-[70%] h-full bg-[#1e1e1e] z-[-1] border-r"
        style={{ transform: "skew(20deg,0deg)", left: -200 }}
      >
        <img
          src={BigLogo}
          alt="logo"
          className="absolute right-[20%] top-[10%] h-[70%] w-auto"
          style={{ transform: "skew(-20deg,0deg)" }}
        />
      </div>
      <div className="hidden lg:flex xl:hidden text-white absolute h-[60%] w-[50%] bg-primary rounded-xl left-[26%] top-[26%] items-center justify-center opacity-95 border">
        <img src={BigLogo} alt="logo" className="absolute h-[90%] w-auto" />
      </div>
      <div className="hidden sm:flex lg:hidden text-white absolute h-[60%] w-[70%] bg-primary rounded-xl left-[15%] top-[26%] items-center justify-center border opacity-90">
        <img src={BigLogo} alt="logo" className="absolute h-[90%] w-auto" />
      </div>
      <div className="sm:hidden xs:flex md:hidden text-white absolute h-[30%] w-[60%] bg-primary rounded-xl left-[20%] top-[36%]  items-center justify-center border opacity-90">
        <img src={BigLogo} alt="logo" className="h-[70%] mx-auto my-10" />
      </div>

      <video
        src={BackgroundVideo}
        autoPlay
        muted
        loop
        className="absolute inset-0 w-full h-full object-cover z-[-2] opacity-50"
      ></video>
      <Footer />
    </div>
  );
}
