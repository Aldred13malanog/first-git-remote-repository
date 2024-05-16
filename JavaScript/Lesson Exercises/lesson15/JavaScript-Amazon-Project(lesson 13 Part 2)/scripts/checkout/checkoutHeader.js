import { calculateCartQuantity } from "../../data/cart.js";

export function renderCheckoutHeader() {
	const cartQuantity = calculateCartQuantity();

	document.querySelector('.js-header')
		.innerHTML = `
			Checkout (<a class="return-to-home-link"
			href="amazon.html">${cartQuantity} items</a>)
		`;
}