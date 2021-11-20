function fact(first, last) {
	let factorial = 1n
	for (let i = first; i <= last; i++) {
		factorial *= i
	}
	postMessage(factorial)
	self.close()
}

self.onmessage = (ev) => {
	fact(...ev.data)
}
