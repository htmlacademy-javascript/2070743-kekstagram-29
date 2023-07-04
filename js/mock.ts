import { getRandomInteger, getRandomId } from './utils';
import {DESCRIPTION_TEXTS, MESSAGES, NAMES} from './constants';
import {Photo, PhotoComment} from './types';

const enum Default {
	ARRAY_LENGTH = 25,
	LENGTH_MIN = 0,
	LENGTH_MAX = 30
}

const enum Img {
	ID_MIN = 1,
	ID_MAX = 25,
}

const enum ImgComment {
	ID_MIN = 1,
	ID_MAX = 1000,
}

const enum Avatar {
	URL_MIN = 1,
	URL_MAX = 6,
}

const getRandomImgUrl = getRandomId(Img.ID_MIN, Img.ID_MAX);
const getRandomImgId = getRandomId(Img.ID_MIN, Img.ID_MAX);
const getCommentId = getRandomId(ImgComment.ID_MIN, ImgComment.ID_MAX);
const getAvatarUrl = getRandomId(Avatar.URL_MIN, Avatar.URL_MAX);

const getRandomDescriptionId = getRandomId(0, DESCRIPTION_TEXTS.length - 1);
const getRandomMessageId = getRandomId(0, MESSAGES.length - 1);
const getRandomNameId = getRandomId(0, NAMES.length - 1);
const randomLength = getRandomId(Default.LENGTH_MIN, Default.LENGTH_MAX);

const getComments = (): PhotoComment => ({
	id: getCommentId(),
	avatar: `img/avatar-${getAvatarUrl()}.svg`,
	message: MESSAGES[getRandomMessageId()],
	name: NAMES[getRandomNameId()]
});

const createImg = (): Photo => ({
	id: getRandomImgId(),
	url: `photos/${getRandomImgUrl()}.jpg`,
	description: DESCRIPTION_TEXTS[getRandomDescriptionId()],
	likes: getRandomInteger(15, 200),
	comments: Array.from({ length: randomLength() }, getComments)
});

const descriptionsArray = Array.from({ length: Default.ARRAY_LENGTH }, createImg);

export {descriptionsArray};
