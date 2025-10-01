const b = 8;
const kb = Math.pow(2, 10);
const mb = Math.pow(2, 20);
const gb = Math.pow(2, 30);

const reduceSize = (size: number): string => {
	const jspace = (...args: string[]) => args.join(" ");
	const _s_rnd = (s: number) => String(s.toFixed(2));

	let out = "";

	if (size < kb) {
		out = jspace(_s_rnd(size / b), "B");
	} else if (kb < size && size < mb) {
		out = jspace(_s_rnd(size / kb), "Kb");
	} else if (mb < size && size < gb) {
		out = jspace(_s_rnd(size / mb), "Mb");
	} else if (gb < size) {
		out = jspace(_s_rnd(size / gb), "Gb");
	}

	return out;
};

export default reduceSize;
