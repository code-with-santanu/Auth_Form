"use client";
import React, { useState, useContext } from "react";
import Link from "next/link";

import { FaRegEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-hot-toast";
import { loginFormSchema } from "../../helper/requirement";
import AuthSocialButton from "./AuthSocialButton";
import DialogBox from "../DialogBox";
import { useRouter } from "next/navigation";
import { loginUser } from "@/app/severAction";

export default function login(props) {
  const router = useRouter();

  // To show or hide password
  const [showPassword, setShowPassword] = useState(false);

  // For Login Form
  const [authUser, setAuthUser] = useState({
    username: "",
    password: "",
  });

  // state for dialog box
  const [open, setOpen] = React.useState(false);
  // Display messege for dialog box
  const [data, setData] = useState({
    title: "",
    message: "",
  });

  // function to close the dialog box
  const handleClose = () => {
    setOpen(false);
  };

  // function to trigger while form is submitted for login
  const clientAction = async (e) => {
    e.preventDefault();

    const getData = { ...authUser };

    // client side validation
    const result = loginFormSchema.safeParse(getData);

    if (!result.success) {
      let errmsg = "";
      result.error.issues.forEach((issue) => {
        errmsg = issue.path[0] + ":" + issue.message + "\n";
        toast.error(errmsg);
      });
    } else {
      setAuthUser(result.data);

      const response = await loginUser(authUser); //login the user
      console.log("received: " + response);

      if (response === "SUCCESS") {
        toast.success("LOGIN SUCCESSFUL");
        console.log("LOGIN SUCCESSFUL"); //DEBUG POINT

        // Redirect the user to the dashboard
        router.push("/home");
        console.log("redirected"); //DEBUG POINT
      }
      // otherwise it will receive error messages
      else {
        console.log("ERROR Encountered");
        setData({
          title: response.title,
          message: response.msgBody,
        });
        setOpen(true); // show the dialogbox
      }
      // reset the login form
      setAuthUser({
        ...authUser,
        username: "",
        password: "",
      });
    }
  };

  // function to change the value of state onchange in input
  const handleLoginChange = (event) => {
    const value = event.target.value;
    setAuthUser({ ...authUser, [event.target.name]: value });
  };

  // function to show or hide password
  const handlePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="main-container">
      <script
        type="module"
        src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"
      ></script>
      <script
        type="nomodule"
        src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"
      ></script>

      <div className="logIn-box">
        <form onSubmit={clientAction}>
          <div className="heading  sm:mx-auto sm:w-full sm:mx-w-md">
            <h1 className="text-3xl font-bold text-center text-white">
              Sign In
            </h1>
          </div>
          <div className="input-box">
            <span className="icon">
              <ion-icon name="mail"></ion-icon>
            </span>
            <input
              name="username"
              id="username"
              type="email"
              required
              value={authUser.username}
              onChange={(e) => handleLoginChange(e)}
            />
            <label htmlFor="username">Email</label>
          </div>
          <div className="input-box">
            <span className="icon cursor-pointer">
              {showPassword ? (
                <FaRegEye onClick={handlePassword} className="" />
              ) : (
                <FaEyeSlash onClick={handlePassword} />
              )}
            </span>
            <input
              name="password"
              id="password"
              type={showPassword ? "text" : "password"}
              required
              value={authUser.password}
              onChange={(e) => handleLoginChange(e)}
            />
            <label htmlFor="password">Password</label>
          </div>
          <div className="remember-forgot">
            <label htmlFor="remember">
              <input
                className="mr-3"
                type="checkbox"
                id="remember"
                name="rememberMe"
              />
              Remember me
            </label>
            <Link className="text-white no-underline hover:underline" href="#">
              Forgot your password?
            </Link>
          </div>

          <button className="loginButton">Login</button>
          {/* Social Authentication */}
          <div className="mt-5">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-400" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-[#1b242c] px-1 text-gray-400">
                  Or continue with
                </span>
              </div>
            </div>
            <div className="mt-5 flex gap-2">
              <AuthSocialButton
                icon="google"
                redirect_url="http://localhost:8080/oauth2/authorization/google"
              />
              <AuthSocialButton
                icon="github"
                redirect_url="http://localhost:8080/oauth2/authorization/github"
              />
            </div>
          </div>

          <div className="togglePage-link">
            <p className="px-1">Don't have an account?</p>
            <button
              type="button"
              className="text-white cursor-pointer font-semibold underline"
              onClick={(e) => {
                e.preventDefault();
                props.onClick(false);
              }}
            >
              Sign up
            </button>
          </div>
        </form>
      </div>

      <DialogBox
        stateOpen={open}
        onClose={handleClose}
        msgTitle={data.title}
        msgBody={data.message}
      />
    </div>
  );
}
