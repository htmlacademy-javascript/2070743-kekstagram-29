//Закрытие формы редактирования изображения производится либо нажатием на кнопку .img-upload__cancel,
//  либо нажатием клавиши Esc. Элементу .img-upload__overlay возвращается класс hidden.
//  У элемента body удаляется класс modal-open.

import { openModal, closeModal,onDocumentKeydown } from './utils';

const imgInput = document.querySelector<HTMLFormElement>('.img-upload__input');
const uploadForm = document.querySelector<HTMLFormElement>('.img-upload__overlay');
const closeButton = document.querySelector<HTMLFormElement>('.img-upload__cancel');


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
// const pristine = new Pristine(uploadForm);

// uploadForm.addEventListener('submit', function (e) {
// 	e.preventDefault();

// 	// check if the form is valid
// 	var valid = pristine.validate(); // returns true or false

// });


