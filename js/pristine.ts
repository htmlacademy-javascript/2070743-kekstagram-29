import Pristine from 'pristinejs';
import { uploadPhoto } from './server';
import { blockSubmitButton, closeFormWindow, unblockSubmitButton } from './form';
import { showAlert } from './utils';
import { showSuccessModal, showErrorModal } from './modal';

const enum Default {
	MAX_TAGS = 5,
	MAX_SYMBOLS = 140
}

const hashtags = document.querySelector('.text__hashtags') as HTMLElement;
const comment = document.querySelector('.text__description') as HTMLElement;
const form = document.querySelector('.img-upload__form');
const textHashtag = form?.querySelector('.text__hashtags');
const hashtag = /^(\s*#[a-zа-яё0-9]{1,19}\s*)*$/i;

const pristine = new Pristine(form, {
	classTo: 'img-upload__field-wrapper',
	errorTextParent: 'img-upload__field-wrapper'
});

const validateFormat = (value: string) => {
	if (value !== '') {
		return hashtag.test(value);
	} else {
		return true;
	}
};

const validateLengthAndDubs = (value: string) => {
	const tags = value.toLowerCase().trim().split(/\s*(?=#)/);
	const noDubs = new Set(tags);
	return tags.length <= Default.MAX_TAGS && tags.length === noDubs.size;
};

const validateTextLength = (value: string) => value.length <= Default.MAX_SYMBOLS;

const onElementKeydown = (evt: Event) => {
	evt.stopPropagation();
};

const addHandlers = (el: HTMLElement) => {
	el!.addEventListener('focus', () => {
		el!.addEventListener('keydown', onElementKeydown);
	});

	el!.addEventListener('blur', () => {
		el!.removeEventListener('keydown', onElementKeydown);
	});
};

addHandlers(hashtags);
addHandlers(comment);

pristine.addValidator(textHashtag, validateFormat, 'хештег невалиден');
pristine.addValidator(textHashtag, validateLengthAndDubs, 'Не более 5 неповторяющихся хештегов');
pristine.addValidator(form?.querySelector('.text__description'), validateTextLength, 'Длина комментария не более 140 символов');


form!.addEventListener('submit', (evt) => {
	evt.preventDefault();
	const isValid = pristine.validate();
	if (isValid) {
		blockSubmitButton();
		const formData = new FormData(evt.target as HTMLFormElement);
		uploadPhoto(formData)
			.then(() => {
				closeFormWindow();
				showSuccessModal();
			})
			.catch((err) => {
				showAlert(err.message);
				showErrorModal();
			})
			.finally(unblockSubmitButton);
	}
});

export { pristine };
