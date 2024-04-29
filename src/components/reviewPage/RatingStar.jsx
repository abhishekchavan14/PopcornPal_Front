import React from "react";
import {PiPopcornFill } from "react-icons/pi";

export default function RatingStar({ rating, className }) {
  if (!rating) return <p className="px-2 text-golden text-xs md:text-md">No reviews</p>;

  return (
    <p className={"px-2 text-golden text-sm md:text-lg flex items-center space-x-1 " + className}>
      <span>{rating}</span>
      <PiPopcornFill />
    </p>
  );
}
