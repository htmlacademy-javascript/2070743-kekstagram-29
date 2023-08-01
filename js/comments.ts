import { PhotoComment } from './types';
import { renderPack } from './utils';

const commentsContainer = document.querySelector<HTMLElement>('.social__comments');
const commentTemplate = document.querySelector<HTMLElement>('.social__comment');
const currentCommentCount = document.querySelector<HTMLElement>('.comments-count-current');
const totalCommentCount = document.querySelector<HTMLElement>('.comments-count');
const commentsLoader = document.querySelector<HTMLElement>('.comments-loader');
let allComments: PhotoComment[] = [];

const showComments = ({avatar, name, message}:PhotoComment) => {
	const commentElement = commentTemplate!.cloneNode(true) as typeof commentTemplate;
	const avatarPicture = commentElement!.querySelector<HTMLImageElement>('.social__picture');
	avatarPicture!.src = avatar;
	avatarPicture!.alt = name;
	const commentText = commentElement!.querySelector<HTMLElement>('.social__text');
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
	currentCommentCount!.textContent = endOfSlice.toString();
	totalCommentCount!.textContent = allComments.length.toString();
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
