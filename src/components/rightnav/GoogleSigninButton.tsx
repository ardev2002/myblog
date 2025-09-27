"use client";
import { signInWithRedirect } from "aws-amplify/auth";
import { User2 } from "lucide-react";
import React from "react";

export default function GoogleSigninButton() {
  return (
    <button
      onClick={() => signInWithRedirect({ provider: "Google" })}
      className="cursor-pointer p-1 rounded-full hover:text-primary transition-colors"
      title="Sign in"
    >
      <User2 size={20} />
    </button>
  );
}
