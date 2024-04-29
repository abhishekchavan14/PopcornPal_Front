import React from "react";
import { VscLoading } from "react-icons/vsc";


export default function SubmitBtn({ value, onclick, busy }) {
  return (
    <button
      type="submit"
      onClick={onclick}
      className="border border-green text-white px-4 py-2 self-center hover:bg-green hover:text-black transition duration-300 cursor-pointer"
    >
      {busy? <VscLoading className=" animate-spin"/> :value}
    </button>
  );
}
