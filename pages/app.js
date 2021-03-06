import { AuthAction, useAuthUser, withAuthUser } from "next-firebase-auth";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

function App() {
	const authUser = useAuthUser()
	return <div><button onClick={() => authUser.signOut()}>Sign Out</button></div>
}

function Loading() {
	return <div className="flex justify-center items-center w-full h-full">
		<Loader color="#000" height={200} width={200} />
	</div>
}

export default withAuthUser({
	whenAuthed: AuthAction.RENDER,
	whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
	whenUnauthedBeforeInit: AuthAction.SHOW_LOADER,
	LoaderComponent: Loading
})(App);