import React, { useEffect, useState } from "react";

export default function TagsInput({ name, value, onChange }) {
  const [tag, setTag] = useState("");
  const [tags, setTags] = useState([]);
  const handleOnChange = ({ target }) => {
    const { value } = target;
    if (value !== ",") setTag(value);
    onChange(tags);
  };
  const handleKeyDown = (event) => {
    if (event.key === "," || event.key === "Enter") {
      event.preventDefault();
      if (!tag) return;
      if (tags.includes(tag)) return setTag("");

      setTags([...tags, tag]);
      setTag("");
    }
    if (event.key === "Backspace" && !tag && tags.length) {
      const newTags = tags.filter((_, index) => index !== tags.length - 1);
      setTags([...newTags]);
    }
  };

  //if you find a bug with tags, remove this useEffect
  useEffect(() => {
    if (value.length) setTags(value);
  }, [value]);

  return (
    <div
      onKeyDown={handleKeyDown}
      className="text-white border border-dark-subtle rounded-md indent-1 bg-transparent p-1 flex flex-wrap space-x-1 hover:border-primary-red transition duration-300"
    >
      {tags.map((t) => {
        return <Tag key={t}>{t}</Tag>;
      })}
      <input
        type="text"
        placeholder="actionmovie, horror, hero"
        className="overflow-x-hidden text-white border-b outline-none border-dark-subtle indent-1 bg-transparent hover:border-primary-red transition duration-300"
        value={tag}
        id={name}
        onChange={handleOnChange}
      />
    </div>
  );
}

const Tag = ({ children }) => {
  return (
    <span className="text-nowrap bg-white px-1 m-1 rounded-lg text-primary-red">
      {children}
    </span>
  );
};
