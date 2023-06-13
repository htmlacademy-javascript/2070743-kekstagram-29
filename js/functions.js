// Функция для проверки длины строки

let lessOrEqual = (string, length) => string.length <= length;
console.log(lessOrEqual("бубубу", 12));

// Функция для проверки, является ли строка палиндромом

// let isPalindrome = () => {
// 	let invertedString = '';
// 	for (let i = string.length - 1; i >= 0; i--) {
// 		invertedString += string[i];
// 	}
// 	return string === invertedString;
// }

// or

let isPalindrome = (string) => {
	string = string.replaceAll(" ", "").toLowerCase();
	let reversed = string.split("").reverse().join("");
	return reversed === string;
}

console.log(isPalindrome("ДОвод"));

// функция, преобразующая строку в цифры

let getNumber = (string) =>  typeof(string) === "number" ? Math.round(string * -1) : parseInt(string.replace(/[^0-9]/g,""));

console.log(getNumber('а я томат'));
