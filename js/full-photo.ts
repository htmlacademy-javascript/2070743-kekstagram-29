import { Photo} from './types';
import { onDocumentKeydown } from './utils';
import { descriptionsArray } from './mock';
import {showComments} from './comments';

const bigPicture = document.querySelector('.big-picture');
const closeButton = document.querySelector('.big-picture__cancel');

const bigPictureImg = document.querySelector<HTMLImageElement>('.big-picture__img img');
const likesCount = document.querySelector<HTMLElement>('.likes-count');
const commentsCount = document.querySelector<HTMLElement>('.comments-count');
const socialCommentCount = document.querySelector<HTMLElement>('.social__comment-count');
const commentsLoader = document.querySelector<HTMLElement>('.comments-loader');
const fullPhotoDescription = document.querySelector<HTMLElement>('.social__caption');

const openFullPhoto = () => {
	bigPicture?.classList.remove('hidden');
	socialCommentCount?.classList.add('hidden');
	commentsLoader!.classList.add('hidden');
	document.body.classList.add('modal-open');
	document.addEventListener('keydown', onDocumentKeydown);
};

const closeFullPhoto = () => {
	bigPicture?.classList.add('hidden');
	document.body.classList.remove('modal-open');
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
	showComments(comments);
};

createFullPhoto(descriptionsArray[0]);

export { openFullPhoto,closeFullPhoto, createFullPhoto };
