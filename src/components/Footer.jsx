import React from "react";
import { FaYoutube, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  return (
    <>
      <div>
        <div className="absolute w-full text-center sm:w-auto text-white bottom-0 left-0 text-xs text-dark-subtle">
          © 2024 PopcornPal. All rights reserved.
        </div>
        <div
          className="hidden bottom-0 sm:block absolute text-white right-0 h-[5%] w-[15%] bg-primary-red rounded-tl-xl"
          style={{ boxShadow: "-2px -2px 10px #000000" }}
        >
          <ul className="flex justify-evenly items-center my-3">
            <li className="hover:text-black transition duration-300">
              <a href="https://www.instagram.com/" target="_blank">
                <FaInstagram />
              </a>
            </li>
            <li className="hover:text-black transition duration-300">
              <a href="https://in.linkedin.com/" target="_blank">
                <FaLinkedin />
              </a>
            </li>
            <li className="hover:text-black transition duration-300">
              <a href="https://www.youtube.com/" target="_blank">
                <FaYoutube />
              </a>
            </li>
            <li className="hover:text-black transition duration-300">
              <a href="https://twitter.com/" target="_blank">
                <FaXTwitter />
              </a>
            </li>
          </ul>
        </div>
        <div className="absolute bottom-5 w-full justify-center gap-x-5 flex text-white sm:hidden">
          <a href="https://www.instagram.com/" target="_blank">
            <FaInstagram className="mb-1" />
          </a>
          <a href="https://www.instagram.com/" target="_blank">
            <FaLinkedin className="mb-1" />
          </a>
          <a href="https://www.instagram.com/" target="_blank">
            <FaYoutube className="mb-1" />
          </a>
          <a href="https://www.instagram.com/" target="_blank">
            <FaXTwitter />
          </a>
        </div>
      </div>
    </>
  );
}
