import { openModal, closeModal,onDocumentKeydown } from './utils';
import { pristine } from './pristine';
import { resetEffect} from './nouislider';
import { resetScale } from './scale';


const imgInput = document.querySelector<HTMLFormElement>('.img-upload__input');
const uploadForm = document.querySelector<HTMLFormElement>('.img-upload__overlay');
const closeButton = document.querySelector<HTMLElement>('.img-upload__cancel');
const form = document.querySelector<HTMLFormElement>('.img-upload__form');


imgInput?.addEventListener('change', () => {
	openModal(uploadForm!);
	document.addEventListener('keydown', onDocumentKeydown);
	imgInput.value = '';
});

const closeFormWindow = () => {
	form!.reset();
	pristine.reset();
	resetEffect();
	resetScale();
	closeModal(uploadForm!);
	document.removeEventListener('keydown', onDocumentKeydown);
};

closeButton!.addEventListener('click', () => {
	if (uploadForm?.classList.value !== 'hidden') {
		closeFormWindow();
	}
});

export {closeFormWindow};
