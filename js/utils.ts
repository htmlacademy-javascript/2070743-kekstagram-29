
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

const isEscapeKey = (evt: KeyboardEvent) => evt.key === 'Escape';

const onDocumentEscKeydown = (evt: KeyboardEvent, callback: () => void) => {
	if (isEscapeKey(evt)) {
		evt.preventDefault();
		callback();
	}
};

const renderPack = <El>(items: El[], container: Element, render: (item: El) => HTMLElement) => {
	const fragment = document.createDocumentFragment();
	items.forEach((item) => fragment.append(render(item)));
	container.append(fragment);
};

const openModal = (modal: HTMLElement) => {
	modal.classList.remove('hidden');
	document.body.classList.add('modal-open');
};

const closeModal = (modal: HTMLElement) => {
	modal.classList.add('hidden');
	document.body.classList.remove('modal-open');
};

const showAlert = (message: string) => {
	const alertContainer = document.createElement('div');
	alertContainer.style.zIndex = '100';
	alertContainer.style.position = 'absolute';
	alertContainer.style.left = '0';
	alertContainer.style.top = '0';
	alertContainer.style.right = '0';
	alertContainer.style.padding = '10px 3px';
	alertContainer.style.fontSize = '30px';
	alertContainer.style.textAlign = 'center';
	alertContainer.style.backgroundColor = 'red';

	alertContainer!.textContent = message;

	document.body.append(alertContainer);
};

export { getRandomInteger, getRandomId, isEscapeKey, renderPack, openModal, closeModal, showAlert, onDocumentEscKeydown };
