"use server";

import axios from "../api/axios";
import { cookies } from "next/headers";

const LOGIN_URL = "/auth/login";

// ----------- Function to login user ------------
export async function loginUser(authUser) {
  // e.preventDefault();

  console.log("Waiting for response...");
  let response = null;
  try {
    response = await axios.post(LOGIN_URL, JSON.stringify({ ...authUser }), {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });

    // Get the response
    const accessToken = response?.data?.token;
    console.log(response?.data);

    //Set the token into cookies
    const getCookies = cookies();
    getCookies.set("token", accessToken);
    console.log("Cookies is saved"); //DEBUG POINT

    return "SUCCESS"; // return SUCCESS if successfully login
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

    response = {
      title: msgTitle,
      msgBody: err.response?.status + msgBody,
    };

    return response;
  }
}

// -----------function to trigger to register a user------------
export async function registerUser(user) {
  let response = null;
  let msgBody = "";
  let msgTitle = "";
  let msgStatus = null;
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
      msgStatus = response?.status;
      msgTitle = "Username Already Exists!!!";
      msgBody =
        " Try with different username or login with existing username :(";
    } else {
      //setShow(!show); // show the login form
      msgStatus = response?.status;
      msgTitle = "Sign Up Successful :)";
      msgBody = "Now login with your credentials";
    }
  } catch (err) {
    console.log(err);

    if (!err?.response?.status === 500) {
      console.log("response: " + response); //DEBUG POINT

      msgStatus = err.response?.status;
      msgTitle = "Internal Server Error!!!";
      msgBody = "  Couldn't fetch the requested url :(";
    } else if (err.response?.status === 403) {
      console.log("response: " + err.response); // DEBUG POINT

      msgStatus = err.response?.status;
      msgTitle = "Unauthorized access or Internal Server Error!!!";
      msgBody = "  Forbidden! The Server is refusing to respond to it :(";
    } else if (err.response?.status === 400) {
      console.log("response: " + err.response); // DEBUG POINT

      msgStatus = err.response?.status;
      msgTitle = "Username Already Exists!!!";
      msgBody =
        " Try with different username or login with existing username :(";
    } else if (err.response?.status === 401) {
      console.log("response: " + err.response); // DEBUG POINT

      msgStatus = err.response?.status;
      msgTitle = "Unauthorized access or Internal Server Error!!!";
      msgBody = " Invalid credentials :(";
    } else {
      console.log("response: " + err.response); // DEBUG POINT

      msgStatus = err.response?.status;
      msgTitle = "Unauthorized access or Internal Server Error!!!";
      msgBody = " Check your internet connection or Bad request :(";
    }
  }

  const result = {
    status: msgStatus,
    title: msgTitle,
    msgBody: msgStatus + " " + msgBody,
  };

  try {
    const _user = await response?.json();
    console.log(_user);
  } catch {
    console.log("Couldn't parse to json data");
  }

  return result;
}

const USERINFO_URL = "/account/getUserInfo";
// -----------function to fetch  userDetails------------
export async function getUserDetails() {
  console.log("Here We Go"); //DEBUG POINT

  let response = null;

  try {
    // retrieve the token from cookies
    const getCookies = cookies();
    const token = getCookies.get("token")?.value || "";
    console.log("Token get: " + token);

    if (token === "") {
      return {
        success: false,
        message: "Invalid Token",
      };
    }

    response = await axios.get(USERINFO_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });

    if (response) {
      console.log("Here is the response");
      console.log(response?.data);
      return response?.data;
    } else {
      return {
        success: false,
        message: "User Details Not Found",
      };
    }
  } catch (err) {
    console.log("ERROR in FETCHING USER-DEATAILS");
    console.log(err);
    return {
      success: false,
      message: "Some error occured in fetching user-details!!! Try Again...",
    };
  }
}
