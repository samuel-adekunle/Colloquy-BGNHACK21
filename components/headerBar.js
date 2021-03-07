import { useAuthUser } from "next-firebase-auth";

export default function HeaderBar({name}) {
  const authUser = useAuthUser();
  return (
    <header className="border-b bg-gray-100 text-right p-2">
      <button className="btn" onClick={() => authUser.signOut()}>
        Sign Out
      </button>
    </header>
  );
}
