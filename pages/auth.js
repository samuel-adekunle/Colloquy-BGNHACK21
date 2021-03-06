import firebase from "firebase/app"
import "firebase/auth"
import { AuthAction, withAuthUser } from "next-firebase-auth"
import { useState } from "react"
import { createUser } from "../utils/chatApi"

function Auth() {
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")

	const isNewUser = async () => {
		const methods = await firebase.auth().fetchSignInMethodsForEmail(email)
		return methods.length == 0
	}

	const handleSubmit = async () => {
		if (await isNewUser()) {
			await firebase.auth().createUserWithEmailAndPassword(email, password).then(async userCredential => {
				await createUser(email, userCredential.user.uid)
			})
		} else {
			await firebase.auth().signInWithEmailAndPassword(email, password)
		}
	}

	return <div className="pt-80">
		<div className="mx-auto w-min">
			<h1 className="text-3xl text-center pb-4">Authentication</h1>
			<span>
				Email: <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
			</span>
			<span>
				Password: <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
			</span>
			<div className="flex justify-center pt-4">
				<button className="px-4 py-2 rounded focus:outline-none focus:ring-1 focus:ring-blue-800" style={{ border: "1px solid black" }} onClick={() => handleSubmit()}>
					Submit
				</button>
			</div>
		</div>
	</div>
}

export default withAuthUser({ whenAuthed: AuthAction.REDIRECT_TO_APP })(Auth)