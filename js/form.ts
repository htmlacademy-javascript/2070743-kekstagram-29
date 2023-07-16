import { openModal, closeModal,onDocumentKeydown } from './utils';

const imgInput = document.querySelector<HTMLFormElement>('.img-upload__input');
const uploadForm = document.querySelector<HTMLFormElement>('.img-upload__overlay');
const closeButton = document.querySelector<HTMLElement>('.img-upload__cancel');


imgInput?.addEventListener('change', () => {
	openModal(uploadForm!);
	document.addEventListener('keydown', onDocumentKeydown);
	imgInput.value = '';
});

const closeFormWindow = () => {
	closeModal(uploadForm!);
	document.removeEventListener('keydown', onDocumentKeydown);
};

closeButton?.addEventListener('click', () => {
	if (uploadForm?.classList.value !== 'hidden') {
		closeFormWindow();
	}
});

export {closeFormWindow};
