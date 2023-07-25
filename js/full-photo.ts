import { Photo} from './types';
import { closeModal, openModal, isEscapeKey} from './utils';
import { descriptionsArray } from './mock';
import {renderComments, clearComments} from './comments';

const bigPicture = document.querySelector<HTMLElement>('.big-picture');
const closeButton = document.querySelector('.big-picture__cancel');
const bigPictureImg = document.querySelector<HTMLImageElement>('.big-picture__img img');
const likesCount = document.querySelector<HTMLElement>('.likes-count');
const commentsCount = document.querySelector<HTMLElement>('.comments-count');
const fullPhotoDescription = document.querySelector<HTMLElement>('.social__caption');

const onDocumentKeydown = (evt:KeyboardEvent) => {
	if (isEscapeKey(evt)) {
		evt.preventDefault();
		closeFullPhoto();
	}
};

const openFullPhoto = () => {
	openModal(bigPicture!);
	document.addEventListener('keydown', onDocumentKeydown);
};

const closeFullPhoto = () => {
	closeModal(bigPicture!);
	document.removeEventListener('keydown', onDocumentKeydown);
};

closeButton!.addEventListener('click', () => {
	if (bigPicture?.classList.value !== 'hidden') {
		closeFullPhoto();
	}
});

const createFullPhoto = ({ url, description, likes, comments }: Photo) => {
	bigPictureImg!.src = url;
	bigPictureImg!.alt = description;
	likesCount!.textContent = likes.toString();
	commentsCount!.textContent = comments.length.toString();
	fullPhotoDescription!.textContent = description;
	clearComments();
	renderComments(comments);
};

createFullPhoto(descriptionsArray[0]);

export { openFullPhoto,closeFullPhoto, createFullPhoto };
