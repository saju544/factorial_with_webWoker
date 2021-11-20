const CPU_CORES = window.navigator.hardwareConcurrency

function fact(n) {
	let factorial = 1n
	let start = 1n
	let thread_exexcuted = 0
	let factor =
		n % CPU_CORES === 0
			? BigInt(n / CPU_CORES)
			: BigInt(Math.floor(n / CPU_CORES) + 1)

	for (let i = 1n; i <= CPU_CORES; i++) {
		const worker = new Worker("./my-worker.js")
		if (i === BigInt(CPU_CORES)) {
			worker.postMessage([start, BigInt(n)])
		} else {
			worker.postMessage([start, factor * i])
		}
		start = factor * i + 1n
		worker.onmessage = (ev) => {
			thread_exexcuted++
			factorial *= ev.data
			if (thread_exexcuted === CPU_CORES) {
				console.log(factorial)
			}
		}
	}
}

fact(5241)
