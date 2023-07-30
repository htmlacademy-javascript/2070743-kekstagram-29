import { createFullPhoto } from './full-photo';
import { Photo } from './types';
import {openFullPhoto} from './full-photo';
import { renderPack } from './utils';

const template = document.querySelector<HTMLTemplateElement>('#picture')?.content.querySelector<HTMLAnchorElement>('.picture');
const thumbnailsContainer = document.querySelector<HTMLDivElement>('.pictures');

if (!template || !thumbnailsContainer) {
	throw new Error('Template or thumbnails container not found');
}

const createPicture = (photoData: Photo) => {
	const { id, url, description, likes, comments } = photoData;
	const pictureElement = template.cloneNode(true) as HTMLAnchorElement;
	const pictureTag = pictureElement.querySelector<HTMLImageElement>('.picture__img');
	if (!pictureTag) {
		throw new Error('Picture tag not found');
	}

	pictureTag.addEventListener('click', (evt) => {
		evt.preventDefault();
		openFullPhoto();
		createFullPhoto(photoData);
	});

	pictureElement.href = `photos/${id}`;

	pictureTag.src = url;
	pictureTag.alt = description;
	pictureElement.querySelector('.picture__likes')!.textContent = likes.toString();
	pictureElement.querySelector('.picture__comments')!.textContent = comments.length.toString();
	return pictureElement;
};

const renderThumbnails = (photos: Photo[]) => renderPack(photos, thumbnailsContainer, (photo) => {
	const thumbnail = createPicture(photo);
	return thumbnail;
});

const clearThumbnails = () => thumbnailsContainer.querySelectorAll('.picture').forEach((picture) => picture.remove());

export {createPicture, renderThumbnails, clearThumbnails};
