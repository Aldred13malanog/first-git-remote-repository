import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

export const deliveryOptions = [{
	id: '1',
	deliveryDays: 7,
	priceCents: 0
}, {
	id: '2',
	deliveryDays: 3,
	priceCents: 499
}, {
	id: '3',
	deliveryDays: 1,
	priceCents: 999
}];

export function getDeliveryOption(deliverOptionId) {
	let deliverOption;

	deliveryOptions.forEach((deliveryOption) => {
		if (deliveryOption.id === deliverOptionId) {
			deliverOption = deliveryOption;
		}
	});

	return deliverOption;
}

function isWeekend(date) {
	const dayOfWeek = date.format('dddd');
	return dayOfWeek === 'Saturday' || dayOfWeek === 'Sunday';	
}

export function calculateDeliveryDate(deliveryOption) {
	let remainingDays = deliveryOption.deliveryDays;
	let deliveryDate = dayjs();

	while (remainingDays > 0) {
		deliveryDate = deliveryDate.add(1, 'day');

		if (!isWeekend(deliveryDate)) {
			remainingDays--;
		}
	};

	const format = deliveryDate.format(
		'dddd, MMMM D'
	);

	return format;
}