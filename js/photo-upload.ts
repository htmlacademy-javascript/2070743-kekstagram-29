import { showAlert } from './utils';

const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const fileChooser = document.querySelector<HTMLInputElement>('.img-upload__input');
const previewWrapper = document.querySelector<HTMLDivElement>('.img-upload__preview');
const preview = previewWrapper!.querySelector('img');
const effects = document.querySelectorAll<HTMLSpanElement>('.effects__preview');

if (!previewWrapper || !preview || !fileChooser|| !effects) {
	throw new Error('Preview elements not found');
}

fileChooser!.addEventListener('change', () => {
	const file = fileChooser.files?.[0];
	if (!file) {
		throw new Error(`file not found ${fileChooser.files?.length}`);
	}
	const fileName = file.name.toLowerCase();
	const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

	if (matches) {
		preview.src = URL.createObjectURL(file);
		effects.forEach((effect) => {
			effect.style.backgroundImage = `url(${preview.src})`;
		});
	} else {
		showAlert('Invalid file type. Please choose a valid image file.');
	}
});

export {};
