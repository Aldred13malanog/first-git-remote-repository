import { addToCart, cart, loadFromStorage, removeFromCart, updateDeliveryOption } from "../../data/cart.js";

describe('test suite: addToCart', () => {
	//16e
	beforeEach(() => {
		spyOn(localStorage, 'setItem');
	});


	it('adds an existing product to the cart', () => {
		
		spyOn(localStorage, 'getItem').and.callFake(() => {
			return JSON.stringify([{
				productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
				quantity: 1,
				deliveryOptions: '1'
			}]);
		});
		loadFromStorage();

		addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
		expect(cart.length).toEqual(1);
		expect(localStorage.setItem).toHaveBeenCalledTimes(1);
		expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
		expect(cart[0].quantity).toEqual(2);
		//16c
		expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([{
			productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
			quantity: 2,
			deliveryOptions: '1'
		}]));
	});

	it('adds a new product to the cart', () => {

		spyOn(localStorage, 'getItem').and.callFake(() => {
			return JSON.stringify([]);
		});
		loadFromStorage();

		addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
		expect(cart.length).toEqual(1);
		expect(localStorage.setItem).toHaveBeenCalledTimes(1);
		expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
		expect(cart[0].quantity).toEqual(1);
		//16d
		expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([{
			productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
			quantity: 1,
			deliveryOptions: '1'
		}]));
	});
});
//16i challenge exercise
describe('test suite: removeFromCart', () => {
	beforeEach(() => {
		spyOn(localStorage, 'setItem');

		spyOn(localStorage, 'getItem').and.callFake(() => {
			return JSON.stringify([{
				productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
				quantity: 2,
				deliveryOptions: '1'
			}, {
				productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
				quantity: 1,
				deliveryOptions: '2'
			}]);
		});

		loadFromStorage();
	});

	it('remove a product that is in the cart', () => {
		removeFromCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
		expect(cart.length).toEqual(1);
		expect(localStorage.setItem).toHaveBeenCalledTimes(1);
		expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([{
			productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
			quantity: 1,
			deliveryOptions: '2'
		}]));
		expect(cart[0].productId).toEqual('15b6fc6f-327a-4ec4-896f-486349e85a3d');
		expect(cart[0].quantity).toEqual(1);
	});

	it('remove a product that is not in the cart', () => {
		removeFromCart('does not exist');
		expect(cart.length).toEqual(2);
		expect(localStorage.setItem).toHaveBeenCalledTimes(1);
		expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([{
			productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
			quantity: 2,
			deliveryOptions: '1'
		}, {
			productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
			quantity: 1,
			deliveryOptions: '2'
		}]));;
		expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
		expect(cart[0].quantity).toEqual(2);
		expect(cart[1].productId).toEqual('15b6fc6f-327a-4ec4-896f-486349e85a3d');
		expect(cart[1].quantity).toEqual(1);
	});
});
//16k
describe('test suite: updateDeliveryOption', () => {
	beforeEach(() => {
		spyOn(localStorage, 'setItem');

		spyOn(localStorage, 'getItem').and.callFake(() => {
			return JSON.stringify([{
				productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
				quantity: 2,
				deliveryOptions: '1'
			}]);
		});
		loadFromStorage();

	});

	it('updates the delivery option', () => {
		updateDeliveryOption('e43638ce-6aa0-4b85-b27f-e1d07eb678c6', '3');
		expect(cart.length).toEqual(1);
		expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
		expect(cart[0].quantity).toEqual(2);
		expect(cart[0].deliveryOptions).toEqual('3');
		expect(localStorage.setItem).toHaveBeenCalledTimes(1);
		expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([{
			productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
			quantity: 2,
			deliveryOptions: '3'
		}]));

	});
	//16l
	it('does nothing if the product is not in the cart', () => {
		updateDeliveryOption('does-not-exist', '3');
		expect(cart.length).toEqual(1);
		expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
		expect(cart[0].quantity).toEqual(2);
		expect(cart[0].deliveryOptions).toEqual('1');
		expect(localStorage.setItem).toHaveBeenCalledTimes(0);
	});

	it('does nothing if the delivery option does not exist', () => {
		updateDeliveryOption('e43638ce-6aa0-4b85-b27f-e1d07eb678c6', 'does-not-exist');
		expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
		expect(cart[0].quantity).toEqual(2);
		expect(cart[0].deliveryOptions).toEqual('1');
		expect(localStorage.setItem).toHaveBeenCalledTimes(0);
	});
});