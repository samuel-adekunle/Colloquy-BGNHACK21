const BASE_URL = "http://ec2-18-135-99-244.eu-west-2.compute.amazonaws.com"

export async function createUser(email, uid) {
	let res = await fetch(`${BASE_URL}/createUser/username=${email}/password=${uid}`)
	res = await res.json()
}

export async function getSecretKey(email, uid) {
	let res = await fetch(`${BASE_URL}/login/username=${email}/password=${uid}`)
	res = await res.json()
	return res["secret_key"]
}

export async function trainModel(secretKey, botUID) {
	await fetch(`${BASE_URL}/trainNewModel/secretKey=${secretKey}/modelName=${botUID}`)
}

export async function getResponse(secretKey, botUID, message) {
	let res = await fetch(`${BASE_URL}/getResponse/secretKey=${secretKey}/modelName=${botUID}/message=${message}`)
	res = await res.json()
	return res
}

const TEMPLATES = {
	basic: "basic",
	bookseller: "bookseller",
	cafe: "cafe",
	designer: "designer",
	fashion: "fashion",
	gameshop: "gameshop",
	hospitality: "hospitality",
	personalPortfolio: "personal-portfolio",
	restaurant: "restaurant",
	retailer: "retailer",
	sports: "sports",
	traveladvisor: "traveladvisor",
}

export async function getTemplate(templateName) {
	let res = await fetch(`${BASE_URL}/getTemplate/templateName=${templateName}`)
	res = await res.json()
	return res
}