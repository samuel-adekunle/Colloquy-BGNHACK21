import { useState } from "react"

export default function Index() {
	const [userName, setUserName] = useState("")
	const [password, setPassword] = useState("")
	return <div className="pt-80">
		<div className="mx-auto w-min">
			<h1 className="text-3xl text-center pb-2">Login</h1>
			<span>
				Username: <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} />
			</span>
			<span>
				Password: <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
			</span>
			<div className="flex justify-center pt-4">
				<button className="px-4 py-2 rounded focus:outline-none focus:ring-1 focus:ring-blue-800" style={{border: "1px solid black"}}>
					Submit
				</button>
			</div>
		</div>
	</div>

}