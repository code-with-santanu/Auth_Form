import React from "react";
import Slide from "@mui/material/Slide";

import { z } from "zod"; // For validating data

// for custom dialog box(material-ui)
export const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

// Schema for validating signup form data
export const regFormSchema = z
  .object({
    firstName: z
      .string()
      .trim()
      .min(2, { message: "First Name should be atleast of 2 character long." })
      .max(20, {
        message: "First Name should be atmost of 20 character long.",
      }),
    lastName: z
      .string()
      .trim()
      .min(2, { message: "Last Name should be atleast of 2 character long." })
      .max(20, { message: "Last Name should be atmost of 20 character long." }),
    email: z.string().trim().email({ message: "invalid data" }),
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "The passwords did not match",
      });
    }
  });

// Schema for validating signup form data
export const loginFormSchema = z.object({
  username: z.string().trim().email({ message: "invalid data" }),
  password: z.string().min(8),
});
