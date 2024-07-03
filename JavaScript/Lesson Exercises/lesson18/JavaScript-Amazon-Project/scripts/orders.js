import { orders } from "../data/orders.js";
import { formatCurrency } from "./utils/money.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { getProduct, loadProductsFetch } from "../data/products.js";
import { addToCart } from "../data/cart.js";

async function loadOrderPage() {
	await loadProductsFetch();

	let ordersHtml = '';

	orders.forEach((order) => {
		const orderTimeString = dayjs(order.orderTime).format('MMMM D');

		ordersHtml += `
			<div class="order-container">
				
				<div class="order-header">
					<div class="order-header-left-section">
						<div class="order-date">
							<div class="order-header-label">Order Placed:</div>
							<div>${orderTimeString}</div>
						</div>
						<div class="order-total">
							<div class="order-header-label">Total:</div>
							<div>$${formatCurrency(order.totalCostCents)}</div>
						</div>
					</div>

					<div class="order-header-right-section">
						<div class="order-header-label">Order ID:</div>
						<div>${order.id}</div>
					</div>
				</div>

				<div class="order-details-grid">
					${productsListHTML(order)}
				</div>
			</div>
		`;
	});

	function productsListHTML(order) {
		let productListHTML = '';

		order.products.forEach((productDetails) => {
			const product = getProduct(productDetails.productId);
			productListHTML += `
				<div class="product-image-container">
					<img src="${product.image}">
				</div>

				<div class="product-details">
					<div class="product-name">
						${product.name}
					</div>
					<div class="product-delivery-date">
						Arriving on: ${
							dayjs(productDetails.estimatedDeliveryTime).format('MMMM D')
						}
					</div>
					<div class="product-quantity">
						Quantity: ${productDetails.quantity}
					</div>
					<button class="buy-again-button button-primary">
						<img class="buy-again-icon" src="images/icons/buy-again.png">
						<span class="buy-again-message js-buy-again"
							data-product-id=${product.id} >Buy it again</span>
					</button>
				</div>

				<div class="product-actions">
					<a href="tracking.html?orderId=${order.id}&productId=${product.id}">
						<button class="track-package-button button-secondary js-track-button">
							Track package
						</button>
					</a>
				</div>
			`;
		});

		return productListHTML;
	}

	document.querySelector('.js-order-grid').innerHTML = ordersHtml;

	document.querySelectorAll('.js-buy-again').forEach((button) => {
		button.addEventListener('click', () => {
			addToCart(button.dataset.productId);

			button.innerHTML = 'Added';

			setTimeout(() => {
				button.innerHTML = `
					<span class="buy-again-message">Buy it again</span>
				`;
			}, 1000);

		});
	});
}
loadOrderPage();