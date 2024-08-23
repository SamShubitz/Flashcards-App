"use client";
import { login } from "../actions";
import { useState } from "react";

const LoginForm = () => {
  const [error, setError] = useState("");

  const handleSubmit = async (formData: FormData) => {
    const response = await login(formData);
    if (response.error) {
      setError(response.error);
    }
  };

  return (
    <form className="flex flex-col gap-3 w-full" action={handleSubmit}>
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

      <button
        type="submit"
        className="mt-4 bg-gray-800 text-white text-sm py-2 rounded-md hover:bg-gray-700 transition-colors"
      >
        Continue
      </button>
      <p className="h-[.5rem] text-xs text-red-500">{error}</p>
    </form>
  );
};

export default LoginForm;
