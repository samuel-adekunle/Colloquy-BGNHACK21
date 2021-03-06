import {useAuthUser} from "next-firebase-auth";

export default function HeaderBar() {

  const authUser = useAuthUser()
  return (
    <header className="border-b bg-gray-100 text-right p-2">
      <button className="footerBtn" onClick={() => authUser.signOut()}>Sign Out</button>
    </header>
  )
}