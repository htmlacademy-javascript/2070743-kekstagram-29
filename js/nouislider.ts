import noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.min.css';

const imgContainer = document.querySelector('.img-upload__preview');
const img = imgContainer?.querySelector('img');

const sliderContainer = document.querySelector<HTMLDivElement>('.img-upload__effect-level');
const slider = document.querySelector<HTMLDivElement>('.effect-level__slider');
const sliderValue = document.querySelector<HTMLInputElement>('.effect-level__value');
const previews = document.querySelectorAll<HTMLSpanElement>('.effects__preview');

const createSliderData = (min = 0, max = 100, step = 1, start = max) => ({
	range: {
		min,
		max,
	},
	start,
	step,
});

const filtersSuppliers = new Map([
	['effect-chrome', () => `grayscale(${sliderValue!.value})`],
	['effect-sepia', () => `sepia(${sliderValue!.value})`],
	['effect-marvin', () => `invert(${sliderValue!.value}%)`],
	['effect-phobos', () => `blur(${sliderValue!.value}px)`],
	['effect-heat', () => `brightness(${sliderValue!.value})`],
]);

const sliderDataMap = new Map([
	['effect-chrome', createSliderData(0, 1, 0.1)],
	['effect-sepia', createSliderData(0, 1, 0.1)],
	['effect-marvin', createSliderData(0, 100, 1)],
	['effect-phobos', createSliderData(0, 3, 0.1)],
	['effect-heat', createSliderData(1, 3, 0.1)],
]);

const formNoUiSlider = noUiSlider.create(slider!, {
	start: 1,
	connect: 'lower',
	step: 0.1,
	range: {
		'min': 0,
		'max': 1
	}
});


const applyEffect = (effect: string) => {
	const filterSupplier = filtersSuppliers.get(effect) || (() => 'none');
	img!.style.filter = filterSupplier();
	const hidden = img!.style.filter === 'none';
	slider!.hidden = hidden;
	sliderContainer!.hidden = hidden;
};

const updateSliderData = (effect: string) => {
	const sliderData = sliderDataMap.get(effect);
	if (sliderData !== undefined) {
		formNoUiSlider.updateOptions(sliderData, false);
	}
};

const setChecked = (radioInput:HTMLElement) => {
	const currentChecked = document.querySelector('.effects__radio[checked]') as HTMLInputElement;
	if (currentChecked && currentChecked !== radioInput) {
		currentChecked!.removeAttribute('checked');
		radioInput.setAttribute('checked', 'true');
		updateSliderData(radioInput.id);
		applyEffect(radioInput.id);
	}
};

previews!.forEach((preview) => {
	preview.addEventListener('click', () => {
		const item = preview.closest('.effects__item');
		const radioInput = item!.querySelector('.effects__radio') as HTMLInputElement;
		setChecked(radioInput);
	});
});

formNoUiSlider.on('update', () => {
	sliderValue!.value = formNoUiSlider.get().toString();
	const currentChecked = document.querySelector('.effects__radio[checked]') as HTMLInputElement;
	applyEffect(currentChecked.id);
});


const resetEffect = () => {
	const radioInput = document.querySelector('.effects__radio') as HTMLInputElement;
	setChecked(radioInput);
};

export {resetEffect};
