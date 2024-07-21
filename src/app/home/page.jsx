import React from "react";
import { getUserDetails } from "../severAction";
import { redirect } from "next/navigation";
import Logout from "../components/logout_component/logout";

export default async function page() {
  const currentUser = await getUserDetails();

  console.log("currentUser Received: " + JSON.stringify(currentUser));

  // If user is logged out, redirect to /auth
  if (!currentUser?.success) {
    redirect("/auth");
  }
  return (
    <div className="flex justify-center items-center mt-60 ">
      <div className="flex-col justify-center items-center text-center bg-[#60a5c7]">
        <h1 className="text-4xl mb-4 p-4"> Your Home page</h1>
        <div>
          <p>NAME : {currentUser?.data?.fullName}</p>
          <p>EMAIL : {currentUser?.data?.userName}</p>
          <p>ROLE : {currentUser?.data?.role}</p>
        </div>
        <Logout />
      </div>
    </div>
  );
}
