const hashtags = document.querySelector('.text__hashtags') as HTMLElement;
const comment = document.querySelector('.text__description') as HTMLElement;
const form = document.querySelector('.img-upload__form');

const hashtag =  /^(\s*#[a-zа-яё0-9]{1,19}\s*)*$/i;

const pristine = new Pristine(form, {
	classTo: 'img-upload__field-wrapper',
	errorTextParent: 'img-upload__field-wrapper'
});

const validateFormat = (value:string) => {
	if (value !== '') {
		return hashtag.test(value);
	} else {
		return true;
	}
};

const validateLengthAndDubs = (value:string) => {
	const tags = value.trim().split(/\s*(?=#)/);
	const noDubs = new Set(tags);
	return tags.length <= 5 && tags.length === noDubs.size;
};

const validateTextLength = (value:string) => {
	return value.length <= 140;
};

const keydownHandler = (evt:Event) => {
	evt.stopPropagation();
};

const addHandlers = (el:HTMLElement) => {
	el!.addEventListener('focus', () => {
		el!.addEventListener ('keydown', keydownHandler);
	});

	el!.addEventListener('blur', () => {
		el!.removeEventListener ('keydown', keydownHandler);
	});
}

addHandlers(hashtags);
addHandlers(comment);

pristine.addValidator(form?.querySelector('.text__hashtags'),validateFormat, 'хештег невалиден');
pristine.addValidator(form?.querySelector('.text__hashtags'),validateLengthAndDubs, 'Не более 5 неповторяющихся хештегов');
pristine.addValidator(form?.querySelector('.text__description'),validateTextLength, 'Длина комментария не более 140 символов');

form!.addEventListener('submit', (evt) => {
	evt.preventDefault();
	pristine.validate();
});
