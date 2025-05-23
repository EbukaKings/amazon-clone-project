import { addToCart, cart, loadFromStorage, updateDeliveryOption } from "../../data/cart.js";

describe('test suite: addTocart', () => {
    it('adds an exsisting product to the cart', () => {
        spyOn(localStorage, 'setItem')
        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([{
                productId: '54e0eccd-8f36-462b-b68a-8182611d9add',
                quantity: 1,
                deliveryOptionId: '1'
            }]);
          });
          loadFromStorage();
        
        addToCart('54e0eccd-8f36-462b-b68a-8182611d9add');
        expect(cart.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(cart[0].productId).toEqual('54e0eccd-8f36-462b-b68a-8182611d9add');
        expect(cart[0].quantity).toEqual(2);
    });
    it('adds a new product to the cart', () => {
        spyOn(localStorage, 'setItem')
        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([]);
            console.log(localStorage.getItem('cart'));
          });
          loadFromStorage();
        
        addToCart('54e0eccd-8f36-462b-b68a-8182611d9add');
        expect(cart.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(cart[0].productId).toEqual('54e0eccd-8f36-462b-b68a-8182611d9add');
        expect(cart[0].quantity).toEqual(1);
    });
});