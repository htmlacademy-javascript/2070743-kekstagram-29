import { Photo, PhotoComment } from './types';
import { isEscapeKey } from './utils';
import { descriptionsArray } from './mock';


const bigPicture = document.querySelector('.big-picture');
const closeButton = document.querySelector('.big-picture__cancel');

const bigPictureImg = document.querySelector<HTMLImageElement>('.big-picture__img img');
const likesCount = document.querySelector<HTMLElement>('.likes-count');
const commentsCount = document.querySelector<HTMLElement>('.comments-count');
const fullPhotoDescription = document.querySelector<HTMLElement>('.social__caption');

const commentsContainer = document.querySelector<HTMLElement>('.social__comments');
const commentTemplate =  document.querySelector<HTMLElement>('.social__comment');
const commentText = document.querySelector<HTMLElement>('.social__text');

const onDocumentKeydown = (evt: any) => {
	if (isEscapeKey(evt)) {
		evt.preventDefault();
		closeFullPhoto();
	};
};

const openFullPhoto = () => {
	bigPicture?.classList.remove('hidden');
	document.addEventListener('keydown', onDocumentKeydown);
};

const closeFullPhoto = () => {
	bigPicture?.classList.add('hidden');
	document.removeEventListener('keydown', onDocumentKeydown);
};

closeButton!.addEventListener('click', () => {
	if (bigPicture?.classList.value !== 'hidden') {
		closeFullPhoto();
	};
});


const showComments = (comments:any) => {

	const commentsFragment = document.createDocumentFragment();

	comments.forEach((comment:PhotoComment) => {
		const commentElement = commentTemplate!.cloneNode(true);
		const avatarPicture = document.querySelector<HTMLImageElement>('.social__picture');
		avatarPicture!.src = comment.avatar;
		avatarPicture!.alt = comment.name;
		commentText!.textContent = comment.message;
		commentsFragment.append(commentElement);
	});
	commentsContainer?.append(commentsFragment);
};

const createFullPhoto = ({ url, description, likes, comments }: Photo) => {
	bigPictureImg!.src = url;
	bigPictureImg!.alt = description;
	likesCount!.textContent = likes.toString();
	commentsCount!.textContent = comments.length.toString();
	fullPhotoDescription!.textContent = description;
	showComments(comments);
};


createFullPhoto(descriptionsArray[0]);

export { openFullPhoto, createFullPhoto };



// не удаляются первые 3 коммента, аватарки у всех комментов одинаковые, неверно отображается число комментариев
