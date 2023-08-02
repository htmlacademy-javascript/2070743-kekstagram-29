const enum Default {
	DELAY = 500,
}

const debounce = <A = unknown, R = void>(callback: (...args: A[]) => R, delay: number = Default.DELAY) => {
	let timer: ReturnType<typeof setTimeout>;
	return (...args: A[]) => {
		clearTimeout(timer);
		timer = setTimeout(() => callback(...args), delay);
	};
};

export {debounce};
