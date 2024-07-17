"use client";
import React, { useState, useContext } from "react";
import Link from "next/link";

import { FaRegEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-hot-toast";
import { loginFormSchema } from "../../requirement";
import AuthSocialButton from "./AuthSocialButton";
import DialogBox from "../DialogBox";
import axios from "../../api/axios";
import AuthContext from "../../context/AuthProvider";

export default function login(props) {
  // Global context
  const { setAuth } = useContext(AuthContext);

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
    title: "Congratilation! You're successfully registered.",
    message: "Now login with your registered credentials to get started!!!",
  });

  // function to close the dialog box
  const handleClose = () => {
    setOpen(false);
  };

  // function to handle exception for invallid input data
  const clientAction = (e) => {
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
      loginUser();
    }
  };

  const LOGIN_URL = "/auth/login";
  // Function to login user
  const loginUser = async () => {
    // e.preventDefault();

    let response = null;
    try {
      response = await axios.post(LOGIN_URL, JSON.stringify({ ...authUser }), {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      const accessToken = JSON.stringify(response?.data?.token);
      console.log(response?.data);
      setAuth({ accessToken }); // Token is saved in the context

      console.log("LOGIN SUCCESSFUL"); //DEBUG POINT
    } catch (err) {
      console.log(err);

      let msgBody = "";
      let msgTitle = "";
      if (!err?.response) {
        console.log("response: " + response); //DEBUG POINT

        msgTitle = "Internal Server Error!!!";
        msgBody = "  Couldn't fetch the requested url :(";
      } else if (err.response?.status === 500) {
        console.log("response: " + err.response); // DEBUG POINT

        msgTitle = "Unauthorized access or Internal Server Error!!!";
        msgBody = "  Forbidden! The Server is refusing to respond to it :(";
      } else if (err.response?.status === 401) {
        console.log("response: " + response); // DEBUG POINT

        msgTitle = "Unauthorized Access!!!";
        msgBody = "  Invalid Credentials!  Bad request :(";
      } else {
        console.log("response: " + response); // DEBUG POINT

        msgTitle = "Login Failed!!!";
        msgBody = "  Wrong Username or Password :(";
      }

      setData({
        title: msgTitle,
        message: err.response?.status + msgBody,
      });
      setOpen(true); // show the dialogbox
    }

    // reset the login form
    setAuthUser({
      ...authUser,
      username: "",
      password: "",
    });
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
            <span className="icon ">
              {showPassword ? (
                <FaRegEye onClick={handlePassword} />
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
