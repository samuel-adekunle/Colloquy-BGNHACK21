import { useAuthUser } from "next-firebase-auth";

export default function HeaderBar({ name }) {
  const authUser = useAuthUser();
  return (
    <header className="border-b bg-gradient-to-r from-blue-500 via-indigo-400 to-blue-500 text-white text-right p-2 grid grid-cols-2">
      <h2 className="text-4xl text-center inline-block pl-5 font-semibold justify-self-start">
        {name}
      </h2>
      <button
        className="btn justify-self-end p-2 border-0 bg-gray-500"
        onClick={() => authUser.signOut()}
      >
        Sign Out
      </button>
    </header>
  );
}
