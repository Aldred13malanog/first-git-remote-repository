import { cart, addToCart } from "../data/cart.js";
import { products, loadProducts } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";

loadProducts(renderProductsGrid);

function renderProductsGrid() {
	let productsHTML = '';

	const url = new URL(window.location.href);
	const search = url.searchParams.get('search');

	let filteredProducts = products;

	if (search) {
		filteredProducts = products.filter((product) => {
			let matchingKeywords = false;

			product.keywords.forEach((keyword) => {
				if (keyword.toLowerCase().includes(search.toLocaleLowerCase())) {
					matchingKeywords = true;
				}
			});

			return matchingKeywords || 
				product.name.toLocaleLowerCase().includes(search.toLocaleLowerCase());
		});
	}

	filteredProducts.forEach((product) => {
		const html = `
				<div class="product-container">
				<div class="product-image-container">
					<img class="product-image"
						src="${product.image}">
				</div>

				<div class="product-name limit-text-to-2-lines">
					${product.name}
				</div>

				<div class="product-rating-container">
					<img class="product-rating-stars"
						src="${product.getStarsUrl()}">
					<div class="product-rating-count link-primary">
						${product.rating.count}
					</div>
				</div>

				<div class="product-price">
					${product.getPrice()}
				</div>

				<div class="product-quantity-container">
					<select>
						<option selected value="1">1</option>
						<option value="2">2</option>
						<option value="3">3</option>
						<option value="4">4</option>
						<option value="5">5</option>
						<option value="6">6</option>
						<option value="7">7</option>
						<option value="8">8</option>
						<option value="9">9</option>
						<option value="10">10</option>
					</select>
				</div>

				${product.extraInfoHTML()}

				<div class="product-spacer"></div>

				<div class="added-to-cart">
					<img src="images/icons/checkmark.png">
					Added
				</div>

				<button class="add-to-cart-button js-add-to-cart-button button-primary" data-product-id="${product.id}">
					Add to Cart
				</button>
			</div>
		`;

		productsHTML += html;
	});

	document.querySelector('.js-products-grid').innerHTML = productsHTML;

	document.querySelectorAll('.js-add-to-cart-button')
		.forEach((button) => {
			button.addEventListener('click', () => {
				const productId = button.dataset.productId;
				addToCart(productId);
				updateCartQuantity();			
			});
		});

	function updateCartQuantity() {
		let cartQuantity = 0;

		cart.forEach((item) => {
			cartQuantity += item.quantity;
		});

		document.querySelector('.js-cart-quantity')
			.innerHTML = cartQuantity;
	}

	document.querySelector('.js-search-button')
		.addEventListener('click', () => {
			const search = document.querySelector('.js-search-bar').value;
			window.location.href = `amazon.html?search=${search}`;
		});

	document.querySelector('.js-search-bar')
		.addEventListener('keydown', (event) => {
			if (event.key === 'Enter') {
				const search = document.querySelector('.js-search-bar').value;
				window.location.href = `amazon.html?search=${search}`;
			};
		});
}