const enum Default {
	ARRAY_LENGTH = 25,
	LENGTH_MIN = 0,
	LENGTH_MAX = 30
}

const enum Img {
	IMG_URL_MIN = 1,
	IMG_URL_MAX = 25,
	IMG_ID_MIN = 1,
	IMG_ID_MAX = 25,
}

const enum ImgComment {
	COMMENT_ID_MIN = 1,
	COMMENT_ID_MAX = 1000,
}

const enum Avatar {
	AVATAR_URL_MIN = 1,
	AVATAR_URL_MAX = 6,
}

const DESCRIPTION_TEXTS = ['отдыхаем на природе с шашлычками',
	'классно погуляли с собакой, попали под дождь((',
	'шлю привет из жаркой Испании',
	'надоело учиться, когда уже каникулы...',
	'Не важно, кто ты снаружи, главное — кто ты внутри. ©Джейсон Стэтхэм',
	'Пусть тортик будет самым вкусным,<br>Каждый подарок — самым лучшим,<br>А жизнь прекрасна и ярка.<br>С днем рождения! Ура!'];
const MESSAGES = ['Всё отлично!',
	'В целом всё неплохо. Но не всё.',
	'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
	'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
	'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
	'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
const NAMES = [
	'Данила',
	'Анастасия',
	'Мария',
	'Юрий',
	'Анна',
	'Серафима',
	'Арсений',
	'Лидия',
	'Алёна',
	'Диана',
	'Михаил',
	'Варвара',
	'Ярослав',
	'Матвей',
	'Арина'
];

const getRandomInteger = (a: number, b: number) => {
	const lower = Math.ceil(Math.min(a, b));
	const upper = Math.floor(Math.max(a, b));
	const result = Math.random() * (upper - lower + 1) + lower;
	return Math.floor(result);
};

const getRandomId = (a: number, b: number) => {
	const previousValues: number[] = [];
	return function () {
		let currentValue = getRandomInteger(a, b);
		if (previousValues.length >= (b - a + 1)) {
			previousValues.length = 0;
		}
		while (previousValues.includes(currentValue)) {
			currentValue = getRandomInteger(a, b);
		}
		previousValues.push(currentValue);
		return currentValue;
	};
}

const getRandomImgUrl = getRandomId(Img.IMG_URL_MIN, Img.IMG_URL_MAX);
const getRandomImgId = getRandomId(Img.IMG_ID_MIN, Img.IMG_ID_MAX);
const getCommentId = getRandomId(ImgComment.COMMENT_ID_MIN, ImgComment.COMMENT_ID_MAX);
const getAvatarUrl = getRandomId(Avatar.AVATAR_URL_MIN, Avatar.AVATAR_URL_MAX);

const getRandomDescriptionId = getRandomId(0, DESCRIPTION_TEXTS.length - 1);
const getRandomMessageId = getRandomId(0, MESSAGES.length - 1);
const getRandomNameId = getRandomId(0, NAMES.length - 1);
const randomLength = getRandomId(Default.LENGTH_MIN, Default.LENGTH_MAX);

const getComments = () => {
	return {
		id: getCommentId(),
		avatar: 'img/avatar-' + getAvatarUrl() + '.svg',
		message: MESSAGES[getRandomMessageId()],
		name: NAMES[getRandomNameId()]
	}
};

const createImg = () => {
	return {
		id: getRandomImgId(),
		url: 'photos/' + getRandomImgUrl() + '.jpg',
		description: DESCRIPTION_TEXTS[getRandomDescriptionId()],
		likes: getRandomInteger(15, 200),
		comments: Array.from({ length: randomLength() }, getComments)
	}
};

const descriptionsArray = Array.from({ length: Default.ARRAY_LENGTH }, createImg);
console.log(descriptionsArray);

