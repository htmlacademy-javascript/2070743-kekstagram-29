import { PhotoComment } from './types';
import { renderPack } from './utils';

const commentsContainer = document.querySelector<HTMLElement>('.social__comments');
const commentTemplate = document.querySelector<HTMLElement>('.social__comment');
const commentText = document.querySelector<HTMLElement>('.social__text');

const status = document.querySelector<HTMLElement>('.social__comment-count');
const commentsLoader = document.querySelector<HTMLElement>('.comments-loader');
let allComments: PhotoComment[] = [];

const showComments = ({avatar, name, message}:PhotoComment) => {
	const commentElement = commentTemplate!.cloneNode(true) as typeof commentTemplate;
	const avatarPicture = commentElement!.querySelector<HTMLImageElement>('.social__picture');
	avatarPicture!.src = avatar;
	avatarPicture!.alt = name;
	commentText!.textContent = message;
	return commentElement!;
};

commentsLoader!.addEventListener('click', () => {
	const currentAmount = commentsContainer!.childElementCount;
	let endOfSlice = currentAmount + 5;
	const allCommentsShown = endOfSlice >= allComments.length;
	endOfSlice = allCommentsShown ? allComments.length : endOfSlice;
	const nextPack = allComments.slice(currentAmount, endOfSlice);
	renderPack(nextPack, commentsContainer!, showComments);
	status!.textContent = `${endOfSlice} из ${allComments.length} комментариев`;
	commentsLoader!.hidden = allCommentsShown;
});

const renderComments = (comments: PhotoComment[]) => {
	allComments = comments;
	commentsLoader?.click();
};

const clearComments = () => {
	commentsContainer!.innerHTML = '';
};

export {showComments, renderComments, clearComments};
