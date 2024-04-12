let calculation = '';


updCal();

function updateCal(value) {
	calculation += value;
	updCal();
}

//delayed solution
function clearOne() {
	
}

function updCal() {
	document.querySelector('.js-show')
		.innerHTML = calculation || 0;
}

document.body.addEventListener('keydown', (event) => {
	if (event.key === '1') {
		updateCal('1');
	} else if (event.key === '2') {
		updateCal('2');
	} else if (event.key === '3') {
		updateCal('3');
	} else if (event.key === '4') {
		updateCal('4');
	} else if (event.key === '5') {
		updateCal('5');
	} else if (event.key === '6') {
		updateCal('6');
	} else if (event.key === '7') {
		updateCal('7');
	} else if (event.key === '8') {
		updateCal('8');
	} else if (event.key === '9') {
		updateCal('9');
	} else if (event.key === '0') {
		updateCal('0');
	}

	if (event.key === '+') {
		updateCal(' + ');
	} else if (event.key === '-') {
		updateCal(' - ');
	} else if (event.key === '*') {
		updateCal(' * ');
	} else if (event.key === '/') {
		updateCal(' / ');
	} else if (event.key === '.') {
		updateCal('.');
	} else if (event.key === 'Backspace') {
		calculation = 0;
		updCal();
	} else if (event.key === 'Enter') {
		calculation = eval(calculation);
		updCal();
	}
})

document.querySelector('.js-oneBtn').addEventListener('click', () => {
	updateCal('1');
});
document.querySelector('.js-twoBtn').addEventListener('click', () => {
	updateCal('2');
});
document.querySelector('.js-threeBtn').addEventListener('click', () => {
	updateCal('3');
});
document.querySelector('.js-fourBtn').addEventListener('click', () => {
	updateCal('4');
});
document.querySelector('.js-fiveBtn').addEventListener('click', () => {
	updateCal('5');
});
document.querySelector('.js-sixBtn').addEventListener('click', () => {
	updateCal('6');
});
document.querySelector('.js-sevenBtn').addEventListener('click', () => {
	updateCal('7');
});
document.querySelector('.js-eightBtn').addEventListener('click', () => {
	updateCal('8');
});
document.querySelector('.js-nineBtn').addEventListener('click', () => {
	updateCal('9');
});
document.querySelector('.js-zeroBtn').addEventListener('click', () => {
	updateCal('0');
});
document.querySelector('.js-plusBtn').addEventListener('click', () => {
	updateCal(' + ');
});
document.querySelector('.js-minusBtn').addEventListener('click', () => {
	updateCal(' - ');
});
document.querySelector('.js-multiplyBtn').addEventListener('click', () => {
	updateCal(' * ');
});
document.querySelector('.js-divideBtn').addEventListener('click', () => {
	updateCal(' / ');
});
document.querySelector('.js-decimalBtn').addEventListener('click', () => {
	updateCal('.');
});
document.querySelector('.js-cBtn').addEventListener('click', () => {
	clearOne();
});
document.querySelector('.js-equalBtn')
	.addEventListener('click', () => {
		calculation = eval(calculation);
		updCal();
});
document.querySelector('.clear')
	.addEventListener('click', () => {
		calculation = '';
		updCal();
});