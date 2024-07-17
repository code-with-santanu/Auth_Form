import React from "react";

export default function Navbar(props) {
  return (
    <div className="w-full h-16 mr-10 bg-yellow-300 flex justify-end items-center ">
      <div className="nav-btn flex justify-between">
        <div
          className="btn w-20 h-9 pt-1.5 mx-4 bg-white rounded-lg border-solid border-black text-center font-semibold"
          onClick={(e) => {
            e.preventDefault();
            props.onClick(false);
          }}
        >
          SIGNUP
        </div>
        <div
          className="btn w-20 h-9 pt-1.5 mx-4 bg-white rounded-lg border-solid border-black text-center font-semibold"
          onClick={(e) => {
            e.preventDefault();
            props.onClick(true);
          }}
        >
          LOGIN
        </div>
      </div>
    </div>
  );
}
