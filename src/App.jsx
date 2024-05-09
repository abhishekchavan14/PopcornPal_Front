import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import LogIn from "./components/auth/LogIn";
import SignUp from "./components/auth/SignUp";
import Home from "./components/Home";
import Admin from "./components/admin/Admin";
import ResetPassword from "./components/auth/ResetPassword";
import EmailVerification from "./components/auth/EmailVerification";
import ConfirmPassword from "./components/auth/ConfirmPassword";
import NotFound from "./components/NotFound";
import ReviewPage from "./components/reviewPage/ReviewPage";
import { useAuth } from "./hooks";
import SingleMovie from "./components/reviewPage/SingleMovie";
import MovieReviews from "./components/reviewPage/MovieReviews";

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth/sign-up" element={<SignUp />} />
        <Route path="/auth/log-in" element={<LogIn />} />
        <Route path="/auth/reset-password" element={<ResetPassword />} />
        <Route path="/auth/confirm-password" element={<ConfirmPassword />} />
        <Route
          path="/auth/email-verification"
          element={<EmailVerification />}
        />
        <Route path="/auth/resend-otp" element={<ResendOTP />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/review-movies" element={<ReviewPage />} />
        <Route path="/movie/:movieId" element={<SingleMovie />} />
        <Route path="/movie/reviews/:movieId" element={<MovieReviews />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
