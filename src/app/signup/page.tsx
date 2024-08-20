"use client";
import { useState } from "react";
import { signup } from "./actions";

export default function Page() {
  const [errorMessage, setErrorMessage] = useState("");

  const handleSignup = async (formData: FormData) => {
    const response = await signup(formData);
    if (response.error) {
      setErrorMessage(response.error);
    } else {
      return response;
    }
  };

  return (
    <div className="w-screen min-h-full flex justify-center items-center bg-gray-100">
      <div className="bg-white h-[30rem] w-[25rem] rounded-xl shadow-lg flex flex-col items-center justify-evenly p-6">
        <h1 className="text-2xl font-semibold">Sign up</h1>
        <form className="flex flex-col gap-3 w-full" action={handleSignup}>
          <label htmlFor="username" className="text-sm font-medium">
            Username
          </label>
          <input
            name="username"
            id="username"
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
            aria-label="Username"
          />

          <label htmlFor="password" className="text-sm font-medium">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
            aria-label="Password"
          />

          <label htmlFor="confirm-password" className="text-sm font-medium">
            Confirm password
          </label>
          <input
            type="password"
            name="confirm-password"
            id="confirm-password"
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
            aria-label="Password"
          />

          <button
            type="submit"
            className="mt-4 bg-gray-800 text-white text-sm py-2 rounded-md hover:bg-gray-700 transition-colors"
          >
            Continue
          </button>
          <p className="text-de text-sm font-light text-red-600 text-center">
            {errorMessage}
          </p>
        </form>
        <p className="text-xs mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-blue-500 underline">
            Log in
          </a>
        </p>
      </div>
    </div>
  );
}
