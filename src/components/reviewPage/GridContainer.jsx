import React from "react";

export default function GridContainer({ children, className }) {
  return (
    <div
      className={
        "w-full grid grid-cols-2 px-5 border-l-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-5" +
        className
      }
    >
      {children}
    </div>
  );
}
