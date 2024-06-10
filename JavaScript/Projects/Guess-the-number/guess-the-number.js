let random;
let score = {
	correct: 0,
	wrong: 0
};
let modes = 100;
const showsCorrectNum = document.querySelector('.showCorrect');
const giveUpBtn = document.querySelector('.js-give-up');
scoreStatus();
description();

//generate random num
function randomNumbers(mode) {
	const ranNum = Math.floor(Math.random() * mode);
	random = ranNum;
}

//submit button
function submitAnswer() {		
	let inputValue = document.querySelector('.input-number');

	if (random == undefined) {
		alert('Generate Number First!');
	}
	if (inputValue.value == '') {
		alert('Put a number first');
		return;
	}
	if (inputValue.value == random) {
		inputValue.value = '';
		score.correct++;
		scoreStatus();
		alert('You are correct!, Congratulation!');
		randomNumbers(modes);
		giveUpBtn.classList.remove('show');
		showsCorrectNum.innerHTML = '';

	} else if (inputValue.value < random) {
		score.wrong++;
		inputValue.value = '';
		scoreStatus();
		alert('Incorrect! Your Number is low!, Try Again');

	} else if (inputValue.value > random) {
		score.wrong++;
		scoreStatus();
		inputValue.value = '';
		alert('Incorrect! Your Number is high!, Try Again');
	}
}

//Pick a num....
function description() {
	document.querySelector('.js-description').innerHTML = `
		Pick a number from 1 - ${modes}!
	`;
}

//score
function scoreStatus() {
	document.querySelector('.correct').innerHTML = `
	Correct guess: ${score.correct}
`;
	document.querySelector('.wrong').innerHTML = `
	Wrong guess: ${score.wrong}`;
	if (score.wrong % 10 === 0 && score.wrong !== 0) {
		giveUpBtn.classList.add('show');
	}
}

//give up button
function giveUp() {
	if (random == undefined) {
		return;
	}
	showsCorrectNum.innerHTML = `
		Correct Number: ${random}
	`;
}

function heLp() {
	alert(`How to play the game: To play the game you just simply guess the number and submit it to check if you're correct!, But first you need to generate random number based on the difficulty you choose ( the default difficulty is MEDIUM )`);

	alert(`Choosing a difficulty: When choosing a different difficulty you need to generate random number to generate new number from 1 to ( based on the difficulty you choose )`);

	alert(`After you guess every 10 wrong answer the give up button will appear to see the correct number ( only if you click it) ( it will not disappear until you click it and guess the correct number! ) HAVE FUN!`);
}

//keydown
document.body.addEventListener('keydown', (event) => {
	if (event.key === 'Enter') {
		submitAnswer();
	}
});

//onclicks
document.querySelector('.js-very-easy').addEventListener('click', () => {
	modes = 25;
	description();
});
document.querySelector('.js-easy').addEventListener('click', () => {
	modes = 50;
	description();
});
document.querySelector('.js-medium').addEventListener('click', () => {
	modes = 100;
	description();
});
document.querySelector('.js-hard').addEventListener('click', () => {
	modes = 200;
	description();
});
document.querySelector('.js-very-hard').addEventListener('click', () => {
	modes = 500;
	description();
});

document.querySelector('.js-submit-button')
	.addEventListener('click', () => {
		submitAnswer();
	});
document.querySelector('.js-generate-button')
	.addEventListener('click', () => {
		randomNumbers(modes);
	});

document.querySelector('.js-give-up')
	.addEventListener('click', () => {
	  giveUp();
	});

document.querySelector('.js-help')
	.addEventListener('click', () => {
		heLp();
	});