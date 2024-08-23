import LoginForm from "./Components/LoginForm";

export default function Page() {
  return (
    <div className="bg-slate-900 py-9 border-y-[1px] w-screen min-h-full flex justify-center items-center">
      <div className="bg-slate-100 h-[30rem] w-[25rem] rounded-xl shadow-lg flex flex-col items-center justify-evenly p-6">
        <h1 className="text-2xl font-semibold">Log in</h1>
        <LoginForm />
        <p className="text-xs mt-4">
          {"Don't have an account?"}{" "}
          <a href="/signup" className="text-blue-500 underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}
