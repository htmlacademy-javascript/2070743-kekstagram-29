const lessOrEqual = (string:string, maxLength:number) => string.length <= maxLength;

const isPalindrome = (string:string) => {
	string = string.replaceAll(' ', '').toLowerCase();
	const reversed = string.split('').reverse().join('');
	return reversed === string;
};

const getNumber = (string:string) => {
	string = string.toString();
	return parseInt(string.replace(/[^0-9]/g,''), 10);
};

export {lessOrEqual, isPalindrome, getNumber};
