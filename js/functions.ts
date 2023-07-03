const MINUTES_PER_HOUR = 60;

const lessOrEqual = (string:string, maxLength:number) => string.length <= maxLength;

const isPalindrome = (string:string) => {
	string = string.replaceAll(' ', '').toLowerCase();
	const reversed = string.split('').reverse().join('');
	return reversed === string;
};

const getNumber = (string: string | Number) => {
	string = string.toString();
	return parseInt(string.replace(/[^0-9]/g,''), 10);
};

// задание 11
const parseTime = (time:string) => {
	const parts = time.split(':').map(Number);
	const [hours, minutes] = parts;
	return hours * MINUTES_PER_HOUR + minutes;
};

const getMeeting = (beginning:string, end:string, start:string, duration:number) => parseTime(beginning) <= parseTime(start) && parseTime(start) + duration <= parseTime(end);

export {lessOrEqual, isPalindrome, getNumber, getMeeting};
