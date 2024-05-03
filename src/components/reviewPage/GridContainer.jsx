import React from "react";

export default function GridContainer({ children, className }) {
  return (
    <div
      className={
        "w-full flex overflow-x-scroll overflow-y-hidden whitespace-wrap scroll-smooth p-2 lg:p-5 border-l-2 gap-3 md:gap-5 hide-scrollbar " +
        className
      }
    >
      {children}
    </div>
  );
}
