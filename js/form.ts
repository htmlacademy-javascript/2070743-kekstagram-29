import { openModal, closeModal, onDocumentEscKeydown } from './utils';
import { pristine } from './pristine';
import { resetEffect } from './nouislider';
import { resetScale } from './scale';

const imgInput = document.querySelector<HTMLFormElement>('.img-upload__input');
const uploadForm = document.querySelector<HTMLFormElement>('.img-upload__overlay');
const closeButton = document.querySelector<HTMLElement>('.img-upload__cancel');
const form = document.querySelector<HTMLFormElement>('.img-upload__form');
const formSubmitButton = document.querySelector<HTMLFormElement>('#upload-submit');

const closeFormWindow = () => {
	form!.reset();
	pristine.reset();
	resetEffect();
	resetScale();
	closeModal(uploadForm!);
	document.removeEventListener('keydown', onFormEscKeydown);
};

const onFormEscKeydown = (evt: KeyboardEvent) => onDocumentEscKeydown(evt, closeFormWindow);

imgInput?.addEventListener('change', () => {
	openModal(uploadForm!);
	document.addEventListener('keydown', onFormEscKeydown);
});

closeButton!.addEventListener('click', () => {
	if (uploadForm?.classList.value !== 'hidden') {
		closeFormWindow();
	}
});

const blockSubmitButton = () => {
	formSubmitButton!.textContent = 'Отправка...';
	formSubmitButton!.disabled = true;
};

const unblockSubmitButton = () => {
	formSubmitButton!.textContent = 'Опубликовать';
	formSubmitButton!.disabled = false;
};

export { closeFormWindow, blockSubmitButton, unblockSubmitButton, onFormEscKeydown };
