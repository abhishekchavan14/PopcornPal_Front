import React, { useState } from "react";
import Input from "./Input";
import { useNotification } from "../../hooks";

//cast = [{artistName: '', roleAs:'', leadActor: false}]
const defaultCastInfo = {
  artistName: "",
  roleAs: "",
  leadActor: false,
};
export default function CastForm({onSubmit}) {
  const { updateNotification } = useNotification();
  const [castInfo, setCastInfo] = useState({ ...defaultCastInfo });
  const { leadActor, artistName, roleAs } = castInfo;

  const handleChange = ({ target }) => {
    const { checked, name, value } = target;
    if (name === "leadActor") {
      setCastInfo({ ...castInfo, leadActor: checked });
    } else {
      setCastInfo({ ...castInfo, [name]: value });
    }
  };
  const handleSubmit = () => {
    const { artistName, roleAs } = castInfo;
    if (!artistName.trim()) return updateNotification("error", "Artist Name is Missing!");

    onSubmit(castInfo)
    setCastInfo({...defaultCastInfo})
  };

  return (
    <>
      <span className="flex items-center">
        <label htmlFor="checkbox" className="text-sm text-white">
          Lead Role
        </label>
        <input
          type="checkbox"
          id="checkbox"
          name="leadActor"
          className="w-4 h-4 ml-2"
          checked={leadActor}
          onChange={handleChange}
        />
      </span>
      <span>
        <input
          type="text"
          id="artistName"
          name="artistName"
          value={artistName}
          onChange={handleChange}
          placeholder="John Doe"
          className="text-white border border-dark-subtle rounded-md p-1 indent-1 bg-transparent hover:border-primary-red transition duration-300"
        />
        <span className="mx-2 text-white">as</span>
        <input
          type="text"
          id="roleAs"
          name="roleAs"
          value={roleAs}
          onChange={handleChange}
          placeholder="Coder"
          className="text-white border border-dark-subtle rounded-md p-1 indent-1 bg-transparent hover:border-primary-red transition duration-300"
        />
      </span>
      <span className="mx-2 px-4 py-1 rounded-lg bg-green hover:text-white duration-300">
        <button type="button" className="mt-2" onClick={handleSubmit}>
          Add
        </button>
      </span>
    </>
  );
}
