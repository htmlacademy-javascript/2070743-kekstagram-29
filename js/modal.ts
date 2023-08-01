
import { formEscKeydown } from './form';
import { onDocumentEscKeydown } from './utils';

const successTemplate = document.querySelector<HTMLTemplateElement>('#success')?.content.querySelector<HTMLAnchorElement>('.success');
const errorTemplate = document.querySelector<HTMLTemplateElement>('#error')?.content.querySelector<HTMLAnchorElement>('.error');

let currentModal: HTMLAnchorElement | undefined;
let currentModalName = '';

const showSuccessModal = () => {
	showModal(successTemplate!);
	const successButton = currentModal!.querySelector<HTMLButtonElement>('.success__button');
	currentModalName = 'success';
	successButton!.addEventListener('click', closeModal);
};

const showErrorModal = () => {
	showModal(errorTemplate!);
	const errorButton = currentModal!.querySelector<HTMLButtonElement>('.error__button');
	currentModalName = 'error';
	errorButton!.addEventListener('click', closeModal);
};

const showModal = (template: HTMLAnchorElement) => {
	if (currentModal === undefined) {
		const thumbnailsFragment = document.createDocumentFragment();
		currentModal = template.cloneNode(true) as HTMLAnchorElement;
		document.removeEventListener('keydown', formEscKeydown);
		document.addEventListener('keydown', onEscKeydown);
		document.addEventListener('click', onOuterBodyClick);
		thumbnailsFragment.append(currentModal);
		document.body.append(thumbnailsFragment);
	}
};

const closeModal = () => {
	if (currentModal !== undefined) {
		document.removeEventListener('keydown', onEscKeydown);
		document.addEventListener('keydown', formEscKeydown);
		document.removeEventListener('click', onOuterBodyClick);
		document.body.removeChild(currentModal);
		currentModal = undefined;
	}
};

const onEscKeydown = (evt: KeyboardEvent) => onDocumentEscKeydown(evt, closeModal);

// const onOuterBodyClick = (evt:any) => {
// 		if (!evt.target.closest(`.success__inner`)) {
// 			closeModal();
// 		}
// 	};


const onOuterBodyClick = (evt:any) => {
	if (!evt.target.closest(`.${currentModalName}__inner`)) {
		closeModal();
	}
};



export { showSuccessModal, showErrorModal };
