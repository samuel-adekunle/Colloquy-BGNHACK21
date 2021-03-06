import { useAuthUser } from "next-firebase-auth";
import { IoExitOutline } from "react-icons/io5";

export default function HeaderBar({ name }) {
  const authUser = useAuthUser();
  return (
    <header className="w-full border-b text-white text-right p-2 grid grid-cols-2 header-bar">
      <h2 className="text-2xl text-center inline-block pl-5 font-semibold justify-self-start">
        {name}
      </h2>
      <button
        className="btn justify-self-end mx-7 p-1 border-0 bg-gray-500 bg-opacity-90"
        onClick={() => authUser.signOut()}
      >
        <IoExitOutline size={28}/>
      </button>
    </header>
  );
}
