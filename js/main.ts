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

const getRandomImgUrl = getRandomId(1, 25);
const getCommentId = getRandomId(1, 1000);
const getAvatarUrl = getRandomId(1, 6);
const randomDescriptionId = getRandomId(0, DESCRIPTION_TEXTS.length - 1);
const randomMessageId = getRandomId(0, MESSAGES.length - 1);
const randomNameId = getRandomId(0, NAMES.length - 1);
const randomLength = getRandomInteger(0,30);


const getComments = () => {
	return {
		id: getCommentId(),
		avatar: 'img/avatar-' + getAvatarUrl() + '.svg',
		message: MESSAGES[randomMessageId()],
		name: NAMES[randomNameId()]
	}
};

const commentsArray = Array.from({length: randomLength}, getComments);


const createImgDescription = () => { //сделать массив из объектов
	return {
		id: getRandomInteger(1, 25),
		url: 'photos/' + getRandomImgUrl() + '.jpg',
		description: DESCRIPTION_TEXTS[randomDescriptionId()],
		likes: getRandomInteger(15, 200),
		comments: commentsArray
	}
};

const descriptionsArray = Array.from({length: 25},createImgDescription);
console.log(descriptionsArray);

