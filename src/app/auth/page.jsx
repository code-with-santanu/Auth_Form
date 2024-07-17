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

  const changeState = (show) => {
    setShow(show);
  };

  return (
    <>
      <Navbar onClick={changeState} />
      <div className="w-full h-full md:h-screen outer-div flex justify-between">
        {show && (
          <>
            <Image
              src={loginImg}
              alt="logo"
              height="500"
              width="auto"
              className=" mr-36 "
            />
            <Login onClick={changeState} />
          </>
        )}
        {!show && (
          <>
            <Register onClick={changeState} />
            <Image
              src={signupImg}
              alt="logo"
              height="380"
              width="auto"
              className=" ml-40 "
            />
          </>
        )}
      </div>
    </>
  );
}
