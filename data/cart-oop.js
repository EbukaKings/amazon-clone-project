const cart = {cartItems: undefined,
    loadFromStorage () {
        cart.cartItems = JSON.parse(localStorage.getItem('cart-oop'));
    if (!this.cartItems) {
        this.cartItems = [{
            productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
            quantity: 2,
            deliveryOptionId: '1'
        },
        {
            productId: '83d4ca15-0f35-48f5-b7a3-1ea210004f2e',
            quantity: 2,
            deliveryOptionId: '2'
        }];
        
    }
},

saveToStorage() {
    localStorage.setItem('cart-oop', JSON.stringify(this.cartItems));

},
addToCart(productId) {
    let matchingItem;
          this.cartItems.forEach((item) => {
              if (productId === item.productId) {
                  matchingItem = item;
              }
          });
  
          const quantity = Number(document.querySelector(`.js-quantity-selector-${productId}`).value);
          if (matchingItem) {
              matchingItem.quantity += quantity; 
          } else {
              this.cartItems.push({
                  productId: productId,
                  quantity: quantity,
                  deliveryOptionId: '1'
              });
          }
          this.saveToStorage();
  },
  removeFromCart(productId) {
    const newCart = [];

    this.cartItems.forEach((cartItem) => {
        if (cartItem.productId !== productId) {
            newCart.push(cartItem)
        }
    })
    this.cartItems = newCart
    this.saveToStorage()
  },
  updateDeliveryOption(productId, deliveryOptionId) {
    let matchingItem;
          this.cartItems.forEach((item) => {
              if (productId === item.productId) {
                  matchingItem = item;
              }
          });
          matchingItem.deliveryOptionId = deliveryOptionId;
          this.saveToStorage()
  }

};
// import { calculateCartQuantity } from "../scripts/amazon.js";

cart.loadFromStorage ()
  