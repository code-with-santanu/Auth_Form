"use client";

import React, { useState } from "react";

import { FaRegEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-hot-toast";
import { regFormSchema } from "../../helper/requirement";
import DialogBox from "../DialogBox";
import { registerUser } from "@/app/severAction";

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

  // function to trigger while form is submitted for register
  const clientAction = async (e) => {
    e.preventDefault();

    const getData = { ...user };

    // client side data validation
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
      const response = await registerUser(user);
      console.log("received: " + response);

      if (response?.status === 200) {
        // toggle to login page
        props.onClick(true);
        console.log("SIGNUP SUCCESSFUL"); //DEBUG POINT
        toast.success("Now Login with your credentials");
      } else {
        console.log("ERROR ENCOUNTERED");
        setData({
          title: response.title,
          message: response.msgBody,
        });
        setOpen(true); // show the dialogbox
      }

      // reset the signup form
      setUser({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
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
            <span className="icon cursor-pointer">
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
            <span className="icon cursor-pointer">
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
