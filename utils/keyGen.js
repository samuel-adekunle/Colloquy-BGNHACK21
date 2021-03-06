export function makeKeyGenerator() {
	let counter = 0
	return function(index) {
		const key = `__${index}__${counter}`
		counter += 1
		return key
	}
}