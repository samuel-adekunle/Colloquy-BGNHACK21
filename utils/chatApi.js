const BASE_URL = "http://ec2-18-135-99-244.eu-west-2.compute.amazonaws.com"

export async function createUser(user) {
	await fetch(`${BASE_URL}/createUser/username=${user.email}/password=${user.user.uid}`)
}

async function getAPIKey(user) {
	let res = await fetch(`${BASE_URL}/login/username=${user.email}/password=${user.user.uid}`)
	res = await res.json()
	return res["secret_key"]
}

export async function trainModel(user) {
	const secretKey = await getAPIKey(user);
	await fetch(`${BASE_URL}/trainNewModel/secretKey=${secretKey}`)
}

export async function getResponse(user, message) {
	const secretKey = await getAPIKey(user);
	let res = await fetch(`${BASE_URL}/getResponse/secretKey=${secretKey}`)
	res = await res.json()
	return res["chat_response"]
}