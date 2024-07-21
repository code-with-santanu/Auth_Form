"use client";
import { logoutAction } from "@/app/severAction";
import { Button } from "@mui/material";

import React from "react";

export default function logout() {
  async function handleLogout() {
    // e.preventDefault();
    await logoutAction();
  }
  return <Button onClick={handleLogout}>LOGOUT</Button>;
}
