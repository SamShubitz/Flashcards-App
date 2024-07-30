import { login } from "./actions";

export default function Page() {
  return (
    <div className="w-screen flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white h-[30rem] w-[25rem] rounded-xl shadow-lg flex flex-col items-center justify-evenly p-6">
        <h1 className="text-2xl font-semibold">Sign in</h1>
        <form
          className="flex flex-col gap-3 w-full"
          action={login}
          method="POST"
        >
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
        </form>
        <p className="text-xs mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-blue-500 underline">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
}
