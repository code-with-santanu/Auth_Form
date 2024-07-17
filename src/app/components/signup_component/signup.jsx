"use client";

import React, { useState } from "react";

import { FaRegEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-hot-toast";
import { regFormSchema } from "../../requirement";
import DialogBox from "../DialogBox";

export default function signup(props) {
  // To show or hide password
  const [showPassword, setShowPassword] = useState(false);

  // For registration form
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // state for dialog box
  const [open, setOpen] = React.useState(false);
  // Display messege for dialog box
  const [data, setData] = useState({
    title: "Congratilation! You're successfully registered.",
    message: "Now login with your registered credentials to get started!!!",
  });

  // function to change the value of state onchange in input
  const handleChange = (event) => {
    const value = event.target.value;
    setUser({ ...user, [event.target.name]: value });
  };

  // function to close the dialog box
  const handleClose = () => {
    setOpen(false);
  };

  // function to show or hide password
  const handlePassword = () => {
    setShowPassword(!showPassword);
  };

  // function to trigger to register a user
  const saveUser = async () => {
    let response = null;
    try {
      delete user.confirmPassword; // deleted entry before sending the data to backend
      response = await fetch("http://localhost:8080/auth/register", {
        method: "POST",
        // redirect: follow, // allow redirection for authentication
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...user,
        }),
        credentials: "include",
      });

      console.log(response); // DEBUG POINT
      if (response?.status === 400) {
        setData({
          title: "Username Already Exists!!!",
          message:
            response?.status +
            " Try with different username or login with existing username :(",
        });
      } else {
        //setShow(!show); // show the login form
        setData({
          title: "Sign Up Successful :)",
          message: "Now login with your credentials",
        });
      }
      setOpen(true); // show the dialogbox
    } catch (err) {
      console.log(err);

      let msgBody = "";
      let msgTitle = "";

      if (!err?.response?.status === 500) {
        console.log("response: " + response); //DEBUG POINT

        msgTitle = "Internal Server Error!!!";
        msgBody = "  Couldn't fetch the requested url :(";
      } else if (err.response?.status === 403) {
        console.log("response: " + err.response); // DEBUG POINT

        msgTitle = "Unauthorized access or Internal Server Error!!!";
        msgBody = "  Forbidden! The Server is refusing to respond to it :(";
      } else if (err.response?.status === 400) {
        console.log("response: " + err.response); // DEBUG POINT

        msgTitle = "Username Already Exists!!!";
        msgBody =
          " Try with different username or login with existing username :(";
      } else if (err.response?.status === 401) {
        console.log("response: " + err.response); // DEBUG POINT

        msgTitle = "Unauthorized access or Internal Server Error!!!";
        msgBody = " Invalid credentials :(";
      } else {
        console.log("response: " + err.response); // DEBUG POINT

        msgTitle = "Unauthorized access or Internal Server Error!!!";
        msgBody = " Check your internet connection or Bad request :(";
      }

      setData({
        title: msgTitle,
        message: err.response?.status + msgBody,
      });
      setOpen(true); // show the dialogbox
    }

    try {
      const _user = await response?.json();
      console.log(_user);
    } catch {
      console.log("Couldn't parse to json data");
    }

    setUser({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    }); // reset the signup form
  };

  // function to handle exception for invallid input data
  const clientAction = (e) => {
    e.preventDefault();

    const getData = { ...user };

    // client side validation
    const result = regFormSchema.safeParse(getData);

    if (!result.success) {
      let errmsg = "";
      result.error.issues.forEach((issue) => {
        errmsg = issue.path[0] + " : " + issue.message + "\n";
        toast.error(errmsg);
      });

      //toast.error(errmsg);
    } else {
      setUser(result.data);
      saveUser();
    }
  };

  return (
    <div className=" main-container">
      <div className="signUp-box">
        <form onSubmit={clientAction}>
          <div className="heading">
            <h1 className="text-3xl font-bold text-center text-white pt-6">
              Create an Account!
            </h1>
          </div>
          <div className="input-box">
            <span className="icon">
              <ion-icon name="person-circle-outline"></ion-icon>
            </span>
            <input
              id="firstname"
              name="firstName"
              value={user.firstName}
              onChange={(e) => handleChange(e)}
              placeholder=""
              required
              type="text"
            />
            <label htmlFor="firstname">First Name</label>
          </div>
          <div className="input-box">
            <span className="icon">
              <ion-icon name="person-circle-outline"></ion-icon>
            </span>
            <input
              id="lastname"
              name="lastName"
              value={user.lastName}
              onChange={(e) => handleChange(e)}
              placeholder=""
              required
              type="text"
            />
            <label htmlFor="lastname">Last Name</label>
          </div>
          <div className="input-box">
            <span className="icon">
              <ion-icon name="mail"></ion-icon>
            </span>
            <input
              id="mail"
              name="email"
              value={user.email}
              onChange={(e) => handleChange(e)}
              placeholder=""
              required
              type="email"
            />
            <label htmlFor="mail">Email</label>
          </div>
          <div className="input-box">
            <span className="icon">
              {showPassword ? (
                <FaRegEye onClick={handlePassword} />
              ) : (
                <FaEyeSlash onClick={handlePassword} />
              )}
            </span>
            <input
              id="passwd"
              required
              type={showPassword ? "text" : "password"}
              name="password"
              value={user.password}
              onChange={(e) => handleChange(e)}
            />
            <label htmlFor="passwd">Password</label>
          </div>
          <div className="input-box">
            <span className="icon">
              {showPassword ? (
                <FaRegEye onClick={handlePassword} />
              ) : (
                <FaEyeSlash onClick={handlePassword} />
              )}
            </span>
            <input
              id="cnfmpasswd"
              required
              type={showPassword ? "text" : "password"}
              name="confirmPassword"
              value={user.confirmPassword}
              onChange={(e) => handleChange(e)}
            />
            <label htmlFor="cnfmpasswd">Confirm Password</label>
          </div>

          <button className="loginButton">Sign Up</button>
          <div className="togglePage-link">
            <p className="px-1">Already have an account?</p>
            <button
              type="button"
              className="text-white cursor-pointer font-semibold underline "
              onClick={(e) => {
                e.preventDefault();
                props.onClick(true);
              }}
            >
              Login
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
