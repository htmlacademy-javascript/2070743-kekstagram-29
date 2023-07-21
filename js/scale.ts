const controlValue = (<HTMLInputElement>document.querySelector('.scale__control--value')) as HTMLInputElement;
const controlSmaller = document.querySelector('.scale__control--smaller');
const controlBigger = document.querySelector('.scale__control--bigger');

const imageContainer = document.querySelector('.img-upload__preview');
const image = imageContainer?.querySelector('img');

let value = parseInt(controlValue.value, 10);

controlBigger?.addEventListener('click', () => {
	if (value < 100) {
		value += 25;
		controlValue.value = `${value}%`;
		image!.style.transform = `scale(${value * 0.01})`;
	}
});

controlSmaller?.addEventListener('click', () => {
	if (value > 25) {
		value -= 25;
		controlValue.value = `${value}%`;
		image!.style.transform = `scale(${value * 0.01})`;
	}
});

const resetScale = () => {
	controlValue.value = '100%';
	image!.style.transform = 'scale(1)';
};

export {resetScale};
