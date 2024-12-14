"use client";
import { useSearchParams } from "next/navigation";
import React from "react";

const RegisterEvent = () => {
  const id = useSearchParams().get("id");

  return (
    <main>
      <h1>Register Event</h1>
      <form></form>
    </main>
  );
};

export default RegisterEvent;
