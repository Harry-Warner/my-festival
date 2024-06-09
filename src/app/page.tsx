import { NavBar } from "../components/nav";

export default function Home() {
  console.log("Server")
  return (
    <>
      <NavBar />
      <div className="flex flex-col items-center justify-center h-full">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-24 h-24 text-sky-500"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 10l7-7m0 0l7 7m-7-7v18"
          />
        </svg>
        <p className="mt-4 text-3xl font-bold text-sky-500">Choose a day</p>
    </div>
    </>
  );
}
