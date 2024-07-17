"use client";

import React from "react";
import { FaGoogle } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";

export default function AuthSocialButton({ icon, redirect_url }) {
  return (
    <a
      href={redirect_url}
      className="
        w-full
        flex
        justify-center
        rounded-[30px]
        bg-white
        px-4
        py-2
        text-gray-900
        shadow-sm
        ring-1
        ring-inset
        ring-gray
        hover:bg-gray-50
        focus:outline-offset-0"
    >
      {icon === "google" ? <FaGoogle /> : <FaGithub />}
    </a>
  );
}
