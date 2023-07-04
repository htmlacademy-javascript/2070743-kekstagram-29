import {descriptionsArray} from './mock';
import {Photo} from './types';

const template = document.querySelector<HTMLTemplateElement>('#picture')?.content.querySelector<HTMLAnchorElement>('.picture');
const thumbnailsContainer = document.querySelector<HTMLDivElement>('.pictures');

if (!template || !thumbnailsContainer) {
	throw new Error('Template or thumbnails container not found');
}

const thumbnailsFragment = document.createDocumentFragment();

const createPicture = ({id, url, description, likes, comments}: Photo) => {
	const pictureElement = template.cloneNode(true) as HTMLAnchorElement;
	const pictureTag = 	pictureElement.querySelector<HTMLImageElement>('.picture__img');
	if (!pictureTag) {
		return;
	}
	pictureElement.href = `photos/${id}`;

	pictureTag.src = url;
	pictureTag.alt = description;
	pictureElement.querySelector('.picture__likes')!.textContent = likes.toString();
	pictureElement.querySelector('.picture__comments')!.textContent = comments.length.toString();
	thumbnailsFragment.append(pictureElement);
};

descriptionsArray.forEach(createPicture);
thumbnailsContainer.append(thumbnailsFragment);
