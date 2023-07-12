import { PhotoComment } from './types';
const commentsContainer = document.querySelector<HTMLElement>('.social__comments');
const commentTemplate = document.querySelector<HTMLElement>('.social__comment');
const commentText = document.querySelector<HTMLElement>('.social__text');

const showComments = (comments:any) => {
	commentsContainer!.innerHTML = '';
	const commentsFragment = document.createDocumentFragment();

	comments.forEach((comment:PhotoComment) => {
		const commentElement = commentTemplate!.cloneNode(true) as HTMLAnchorElement;
		const avatarPicture = commentElement.querySelector<HTMLImageElement>('.social__picture');
		avatarPicture!.src = comment.avatar;
		avatarPicture!.alt = comment.name;
		commentText!.textContent = comment.message;
		commentsFragment.append(commentElement);
	});
	commentsContainer?.append(commentsFragment);
};

export {showComments};
