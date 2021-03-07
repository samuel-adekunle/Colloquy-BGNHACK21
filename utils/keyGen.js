export function makeKeyGenerator() {
	const date = Date.now()
	let counter = 0
	return function(key) {
		const _key = `${date}_${key}_${counter}`
		counter += 1
		return _key
	}
}