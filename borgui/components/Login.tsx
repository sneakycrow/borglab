import React from "react";
import { signIn } from "next-auth/react";

const Login = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold">Login</h1>
      <button
        className="bg-purple-600 text-white px-4 py-2 rounded-md mt-4"
        onClick={() => signIn("twitch")}
      >
        Login with Twitch
      </button>
    </div>
  );
};

export default Login;
