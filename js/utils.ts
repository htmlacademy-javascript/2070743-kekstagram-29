import {closeFullPhoto} from './full-photo';

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

const isEscapeKey = (evt:any) => evt.key === 'Escape';

const onDocumentKeydown = (evt:any) => {
	if (isEscapeKey(evt)) {
		evt.preventDefault();
		closeFullPhoto();
	}
};

const renderPack = <El>(items: El[], container: Element, render:(item:El) => HTMLElement) => {
	const fragment = document.createDocumentFragment();
	items.forEach((item) => fragment.append(render(item)));
	container.append(fragment);
};

export {getRandomInteger, getRandomId, isEscapeKey, onDocumentKeydown, renderPack };
