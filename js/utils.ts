const getRandomInteger = (a: number, b: number) => {
	const lower = Math.ceil(Math.min(a, b));
	const upper = Math.floor(Math.max(a, b));
	const result = Math.random() * (upper - lower + 1) + lower;
	return Math.floor(result);
};

const getRandomId = (a: number, b: number) => {
	let previousValues: number[] = [];
	return function () {
		let currentValue = getRandomInteger(a, b);
		if (previousValues.length >= (b - a + 1)) {
			previousValues = [];
		}
		while (previousValues.includes(currentValue)) {
			currentValue = getRandomInteger(a, b);
		}
		previousValues.push(currentValue);
		return currentValue;
	};
};

export {getRandomInteger, getRandomId};
