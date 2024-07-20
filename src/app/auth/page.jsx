"use client";

import Image from "next/image";
import { useState } from "react";

import Login from "../components/login_component/login";
import Register from "../components/signup_component/signup";
import loginImg from "../assests/login.png";
import signupImg from "../assests/signup.png";
import Navbar from "../components/Navbar";

export default function Home() {
  // To show of hide the login and reg form
  const [show, setShow] = useState(true);

  const toggleForm = (show) => {
    setShow(show);
  };

  return (
    <>
      <Navbar onClick={toggleForm} />
      <div className="w-full h-full md:h-screen outer-div flex justify-between ">
        {show && (
          <>
            <div className="design flex-col justify-between items-center mr-36 ">
              <div className="heading text-center mb-10 ">
                <p className="title text-white font-bold text-5xl mb-3">
                  Welcome Back :)
                </p>
                <p className="des text-lg text-slate-400">
                  To keep connected verify yourself with your personal info
                </p>
              </div>
              <Image
                src={loginImg}
                alt="logo"
                height="350"
                width="auto"
                className=""
              />
            </div>

            <Login onClick={toggleForm} />
          </>
        )}
        {!show && (
          <>
            <Register onClick={toggleForm} />
            <div className="design flex-col justify-between items-center ml-36">
              <div className="heading text-center mb-10 ">
                <p className="title text-white font-bold text-5xl mb-3">
                  First Time Here!!!
                </p>
                <p className="des text-lg text-slate-400">
                  Enter your details and start your journey
                </p>
              </div>
              <Image
                src={signupImg}
                alt="logo"
                height="280"
                width="auto"
                className="  "
              />
            </div>
          </>
        )}
      </div>
    </>
  );
}
