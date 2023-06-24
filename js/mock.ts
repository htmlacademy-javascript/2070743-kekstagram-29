//Файл для тренировки

const enum Default {
	AMOUNT = 25,
	MIN_LIKES = 15,
	MAX_LIKES = 200
}

const enum Avatar {
	MIN_ID = 1,
	MAX_ID = 6
}

const MESSAGE_TEXTS = ['Всё отлично!',
	'В целом всё неплохо. Но не всё.',
	'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
	'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
	'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
	'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const getMessage = () => Array.from({length: getRandomInt(1, 2)}, () => getRandomElement(MESSAGE_TEXTS)).join(' ');

interface PhotoComment {
	id: number;
	avatar: string;
	message: string;
	name: string;
}

interface Photo {
	id: number;
	url: string;
	description: string;
	likes: number;
	comments: PhotoComment[];
}

const getRandomInt = (a: number, b: number) => {
	const lower = Math.ceil(Math.min(a, b));
	const upper = Math.floor(Math.max(a, b));
	const result = Math.random() * (upper - lower + 1) + lower;
	return Math.floor(result);
};

const getGeneratorID = () => {
	let latestID = 0;
	return () => {
		latestID = latestID + 1;
		return latestID
	}
};

const generatePhotoID = getGeneratorID();
const generateCommentID = getGeneratorID();

const getRandomElement = <Element>(array: Element[]) =>
array[getRandomInt(0, array.length - 1)];

const mockComment = (): PhotoComment => ({
	id: generateCommentID(),
	avatar: `img/avatar-${getRandomInt(Avatar.MIN_ID, Avatar.MAX_ID)}.svg`,
	message: getMessage(),
	name: 'Юрий'
});

const mockPhoto = ( _:undefined, index: number): Photo => {
	const id = index + 1;
	return {
		id: generatePhotoID(),
		url: `photos/${id}.jpg`,
		description: 'Тестовое фото',
		likes: getRandomInt(Default.MIN_LIKES, Default.MAX_LIKES),
		comments: Array.from({length:getRandomInt(0, 30)},mockComment)
	}
};

const mockedPhotos = Array.from({ length: Default.AMOUNT }, mockPhoto);

console.log(mockedPhotos);
