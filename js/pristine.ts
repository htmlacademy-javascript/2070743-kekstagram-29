const text = document.querySelector('.text__hashtags');
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


// text?.addEventListener('focus', (evt) => {
// 	evt.stopPropagation();
// });



pristine.addValidator(form?.querySelector('.text__hashtags'),validateFormat, 'хештег невалиден');
pristine.addValidator(form?.querySelector('.text__hashtags'),validateLengthAndDubs, 'Не более 5 неповторяющихся хештегов');

form!.addEventListener('submit', (evt) => {
	evt.preventDefault();
	pristine.validate();
});
